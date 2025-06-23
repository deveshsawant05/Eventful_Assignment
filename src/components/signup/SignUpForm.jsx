'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // This would typically be an API call to register the user
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Account created!",
        description: "You've successfully created your account.",
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="block text-sm font-medium mb-1.5">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            required
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5">
            Confirm Password
          </Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="flex items-center space-x-2 pt-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the <Link href="#" className="text-primary underline">Terms of Service</Link> and <Link href="#" className="text-primary underline">Privacy Policy</Link>
          </Label>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
        
        <div className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link href="/signin" className="text-primary font-medium hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </Card>
  );
}
