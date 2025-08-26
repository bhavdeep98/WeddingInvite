import { Button } from "@/components/ui/button";
import newHeroBg from "@/assets/new-hero-bg.jpg";

const HeroSection = () => {
  return (
    <section 
      className="min-h-screen relative flex items-center justify-center bg-gradient-warm overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${newHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-royal opacity-20"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float"></div>
      <div className="absolute bottom-20 right-20 w-16 h-16 bg-secondary/20 rounded-full animate-float delay-1000"></div>
      <div className="absolute top-1/2 right-10 w-12 h-12 bg-accent/20 rounded-full animate-float delay-2000"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Bhavdeep Singh
            <span className="block text-3xl md:text-4xl font-normal mt-2 text-primary-glow">
              &
            </span>
            Ramandeep Kaur
          </h1>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-royal">
            <p className="text-xl md:text-2xl text-white/90 mb-4 font-medium">
              We're super excited to share that the big day is almost here!
            </p>
            <p className="text-lg text-white/80 mb-6">
              And we'd love for you to be a part of all the fun, laughter, and celebrations.
            </p>
            
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-serif font-semibold text-primary-glow mb-2">
                October 25-26, 2025
              </p>
              <p className="text-lg text-white/90">
                Join us for our traditional Punjabi wedding celebrations
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;