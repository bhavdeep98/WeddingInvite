import haldiIcon from "@/assets/haldi-icon.jpg";
import mehandiIcon from "@/assets/mehandi-icon.jpg";
import weddingIcon from "@/assets/wedding-icon.jpg";
import haldiBackground from "@/assets/haldi-ceremony.jpg";
import mehandiBackground from "@/assets/mehandi-ceremony.jpg";
import weddingBackground from "@/assets/wedding-ceremony.jpg";

const EventsIntro = () => {
  return (
    <section id="events" className="py-20 relative overflow-hidden">
      {/* Diagonal Split Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* First diagonal section - Haldi */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${haldiBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(0 0, 33.33% 0, 66.66% 100%, 0 100%)',
            transform: 'skew(-6deg)',
            transformOrigin: 'left center',
          }}
        />
        
        {/* Second diagonal section - Mehandi */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${mehandiBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(33.33% 0, 66.66% 0, 100% 100%, 66.66% 100%)',
            transform: 'skew(6deg)',
            transformOrigin: 'center center',
          }}
        />
        
        {/* Third diagonal section - Wedding */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${weddingBackground})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(66.66% 0, 100% 0, 100% 100%, 66.66% 100%)',
            transform: 'skew(-6deg)',
            transformOrigin: 'right center',
          }}
        />
        
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-8 h-8 bg-yellow-400/20 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-6 h-6 bg-red-500/15 rounded-full animate-float delay-500"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-green-300/25 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-7 h-7 bg-yellow-400/20 rounded-full animate-float delay-1500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-9 h-9 bg-red-500/15 rounded-full animate-float delay-2000"></div>
        <div className="absolute bottom-20 left-20 w-5 h-5 bg-green-300/25 rounded-full animate-float delay-2500"></div>
        <div className="absolute bottom-1/4 right-1/4 w-8 h-8 bg-yellow-400/20 rounded-full animate-float delay-3000"></div>
        <div className="absolute top-3/4 left-1/2 w-6 h-6 bg-red-500/15 rounded-full animate-float delay-3500"></div>
        <div className="absolute top-1/4 right-1/2 w-7 h-7 bg-green-300/25 rounded-full animate-float delay-4000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-yellow-400/20 rounded-full animate-float delay-4500"></div>
        <div className="absolute top-1/6 left-1/6 w-7 h-7 bg-red-400/20 rounded-full animate-float delay-5000"></div>
        <div className="absolute bottom-1/6 right-1/6 w-6 h-6 bg-green-300/25 rounded-full animate-float delay-5500"></div>
        <div className="absolute top-2/3 left-1/5 w-8 h-8 bg-yellow-500/15 rounded-full animate-float delay-6000"></div>
        <div className="absolute bottom-2/3 right-1/5 w-6 h-6 bg-red-400/20 rounded-full animate-float delay-6500"></div>
        <div className="absolute top-1/5 left-2/3 w-7 h-7 bg-green-400/20 rounded-full animate-float delay-7000"></div>
        <div className="absolute bottom-1/5 right-2/3 w-8 h-8 bg-yellow-300/25 rounded-full animate-float delay-7500"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
            Understanding Our Sacred Traditions
          </h2>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-soft mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Our Punjabi wedding is a beautiful tapestry of time-honored traditions, each ceremony carrying deep spiritual and cultural significance. These rituals have been passed down through generations, connecting us to our roots while celebrating the beginning of our new life together.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Each celebration is not just a ceremony, but a meaningful journey that brings families together, invokes blessings from the divine, and creates memories that will last a lifetime. We invite you to be part of this sacred journey with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-soft border border-yellow-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img src={haldiIcon} alt="Haldi Ceremony" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-yellow-800">Haldi Ceremony</h3>
              <p className="text-yellow-700 text-sm">Purification & Blessings</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-soft border border-orange-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img src={mehandiIcon} alt="Mehandi Ceremony" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-orange-800">Mehandi Ceremony</h3>
              <p className="text-orange-700 text-sm">Beauty & Celebration</p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-xl shadow-soft border border-green-200">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden shadow-lg">
                <img src={weddingIcon} alt="Wedding Ceremony" className="w-full h-full object-cover" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-2 text-green-800">Wedding Ceremony</h3>
              <p className="text-green-700 text-sm">Sacred Union</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsIntro;