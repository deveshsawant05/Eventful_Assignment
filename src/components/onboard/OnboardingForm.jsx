'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
  User,
  Briefcase,
  MapPin,
} from 'lucide-react';
import { categories, languages, locations } from '@/data/artists';
import { useToast } from '@/hooks/use-toast';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  bio: yup.string().required('Bio is required').min(50, 'Bio must be at least 50 characters'),
  category: yup.array().min(1, 'Select at least one category').required(),
  languages: yup.array().min(1, 'Select at least one language').required(),
  feeRange: yup.string().required('Fee range is required'),
  location: yup.string().required('Location is required'),
  phone: yup.string().required('Phone number is required'),
  experience: yup.string().required('Experience is required'),
  website: yup.string().url('Invalid URL format').nullable(),
});

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Professional Details', icon: Briefcase },
  { id: 3, title: 'Location & Contact', icon: MapPin },
];

const feeRanges = [
  '$100 - $300',
  '$300 - $500',
  '$500 - $1,000',
  '$1,000 - $1,500',
  '$1,500 - $2,500',
  '$2,500 - $5,000',
  '$5,000+',
];

export function OnboardingForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      category: [],
      languages: [],
    },
  });

  const watchedCategories = watch('category') || [];
  const watchedLanguages = watch('languages') || [];

  const handleCategoryChange = (categoryName, checked) => {
    const currentCategories = watchedCategories;
    if (checked) {
      setValue('category', [...currentCategories, categoryName]);
    } else {
      setValue('category', currentCategories.filter(c => c !== categoryName));
    }
  };

  const handleLanguageChange = (languageName, checked) => {
    const currentLanguages = watchedLanguages;
    if (checked) {
      setValue('languages', [...currentLanguages, languageName]);
    } else {
      setValue('languages', currentLanguages.filter(l => l !== languageName));
    }
  };

  const nextStep = async () => {
    const fieldsToValidate = getFieldsForStep(currentStep);
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const getFieldsForStep = (step) => {
    switch (step) {
      case 1:
        return ['name', 'email', 'bio'];
      case 2:
        return ['category', 'languages', 'feeRange', 'experience'];
      case 3:
        return ['location', 'phone'];
      default:
        return [];
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Artist application submitted:', data);

      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you within 48 hours.",
      });

      setIsSubmitted(true);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = (currentStep / steps.length) * 100;

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Application Submitted!
          </h2>
          <p className="text-muted-foreground mb-6">
            Thank you for joining Artistly! We'll review your application and get back to you within 48 hours.
          </p>
          <Button 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            onClick={() => window.location.href = '/'}
          >
            Return to Homepage
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <CardTitle className="text-2xl">Artist Application</CardTitle>
          <span className="text-sm text-muted-foreground">Step {currentStep} of {steps.length}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="space-y-4">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-muted-foreground mt-1">{step.title}</span>
                </div>
              );
            })}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                <Label htmlFor="bio" className="block mb-1.5">Bio/Artist Description *</Label>
                <Textarea 
                  id="bio"
                  {...register('bio')}
                  placeholder="Tell us about yourself, your experience, and what makes you unique as a performer..."
                  rows={4}
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum 50 characters</p>
                {errors.bio && (
                  <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="website" className="block mb-1.5">Website/Portfolio (Optional)</Label>
                <Input 
                  id="website"
                  {...register('website')}
                  placeholder="https://your-website.com"
                />
                {errors.website && (
                  <p className="text-sm text-destructive mt-1">{errors.website.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label>Performance Categories *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={category}
                        checked={watchedCategories.includes(category)}
                        onCheckedChange={(checked) => 
                          handleCategoryChange(category, !!checked)
                        }
                      />
                      <Label htmlFor={category} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.category && (
                  <p className="text-sm text-destructive mt-1">{errors.category.message}</p>
                )}
              </div>

              <div>
                <Label>Languages Spoken *</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                  {languages.slice(0, 12).map((language) => (
                    <div key={language} className="flex items-center space-x-2">
                      <Checkbox
                        id={language}
                        checked={watchedLanguages.includes(language)}
                        onCheckedChange={(checked) => 
                          handleLanguageChange(language, !!checked)
                        }
                      />
                      <Label htmlFor={language} className="text-sm cursor-pointer">
                        {language}
                      </Label>
                    </div>
                  ))}
                </div>
                {errors.languages && (
                  <p className="text-sm text-destructive mt-1">{errors.languages.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feeRange" className="block mb-1.5">Fee Range per Event *</Label>
                  <Select onValueChange={(value) => setValue('feeRange', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your fee range" />
                    </SelectTrigger>
                    <SelectContent>
                      {feeRanges.map((range) => (
                        <SelectItem key={range} value={range}>
                          {range}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.feeRange && (
                    <p className="text-sm text-destructive mt-1">{errors.feeRange.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="experience" className="block mb-1.5">Years of Experience *</Label>
                  <Select onValueChange={(value) => setValue('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-1">0-1 years</SelectItem>
                      <SelectItem value="1-3">1-3 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.experience && (
                    <p className="text-sm text-destructive mt-1">{errors.experience.message}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Contact & Location */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="location" className="block mb-1.5">Primary Location *</Label>
                <Select onValueChange={(value) => setValue('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                )}
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

              <div>
                <Label htmlFor="profileImage" className="block mb-1.5">Profile Image (Optional)</Label>
                <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md hover:border-purple-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="flex text-sm text-muted-foreground">
                      <label htmlFor="profileImage" className="relative cursor-pointer rounded-md font-medium text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300">
                        <span>Upload a file</span>
                        <input 
                          id="profileImage" 
                          name="profileImage" 
                          type="file" 
                          className="sr-only"
                          accept="image/*"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}