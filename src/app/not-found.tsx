import Link from 'next/link';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import WhatsAppButton from '@/components/WhatsAppButton';
import Button from '@/components/Button';
import Grid from '@/components/Grid';

export default function NotFound() {
  return (
    <>
      <Hero
        title="Oops! Page Not Found"
        subtitle="Looks like this page went to the cellar and never came back"
        showCTA={false}
      />
      
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xl text-charcoal/80 mb-8">
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you might have typed the wrong URL (happens to the best of us).
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              href="/"
              variant="primary"
              size="medium"
            >
              Back to Homepage
            </Button>
            
            <span className="text-charcoal/40">or</span>
            
            <WhatsAppButton 
              text="Hi Peter, I got a 404 error on your site"
              variant="secondary"
            />
          </div>
          
          <div className="mt-12 p-6 bg-cream rounded-lg">
            <h3 className="font-semibold mb-4">Quick Links:</h3>
            <Grid columns={{ default: 2, sm: 4 }} gap="small" className="text-sm">
              <Link href="/services" className="text-orange hover:underline">Services</Link>
              <Link href="/about" className="text-orange hover:underline">About Us</Link>
              <Link href="/results" className="text-orange hover:underline">Results</Link>
              <Link href="/contact" className="text-orange hover:underline">Contact</Link>
            </Grid>
          </div>
        </div>
      </Section>
    </>
  );
}