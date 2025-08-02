'use client';

import { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';
import Card from './Card';

export default function ROICalculator() {
  const [adminHours, setAdminHours] = useState(10);
  const [socialMediaHours, setSocialMediaHours] = useState(5);
  const [menuUpdates, setMenuUpdates] = useState(2);
  const [averageSpend, setAverageSpend] = useState(15);
  
  // Calculations
  const totalHoursSaved = Math.round((adminHours * 0.5) + (socialMediaHours * 0.8) + (menuUpdates * 0.75));
  const hourlyValue = 25; // Conservative estimate of publican's hourly value
  const moneySaved = totalHoursSaved * hourlyValue;
  const menuRevenue = Math.round(averageSpend * 0.15 * 50); // 15% increase on 50 covers
  const totalBenefit = moneySaved + menuRevenue;
  
  return (
    <Card background="orange-light" padding="large" className="bg-gradient-to-br from-orange/10 to-orange/5 shadow-xl">
      <h3 className="text-2xl font-bold mb-6 text-center">
        Calculate Your Time & Money Savings
      </h3>
      
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
              onChange={(e) => setAdminHours(Number(e.target.value))}
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
              onChange={(e) => setSocialMediaHours(Number(e.target.value))}
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
              onChange={(e) => setMenuUpdates(Number(e.target.value))}
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
              onChange={(e) => setAverageSpend(Number(e.target.value))}
              className="flex-1 accent-orange"
            />
            <span className="font-bold text-lg w-16">£{averageSpend}</span>
          </div>
        </div>
      </div>
      
      {/* Results */}
      <Card className="mt-8 shadow-inner" padding="medium">
        <h4 className="font-bold text-lg mb-4 text-center">Your Potential Savings:</h4>
        
        <div className="grid md:grid-cols-3 gap-4 text-center mb-6">
          <div>
            <p className="text-3xl font-bold text-orange">{totalHoursSaved}h</p>
            <p className="text-sm text-charcoal/70">Saved per week</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange">£{moneySaved}</p>
            <p className="text-sm text-charcoal/70">Time value per week</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange">£{menuRevenue}</p>
            <p className="text-sm text-charcoal/70">Extra revenue per week</p>
          </div>
        </div>
        
        <div className="text-center border-t pt-4">
          <p className="text-sm text-charcoal/70 mb-2">Total weekly benefit:</p>
          <p className="text-4xl font-bold text-orange mb-4">£{totalBenefit}</p>
          <p className="text-xs text-charcoal/60 mb-6">
            That's £{Math.round(totalBenefit * 52 / 1000)}k per year!
          </p>
          
          <WhatsAppButton
            text={`I want to save ${totalHoursSaved} hours a week - let's chat!`}
            size="medium"
            fullWidth
          />
        </div>
      </Card>
      
      <p className="text-xs text-center mt-4 text-charcoal/60">
        * Based on real results from The Anchor and similar pubs
      </p>
    </Card>
  );
}