import Navigation from './Navigation';
import { getNavigation } from '@/lib/sanity-navigation';

export default async function NavigationWrapper() {
  const navigation = await getNavigation();
  return <Navigation navigation={navigation} />;
}