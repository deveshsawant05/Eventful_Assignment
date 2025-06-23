import { Shield, Clock, Award, Heart } from 'lucide-react';

const stats = [
  {
    id: 1,
    name: 'Verified Artists',
    value: '500+',
    description: 'All artists are background-checked and verified for quality assurance',
    icon: Shield,
  },
  {
    id: 2,
    name: 'Quick Response',
    value: '24hrs',
    description: 'Average response time from artists to your booking requests',
    icon: Clock,
  },
  {
    id: 3,
    name: 'Success Rate',
    value: '98%',
    description: 'Of events are successfully completed with satisfied clients',
    icon: Award,
  },
  {
    id: 4,
    name: 'Happy Customers',
    value: '10k+',
    description: 'Event organizers trust us for their entertainment needs',
    icon: Heart,
  },
];

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900 via-blue-900 to-purple-800 dark:from-purple-950 dark:via-blue-950 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose Artistly?
          </h2>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            We're committed to connecting you with the best performers while ensuring 
            a seamless booking experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6 backdrop-blur-sm">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-xl font-semibold text-purple-200 mb-3">
                  {stat.name}
                </div>
                <p className="text-purple-100 text-sm leading-relaxed">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}