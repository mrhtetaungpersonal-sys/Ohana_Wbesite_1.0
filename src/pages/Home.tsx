import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import WelcomeModal from '../components/WelcomeModal';
import KeyServicesPreview from '../components/KeyServicesPreview';
import WhyChooseOhana from '../components/WhyChooseOhana';
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

      if (error) {
        console.error('Error loading videos:', error);
        return;
      }

      if (data && data.length > 0) {
        const videoUrls = data.map((file) => {
          const { data: urlData } = supabase.storage
            .from('videos')
            .getPublicUrl(file.name);
          return urlData.publicUrl;
        });
        setVideos(videoUrls);
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

      <div className="relative min-h-screen flex items-center overflow-hidden">
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
          <div className="max-w-2xl">
            <div className="mb-6">
              <span className="inline-block text-sm uppercase tracking-wider font-medium text-blue-200 mb-2" style={{ opacity: 0.6 }}>
                Premium Laundry Services
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight" style={{ opacity: 0.6 }}>
              Professional Care for Everyday Life.
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 mb-10 leading-relaxed max-w-xl" style={{ lineHeight: '1.6', opacity: 0.6 }}>
              Suits, dresses, silk, and traditional wear cleaned with expert stain care and finishing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#book-now"
                className="inline-flex items-center justify-center px-8 py-4 bg-ohana-mid-blue text-white text-lg font-medium rounded-lg hover:scale-102 hover:shadow-xl transition-all duration-200"
                style={{ opacity: 0.6 }}
              >
                Book Now
              </a>

              <Link
                to="/pricing"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white text-lg font-medium rounded-lg border-2 border-white hover:bg-white/10 transition-all duration-200"
                style={{ opacity: 0.6 }}
              >
                See Prices
              </Link>
            </div>
          </div>
        </div>
      </div>

      <KeyServicesPreview />

      <WhyChooseOhana />
    </>
  );
}
