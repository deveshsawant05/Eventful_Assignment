import { SignInForm } from '@/components/signin/SignInForm';

export const metadata = {
  title: 'Sign In - Artistly',
  description: 'Sign in to your Artistly account to manage bookings, update your profile, and connect with event organizers.',
};

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Sign in to your Artistly account</p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
