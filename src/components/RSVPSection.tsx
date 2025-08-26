import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface RSVPFormData {
  name: string;
  email: string;
  phone: string;
  attendance: 'yes' | 'no' | 'maybe';
  guestCount: string;
  events: string[];
  dietaryRestrictions: string;
  accommodation: 'yes' | 'no' | 'unsure';
  specialRequests: string;
}

const RSVPSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const form = useForm<RSVPFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      attendance: 'yes',
      guestCount: '1',
      events: [],
      dietaryRestrictions: '',
      accommodation: 'no',
      specialRequests: ''
    }
  });

  const watchAttendance = form.watch('attendance');

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/rsvp', {
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
      console.error('Error submitting RSVP:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEventChange = (eventName: string, checked: boolean) => {
    const currentEvents = form.getValues('events');
    if (checked) {
      form.setValue('events', [...currentEvents, eventName]);
    } else {
      form.setValue('events', currentEvents.filter(e => e !== eventName));
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-pink-800 to-red-900 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-float delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-16 h-16 bg-white rounded-full animate-float delay-2000"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white rounded-full animate-float delay-3000"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="animate-fade-in">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-8 drop-shadow-lg">
            RSVP for Our Special Day
          </h2>
          
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8 shadow-xl border border-white/30">
            <p className="text-xl text-white leading-relaxed mb-6 font-medium">
              We're so excited to celebrate with you! Please let us know if you'll be joining us for our wedding festivities.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-serif text-xl font-semibold text-white mb-3 drop-shadow-md">
                  🎉 Haldi Ceremony
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  October 25, 2025<br/>
                  Traditional turmeric ceremony
                </p>
              </div>
              
              <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-serif text-xl font-semibold text-white mb-3 drop-shadow-md">
                  🎨 Mehandi Ceremony
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  October 25, 2025<br/>
                  Beautiful henna designs
                </p>
              </div>
              
              <div className="bg-white/15 rounded-xl p-6 border border-white/20 shadow-lg">
                <h3 className="font-serif text-xl font-semibold text-white mb-3 drop-shadow-md">
                  💍 Wedding Ceremony
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  October 26, 2025<br/>
                  Main wedding celebration
                </p>
              </div>
            </div>
          </div>

          {/* RSVP Form */}
          <div className="bg-white/25 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl mb-8">
            <h3 className="font-serif text-2xl font-semibold text-white mb-6 drop-shadow-lg">
              Please Respond by October 1, 2025
            </h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold drop-shadow-sm">Full Name *</FormLabel>
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

                {/* Attendance */}
                <FormField
                  control={form.control}
                  name="attendance"
                  rules={{ required: "Please select your attendance" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold drop-shadow-sm text-lg">Will you be attending? *</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-3 mt-3"
                        >
                          <div className="flex items-center space-x-3 bg-white/20 p-4 rounded-lg">
                            <RadioGroupItem value="yes" id="yes" className="border-white text-white" />
                            <Label htmlFor="yes" className="text-white font-medium cursor-pointer">
                              Yes, I'll be there! 🎉
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/20 p-4 rounded-lg">
                            <RadioGroupItem value="no" id="no" className="border-white text-white" />
                            <Label htmlFor="no" className="text-white font-medium cursor-pointer">
                              Sorry, I can't make it 😢
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 bg-white/20 p-4 rounded-lg">
                            <RadioGroupItem value="maybe" id="maybe" className="border-white text-white" />
                            <Label htmlFor="maybe" className="text-white font-medium cursor-pointer">
                              I'm not sure yet 🤔
                            </Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage className="text-yellow-200" />
                    </FormItem>
                  )}
                />

                {/* Show additional fields only if attending */}
                {(watchAttendance === 'yes' || watchAttendance === 'maybe') && (
                  <>
                    {/* Guest Count */}
                    <FormField
                      control={form.control}
                      name="guestCount"
                      rules={{ required: "Please select number of guests" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold drop-shadow-sm">Number of Guests (including yourself) *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-white/40 border-white/50 text-gray-900">
                                <SelectValue placeholder="Select number of guests" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1">1 Guest (Just me)</SelectItem>
                              <SelectItem value="2">2 Guests (Me + 1)</SelectItem>
                              <SelectItem value="3">3 Guests (Me + 2)</SelectItem>
                              <SelectItem value="4">4 Guests (Me + 3)</SelectItem>
                              <SelectItem value="5">5 Guests (Me + 4)</SelectItem>
                              <SelectItem value="6+">6+ Guests</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />

                    {/* Events Selection */}
                    <div className="space-y-3">
                      <Label className="text-white font-semibold drop-shadow-sm text-lg">Which events will you attend? *</Label>
                      <div className="grid gap-3">
                        {[
                          { id: 'haldi', name: 'Haldi Ceremony (Oct 25)' },
                          { id: 'mehandi', name: 'Mehandi Ceremony (Oct 25)' },
                          { id: 'wedding', name: 'Wedding Ceremony (Oct 26)' }
                        ].map((event) => (
                          <div key={event.id} className="flex items-center space-x-3 bg-white/20 p-4 rounded-lg">
                            <input
                              type="checkbox"
                              id={event.id}
                              onChange={(e) => handleEventChange(event.id, e.target.checked)}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <Label htmlFor={event.id} className="text-white font-medium cursor-pointer">
                              {event.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Dietary Restrictions */}
                    <FormField
                      control={form.control}
                      name="dietaryRestrictions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold drop-shadow-sm">Dietary Restrictions or Allergies</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Please let us know about any dietary restrictions, allergies, or food preferences..."
                              className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium min-h-[80px]"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />

                    {/* Accommodation */}
                    <FormField
                      control={form.control}
                      name="accommodation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold drop-shadow-sm">Do you need help with accommodation?</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-2 mt-2"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="yes" id="acc-yes" className="border-white text-white" />
                                <Label htmlFor="acc-yes" className="text-white">Yes, please help me find accommodation</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="no" id="acc-no" className="border-white text-white" />
                                <Label htmlFor="acc-no" className="text-white">No, I have my accommodation sorted</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="unsure" id="acc-unsure" className="border-white text-white" />
                                <Label htmlFor="acc-unsure" className="text-white">I'm not sure yet</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />

                    {/* Special Requests */}
                    <FormField
                      control={form.control}
                      name="specialRequests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-semibold drop-shadow-sm">Special Requests or Messages</FormLabel>
                          <FormControl>
                            <Textarea 
                              {...field} 
                              placeholder="Any special requests, accessibility needs, or a message for the couple..."
                              className="bg-white/40 border-white/50 text-gray-900 placeholder:text-gray-600 font-medium min-h-[80px]"
                            />
                          </FormControl>
                          <FormMessage className="text-yellow-200" />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3 text-lg"
                >
                  {isSubmitting ? 'Submitting RSVP...' : 'Submit RSVP'}
                </Button>
                
                {submitStatus === 'success' && (
                  <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4 text-green-200">
                    Thank you for your RSVP! We're so excited to celebrate with you. We'll be in touch with more details soon!
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="bg-red-500/20 border border-red-400/30 rounded-lg p-4 text-red-200">
                    Sorry, there was an error submitting your RSVP. Please try again or contact us directly.
                  </div>
                )}
              </form>
            </Form>
          </div>

          <div className="space-y-6 bg-white/15 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl">
            <p className="text-xl text-white font-medium">
              Looking forward to celebrating with you!
            </p>
            
            <div className="font-serif text-3xl text-white drop-shadow-lg">
              With love and excitement,<br/>
              <span className="text-yellow-300 font-bold">Bhavdeep & Ramandeep</span>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/30">
            <p className="text-white text-lg font-medium drop-shadow-md">
              "Sarbat Da Bhala" - May everyone prosper and be blessed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;
