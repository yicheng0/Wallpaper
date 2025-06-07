'use client';

import { PricingCard } from '@/components/pricing-card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';

const pricingData = {
  monthly: [
    {
      title: 'Free',
      description: 'Perfect for first-time users',
      price: 0,
      features: [
        '3 free generations daily',
        'Standard quality (512x512)',
        'Basic style options',
      ],
      isFree: true,
    },
    {
      title: 'Premium',
      description: 'Best choice for professional creators',
      price: 29,
      features: [
        '7-day free trial',
        'Unlimited generations',
        '4K ultra-high resolution',
        '50+ professional styles',
        'Private generations',
        'Commercial license',
      ],
      recommended: true,
    },
  ],
  yearly: [
    {
      title: 'Free',
      description: 'Perfect for first-time users',
      price: 0,
      features: [
        '3 free generations daily',
        'Standard quality (512x512)',
        'Basic style options',
      ],
      isFree: true,
    },
    {
      title: 'Premium',
      description: 'Best choice for professional creators',
      price: 228,
      features: [
        'Unlimited generations',
        '4K ultra-high resolution',
        '50+ professional styles',
        'Private generations',
        'Commercial license',
      ],
      recommended: true,
    },
  ],
};

export function PricingTab() {
  const [isYearly, setIsYearly] = useState(false);

  const handleTabChange = (value: string) => {
    setIsYearly(value === 'yearly');
  };

  const plans = isYearly ? pricingData.yearly : pricingData.monthly;

  return (
    <div className="flex flex-col items-center gap-10">
      <Tabs defaultValue="monthly" onValueChange={handleTabChange} className="w-auto">
        <TabsList className="bg-neutral-800/80 border border-white/10 p-2 rounded-xl">
          <TabsTrigger value="monthly" className="px-6 py-2 text-base rounded-lg data-[state=active]:bg-white data-[state=active]:text-black">Monthly</TabsTrigger>
          <TabsTrigger value="yearly" className="relative px-6 py-2 text-base rounded-lg data-[state=active]:bg-white data-[state=active]:text-black">
            Yearly
            <Badge className="absolute -top-3 -right-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">SAVE 25%</Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 w-full">
        {plans.map((plan, index) => (
          <PricingCard
            key={index}
            title={plan.title}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            recommended={plan.recommended}
            isYearly={isYearly}
            isFree={plan.isFree}
          />
        ))}
      </div>
    </div>
  );
} 