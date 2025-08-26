import { useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// Import all photos
import photo1 from "@/images/DSC00302.jpg";
import photo2 from "@/images/DSC00336.jpg";
import photo3 from "@/images/DSC00366.jpg";
import photo4 from "@/images/DSC00805.jpg";
import photo5 from "@/images/DSC00888.jpg";
import photo6 from "@/images/DSC01069.jpg";
import photo8 from "@/images/IMG_0203.jpg";
import photo9 from "@/images/IMG_0344.jpg";
import photo10 from "@/images/IMG_1400.jpg";
import photo11 from "@/images/IMG_1420.jpg";
import photo12 from "@/images/IMG_1482.jpg";
import photo14 from "@/images/27F1AAA4-1766-4E68-ACF1-6E7F40D7B82B.jpg";
import photo15 from "@/images/d3362dae-ce8e-4a71-8a1c-9c2a5d90425b.jpg";

const photos = [
  {
    id: 1,
    src: photo1,
    alt: "Bhavdeep & Ramandeep - Beautiful Moments",
    caption: "Our beautiful journey together"
  },
  {
    id: 2,
    src: photo2,
    alt: "Bhavdeep & Ramandeep - Love and Joy",
    caption: "Love and laughter"
  },
  {
    id: 3,
    src: photo3,
    alt: "Bhavdeep & Ramandeep - Special Times",
    caption: "Creating memories"
  },
  {
    id: 4,
    src: photo4,
    alt: "Bhavdeep & Ramandeep - Wedding Preparations",
    caption: "Together forever"
  },
  {
    id: 5,
    src: photo5,
    alt: "Bhavdeep & Ramandeep - Precious Moments",
    caption: "Cherished moments"
  },
  {
    id: 6,
    src: photo6,
    alt: "Bhavdeep & Ramandeep - Love Story",
    caption: "Our love story"
  },
  {
    id: 8,
    src: photo8,
    alt: "Bhavdeep & Ramandeep - Family Time",
    caption: "With our loved ones"
  },
  {
    id: 9,
    src: photo9,
    alt: "Bhavdeep & Ramandeep - Special Occasions",
    caption: "Special occasions together"
  },
  {
    id: 10,
    src: photo10,
    alt: "Bhavdeep & Ramandeep - Ceremony Moments",
    caption: "Sacred moments"
  },
  {
    id: 11,
    src: photo11,
    alt: "Bhavdeep & Ramandeep - Engagement",
    caption: "Our engagement"
  },
  {
    id: 12,
    src: photo12,
    alt: "Bhavdeep & Ramandeep - Celebration",
    caption: "Celebrating together"
  },
  {
    id: 14,
    src: photo14,
    alt: "Bhavdeep & Ramandeep - Adventure",
    caption: "Adventures together"
  },
  {
    id: 15,
    src: photo15,
    alt: "Bhavdeep & Ramandeep - Memories",
    caption: "Making memories"
  }
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (photoId: number) => {
    setSelectedPhoto(photoId);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigatePhoto = (direction: 'prev' | 'next') => {
    if (selectedPhoto === null) return;
    
    const currentIndex = photos.findIndex(p => p.id === selectedPhoto);
    let newIndex;
    
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    }
    
    setSelectedPhoto(photos[newIndex].id);
  };

  const selectedPhotoData = photos.find(p => p.id === selectedPhoto);

  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-pink-300/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-purple-300/20 rounded-full animate-float delay-500"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-indigo-300/20 rounded-full animate-float delay-1000"></div>
        <div className="absolute bottom-10 right-10 w-18 h-18 bg-pink-300/20 rounded-full animate-float delay-1500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Our Journey Together
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A glimpse into our beautiful moments together as we prepare for our forever
          </p>
        </div>

        {/* Photo Carousel */}
        <Carousel className="w-full max-w-5xl mx-auto" opts={{ align: "start", loop: true }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {photos.map((photo) => (
              <CarouselItem key={photo.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <div
                  className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openLightbox(photo.id)}
                >
                  <div className="aspect-square relative overflow-hidden bg-gray-200">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white text-sm font-medium truncate">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4 bg-white/80 hover:bg-white/90 border-white/50" />
          <CarouselNext className="right-4 bg-white/80 hover:bg-white/90 border-white/50" />
        </Carousel>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: Math.ceil(photos.length / 3) }).map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer transition-colors"
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && selectedPhotoData && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={() => navigatePhoto('prev')}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => navigatePhoto('next')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Image */}
              <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={selectedPhotoData.src}
                  alt={selectedPhotoData.alt}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
                <div className="p-6 text-center">
                  <p className="text-gray-700 font-medium">{selectedPhotoData.caption}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PhotoGallery;
