import { SignUpForm } from '@/components/signup/SignUpForm';

export const metadata = {
  title: 'Sign Up - Artistly',
  description: 'Create your Artistly account to connect with artists, manage events, and more.',
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">Get Started</h1>
          <p className="text-muted-foreground">Create your Artistly account</p>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
