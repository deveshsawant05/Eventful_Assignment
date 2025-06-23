import { OnboardingForm } from '@/components/onboard/OnboardingForm';

export const metadata = {
  title: 'Join as an Artist - Artistly',
  description: 'Join our platform as a performing artist. Create your profile and start receiving booking requests from event organizers.',
};

export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Join Artistly as a Performer
            </h1>
            <p className="text-muted-foreground">
              Create your artist profile and start receiving booking requests
            </p>
          </div>
          <OnboardingForm />
        </div>
      </div>
    </div>
  );
}