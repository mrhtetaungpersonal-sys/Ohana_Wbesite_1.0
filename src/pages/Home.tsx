import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import WelcomeModal from '../components/WelcomeModal';
import KeyServicesPreview from '../components/KeyServicesPreview';
import WhyChooseOhana from '../components/WhyChooseOhana';
import PageShell from '../components/PageShell';
import { supabase } from '../lib/supabase';

export default function Home() {
  const [videos, setVideos] = useState<string[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [nextVideoIndex, setNextVideoIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentVideoRef = useRef<HTMLVideoElement>(null);
  const nextVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const { data, error } = await supabase.storage.from('videos').list();
          console.log('DEBUG: Videos from storage:', data);

      if (error) {
        console.error('Error loading videos:', error);
        return;
      }

      if (data && data.length > 0) {
        const videoUrls = data.map((file) => {
      // Filter out system files and get only video files
      const videoFiles = data.filter(file => 
        !file.name.includes('.emptyFolderPlaceholder') && 
        (file.name.endsWith('.mp4') || file.name.endsWith('.webm') || file.name.endsWith('.mov'))
      );
      console.log('DEBUG: Filtered video files:', videoFiles.map(f => f.name));
      
      const videoUrls = videoFiles.map((file) => {          const { data: urlData } = supabase.storage
            .from('videos')
            .getPublicUrl(file.name);
          return urlData.publicUrl;
                                                        });
        });
       setVideos(videoUrls);
                console.log('DEBUG: Final video URLs set:', videoUrls);
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const handleVideoEnd = () => {
    if (videos.length <= 1) return;

    setIsTransitioning(true);
    const nextIndex = (currentVideoIndex + 1) % videos.length;
    const followingIndex = (nextIndex + 1) % videos.length;

    setTimeout(() => {
      setCurrentVideoIndex(nextIndex);
      setNextVideoIndex(followingIndex);
      setIsTransitioning(false);
    }, 1000);
  };

  return (
    <>
      <WelcomeModal />

      <div className="pt-32 pb-16 px-6 md:px-10 lg:px-16">
        <div className="w-full relative min-h-[600px] lg:min-h-[700px] overflow-hidden rounded-3xl">
          {videos.length > 0 ? (
            <>
              <video
                ref={currentVideoRef}
                autoPlay
                muted
                playsInline
                onEnded={handleVideoEnd}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                style={{ opacity: isTransitioning ? 0 : 1 }}
                key={`current-${currentVideoIndex}`}
              >
                <source src={videos[currentVideoIndex]} type="video/mp4" />
              </video>

              {videos.length > 1 && (
                <video
                  ref={nextVideoRef}
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
                  style={{ opacity: isTransitioning ? 1 : 0 }}
                  key={`next-${nextVideoIndex}`}
                >
                  <source src={videos[nextVideoIndex]} type="video/mp4" />
                </video>
              )}
            </>
          ) : (
            <div
              className="absolute inset-0 w-full h-full"
              style={{ background: '#042959' }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, rgba(4, 41, 89, 0.5), rgba(4, 41, 89, 0.7))' }}
          />

          <div className="absolute inset-x-8 sm:inset-x-12 lg:inset-x-16 bottom-12 lg:bottom-16 z-10 flex flex-col lg:flex-row justify-between items-end gap-8 lg:gap-12">
            {/* Left column: Label + Headline */}
            <div className="flex flex-col gap-4 max-w-xl">
              <span className="inline-block text-sm uppercase tracking-wider font-medium text-blue-200">
                Premium Laundry Services
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Professional Care for Everyday Life.
              </h1>
            </div>

            {/* Right column: Paragraph + CTAs */}
            <div className="flex flex-col gap-6 max-w-md lg:text-right">
              <p className="text-lg sm:text-xl text-gray-200 leading-relaxed" style={{ lineHeight: '1.6' }}>
                Suits, dresses, silk, and traditional wear cleaned with expert stain care and finishing.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
                <a
                  href="#book-now"
                  className="inline-flex items-center justify-center px-8 py-4 bg-ohana-mid-blue text-white text-lg font-medium rounded-lg hover:scale-102 hover:shadow-xl transition-all duration-200"
                >
                  Book Now
                </a>

                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-lg font-medium rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-200"
                >
                  See Prices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 lg:py-16">
        <PageShell>
          <KeyServicesPreview />
        </PageShell>
      </div>

      <div className="py-8 lg:py-10">
        <PageShell>
          <WhyChooseOhana />
        </PageShell>
      </div>
    </>
  );
}
