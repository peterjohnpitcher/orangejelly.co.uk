'use client';

import { useROICalculator } from '@/contexts/ROICalculatorContext';
import WhatsAppButton from './WhatsAppButton';
import Card from './Card';
import Heading from './Heading';
import Text from './Text';

export default function ROICalculator() {
  const { state, updateState } = useROICalculator();
  const { adminHours, socialMediaHours, menuUpdates, averageSpend } = state;
  
  // Calculations
  const totalHoursSaved = Math.round((adminHours * 0.5) + (socialMediaHours * 0.8) + (menuUpdates * 0.75));
  const hourlyValue = 25; // Conservative estimate of licensee's hourly value
  const moneySaved = totalHoursSaved * hourlyValue;
  const menuRevenue = Math.round(averageSpend * 0.15 * 50); // 15% increase on 50 covers
  const totalBenefit = moneySaved + menuRevenue;
  
  return (
    <Card background="orange-light" padding="large" className="bg-gradient-to-br from-orange/10 to-orange/5 shadow-xl">
      <Heading level={3} align="center" className="mb-6">
        Calculate Your Time & Money Savings
      </Heading>
      
      <div className="space-y-6">
        {/* Admin Hours */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Hours per week on admin tasks (rotas, ordering, emails):
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="20"
              value={adminHours}
              onChange={(e) => updateState({ adminHours: Number(e.target.value) })}
              className="flex-1 accent-orange"
            />
            <span className="font-bold text-lg w-12">{adminHours}h</span>
          </div>
        </div>
        
        {/* Social Media Hours */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Hours per week on social media & marketing:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="15"
              value={socialMediaHours}
              onChange={(e) => updateState({ socialMediaHours: Number(e.target.value) })}
              className="flex-1 accent-orange"
            />
            <span className="font-bold text-lg w-12">{socialMediaHours}h</span>
          </div>
        </div>
        
        {/* Menu Updates */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Hours per month updating menus & descriptions:
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="10"
              value={menuUpdates}
              onChange={(e) => updateState({ menuUpdates: Number(e.target.value) })}
              className="flex-1 accent-orange"
            />
            <span className="font-bold text-lg w-12">{menuUpdates}h</span>
          </div>
        </div>
        
        {/* Average Spend */}
        <div>
          <label className="block text-sm font-semibold mb-2">
            Current average customer spend (£):
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="10"
              max="30"
              value={averageSpend}
              onChange={(e) => updateState({ averageSpend: Number(e.target.value) })}
              className="flex-1 accent-orange"
            />
            <span className="font-bold text-lg w-16">£{averageSpend}</span>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <Card className="mt-8 shadow-inner" padding="medium">
        <Heading level={4} align="center" className="mb-4">Your Potential Savings:</Heading>
        
        <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
          <div>
            <Text size="2xl" weight="bold" className="text-orange">{totalHoursSaved}h</Text>
            <Text size="sm" className="text-charcoal/70">Saved per week</Text>
          </div>
          <div>
            <Text size="2xl" weight="bold" className="text-orange">£{moneySaved}</Text>
            <Text size="sm" className="text-charcoal/70">Time value per week</Text>
          </div>
          <div>
            <Text size="2xl" weight="bold" className="text-orange">£{menuRevenue}</Text>
            <Text size="sm" className="text-charcoal/70">Extra revenue per week</Text>
          </div>
        </div>
        
        <div className="text-center border-t pt-4">
          <Text size="sm" className="text-charcoal/70 mb-2">Total weekly benefit:</Text>
          <Text size="2xl" weight="bold" className="text-orange mb-4">£{totalBenefit}</Text>
          <Text size="xs" className="text-charcoal/60 mb-6">
            That's £{Math.round(totalBenefit * 52 / 1000)}k per year!
          </Text>
          
          <WhatsAppButton
            text={`I want to save ${totalHoursSaved} hours a week - let's chat!`}
            size="medium"
            fullWidth
          />
        </div>
      </Card>
      
      <Text size="xs" align="center" className="mt-4 text-charcoal/60">
        * Based on real results from The Anchor and similar pubs
      </Text>
    </Card>
  );
}