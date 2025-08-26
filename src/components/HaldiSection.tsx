import haldiImage from "@/assets/haldi image removebg.png";
import haldiIcon from "@/assets/haldi-icon.jpg";
import joinusImage from "@/assets/joinus.jpg";
import haldiBackground from "@/assets/haldi-ceremony.jpg";
import { useParallax } from "@/hooks/use-parallax";

const HaldiSection = () => {
  const { elementRef: imageRef, style: imageStyle } = useParallax({ intensity: 0.05 });

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 248, 220, 0.7), rgba(255, 248, 220, 0.7)), url(${haldiBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-yellow-500/15 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-yellow-300/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 bg-yellow-400/20 rounded-full animate-float delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-yellow-500/15 rounded-full animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-yellow-300/25 rounded-full animate-float delay-2500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-yellow-400/20 rounded-full animate-float delay-3000"></div>
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-yellow-500/15 rounded-full animate-float delay-3500"></div>
        <div className="absolute top-1/4 right-1/2 w-7 h-7 bg-yellow-300/25 rounded-full animate-float delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-yellow-400/20 rounded-full animate-float delay-4500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
              <img src={haldiIcon} alt="Haldi" className="w-full h-full object-cover" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-800">
              Haldi Ceremony
            </h2>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Image with Parallax */}
          <div className="lg:col-span-1">
            <div className="relative mb-4 overflow-hidden rounded-2xl" ref={imageRef}>
              <img 
                src={haldiImage} 
                alt="Traditional Haldi Ceremony" 
                className="w-full h-80 object-cover"
                style={imageStyle}
              />
            </div>
          </div>

          {/* Content - Full Height to match image */}
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-soft h-full border border-white/20">
              <h3 className="font-serif text-2xl font-semibold text-yellow-700 mb-6 drop-shadow-sm">
                The Sacred Significance
              </h3>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p className="text-base">
                  The Haldi ceremony is one of the most cherished pre-wedding rituals in Punjabi culture. <strong>Haldi</strong> (turmeric) is considered sacred and auspicious, symbolizing purification, fertility, and protection from evil spirits.
                </p>
                <p className="text-base">
                  During this beautiful ceremony, family members and close friends apply a paste of turmeric, gram flour, oil, and milk to the bride and groom. This ritual is believed to cleanse the body and soul, bringing a natural glow to the skin while invoking blessings for a prosperous married life.
                </p>
                <p className="text-base">
                  The ceremony is filled with laughter, music, and joyful moments as loved ones come together to prepare us for the sacred union ahead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Bubble - Bottom of Section */}
        <div className="mt-16 mb-4">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30">
            <h4 className="font-serif text-xl font-semibold text-yellow-800 mb-4 text-center">Join Us For</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl mb-2">🗓️</div>
                <div className="text-sm font-semibold text-gray-800">Date</div>
                <div className="text-sm text-gray-700">25th October 2025</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm font-semibold text-gray-800">Time</div>
                <div className="text-sm text-gray-700">11:00 AM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-sm font-semibold text-gray-800">Venue</div>
                <div className="text-sm text-gray-700">Roche Harbor, Ramgarh Road</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">👗</div>
                <div className="text-sm font-semibold text-gray-800">Dress Code</div>
                <div className="text-sm text-gray-700">Shades of Yellow (let's shine bright!)</div>
              </div>
            </div>
            <p className="mt-4 italic text-gray-700 text-sm text-center">
              "Let's get messy with haldi and smiles!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HaldiSection;