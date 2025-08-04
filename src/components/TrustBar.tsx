import Grid from '@/components/Grid';
import { PRICING, MESSAGES } from '@/lib/constants';

interface TrustItem {
  value: string;
  label: string;
}

interface TrustBarProps {
  items?: TrustItem[];
}

const defaultItems: TrustItem[] = [
  { value: MESSAGES.trust.coversIncrease, label: MESSAGES.trust.coversIncreaseLabel },
  { value: MESSAGES.trust.costEffective, label: 'AI-powered marketing solutions' },
  { value: MESSAGES.trust.resultsIn14Days, label: 'Guaranteed quick results' }
];

export default function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <section className="bg-orange/10 py-8 relative overflow-hidden">
      {/* Decorative orange shapes with logo influence */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-orange/20 to-transparent rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-orange/20 to-transparent rounded-full translate-x-20 translate-y-20"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <Grid columns={{ default: 1, md: 3 }} gap="medium" className="text-center">
          {items.map((item, index) => (
            <div key={index} className={`animate-fade-in ${index === 1 ? 'animate-fade-in-delay' : index === 2 ? 'animate-fade-in-delay-2' : ''}`}>
              <p className="text-3xl font-bold text-orange mb-1">{item.value}</p>
              <p className="text-charcoal">{item.label}</p>
            </div>
          ))}
        </Grid>
      </div>
    </section>
  );
}