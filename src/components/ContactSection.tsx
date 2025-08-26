import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<ContactFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: ''
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Send to your local backend server (proxied through Vite)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-royal relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white rounded-full animate-float delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-black mb-8 drop-shadow-lg">
            Can't Wait to Celebrate With You!
          </h2>
          
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl border border-white/30">
            <p className="text-xl text-black leading-relaxed mb-6 font-medium">
              Your presence will make our special day even more meaningful. We're excited to share these beautiful traditions with you and create memories that will last a lifetime.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-serif text-xl font-semibold text-black mb-3 drop-shadow-md">
                  Need Directions?
                </h3>
                <p className="text-black text-base leading-relaxed">
                  We'll be happy to help you find the venues. Feel free to reach out to us for detailed directions and any special arrangements.
                </p>
              </div>
              
              <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-serif text-xl font-semibold text-black mb-3 drop-shadow-md">
                  Questions About Traditions?
                </h3>
                <p className="text-black text-base leading-relaxed">
                  If you'd like to know more about any of our ceremonies or need guidance on dress codes, we're here to help make you feel comfortable.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/25 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
            <h3 className="font-serif text-2xl font-semibold text-white mb-6 drop-shadow-lg">
              Get in Touch
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold drop-shadow-sm">Name *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Your full name"
                            className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-yellow-200" />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold drop-shadow-sm">Email *</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium"
                          />
                        </FormControl>
                        <FormMessage className="text-yellow-200" />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: "Phone number is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold drop-shadow-sm">Phone Number *</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="+1 (555) 123-4567"
                          className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium"
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  rules={{ required: "Message is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold drop-shadow-sm">Message *</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Tell us about your plans, questions, or any special requirements..."
                          className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 text-lg"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-green-200">
                    Thank you! Your message has been sent successfully. We'll get back to you soon!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-200">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </Form>
          </div>

          <div className="space-y-6 bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
            <p className="text-xl text-black font-medium">
              Looking forward to celebrating with you!
            </p>
            
            <div className="font-serif text-3xl text-black drop-shadow-lg">
              With love and excitement,<br/>
              <span className="text-red-600 font-bold">Bhavdeep & Ramandeep</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/30">
            <p className="text-black text-lg font-medium drop-shadow-md">
              "Sarbat Da Bhala" - May everyone prosper and be blessed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;