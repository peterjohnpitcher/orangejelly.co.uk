import { getNavigation } from '@/lib/sanity-navigation';
import Navigation from '@/components/navigation';

export default async function NavigationWrapper() {
  const navigation = await getNavigation();
  
  return <Navigation navigation={navigation} />;
}