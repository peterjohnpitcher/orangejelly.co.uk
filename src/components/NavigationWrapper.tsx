import Navigation from '@/components/Navigation';
import navigationData from '../../content/data/navigation.json';

// Define local navigation type interface
interface NavigationLink {
  label: string;
  href: string;
  order?: number;
}

interface WhatsAppCta {
  enabled: boolean;
  text: string;
  phoneNumber: string;
  showInDesktop: boolean;
  showInMobile: boolean;
}

interface LocalNavigationType {
  mainMenu: NavigationLink[];
  mobileMenu?: NavigationLink[];
  whatsappCta: WhatsAppCta;
}

export default function NavigationWrapper() {
  // Sort navigation items by order
  const sortedMainMenu = [...navigationData.mainMenu].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );
  const sortedMobileMenu = navigationData.mobileMenu
    ? [...navigationData.mobileMenu].sort((a, b) => (a.order || 0) - (b.order || 0))
    : sortedMainMenu;

  const localNavigation: LocalNavigationType = {
    mainMenu: sortedMainMenu,
    mobileMenu: sortedMobileMenu,
    whatsappCta: navigationData.whatsappCta,
  };

  return <Navigation navigation={localNavigation} />;
}
