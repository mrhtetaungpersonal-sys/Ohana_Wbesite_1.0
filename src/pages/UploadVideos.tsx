import { useState, useCallback, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FileWithPreview extends File {
  id: string;
}

export default function UploadVideos() {
  const [selectedFiles, setSelectedFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [storageReady, setStorageReady] = useState(true);

  useEffect(() => {
    const checkStorage = async (retryCount = 0) => {
      const maxRetries = 3;
      const retryDelay = 1000;

      try {
        console.log('Checking Supabase storage connection...');
        const { data, error } = await supabase.storage.listBuckets();

        if (error) {
          console.error('Storage check error:', {
            message: error.message,
            status: error.statusCode,
            details: error,
          });

          if (retryCount < maxRetries) {
            console.log(`Retrying storage connection (${retryCount + 1}/${maxRetries})...`);
            setTimeout(() => checkStorage(retryCount + 1), retryDelay);
            return;
          }

          setStorageReady(false);
          setMessage({
            text: `Unable to connect to storage: ${error.message}. Please check your connection and refresh the page.`,
            type: 'error'
          });
        } else if (!data) {
          console.error('No data returned from storage.listBuckets()');
          setStorageReady(false);
          setMessage({
            text: 'No storage data received. Please refresh the page.',
            type: 'error'
          });
        } else if (!data.some(bucket => bucket.name === 'videos')) {
          console.error('Available buckets:', data.map(b => b.name));
          setStorageReady(false);
          setMessage({
            text: 'Videos storage bucket not found. Please contact support.',
            type: 'error'
          });
        } else {
          console.log('Storage connection successful. Videos bucket found.');
        }
      } catch (err) {
        console.error('Storage initialization error:', {
          error: err,
          message: err instanceof Error ? err.message : 'Unknown error',
          stack: err instanceof Error ? err.stack : undefined,
        });

        if (retryCount < maxRetries) {
          console.log(`Retrying after error (${retryCount + 1}/${maxRetries})...`);
          setTimeout(() => checkStorage(retryCount + 1), retryDelay);
          return;
        }

        setStorageReady(false);
        setMessage({
          text: `Storage error: ${err instanceof Error ? err.message : 'Unknown error'}`,
          type: 'error'
        });
      }
    };

    checkStorage();
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragOver(false);
  }, []);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const videoFiles = Array.from(files).filter(file => file.type.startsWith('video/'));
    
    if (videoFiles.length === 0) {
      setMessage({ text: 'Please select video files only', type: 'error' });
      return;
    }

    if (selectedFiles.length + videoFiles.length > 3) {
      setMessage({ text: 'You can only upload up to 3 videos', type: 'error' });
      return;
    }

    const filesWithId = videoFiles.map(file =>
      Object.assign(file, { id: `${Date.now()}-${Math.random()}` })
    );

    const oversizedFiles = filesWithId.filter(file => file.size > 104857600);
    
    if (oversizedFiles.length > 0) {
      setMessage({
        text: `${oversizedFiles[0].name} is too large. Max size: 100MB`,
        type: 'error'
      });
      return;
    }

    setSelectedFiles(prev => [...prev, ...filesWithId]);
    setMessage(null);
  }, [selectedFiles.length]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  }, [handleFiles]);

  const removeFile = useCallback((fileId: string) => {
    setSelectedFiles(prev => prev.filter(f => f.id !== fileId));
  }, []);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setProgress(0);
    setMessage(null);

    let uploadedCount = 0;

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const fileName = `hero-${i + 1}-${Date.now()}.${file.name.split('.').pop()}`;

      try {
        const { error } = await supabase.storage
          .from('videos')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) throw error;

        uploadedCount++;
        setProgress((uploadedCount / selectedFiles.length) * 100);
      } catch (error) {
        console.error('Upload error:', error);
        setMessage({
          text: `Error uploading ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
          type: 'error'
        });
        setIsUploading(false);
        return;
      }
    }

    setMessage({
      text: `Successfully uploaded ${uploadedCount} video(s)!`,
      type: 'success'
    });
    setSelectedFiles([]);
    
    setTimeout(() => {
      setProgress(0);
      setIsUploading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#042959] to-[#0a4080] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#042959] mb-3 flex items-center gap-3">
              <Upload className="w-8 h-8" />
              Upload Hero Videos
            </h1>
            <p className="text-gray-600 text-base">
              Upload 3 videos for your Hero Banner rotation
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-[#042959]">
              <span className="font-semibold block mb-2">📝 Instructions:</span>
              Select or drag-and-drop your 3 hero banner videos. Supported formats: MP4, WebM, MOV, AVI. Max size: 100MB per file.
            </p>
          </div>

          <div
            className={`
              border-2 border-dashed rounded-xl p-12 text-center mb-6
              transition-all duration-300 cursor-pointer
              ${isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-[#042959] hover:bg-gray-50 hover:border-[#0a4080]'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Upload className="w-16 h-16 mx-auto mb-4 text-[#042959]" />
            <p className="text-[#042959] font-medium text-lg mb-2">
              Click to select videos or drag and drop here
            </p>
            <p className="text-gray-600 text-sm">
              Select up to 3 video files
            </p>
            <input
              id="fileInput"
              type="file"
              accept="video/mp4,video/webm,video/quicktime,video/x-msvideo"
              multiple
              className="hidden"
              onChange={handleFileInputChange}
            />
          </div>

          {selectedFiles.length > 0 && (
            <div className="space-y-3 mb-6">
              {selectedFiles.map((file) => (
                <div
                  key={file.id}
                  className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="text-[#042959] font-medium text-sm mb-1">
                      {file.name}
                    </p>
                    <p className="text-gray-600 text-xs">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <X className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={selectedFiles.length === 0 || isUploading || !storageReady}
            className={`
              w-full py-4 px-6 rounded-xl text-white font-medium text-lg
              transition-all duration-300
              ${selectedFiles.length === 0 || isUploading || !storageReady
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#042959] hover:bg-[#0a4080] hover:shadow-lg hover:-translate-y-0.5'
              }
            `}
          >
            {isUploading ? 'Uploading...' : !storageReady ? 'Storage Unavailable' : 'Upload Videos'}
          </button>

          {isUploading && (
            <div className="mt-6">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#042959] to-[#0a4080] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {message && (
            <div
              className={`
                mt-6 p-4 rounded-lg border flex items-start gap-3
                ${message.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-800'
                  : 'bg-red-50 border-red-200 text-red-800'
                }
              `}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm font-medium">{message.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
