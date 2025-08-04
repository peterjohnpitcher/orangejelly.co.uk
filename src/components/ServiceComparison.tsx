'use client';

import { useState } from 'react';
import WhatsAppButton from './WhatsAppButton';
import Card from './Card';
import { PRICING, MESSAGES, COMPANY } from '@/lib/constants';
import Heading from './Heading';
import Text from './Text';

export default function ServiceComparison() {
  const [selectedService, setSelectedService] = useState('quickwins');

  const services = {
    quickwins: {
      name: '30-Day Quick Wins',
      price: '£62.50/hour',
      timeline: 'One-time',
      perfect: 'Pub owners who want to test AI risk-free',
      includes: [
        'Menu review & rewrite',
        '3 months social media content',
        'Basic email templates',
        'WhatsApp support',
        '30-day money-back guarantee'
      ],
      highlight: true
    },
    marketing: {
      name: 'Marketing Package',
      price: PRICING.services.quickWins.firstMonthsSetup,
      timeline: PRICING.services.quickWins.ongoingDisplay,
      perfect: 'Busy licensees who hate social media',
      includes: [
        'Everything in Quick Wins',
        'Monthly content creation',
        'Event promotion templates',
        'Review response help',
        'Ongoing optimization'
      ],
      highlight: false
    },
    custom: {
      name: 'Custom Support',
      price: PRICING.hourlyRate.display,
      timeline: 'As needed',
      perfect: 'Specific projects or ongoing help',
      includes: [
        'Website updates',
        'Menu seasonal changes',
        'Special event campaigns',
        'Staff training',
        'Whatever you need!'
      ],
      highlight: false
    }
  };

  return (
    <Card variant="shadowed" padding="large">
      {/* Mobile Service Selector */}
      <div className="md:hidden mb-6">
        <label className="block text-sm font-semibold mb-2">Compare Services:</label>
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
          className="w-full p-3 border rounded-lg"
        >
          {Object.entries(services).map(([key, service]) => (
            <option key={key} value={key}>{service.name}</option>
          ))}
        </select>
      </div>

      {/* Desktop Comparison Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-orange/20">
              <th className="text-left py-4"></th>
              {Object.entries(services).map(([key, service]) => (
                <th key={key} className="text-center px-4 py-4">
                  <div className={service.highlight ? 'relative' : ''}>
                    {service.highlight && (
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-orange text-white px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap">
                        MOST POPULAR
                      </div>
                    )}
                    <Heading level={3} className="mb-2">{service.name}</Heading>
                    <Text size="2xl" weight="bold" color="orange">{service.price}</Text>
                    <Text size="sm" className="text-charcoal/60">{service.timeline}</Text>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-4 font-semibold">Perfect for:</td>
              {Object.entries(services).map(([key, service]) => (
                <td key={key} className="px-4 py-4 text-center text-sm">
                  {service.perfect}
                </td>
              ))}
            </tr>
            <tr className="border-b">
              <td className="py-4 font-semibold align-top">What's included:</td>
              {Object.entries(services).map(([key, service]) => (
                <td key={key} className="px-4 py-4">
                  <ul className="space-y-2">
                    {service.includes.map((item, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <span className="text-orange mr-2 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
            <tr>
              <td></td>
              {Object.entries(services).map(([key, service]) => (
                <td key={key} className="px-4 py-6 text-center">
                  <WhatsAppButton
                    text={`I want the ${service.name}`}
                    size="small"
                    variant={service.highlight ? 'primary' : 'secondary'}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Selected Service Display */}
      <div className="md:hidden">
        {Object.entries(services).map(([key, service]) => (
          <div
            key={key}
            className={`${selectedService === key ? 'block' : 'hidden'} ${
              service.highlight ? 'ring-2 ring-orange' : ''
            } rounded-lg p-6`}
          >
            {service.highlight && (
              <div className="bg-orange text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
                MOST POPULAR
              </div>
            )}
            
            <Heading level={3} className="mb-2">{service.name}</Heading>
            <Text size="2xl" weight="bold" color="orange" className="mb-1">{service.price}</Text>
            <Text size="sm" className="text-charcoal/60 mb-4">{service.timeline}</Text>
            
            <div className="mb-6">
              <Text weight="semibold" className="mb-2">Perfect for:</Text>
              <Text className="text-charcoal/80">{service.perfect}</Text>
            </div>
            
            <div className="mb-6">
              <Text weight="semibold" className="mb-2">What's included:</Text>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange mr-2 mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <WhatsAppButton
              text={`I want the ${service.name}`}
              fullWidth
            />
          </div>
        ))}
      </div>

      {/* Bottom comparison note */}
      <Card background="cream" padding="small" className="mt-8 text-center">
        <Text size="sm" className="text-charcoal/80 mb-2">
          <strong>Not sure which to choose?</strong> Most pubs start with the 30-Day Quick Wins 
          to see results fast, then upgrade to monthly support.
        </Text>
        <Text size="xs" className="text-charcoal/60">
          {COMPANY.vatStatus}
        </Text>
      </Card>
    </Card>
  );
}