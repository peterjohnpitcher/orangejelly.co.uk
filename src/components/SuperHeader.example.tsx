// Example usage of the SuperHeader component

import SuperHeader from './SuperHeader';

// Basic usage with default problem categories and quick links
export function BasicSuperHeader() {
  return <SuperHeader />;
}

// With a simple announcement
export function SuperHeaderWithAnnouncement() {
  return (
    <SuperHeader 
      announcement={{
        id: 'new-feature',
        message: 'New: AI-powered menu optimization now available!',
        ctaText: 'Learn More',
        ctaLink: '/services#menu',
        dismissible: true
      }}
    />
  );
}

// With custom colors for announcement
export function SuperHeaderCustomColors() {
  return (
    <SuperHeader 
      announcement={{
        id: 'urgent-notice',
        message: '⚠️ Limited spots available for January consultations',
        ctaText: 'Book Now',
        ctaLink: '/contact',
        bgColor: 'bg-red-600',
        textColor: 'text-white',
        dismissible: false
      }}
    />
  );
}

// With custom problem categories
export function SuperHeaderCustomCategories() {
  const customCategories = [
    {
      emoji: '🍺',
      title: 'Beer Sales',
      href: '/services/beer-sales',
      description: 'Boost your beer revenue'
    },
    {
      emoji: '🍔',
      title: 'Food Menu',
      href: '/services/food-menu',
      description: 'Optimize your menu'
    },
    {
      emoji: '🎉',
      title: 'Events',
      href: '/services/events',
      description: 'Pack your pub with events'
    }
  ];

  return (
    <SuperHeader 
      problemCategories={customCategories}
      announcement={{
        id: 'summer-2025',
        message: '☀️ Summer marketing packages now available',
        dismissible: true
      }}
    />
  );
}

// With custom quick links
export function SuperHeaderCustomLinks() {
  const customLinks = [
    { label: 'Book Demo', href: '/demo' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Blog', href: '/blog' }
  ];

  return (
    <SuperHeader 
      quickLinks={customLinks}
      hideOnScroll={false} // Keep visible while scrolling
    />
  );
}

// Full example with all options
export function SuperHeaderComplete() {
  return (
    <SuperHeader 
      announcement={{
        id: 'black-friday-2025',
        message: '🎯 Black Friday Special: 3 months free with annual plan!',
        ctaText: 'Get Deal',
        ctaLink: '/black-friday',
        bgColor: 'bg-gradient-to-r from-orange to-orange-dark',
        textColor: 'text-white',
        dismissible: true
      }}
      problemCategories={[
        {
          emoji: '💰',
          title: 'Increase Revenue',
          href: '/increase-revenue',
          description: 'Proven tactics for more profit'
        },
        {
          emoji: '👥',
          title: 'Build Community',
          href: '/community',
          description: 'Turn customers into regulars'
        },
        {
          emoji: '📱',
          title: 'Digital Presence',
          href: '/digital',
          description: 'Be found online'
        },
        {
          emoji: '🎯',
          title: 'Marketing Strategy',
          href: '/strategy',
          description: 'Targeted local marketing'
        }
      ]}
      quickLinks={[
        { label: 'Get Started', href: '/get-started' },
        { label: 'Free Resources', href: '/resources' },
        { label: 'Contact Peter', href: '/contact' }
      ]}
      hideOnScroll={true}
    />
  );
}