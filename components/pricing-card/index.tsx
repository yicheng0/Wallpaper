import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface PricingCardProps {
  description: string;
  features: string[];
  price: number;
  title: string;
  isYearly: boolean;
  recommended?: boolean;
  isFree?: boolean;
}

export function PricingCard({
  description,
  features,
  price,
  title,
  isYearly,
  recommended,
  isFree,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative flex flex-col bg-neutral-900/70 border border-white/10 rounded-2xl overflow-hidden',
        {
          'border-purple-500 shadow-2xl shadow-purple-500/40': recommended,
        }
      )}
    >
      {recommended && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="px-4 py-1.5 text-xs font-semibold tracking-wider text-white uppercase bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            Recommended
          </div>
        </div>
      )}
      <CardHeader className="pt-10">
        <CardTitle className="text-3xl font-bold text-white">{title}</CardTitle>
        <CardDescription className="text-neutral-400">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="mb-8 text-7xl font-bold text-white">
          {isFree ? (
            '$0'
          ) : (
            <>
              ${price}
              <span className="text-lg font-normal text-neutral-400">
                {isYearly ? '/year' : '/month'}
              </span>
            </>
          )}
        </p>
        <ul className="space-y-4">
          {features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <Check className="h-6 w-6 text-purple-400" />
              <span className="text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          size="lg"
          className={cn('w-full text-lg font-bold rounded-lg', {
            'bg-white text-black hover:bg-neutral-200': recommended,
            'bg-neutral-800/80 hover:bg-neutral-700/80 text-white': !recommended,
          })}
        >
          {isFree ? 'Start for Free' : 'Upgrade to Premium'}
        </Button>
      </CardFooter>
    </Card>
  );
} 