'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare, Calendar as CalendarIcon, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  eventType: yup.string().required('Event type is required'),
  eventDate: yup.date().required('Event date is required').min(new Date(), 'Event date must be in the future'),
  duration: yup.string().required('Duration is required'),
  location: yup.string().required('Event location is required'),
  guestCount: yup.string().required('Guest count is required'),
  budget: yup.string().required('Budget range is required'),
  message: yup.string().required('Message is required').min(20, 'Please provide more details about your event'),
});


const eventTypes = [
  'Wedding',
  'Corporate Event',
  'Birthday Party',
  'Anniversary',
  'Concert',
  'Festival',
  'Private Party',
  'Charity Event',
  'Other',
];

const durations = [
  '1 hour',
  '2 hours',
  '3 hours',
  '4 hours',
  '5+ hours',
  'Full day',
];

const guestCounts = [
  '1-25 guests',
  '26-50 guests',
  '51-100 guests',
  '101-200 guests',
  '201-500 guests',
  '500+ guests',
];

const budgetRanges = [
  '$100 - $300',
  '$300 - $500',
  '$500 - $1,000',
  '$1,000 - $2,000',
  '$2,000 - $5,000',
  '$5,000+',
];

export function QuoteRequestDialog({ artist, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [eventDate, setEventDate] = useState();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Quote request submitted:', {
        ...data,
        artistId: artist.id,
        artistName: artist.name,
      });
      
      setIsSubmitted(true);
      
      toast({
        title: "Quote Request Sent!",
        description: `Your request has been sent to ${artist.name}. They'll respond within 24 hours.`,
      });
    } catch (error) {
      toast({
        title: "Request Failed",
        description: "There was an error sending your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
      setEventDate(undefined);
    }, 300);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={artist.image}
              alt={artist.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div>Request Quote from {artist.name}</div>
              <div className="text-sm font-normal text-muted-foreground">
                {artist.category.join(', ')} • {artist.location}
              </div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to request a personalized quote for your event.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Quote Request Confirmed!</h3>
            <p className="text-muted-foreground mb-6">
              Your request has been sent to {artist.name}. They typically respond within 24 hours 
              with a personalized quote and availability confirmation.
            </p>
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Expected response time: Within 24 hours</span>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h4 className="font-medium">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">                <div>
                  <Label htmlFor="name" className="block mb-1.5">Full Name *</Label>
                  <Input 
                    id="name"
                    {...register('name')}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                  )}
                </div>
                  <div>
                  <Label htmlFor="email" className="block mb-1.5">Email Address *</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="your@email.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="phone" className="block mb-1.5">Phone Number *</Label>
                <Input 
                  id="phone"
                  {...register('phone')}
                  placeholder="(555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <h4 className="font-medium">Event Details</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventType" className="block mb-1.5">Event Type *</Label>
                  <Select onValueChange={(value) => setValue('eventType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.eventType && (
                    <p className="text-sm text-destructive mt-1">{errors.eventType.message}</p>
                  )}
                </div>

                <div>
                  <Label className="block mb-1.5">Event Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !eventDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {eventDate ? format(eventDate, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={eventDate}
                        onSelect={(date) => {
                          setEventDate(date);
                          setValue('eventDate', date );
                        }}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.eventDate && (
                    <p className="text-sm text-destructive mt-1">{errors.eventDate.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="duration" className="block mb-1.5">Performance Duration *</Label>
                  <Select onValueChange={(value) => setValue('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map((duration) => (
                        <SelectItem key={duration} value={duration}>
                          {duration}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.duration && (
                    <p className="text-sm text-destructive mt-1">{errors.duration.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="guestCount" className="block mb-1.5">Number of Guests *</Label>
                  <Select onValueChange={(value) => setValue('guestCount', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select guest count" />
                    </SelectTrigger>
                    <SelectContent>
                      {guestCounts.map((count) => (
                        <SelectItem key={count} value={count}>
                          {count}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.guestCount && (
                    <p className="text-sm text-destructive mt-1">{errors.guestCount.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="block mb-1.5">Event Location *</Label>
                <Input 
                  id="location"
                  {...register('location')}
                  placeholder="Event venue or address"
                />
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="budget" className="block mb-1.5">Budget Range *</Label>
                <Select onValueChange={(value) => setValue('budget', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.budget && (
                  <p className="text-sm text-destructive mt-1">{errors.budget.message}</p>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <Label htmlFor="message" className="block mb-1.5">Event Details & Special Requests *</Label>
              <Textarea 
                id="message"
                {...register('message')}
                placeholder="Please provide more details about your event, any special requirements, setup needs, or questions you have for the artist..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground mt-1">Minimum 20 characters</p>
              {errors.message && (
                <p className="text-sm text-destructive mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Artist Info */}
            <div className="bg-muted/50 rounded-lg p-4">
              <h5 className="font-medium mb-2">Artist Information</h5>
              <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>Price Range:</strong> ${artist.priceRange.min} - ${artist.priceRange.max} per event</p>
                <p><strong>Categories:</strong> {artist.category.join(', ')}</p>
                <p><strong>Languages:</strong> {artist.languages.join(', ')}</p>
                <p><strong>Rating:</strong> {artist.rating}/5 ({artist.totalBookings} bookings)</p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending Request...
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Quote Request
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}