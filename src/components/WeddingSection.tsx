import weddingImage from "@/assets/ChatGPT Image Aug 24, 2025 at 07_50_36 PM.png";
import weddingIcon from "@/assets/wedding-icon.jpg";
import joinusImage from "@/assets/joinus.jpg";
import weddingBackground from "@/assets/Laavan.png";
import { useParallax } from "@/hooks/use-parallax";

const WeddingSection = () => {
  const { elementRef: imageRef, style: imageStyle } = useParallax({ intensity: 0.05 });

  return (
    <section 
      className="py-20 relative overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(240, 255, 240, 0.7), rgba(240, 255, 240, 0.7)), url(${weddingBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backdropFilter: 'blur(2px)',
      }}
    >
      {/* Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-green-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-green-500/15 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-green-300/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 bg-green-400/20 rounded-full animate-float delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-green-500/15 rounded-full animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-green-300/25 rounded-full animate-float delay-2500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-green-400/20 rounded-full animate-float delay-3000"></div>
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-green-500/15 rounded-full animate-float delay-3500"></div>
        <div className="absolute top-1/4 right-1/2 w-7 h-7 bg-green-300/25 rounded-full animate-float delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-green-400/20 rounded-full animate-float delay-4500"></div>
        <div className="absolute top-1/6 left-1/6 w-7 h-7 bg-green-400/20 rounded-full animate-float delay-5000"></div>
        <div className="absolute bottom-1/6 right-1/6 w-6 h-6 bg-green-300/25 rounded-full animate-float delay-5500"></div>
        <div className="absolute top-2/3 left-1/5 w-8 h-8 bg-green-500/15 rounded-full animate-float delay-6000"></div>
        <div className="absolute bottom-2/3 right-1/5 w-6 h-6 bg-green-400/20 rounded-full animate-float delay-6500"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-lg">
              <img src={weddingIcon} alt="Anand Karaj" className="w-full h-full object-cover" />
            </div>
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-green-800">
                Anand Karaj
              </h2>
              <p className="text-green-700 text-lg italic">The Blissful Union</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Main Image with Parallax */}
          <div className="lg:col-span-1">
            <div className="relative mb-4 overflow-hidden rounded-2xl" ref={imageRef}>
              <img 
                src={weddingImage} 
                alt="Traditional Anand Karaj Ceremony" 
                className="w-full h-80 object-cover"
                style={imageStyle}
              />
            </div>
          </div>

          {/* Content - Full Height to match image */}
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-soft h-full border border-white/20">
              <h3 className="font-serif text-2xl font-semibold text-green-700 mb-6 drop-shadow-sm">
                The Joyful Ceremonial Occasion
              </h3>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p className="text-base">
                  <strong>Anand Karaj</strong>, literally meaning "joyful ceremonial occasion," is the sacred Sikh marriage ceremony. For Sikhs, the married state is the norm and the ideal; through it come the best opportunities for serving God's purpose and the well-being of humanity.
                </p>
                <p className="text-base">
                  The ceremony centers around the <strong>four Laavan</strong> (wedding hymns) written by Guru Ram Das Ji, where the couple circumambulates the Guru Granth Sahib four times. Each round represents a stage of spiritual development in their journey toward divine union.
                </p>
                <p className="text-base">
                  This sacred ceremony emphasizes that marriage affords the best means of fulfillment of individuality and attainment of bliss. It is a spiritual partnership where both souls unite to walk together on the path toward divine realization.
                </p>
                <p className="text-base text-sm italic">
                  <em>Source: <a href="https://www.thesikhencyclopedia.com/anand-karaj/" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800 underline">The Sikh Encyclopedia - Anand Karaj</a></em>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Join Us Bubble - Bottom of Section */}
        <div className="mt-16 mb-4">
          <div className="bg-white/15 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/30">
            <h4 className="font-serif text-xl font-semibold text-green-800 mb-4 text-center">Join Us For Anand Karaj</h4>
            <div className="grid md:grid-cols-4 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl mb-2">🗓️</div>
                <div className="text-sm font-semibold text-gray-800">Date</div>
                <div className="text-sm text-gray-700">26th October 2025</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">⏰</div>
                <div className="text-sm font-semibold text-gray-800">Time</div>
                <div className="text-sm text-gray-700">10:00 AM</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">📍</div>
                <div className="text-sm font-semibold text-gray-800">Venue</div>
                <div className="text-sm text-gray-700">Gurdwara Sahib, Ramgarh Road</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl mb-2">👗</div>
                <div className="text-sm font-semibold text-gray-800">Dress Code</div>
                <div className="text-sm text-gray-700">Shades of Green</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mt-4 text-center">
              <div className="space-y-2">
                <div className="text-xl mb-2">👨‍💼</div>
                <div className="text-sm font-semibold text-gray-800">Gents</div>
                <div className="text-sm text-gray-700">Green Turban</div>
              </div>
              <div className="space-y-2">
                <div className="text-xl mb-2">👩‍🦱</div>
                <div className="text-sm font-semibold text-gray-800">Ladies</div>
                <div className="text-sm text-gray-700">Green dress</div>
              </div>
            </div>
            <p className="mt-4 italic text-gray-700 text-sm text-center">
              "Let us unite in the presence of the divine and witness the joyful union"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingSection;