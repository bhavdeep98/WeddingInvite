import mehandiImage from "@/assets/ChatGPT Image Aug 24, 2025 at 07_43_29 PM.png";
import mehandiIcon from "@/assets/mehandi-icon.jpg";
import joinusImage from "@/assets/joinus.jpg";
import mehandiBackground from "@/assets/pexels-photo-30184703.jpeg";
import { useParallax } from "@/hooks/use-parallax";

const MehandiSection = () => {
  const { elementRef: imageRef, style: imageStyle } = useParallax({ intensity: 0.05 });

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 240, 240, 0.7), rgba(255, 240, 240, 0.7)), url(${mehandiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-red-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-red-500/15 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-red-300/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 bg-red-400/20 rounded-full animate-float delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-red-500/15 rounded-full animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-red-300/25 rounded-full animate-float delay-2500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-red-400/20 rounded-full animate-float delay-3000"></div>
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-red-500/15 rounded-full animate-float delay-3500"></div>
        <div className="absolute top-1/4 right-1/2 w-7 h-7 bg-red-300/25 rounded-full animate-float delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-red-400/20 rounded-full animate-float delay-4500"></div>
        <div className="absolute top-1/6 left-1/6 w-7 h-7 bg-red-400/20 rounded-full animate-float delay-5000"></div>
        <div className="absolute bottom-1/6 right-1/6 w-6 h-6 bg-red-300/25 rounded-full animate-float delay-5500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
              <img src={mehandiIcon} alt="Mehandi" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-red-800">
              Mehandi Ceremony
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Image with Parallax - Top on mobile, right on desktop */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="relative mb-4 overflow-hidden rounded-2xl" ref={imageRef}>
              <img 
                src={mehandiImage} 
                alt="Traditional Mehandi Ceremony" 
                className="w-full h-80 object-cover"
                style={imageStyle}
              />
            </div>
          </div>

          {/* Content - Full Height to match image - Bottom on mobile, left on desktop */}
          <div className="space-y-6 lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-soft h-full border border-white/20">
              <h3 className="font-serif text-2xl font-semibold text-red-700 mb-6 drop-shadow-sm">
                The Art of Celebration
              </h3>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p className="text-base">
                  The Mehandi ceremony is a vibrant celebration of art, beauty, and feminine bonds. <strong>Mehandi</strong> (henna) is not just a beautiful adornment but a symbol of joy, spiritual awakening, and the deep love between partners.
                </p>
                <p className="text-base">
                  Traditionally, intricate henna patterns are applied to the bride's hands and feet by skilled artists, with each design telling a story of love, prosperity, and new beginnings. The darker the henna stains, the deeper the love between the couple - a belief cherished across generations.
                </p>
                <p className="text-base">
                  This evening will be filled with traditional songs, dance performances by family and friends, and the joyous <strong>Jaggo</strong> ceremony, where we celebrate with dhol beats and folk songs under the stars.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Bubble - Bottom of Section */}
        <div className="mt-16 mb-4">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30">
            <h4 className="font-serif text-xl font-semibold text-red-800 mb-4 text-center">Join Us For</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl mb-2">🗓️</div>
                <div className="text-sm font-semibold text-gray-800">Date</div>
                <div className="text-sm text-gray-700">25th October 2025</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm font-semibold text-gray-800">Time</div>
                <div className="text-sm text-gray-700">7:00 PM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-sm font-semibold text-gray-800">Venue</div>
                <div className="text-sm text-gray-700">Hotel Saanwara, Old Ambala Road Zirakpur</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">👗</div>
                <div className="text-sm font-semibold text-gray-800">Dress Code</div>
                <div className="text-sm text-gray-700">Formal party wear</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-center">
              <div className="space-y-2">
                <div className="text-xl mb-2">🎵</div>
                <div className="text-sm font-semibold text-gray-800">Special</div>
                <div className="text-sm text-gray-700">Jaggo ceremony</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl mb-2">🎭</div>
                <div className="text-sm font-semibold text-gray-800">Entertainment</div>
                <div className="text-sm text-gray-700">Family performances</div>
              </div>
            </div>
            <p className="mt-4 italic text-gray-700 text-sm text-center">
              "An evening of music, masti, and mehndi magic!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MehandiSection;