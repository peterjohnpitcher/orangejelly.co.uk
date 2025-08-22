import FooterSimple from './FooterSimple';

// Import footer data
const footerData = require('../../content/data/footer.json');

export default function FooterWrapper() {
  // Transform the local footer data to the expected format
  const footerContent = {
    services: footerData.links.services.map(service => ({
      title: service.label,
      href: service.href
    })),
    quickLinks: [
      ...footerData.links.resources.map(link => ({
        title: link.label,
        href: link.href,
        external: false
      })),
      ...footerData.links.legal.map(link => ({
        title: link.label,
        href: link.href,
        external: false
      }))
    ],
    contactInfo: {
      phone: footerData.contact.phone,
      email: footerData.contact.email
    },
    bottomBar: {
      copyrightText: footerData.copyright,
      additionalText: "Run by licensees, for licensees"
    }
  };

  return <FooterSimple footerContent={footerContent} />;
}