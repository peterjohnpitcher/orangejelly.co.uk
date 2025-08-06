import { getFooterContent } from '@/lib/sanity-footer';
import FooterSimple from './FooterSimple';

export default async function FooterWrapper() {
  const footerContent = await getFooterContent();
  
  return <FooterSimple footerContent={footerContent} />;
}