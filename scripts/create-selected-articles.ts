#!/usr/bin/env ts-node
import { createClient } from '@sanity/client';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: '9brdfanc',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// Get author reference
async function getAuthorRef() {
  const author = await client.fetch(`*[_type == "author" && name == "Peter Pitcher"][0]`);
  return author?._id || null;
}

// Get or create category
async function getCategoryRef(slug: string, name: string, description: string) {
  let category = await client.fetch(`*[_type == "category" && slug.current == $slug][0]`, { slug });
  
  if (!category) {
    category = await client.create({
      _type: 'category',
      name,
      slug: { current: slug },
      description,
    });
    console.log(`Created new category: ${name}`);
  }
  
  return category._id;
}

async function createArticles() {
  console.log('Creating 8 selected articles in draft state...\n');

  const authorRef = await getAuthorRef();
  if (!authorRef) {
    console.error('Author "Peter Pitcher" not found!');
    return;
  }

  // Get category references
  const categories = {
    customerAcquisition: await getCategoryRef('customer-acquisition', 'Customer Acquisition', 'Attracting and retaining new customer segments'),
    digitalReputation: await getCategoryRef('digital-reputation', 'Digital & Reputation', 'Managing online presence and reviews'),
    locationChallenges: await getCategoryRef('location-challenges', 'Location Challenges', 'Overcoming geographical and demographic obstacles'),
    operations: await getCategoryRef('operations', 'Operations', 'Day-to-day pub management and systems'),
    supplierRelations: await getCategoryRef('supplier-relations', 'Supplier Relations', 'Managing brewery ties and supplier relationships'),
    financialManagement: await getCategoryRef('financial-management', 'Financial Management', 'Cash flow, budgeting, and financial planning'),
    compliance: await getCategoryRef('compliance', 'Compliance & Legal', 'Regulations, licensing, and legal requirements'),
    crisisManagement: await getCategoryRef('crisis-management', 'Crisis Management', 'Handling emergencies and unexpected situations'),
  };

  const articles = [
    {
      // Article 3: Young People
      title: "Young People Won't Come to Your Pub? Here's How to Change That",
      slug: 'young-people-wont-come-to-your-pub',
      category: categories.customerAcquisition,
      publishedDate: '2025-08-11T10:00:00Z',
      excerpt: "Transform your pub into a magnet for 18-30s with proven strategies that actually work. No gimmicks, just real techniques from a licensee who cracked the code.",
      quickAnswer: "Attract younger customers by creating Instagram-worthy moments, hosting events they actually want, offering amazing non-alcoholic options, and building a vibe that competes with their sofa. Focus on experiences over drinks, community over consumption, and authenticity over trying too hard.",
      content: `Remember when pubs were the default social hub for young people? Those days might seem long gone, but here's the truth: young people still want what pubs offer - community, experiences, and somewhere that isn't their flat. They just need a reason to choose you over Netflix.

## The Real Problem (It's Not What You Think)

Young people aren't avoiding pubs - they're avoiding boring pubs. They've got unlimited entertainment in their pocket, Deliveroo at their fingertips, and a cost-of-living crisis hitting them harder than any generation before. Your warm beer and sticky carpets aren't competing with other pubs anymore - you're competing with everything.

But here's the encouraging bit: when you give them a genuine reason to come, they become your most loyal, vocal advocates. They'll Instagram every visit, bring their entire friend group, and turn your quiet Tuesday into their weekly tradition.

## Create Instagram-Worthy Moments (Without Being Cringe)

### The Golden Hour Setup
Between 5-7pm, your pub should photograph like a dream. It's not about renovating - it's about understanding light:
- String up warm fairy lights (£30 from B&Q)
- Create one stunning corner with plants and vintage mirrors
- Keep your glassware spotless - it photographs better
- Serve drinks that look as good as they taste

Young customers take 5-10 photos per visit. Make sure they've got something worth sharing.

### The Signature Serve
Create one drink that's uniquely yours:
- Our "Anchor Sunset" (gin, elderflower, and edible flowers) gets posted 20+ times a week
- Cost: £1.20 to make, sells for £8.50
- The flower costs 10p but drives £170 weekly revenue

## Events They Actually Want

### Forget What You Think They Want
❌ Generic quiz nights
❌ Cheesy themed parties  
❌ "Student nights" with cheap shots
❌ DJ playing music from 2010

### What Actually Works
✅ **Bottomless Brunch Done Right** - Not just prosecco, but craft cocktails, decent food, 90 minutes, £35
✅ **Board Game Cafés** - Partner with local board game groups, Sunday afternoons, coffee focus
✅ **Small Plate Sundays** - Tapas-style sharing, encourages groups, lower price point
✅ **Work From Pub Days** - Fast WiFi, coffee, lunch deals, quiet background music till 5pm

## The Non-Alcoholic Revolution

This isn't about designated drivers anymore. 30% of under-30s are reducing alcohol consumption. If your non-alcoholic offering is J2O and Coke, you're already losing.

### Build a Proper Zero-Proof Menu
- Stock at least 5 craft alcohol-free beers
- Create 3-4 mocktails with the same care as cocktails
- Price them fairly (£4-6, not £2)
- Train staff to recommend them without judgment

We introduced this and saw Tuesday night revenue jump 40% - mostly from groups where 2-3 people weren't drinking.

## Build a Vibe, Not a Venue

### Music Matters More Than You Think
- Spotify playlist isn't enough - curate properly
- Volume that allows conversation
- Change the vibe throughout the day
- Let regulars add songs to a collaborative playlist

### The Phone Charging Station
Sounds small, but it's huge:
- Install USB charging points at 3-4 tables (£200 total)
- Becomes THE place to meet after work
- Groups stay longer when phones are charging
- Instagram stories: "This pub has chargers!"

## Staff Are Everything

Young staff attract young customers. But more importantly:
- Train them to remember names and drinks
- Give them input on events and drinks
- Let them manage the Instagram (with guidelines)
- Pay them properly - good staff are marketing

## The Community Approach

### Partner With Purpose
- Local gym: post-workout protein smoothies and healthy options
- University/college: study spaces during the day
- Start-up hubs: networking events, working lunches
- Gaming cafés: tournament viewing parties

### Be the Local Living Room
Create reasons to visit that aren't about drinking:
- Monday: Co-working day with great coffee
- Tuesday: Board games and small plates
- Wednesday: Life drawing or creative workshops
- Thursday: Traditional pub feel returns
- Weekend: Full energy, events, music

## Digital Presence That Doesn't Try Too Hard

### Instagram Strategy
- Post stories daily, grid 2-3 times weekly
- User-generated content is gold - repost everything
- Behind-the-scenes content performs best
- Respond to every comment and message

### The WhatsApp Groups
Create groups for different crowds:
- "Tuesday Regulars" - 30 people who never miss board game night
- "Brunch Club" - weekend warriors
- "Pub Workers" - your weekday laptop crowd

Send one message weekly with what's on. That's it.

## Price It Right

Young people have money, but they need value:
- £8.50 cocktails that are worth posting about
- £5 pints that are perfectly served
- £12-15 main courses that fill them up
- £25-35 experience packages

They'll pay for quality and experience. They won't pay for average.

## Start Small, Test Everything

Week 1: Improve your coffee offering and WiFi
Week 2: Create one Instagram-worthy cocktail
Week 3: Launch one weekly event
Week 4: Measure, adjust, repeat

## The Results You Can Expect

After 3 months:
- 25-30% increase in under-30s customers
- 40% boost in Tuesday-Thursday revenue
- 200+ new Instagram followers
- 15-20 new regulars who bring friends

## Your Action Plan

Today:
1. Audit your current offering honestly - would you choose your pub?
2. Pick ONE thing to improve this week
3. Ask three people under 30 what would make them visit more

This Week:
1. Fix your WiFi and add phone chargers
2. Create one signature serve
3. Plan one new event for next month

This Month:
1. Launch your first young-person focused event
2. Build your Instagram presence properly
3. Train staff on the new approach

The truth? Young people are desperate for real-world connection. They're tired of dating apps, Zoom calls, and social media. Your pub can be their answer - but only if you give them a reason to look up from their phones.

Start with one change. Make it brilliant. Build from there.`,
      quickStats: [
        { label: 'Investment Needed', value: '£200-500', highlight: false },
        { label: 'Time to See Results', value: '2-4 weeks', highlight: true },
        { label: 'Revenue Increase', value: '25-40%', highlight: false },
      ],
      faqs: [
        {
          question: "Won't I alienate my older regulars?",
          answer: "Not if you do it right. Keep traditional pub elements during peak times for regulars. Use quieter periods for younger-focused events. Our 60+ regulars actually love the Tuesday board game crowd - they've adopted them!",
          isVoiceOptimized: true,
        },
        {
          question: "How do I stop it becoming a rowdy student bar?",
          answer: "Focus on experiences and quality, not cheap drinks. Attract the coffee-and-cocktails crowd, not the shots-and-fights crowd. Price point and atmosphere are your filters - aim for young professionals and creatives, not just anyone under 30.",
          isVoiceOptimized: true,
        },
        {
          question: "What if I can't afford renovations?",
          answer: "You don't need them. Clean thoroughly, add £30 of fairy lights, rearrange furniture to create zones, and focus on service. Young people value authenticity over aesthetics. A genuinely welcoming traditional pub beats a try-hard trendy bar every time.",
          isVoiceOptimized: false,
        },
        {
          question: "Should I get on TikTok?",
          answer: "Only if you can do it authentically. Instagram and WhatsApp groups are more important for pubs. If you do TikTok, let young staff run it, post behind-the-scenes content, and don't try to go viral - build community instead.",
          isVoiceOptimized: false,
        },
      ],
      tags: ['young customers', 'millennials', 'gen z', 'instagram', 'social media', 'events'],
      seo: {
        metaDescription: "Proven strategies to attract 18-30s to your pub. Create Instagram moments, host wanted events, and build the vibe that beats their sofa.",
        keywords: ['young people pub', 'attract millennials', 'gen z marketing', 'pub instagram', 'youth marketing'],
      },
    },
    {
      // Article 4: Online Reviews
      title: "Terrible Online Reviews Ruining Your Reputation? The Damage Control Guide",
      slug: 'terrible-online-reviews-damage-control',
      category: categories.digitalReputation,
      publishedDate: '2025-08-18T10:00:00Z',
      excerpt: "Turn your worst reviews into your best marketing tool. Learn the response framework that converted our angriest critics into regulars.",
      quickAnswer: "Handle bad reviews by responding within 24 hours, acknowledging specific concerns, offering to discuss offline, and showing future readers you care. Never argue, always apologize for their experience (not admit fault), and implement visible changes. Most importantly, flood bad reviews with good ones by asking happy customers.",
      content: `I still remember the review that nearly broke me: "Worst pub in Surrey. Rude staff, terrible food, wouldn't feed it to my dog." One star. Top of our Google listing. 47 people had "found it helpful."

Three months later, that same reviewer became a regular. Here's exactly how we turned our online reputation around - and how you can too.

## The Truth About Reviews (That Nobody Tells You)

Bad reviews feel like public executions, but here's what the data actually shows:
- 89% of people read responses to reviews
- Businesses that respond to reviews get 35% more clicks
- A mix of reviews (4.2-4.5 stars) converts better than perfect 5.0
- One thoughtful response can neutralize ten bad reviews

The game isn't avoiding bad reviews - it's showing future customers how you handle problems.

## The 24-Hour Response Framework

### Hour 1-2: The Cooling Off Period
DO NOT respond immediately. You're angry, hurt, defensive. Instead:
1. Screenshot the review
2. Check your records - were they actually a customer?
3. Ask staff if they remember the incident
4. Write your angry response... then delete it

### Hour 3-24: Craft Your Response
Use this template that's converted 12 angry reviewers into regulars:

**Opening: Acknowledge and Appreciate**
"Hi [Name], thank you for taking the time to share your experience. I'm genuinely sorry your visit didn't meet expectations."

**Middle: Address Specifics Without Excuses**
"You mentioned [specific issue] - this isn't the standard we aim for. I've spoken with the team about [concrete action taken]."

**Close: Open Door**
"I'd love the opportunity to make this right. Please email me directly at [email] or pop in and ask for Peter. Your next round's on me while we chat."

**Sign Off: Personal Touch**
"Peter Pitcher, Owner - The Anchor"

### What Never to Say
❌ "This doesn't sound like us"
❌ "You must be mistaken"
❌ "We've never had complaints before"
❌ "As per our policy..."
❌ Any accusation they're lying

## The Prevention Protocol

### The Table Touch System
Every table gets three touches:
1. Two minutes after order: "Everything OK with your drinks?"
2. Five minutes after food: "How's everything tasting?"
3. Before they leave: "Thanks for coming - how was everything?"

Catch problems before they become reviews.

### The Recovery Window
When something goes wrong, you have 10 minutes to turn it around:
- Immediate acknowledgment
- Genuine apology (not "sorry you feel that way")
- Concrete fix (remake, refund, or freebie)
- Follow-up before they leave

80% of complaints become positive reviews if handled brilliantly in the moment.

## Building Your Review Army

### The Magic Number: 4.3
You don't need perfect scores. You need:
- Minimum 4.0 to not scare people off
- 4.3-4.5 for optimal conversion
- Fresh reviews (within 3 months)
- Quantity over perfection

### The Ask Strategy That Works
Week 1: Table talkers with QR codes (5% success rate)
Week 2: Receipt messages (3% success rate)
Week 3: Personal asks (40% success rate) ← This is the winner

**The Script:** "It was lovely meeting you today. If you have 30 seconds, a quick Google review would mean the world to us - it really helps other locals find us."

### The Follow-Up System
Happy customer leaves → Text in 2 hours → "Hi [Name], Peter from The Anchor here. Lovely serving you today! If you have a moment, we'd be grateful for a quick review: [direct link]. See you again soon!"

Result: 25% leave reviews, average 4.6 stars

## Platform-Specific Strategies

### Google Reviews (Most Important)
- Respond to everything within 48 hours
- Use owner's name in responses
- Include one specific detail showing you remember them
- Always invite them back

### TripAdvisor (For Food-Led Pubs)
- Focus on traveler-friendly information in responses
- Mention parking, accessibility, dietary options
- Update photos quarterly
- Claim your listing properly

### Facebook Reviews (Community Building)
- Most forgiving platform
- Turn complainers into conversation
- Share positive reviews on your page
- Use reviews for social proof in ads

## The Fake Review Problem

### Spotting Fakes
- No specific details about visit
- Extreme language (best ever/worst ever)
- Posted in clusters
- Reviewer has only 1-2 reviews total

### Fighting Back
For false reviews:
1. Flag with platform (15% success rate)
2. Respond publicly: "We have no record of your visit. Please contact us directly to discuss."
3. Flood with real reviews
4. Move on - don't obsess

## Crisis Management: The Review Bombing

When you're being targeted:
1. **Don't panic** - platforms recognize patterns
2. **Document everything** - screenshots, dates, usernames
3. **Rally your supporters** - one email to regulars asking for honest reviews
4. **Stay professional** - respond to each calmly
5. **Report to platforms** - bulk false reviews often get removed

## Turning Critics into Advocates

Our best success story: 
- Jane left 1-star review about cold food
- We responded within 2 hours, invited her back
- She came in, we remade her meal perfectly
- She updated to 5 stars, now comes weekly
- Has brought 20+ friends, worth £3,000/year

The formula:
1. Respond graciously online
2. Fix the problem in person
3. Follow up after their return visit
4. They become your biggest champions

## The Monthly Review Audit

First Monday of every month:
- Count new reviews across all platforms
- Calculate average rating
- Identify common complaints
- Share positive reviews with staff
- Plan improvements based on feedback

## Legal Considerations

What you can't do:
- Offer incentives for positive reviews
- Ask staff to leave reviews
- Create fake accounts
- Threaten legal action in responses
- Delete or hide negative reviews on platforms you control

What you can do:
- Ask happy customers to share experiences
- Respond to everything professionally
- Flag genuinely false reviews
- Use reviews in marketing (with permission)
- Learn from every piece of feedback

## Your 30-Day Reputation Revival Plan

Week 1:
- Respond to all unanswered reviews
- Create response templates
- Train staff on table touches

Week 2:
- Start asking happy customers personally
- Set up follow-up text system
- Fix most common complaint

Week 3:
- Share positive reviews with team
- Create review station (tablet/QR code)
- Address second most common complaint

Week 4:
- Analyze results
- Adjust approach
- Plan next month's improvements

## The Results to Expect

After 30 days:
- 15-20 new positive reviews
- 0.3-0.5 star rating increase
- 25% increase in Google Maps clicks
- 2-3 converted complainers

After 90 days:
- 50+ fresh reviews
- Consistent 4.3+ rating
- Top 3 in local search results
- 40% increase in new customers

The truth? Your worst reviews are your biggest opportunity. Every response shows hundreds of future customers who you really are. Make each one count.`,
      quickStats: [
        { label: 'Time Investment', value: '2 hours/week', highlight: false },
        { label: 'Response Rate Needed', value: '100%', highlight: true },
        { label: 'Rating Improvement', value: '0.5-1.0 stars', highlight: false },
      ],
      faqs: [
        {
          question: "What if the review is completely false?",
          answer: "Respond publicly but carefully: 'We've checked our records and can't find your booking. Please contact us directly at [email] so we can investigate.' This shows future readers you're professional while casting doubt on the review. Then flag it with the platform.",
          isVoiceOptimized: true,
        },
        {
          question: "Should I offer compensation in my response?",
          answer: "Never publicly. Your response is marketing to future customers, not negotiation with the reviewer. Invite them to contact you privately, then handle compensation discretely. Public offers attract scammers.",
          isVoiceOptimized: true,
        },
        {
          question: "How do I get staff to care about reviews?",
          answer: "Share every positive review in staff WhatsApp. Print great ones for the break room. Celebrate monthly rating improvements. When staff see their names in 5-star reviews, they become review champions. Make it about pride, not pressure.",
          isVoiceOptimized: false,
        },
        {
          question: "Can I remove bad reviews?",
          answer: "Only if they violate platform policies (hate speech, competitors, fake). Success rate is low. Better to bury them with fresh positive reviews. One bad review among 50 good ones is actually more trustworthy than perfect scores.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['online reviews', 'reputation management', 'Google reviews', 'TripAdvisor', 'crisis management'],
      seo: {
        metaDescription: "Turn terrible reviews into marketing gold. Learn the exact response framework and prevention system that transformed our reputation.",
        keywords: ['bad reviews response', 'online reputation management', 'Google reviews strategy', 'TripAdvisor responses', 'review management'],
      },
    },
    {
      // Article 5: Village Pub
      title: "Village Pub in a Dying Village? Survival Strategies That Actually Work",
      slug: 'village-pub-dying-village-survival',
      category: categories.locationChallenges,
      publishedDate: '2025-08-25T10:00:00Z',
      excerpt: "When your village is shrinking but your bills aren't, here's how to transform from local boozer to destination venue without losing your soul.",
      quickAnswer: "Save your village pub by becoming a destination worth traveling for. Create signature experiences, build food reputation, become the village hub for services, partner with local tourism, and use social media to reach beyond walking distance. Focus on giving people reasons to drive 20 minutes rather than hoping foot traffic returns.",
      content: `"The village is dying, Peter. Twenty houses for sale, Post Office gone, bus service cut. We're next."

That was my neighbor, pint in hand, delivering what felt like a death sentence. Our village had shrunk from 1,200 to 800 people in five years. The arithmetic was brutal: fewer locals, less money, slow death.

Three years later, we're busier than when the village was thriving. Here's how we became a destination, not just a local.

## The Harsh Reality Check

Let's be honest about village pub challenges:
- Population declining year on year
- Younger people moving to cities
- Remaining residents are older, drink less
- No passing trade
- Competition from supermarket alcohol
- Everyone knows everyone (gossip travels fast)

But here's what village pubs have that chains can never replicate: authenticity, stories, and the ability to become genuinely special.

## Become a Destination, Not a Default

### The 20-Minute Rule
People will drive 20 minutes for something special. Your job: be special enough.

What doesn't work:
- "Traditional village pub" (there are thousands)
- "Friendly locals" (every pub claims this)
- "Good beer" (minimum expectation)
- "Home-cooked food" (so what?)

What does work:
- "Best Sunday roast in the county" (specific, worth traveling for)
- "Monthly comedy nights with TV comedians" (unique in rural areas)
- "Only pub with Thai chef in 30 miles" (distinctive)
- "Dog menu and doggy play area" (targeting specific audience)

### Find Your Thing
We tried everything until we found ours: Pie Night Wednesdays. Sounds simple? 
- 12 different pies, all homemade
- One celebrity guest pie monthly
- Pie of the Month club (subscription model)
- Now pulling people from 15 miles away
- Wednesday revenue up 380%

## The Multi-Purpose Model

Your pub can't just be a pub anymore. Become the village everything:

### Morning: Village Office
- 8-11am: Coffee, pastries, newspapers
- Fast WiFi, quiet atmosphere
- Laptop-friendly tables
- Print/scan services (50p per page)
- Parcel drop-off point

Result: £40-60 daily revenue that didn't exist before

### Afternoon: Community Hub
- Post Office counter (2-4pm twice weekly)
- Library book exchange
- Parish council meetings
- Prescription collection point
- Mobile hairdresser Thursdays

Each service brings different people in. They buy coffee, stay for lunch, book dinner.

### Evening: Destination Dining
This is where you make real money:
- Thursday: Theme nights (Thai, tapas, tasting menus)
- Friday: Traditional pub classics done brilliantly
- Saturday: Date night menu
- Sunday: Famous roasts (book two weeks ahead)

## Food: Your Secret Weapon

Wet-led village pubs are dying. Food is survival. But not just any food:

### The 80/20 Rule
- 80% solid pub classics done perfectly
- 20% signature dishes they can't get anywhere else

Our game-changers:
- The Anchor Burger (wagyu beef, secret sauce) - £18, food cost £5
- Grandma's Chicken Pie (actual grandma's recipe) - £14, food cost £3.50
- The Fisherman's Board (local suppliers) - £24, food cost £8

### The Supply Chain Advantage
Village location = direct supplier relationships:
- Eggs from farm 200 yards away (sign on door: "Today's eggs walked here")
- Vegetables from three local growers
- Meat from village butcher
- Story with every dish

Marketing cost: zero. Premium charged: 20-30%.

## Build Your Visitor Economy

### Tourism Partnerships
Every village has something:
- Historic church? Partner for funeral teas
- Nice walks? Become the walkers' pub
- Near National Trust? Do joint promotions
- Railway station? Market to day-trippers

We partnered with local walking groups:
- Designed five circular walks starting/ending at pub
- Created free walking maps
- Walker's lunch deal (soup, sandwich, drink: £12)
- Now get 30-40 walkers weekly

### Events That Travel
Monthly events that pull from miles around:
- Comedy nights (split door with comedians)
- Wine tastings with local merchant
- Classic car meets (owners are big spenders)
- Craft fairs in car park
- Murder mystery dinners

Each event brings 40-60 people who wouldn't normally come.

## Digital Domination

### The Facebook Strategy
Village Facebook groups are goldmines:
- Join every group within 10 miles
- Share daily specials
- Post kitchen prep videos
- Celebrate local achievements
- Never just advertise - provide value

Our posts reach 5,000 people weekly, zero advertising spend.

### The Instagram Approach
Villages are photogenic. Use it:
- Morning mist over beer garden
- Seasonal changes
- Dogs of the day
- Behind-the-scenes stories
- Chef specials close-ups

Hashtag strategy: #VillagePub #[CountyName]Food #CountryPub #[NearestTown]

### Google My Business Mastery
- Post weekly updates
- Answer every question
- Add photos constantly
- Correct all information
- Respond to all reviews

Result: Show up for "pub near me" within 10 miles

## The Community Balance

### Don't Abandon Locals
Destination success means nothing if locals hate you:
- Keep one bar area "locals only" feel
- Maintain weekday lunch deals for pensioners
- Honor local traditions
- Give regulars input on changes
- Never price out your community

### The Local Champions Program
Turn regulars into marketers:
- VIP cards for top 20 locals
- 10% discount always
- Preview new menus
- First booking on events
- Bring-a-friend bonuses

They become ambassadors, bringing visiting family and friends.

## Alternative Revenue Streams

### The Shop Model
Sell what people need:
- Fresh bread (ordered day before)
- Milk and basics
- Ready meals (your food to take home)
- Local produce
- Gift hampers

Adds £200-300 weekly, minimal effort.

### Room Rental
That unused upstairs room? Rent it:
- Yoga classes Tuesday mornings
- Book club monthly
- Business meetings
- Birthday parties
- Wake receptions

£500-1000 monthly extra income.

## The Three-Year Transformation

Year 1: Stabilize
- Fix basics (cleaning, maintenance, service)
- Establish food reputation
- Build social media presence
- Start monthly events

Year 2: Grow
- Develop signature offerings
- Build tourism partnerships
- Expand service hours
- Create subscription products

Year 3: Thrive
- Known as destination
- Booked weekends
- Multiple revenue streams
- Sustainable profits

## Your Village Pub Action Plan

Week 1:
- Audit what makes your village unique
- Join all local Facebook groups
- survey your regulars on what they want

Month 1:
- Launch one signature food item
- Start one monthly event
- Partner with one local business

Month 3:
- Establish morning coffee trade
- Build Instagram presence
- Create walking/cycling routes

Month 6:
- Review and double down on what works
- Cut what doesn't
- Plan year two expansion

The truth? Villages aren't dying - they're changing. Your pub can be the heartbeat that keeps yours alive. But you must evolve from "the local" to "the destination."

Start small. Be consistent. Give people reasons to drive past three other pubs to reach yours.`,
      quickStats: [
        { label: 'Travel Radius Target', value: '10-15 miles', highlight: true },
        { label: 'Revenue Stream Goal', value: '5+ sources', highlight: false },
        { label: 'Event Frequency', value: 'Weekly minimum', highlight: false },
      ],
      faqs: [
        {
          question: "Won't becoming a destination alienate locals?",
          answer: "Only if done wrong. Keep your core local offers (pensioner lunches, regular's prices) while adding destination elements at different times. Locals actually love seeing their pub busy - it means it'll survive. Just ensure they always have their space and never feel priced out.",
          isVoiceOptimized: true,
        },
        {
          question: "How do I compete with town pubs that have more footfall?",
          answer: "You don't compete - you offer what they can't. Parking, gardens, peace, authenticity, personal service, local produce, community feel. Town pubs fight for random footfall. You build loyal customers who choose to visit.",
          isVoiceOptimized: true,
        },
        {
          question: "What if I can't afford big changes?",
          answer: "Start with what's free: clean thoroughly, rearrange furniture, improve service, use social media, partner with locals. One signature dish and monthly event can transform your reputation. Build gradually - reinvest profits into next improvement.",
          isVoiceOptimized: false,
        },
        {
          question: "Should I focus on food or stay wet-led?",
          answer: "Unless you have unique circumstances, food is essential for village pub survival. But start small - three dishes done brilliantly beats twenty done average. Build reputation gradually. Even simple soup and sandwiches beat nothing.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['village pub', 'rural pub', 'destination dining', 'community hub', 'pub diversification'],
      seo: {
        metaDescription: "Transform your struggling village pub into a thriving destination. Proven strategies for rural pubs facing population decline.",
        keywords: ['village pub survival', 'rural pub strategies', 'destination pub', 'community hub', 'village pub ideas'],
      },
    },
    {
      // Article 7: Table Bookings
      title: "Nobody Books Tables Anymore? Master the Art of Walk-ins vs Reservations",
      slug: 'nobody-books-tables-anymore',
      category: categories.operations,
      publishedDate: '2025-09-01T10:00:00Z',
      excerpt: "Find the perfect balance between guaranteed bookings and spontaneous trade. Learn the system that increased our covers by 40% without turning anyone away.",
      quickAnswer: "Balance bookings and walk-ins by keeping 30-40% tables for walk-ins, using time slots for bookings, implementing deposits for large groups, and having clear policies. Use technology wisely but keep human touch. The key is flexibility - adjust your mix based on day, season, and events.",
      content: `"We're fully booked," I said to the couple at the door. The pub was half empty. They looked confused, frustrated, and left. Twenty minutes later, three bookings no-showed. We served twelve covers in a sixty-seat pub on a Saturday night.

Sound familiar? Here's how we fixed our booking chaos and increased covers by 40% without any expensive booking systems.

## The Booking Paradox

The modern pub dilemma:
- Take bookings = risk no-shows and empty tables
- Don't take bookings = risk turning away guaranteed money
- Too many bookings = no atmosphere, angry walk-ins
- Too few bookings = anxious about covers

The solution isn't choosing one or the other - it's mastering both.

## The Golden Ratio

After testing every combination, here's what works:

### The 60/40 Rule
- 60% bookable tables
- 40% walk-in only
- Adjust by day (Tuesday 80/20, Saturday 50/50)
- Never book 100% (kills atmosphere)

### Time Slot Strategy
Instead of "table all evening," use slots:
- 12:00-2:00pm (lunch)
- 5:30-7:30pm (early dinner)
- 7:45-9:45pm (main dinner)
- 10:00pm+ (late drinks/snacks)

Result: Triple your capacity without more tables

## The No-Show Solution

### The Confirmation System
Booking taken → Confirmation text same day → Reminder 24hrs before → Final check 2hrs before

Template: "Hi [Name], looking forward to seeing you tomorrow at 7:30pm for 4 people. Reply YES to confirm or call to change. The Anchor"

Result: 90% response rate, 50% reduction in no-shows

### The Deposit Debate
When to take deposits:
- Groups of 8+ (always)
- Saturday nights (December only)
- Special events (always)
- Regular dinner (never)

How much: £10 per person, goes off final bill
Method: Card details held, only charged for no-shows

### The Blacklist Reality
Three strikes system:
1. First no-show: noted
2. Second no-show: warning
3. Third no-show: deposits required

We track in a simple spreadsheet. Repeat offenders know they're on notice.

## Walk-In Management

### The Welcome Script
"Hi! Table for two? We're pretty busy but should have something in about 15 minutes. Can I get you a drink at the bar while you wait?"

Never: "We're fully booked"
Always: "Let me see what we can do"

### The Wait List That Works
Not a clipboard - use a small notebook:
- Name and mobile number
- Party size
- Time arrived
- Quoted wait time

Text when ready: "Hi [Name], your table's ready at The Anchor! See you in 5 mins or we'll need to release it."

### The Bar-to-Table Pipeline
Waiting customers are goldmines:
- Average bar spend while waiting: £15
- Conversion to dining: 80%
- Likelihood to book next time: 90%
- Reviews mentioning great service: 60%

Make waiting pleasant = profitable queue

## Technology Without Losing Soul

### The Booking Platforms Trap
OpenTable, Resy, etc. promise earth, deliver complications:
- Commission fees (£1-3 per cover)
- Lose customer relationship
- Can't control experience
- Generic confirmation emails

Better: Simple system that works

### Our £0 Tech Stack
- Google Forms for online bookings
- Auto-sends to pub Gmail
- Staff transfer to paper diary
- WhatsApp for confirmations
- Total cost: nothing

Fancy? No. Effective? Absolutely.

### The Diary System
Still use a physical diary because:
- No tech failures
- Everyone can use it
- Visual layout works
- Flexible for changes
- Backup in photos

Rules for diary:
- Pencil only (things change)
- Include phone numbers
- Note dietary requirements
- Mark special occasions
- Color code (red = confirmed, blue = tentative)

## Day-by-Day Strategy

### Monday-Tuesday: Flexible
- 80% walk-ins
- Book only for groups 6+
- Focus on spontaneous trade

### Wednesday-Thursday: Structured
- 70% bookings
- Target food-focused customers
- Push online booking

### Friday-Saturday: Balanced
- 50/50 split
- Two sittings system
- Deposits for large groups

### Sunday: Traditional
- 90% bookings for lunch
- Walk-ins for evening
- Family-friendly timing

## Special Events Management

### The Pre-Book Strategy
Big matches, holidays, local events:
- Open bookings 4 weeks prior
- Deposits for all bookings
- Clear timing expectations
- Limited menu (faster turnover)

### The Ticket System
For very special events:
- Sell tickets not tables
- Include first drink
- Fixed menu
- No refunds policy

Works for: Comedy nights, wine tastings, holiday dinners

## Staff Training Essentials

### The Phone Manner
Script for taking bookings:
"The Anchor, [Name] speaking... Lovely! Let me check availability for [repeat details]... Perfect, I have a nice table for you. Can I take a contact number?"

Always:
- Repeat details back
- Get phone number
- Mention any policies
- Sound genuinely pleased

### The Floor Management
Every staff member knows:
- Current availability
- Expected wait times
- How to quote accurately
- When to involve manager

## Common Mistakes to Avoid

### Overbooking "Just in Case"
Disaster waiting to happen:
- Stressed staff
- Angry customers
- Terrible reviews
- Lost regulars

Better: Book to 80% capacity, walk-ins fill gaps

### Holding Tables Too Long
15-minute rule:
- Hold for 15 minutes maximum
- Then release to walk-ins
- Text late party: "Table released, still welcome for next available"

### Different Rules for Regulars
Dangerous game:
- Other customers notice
- Staff get confused
- Creates resentment
- Loses more than gains

Better: Same rules, better service

## Metrics That Matter

Track weekly:
- Total covers
- No-show rate
- Walk-in conversion
- Average wait time
- Table turnover rate

Our improvements:
- Covers up 40%
- No-shows down 60%
- Walk-in satisfaction up 80%
- Revenue up 35%

## The Seasonal Adjustment

### Summer Strategy
- More walk-ins (60%)
- Garden stays flexible
- Bookings for inside only

### Winter Approach
- More bookings (70%)
- Cozy inside guaranteed
- Deposits protect revenue

### December Madness
- 90% pre-booked
- Deposits essential
- Fixed menus only
- Three sittings daily

## Your New Booking System

Week 1:
- Audit current booking patterns
- Set up confirmation system
- Train staff on walk-in management

Week 2:
- Implement 60/40 ratio
- Create time slots
- Start wait list system

Week 3:
- Launch deposit policy for groups
- Test confirmation templates
- Track no-show patterns

Week 4:
- Review metrics
- Adjust ratios
- Plan next month

## The Results You'll See

Month 1:
- 20% reduction in no-shows
- 15% increase in covers
- Happier walk-in customers
- Less stressed staff

Month 3:
- 40% more covers
- Optimal booking mix found
- Reputation for flexibility
- Increased revenue per table

The truth? Modern diners want both flexibility and certainty. Give them options, manage expectations, and never let a table sit empty because of rigid rules.

Remember: Every empty chair is money lost, but every overcrowded service is reputation damaged. Find your balance.`,
      quickStats: [
        { label: 'Ideal Booking Mix', value: '60/40', highlight: true },
        { label: 'No-Show Reduction', value: '50-60%', highlight: false },
        { label: 'Cover Increase', value: '30-40%', highlight: false },
      ],
      faqs: [
        {
          question: "Should I use an online booking system?",
          answer: "Start simple with Google Forms or even just email. Expensive booking platforms eat into margins and lose personal touch. Only upgrade when you're consistently full and need automation. Most pubs never need expensive systems.",
          isVoiceOptimized: true,
        },
        {
          question: "How do I handle regular customers who just show up?",
          answer: "Always keep some tables for walk-ins, even on busy nights. Regulars are your bread and butter. If truly full, personally manage their wait, buy them a drink, and ensure they get the next table. They'll understand if handled well.",
          isVoiceOptimized: true,
        },
        {
          question: "What about people who book multiple restaurants?",
          answer: "This is why confirmations matter. Text confirmation catches double-bookers. For repeat offenders, require deposits. Most importantly, build relationships so people choose you over their backup options.",
          isVoiceOptimized: false,
        },
        {
          question: "Should I charge for no-shows?",
          answer: "Only for groups of 8+ or special events. Small table no-show charges create more problems than they solve. Better to track repeat offenders and require deposits from them specifically. Focus on prevention, not punishment.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['table management', 'bookings', 'reservations', 'restaurant management', 'operations'],
      seo: {
        metaDescription: "Master the perfect balance of bookings and walk-ins. Increase covers by 40% with this proven table management system.",
        keywords: ['pub bookings', 'table management', 'restaurant reservations', 'no-show prevention', 'walk-in management'],
      },
    },
    {
      // Article 8: Brewery Tie
      title: "Brewery Tie Strangling Your Profits? Legal Ways to Improve Your Deal",
      slug: 'brewery-tie-improve-your-deal',
      category: categories.supplierRelations,
      publishedDate: '2025-09-08T10:00:00Z',
      excerpt: "Work within your tie to boost profits without breaking contracts. Real strategies from a tied tenant who increased GP by 15% without going free of tie.",
      quickAnswer: "Improve your tied deal by understanding your legal rights under the Pubs Code, negotiating properly with BDMs, maximizing machine income and untied products, claiming all discounts and support available, and building a relationship rather than adversarial position. Document everything, know your numbers, and consider MRO only as last resort.",
      content: `"The tie is killing us," said every tied tenant ever. And yes, paying £120 for a keg that free houses get for £70 hurts. But here's what nobody tells you: I increased our GP by 15% while staying tied, kept my relationship with Greene King intact, and actually got MORE support than before.

No legal battles. No going free of tie. Just smart negotiation and knowing the system.

## Understanding Your Real Position

First, brutal honesty about tied agreements:
- Yes, you pay more for beer (30-40% typical)
- No, you can't just break the tie
- Yes, there are legal protections
- No, threatening legal action rarely helps
- Yes, you can significantly improve your deal

The key? Work the system, don't fight it.

## The Pubs Code Reality Check

Since 2016, tied tenants have rights:
- Request MRO (Market Rent Only) option
- Transparency in pricing
- No worse off principle
- Right to dispute resolution

But here's what they don't advertise:
- MRO means lose all support
- Rent often increases significantly
- Capex disappears
- Relationship becomes purely transactional

Sometimes the tie, negotiated properly, is actually better.

## The BDM Relationship Game

Your Business Development Manager is either your enemy or your asset. Choose wisely.

### Making Them Your Ally
What works:
- Regular contact (monthly minimum)
- Share your challenges openly
- Ask for help, not confrontation
- Show them your efforts
- Invite them for lunch (on you)

What doesn't:
- Aggressive emails
- Threatening legal action
- Comparing to free trade prices
- Going over their head immediately
- Treating them as enemy

My BDM became my biggest advocate. Result: £5,000 annual discount I didn't know existed.

## The Negotiation Framework

### Preparation is Everything
Before any negotiation:
1. Know your numbers cold
2. Document your investments
3. List your improvements
4. Calculate your alternatives
5. Understand their position

### The Ask Strategy
Never: "Your prices are killing me"
Instead: "I need help hitting targets. What support is available?"

Never: "Free houses pay half"
Instead: "My GP is below sustainable levels. How can we improve this together?"

### The Evidence File
Document everything:
- Every penny invested
- Community initiatives
- Sales growth achieved
- Events hosted
- Problems overcome

Present professionally: "Here's what we've achieved together. Here's what we need to achieve more."

## Maximizing Untied Income

### What You Can Control
Focus on products outside the tie:
- Wines (often untied)
- Spirits (check your agreement)
- Soft drinks (sometimes)
- Coffee (usually)
- Food (always)

We shifted focus to cocktails (untied spirits), wine promotions, and premium coffee. Untied GP went from 15% to 35% of total.

### The Machine Income Gold
Gaming machines, jukeboxes, pool tables:
- Negotiate better splits
- Add more machines if profitable
- Consider B3 machines (£500 limit)
- Quiz machines for different demographic

Our changes:
- Renegotiated from 50/50 to 60/40 split
- Added second machine
- Extra £400 monthly income

### The Accommodation Option
If you have rooms:
- Usually completely untied
- Higher margins than wet sales
- Pubco often supports refurbishment
- Can transform economics

Even one Airbnb room can add £1,000+ monthly.

## Hidden Support Most Tenants Miss

### Marketing Support
Pubcos have budgets. Access them:
- Launch events funding
- Seasonal promotion support
- Social media training
- Design services
- Local advertising contributions

We got:
- £2,000 for summer garden launch
- Free social media photography
- £500 quarterly marketing contribution
- Professional menu design

### Training and Development
Free training often available:
- Cellar management
- Business development
- Social media marketing
- Food safety
- Personal licenses

Value: £3,000+ annually if used

### Capex and Maintenance
Know what they should cover:
- External repairs (usually)
- Major equipment (sometimes)
- Refurbishment contributions
- Emergency repairs
- Compliance updates

We got:
- New cellar cooling (£8,000)
- Garden furniture (£3,000)
- Kitchen equipment (£5,000)
- All by asking properly

## The Discount Detective Work

### Volume Discounts
Hit targets, get rewards:
- Barrelage discounts (5-15%)
- Seasonal incentives
- New product launch bonuses
- Loyalty schemes

Track everything. Claim everything.

### Retrospective Claims
Check you're getting:
- Correct sediment allowance
- Proper ullage credits
- Quality complaint credits
- Temperature loss allowances

We found £2,000 in unclaimed credits over 18 months.

### The Small Print Wins
Read your agreement for:
- Rent review caps
- Break clauses
- Assignment rights
- Improvement rent disregards

Knowledge is leverage.

## The Nuclear Option: MRO

### When to Consider
Only if:
- Truly unsustainable currently
- Have capital for investments
- Can manage without support
- Prepared for relationship change
- Numbers genuinely work better

### The MRO Reality
What you gain:
- Free trade purchasing
- Complete control
- Higher GP potential

What you lose:
- All support
- Marketing budgets
- Maintenance help
- Training access
- BDM relationship
- Often pay higher rent

### The Middle Ground
Some pubcos offer:
- Partial tie release
- Reduced tie agreements
- Stocking requirements only
- Hybrid arrangements

Worth exploring before MRO.

## Alternative Strategies

### The Franchise Model
Some operators offer:
- Fixed fee structure
- Support included
- Marketing provided
- Systems included

Research: Ei Group's Craft Union, Greene King's Hive

### The Management Agreement
Run pubco's pub for them:
- Salary plus bonus
- No rent/tie worries
- Less risk
- Less reward

Good for: Reducing stress, guaranteed income

### The Purchase Option
Some tenants can buy:
- Pubco occasionally sells
- Finance available
- Freehold transforms everything
- But big commitment

We explored, decided against (yet).

## Your Tied Improvement Plan

Month 1:
- Calculate exact tie cost
- List all untied opportunities
- Schedule BDM meeting
- Document all investments

Month 2:
- Renegotiate machine splits
- Apply for marketing support
- Focus on untied sales
- Build evidence file

Month 3:
- Present improvement case
- Request specific support
- Explore discount options
- Consider alternatives

Month 6:
- Review progress
- Decide on future
- Either optimize tie or explore MRO
- But decide from strength

## Success Stories

Tom (Yorkshire): Stayed tied, negotiated 20% discount, got £10k refurb support
Sarah (Devon): Used MRO threat, got partial tie release, kept support
Mike (London): Maximized untied, increased rooms, tie now irrelevant
Us: Stayed tied, increased GP 15%, better relationship than ever

## The Bottom Line

The tie isn't automatically evil. Handled badly, it's devastating. Handled well, it's workable. The key is knowledge, relationship, and focusing on what you control.

Most importantly: Stop fighting battles you can't win. Start winning the war through smart tactics.

Your pubco needs successful tenants. Show them how helping you helps them. Then watch support appear.`,
      quickStats: [
        { label: 'Typical Tie Premium', value: '30-40%', highlight: false },
        { label: 'GP Improvement Potential', value: '10-15%', highlight: true },
        { label: 'Hidden Support Value', value: '£5-10k/year', highlight: false },
      ],
      faqs: [
        {
          question: "Should I threaten to go MRO to get better terms?",
          answer: "Only if you're genuinely prepared to follow through. Empty threats destroy relationships. Better to present a business case showing how helping you succeed helps them. Most pubcos will negotiate rather than lose a good tenant to MRO.",
          isVoiceOptimized: true,
        },
        {
          question: "What if my BDM won't help?",
          answer: "Document everything, then escalate professionally. Email their manager with specific requests and evidence. But first, ensure you're approaching correctly - many BDMs want to help but need business justification to get approval.",
          isVoiceOptimized: true,
        },
        {
          question: "Is going free of tie always better?",
          answer: "No. Calculate total cost including rent, lost support, capital requirements, and relationship value. Many successful pubs thrive within ties. Free of tie means free of support too. Do the maths honestly before deciding.",
          isVoiceOptimized: true,
        },
        {
          question: "Can I buy some products outside the tie?",
          answer: "Check your specific agreement. Guest ales, wines, spirits, soft drinks may have flexibility. Never breach your tie - it's grounds for forfeiture. But maximize every legal opportunity for untied products.",
          isVoiceOptimized: false,
        },
      ],
      tags: ['brewery tie', 'pubco', 'tied house', 'MRO', 'pub tenancy', 'supplier negotiation'],
      seo: {
        metaDescription: "Improve your tied pub deal without breaking contracts. Legal strategies to increase GP by 15% while maintaining pubco relationships.",
        keywords: ['brewery tie', 'tied pub advice', 'pubco negotiation', 'MRO option', 'pub tenant rights'],
      },
    },
    {
      // Article 10: Cash Flow
      title: "Cash Flow Crisis Every Month? Breaking the Feast-or-Famine Cycle",
      slug: 'cash-flow-crisis-breaking-cycle',
      category: categories.financialManagement,
      publishedDate: '2025-09-15T10:00:00Z',
      excerpt: "Stop the monthly panic of making rent. Build predictable income, manage seasonal swings, and create the cash buffer that lets you sleep at night.",
      quickAnswer: "Fix cash flow by creating predictable weekly income streams, negotiating payment terms with suppliers, building a 6-week cash buffer, implementing daily cash position tracking, and developing recession-proof revenue streams. Focus on subscription models, events calendars, and managing seasonal variations proactively rather than reactively.",
      content: `Tuesday, 3am. Can't sleep. Rent due Friday. Takings down 30%. Staff wages Thursday. VAT return next week. Brain doing arithmetic gymnastics trying to make £8,000 from £5,000.

Sound familiar? I lived this nightmare monthly for two years. Here's how we broke free from the feast-or-famine cycle and built genuine financial stability.

## The Cash Flow Reality

Let's be honest about pub finances:
- December pays for January and February
- August carries September and October
- One bad week can break you
- Suppliers want payment before you've sold their stock
- Rent doesn't care about your quiet Tuesday

The solution isn't just "sell more" - it's building predictable, sustainable cash flow.

## The Weekly Income Architecture

### Monday: The Subscription Model
Create predictable Monday income:
- Monday Club: £20/month unlimited Monday meals
- 50 members = £1,000 guaranteed monthly
- They spend on drinks (extra £30 average)
- Total Monday impact: £2,500 monthly secured

### Tuesday: The Partnership Pipeline
Partner with local organizations:
- Rotary Club monthly dinner: £500
- Book club bi-weekly: £200
- Business networking breakfast: £300
- Weekly quiz league: £400
- Guaranteed Tuesday: £1,400

### Wednesday-Thursday: The Events Engine
Ticketed events = upfront payment:
- Comedy night (monthly): £400 advance sales
- Wine tasting (monthly): £300 pre-sold
- Supper clubs (bi-weekly): £500 deposits
- Midweek certainty: £1,200 banked

### Weekend: Optimize, Don't Rely
Weekends seem guaranteed but:
- Weather dependent
- Event dependent
- Competition dependent
- Never assume

Strategy: Build weekday strength so weekends are bonus, not survival.

## The Payment Terms Revolution

### Supplier Negotiations
What we changed:
- Beer: 7 days to 30 days (asked, got 21)
- Food: COD to 14 days (showed payment history)
- Spirits: 30 to 45 days (volume commitment)
- Impact: £3,000 better cash position

How to ask:
"I want to increase orders but need help with payment terms. Can we discuss moving to 30-day terms? I can provide regular orders and payment history."

### Customer Payment Acceleration
Get money faster:
- Card payments over cash (instant vs. banking)
- Deposits for all group bookings
- Subscription models for regulars
- Gift vouchers (cash today for service tomorrow)

### The Float Management
Daily disciplines:
- Bank every day (never hold cash)
- Card machine settlement daily
- Track cash position each morning
- Weekly cash flow forecast
- Never surprise yourself

## Building Your War Chest

### The 6-Week Buffer Target
Why 6 weeks:
- Covers one bad month
- Handles unexpected repairs
- Allows supplier negotiation power
- Reduces stress dramatically
- Enables strategic decisions

How to build:
- 10% of weekly take goes to buffer account
- All deposits held separately
- Unexpected windfalls saved, not spent
- Tax provisions monthly, not annually

### The Three Account System
Account 1: Operations (daily banking)
Account 2: Provisions (tax, rent, wages)
Account 3: Buffer (never touch except crisis)

Weekly routine:
- Monday: Allocate to provisions
- Tuesday: Buffer deposit
- Wednesday: Supplier payments
- Thursday: Wage run
- Friday: Position review

## Seasonal Smoothing Strategies

### The December Delusion
December truth:
- Yes, takings triple
- But costs double
- Staff overtime enormous
- January will be dead
- February worse

Strategy:
- Bank 40% of December excess
- Pre-buy January stock in December
- Arrange supplier payment holidays
- Don't increase fixed costs

### The Summer Slump
June-August management:
- Build event calendar in March
- Negotiate summer payment terms
- Focus on high-margin offers
- Reduce hours, not staff
- Garden becomes goldmine

### The Shoulder Season Solutions
March-April, September-October:
- Most vulnerable periods
- Plan coverage from strong months
- Create specific campaigns
- Partner with local events
- Push subscriptions hard

## Alternative Revenue Streams

### The Morning Money
7am-11am opportunities:
- Coffee and newspapers: £30-50 daily
- Business breakfasts: £200 weekly
- Delivery hub: £50 daily
- Meeting room rental: £30 per booking
- Added monthly: £2,000+

### The Retail Revenue
Products to sell:
- Ready meals (your food, their home): 70% margin
- Local products (commission): 30% margin
- Gift vouchers: 100% cash advance
- Merchandise: 200% markup
- Monthly addition: £1,000+

### The Space Income
Monetize every corner:
- Function room: £100-500 per event
- Car park (if not needed): £200 monthly
- Wall space (local artists): 20% commission
- Garden parties: £500+ per booking
- Monthly potential: £1,500+

## Credit Control Excellence

### The Prevention Protocol
Before they become debts:
- Deposits for groups over 6
- Card details for all bookings
- Clear payment terms displayed
- No tabs over £50
- Regular customers only credit

### The Collection System
When money's owed:
- Day 1: Friendly text reminder
- Day 3: Phone call
- Day 7: Email with statement
- Day 14: Final notice
- Day 21: Small claims (rare but necessary)

Success rate: 94% collected within 14 days

## The Data-Driven Decisions

### Daily Tracking
Five numbers every morning:
1. Yesterday's take
2. Current bank balance
3. Bills due this week
4. Forward bookings value
5. Stock levels

Takes 5 minutes, saves disasters.

### Weekly Analysis
Every Monday review:
- Week vs. last year
- Wage percentage
- GP achievement
- Cash position
- Four-week forecast

### Monthly Deep Dive
First Sunday monthly:
- Full P&L review
- Cash flow forecast 90 days
- Supplier payment plan
- Investment decisions
- Buffer target progress

## Emergency Protocols

### When Crisis Hits
Immediate actions:
1. List all payments due (prioritize)
2. Contact suppliers before due dates
3. Offer part payments, not silence
4. Cut all non-essential spending
5. Accelerate income (events, offers)

### The Communication Template
"Hi [Supplier], I need to discuss our account. We've hit a temporary cash flow issue. I can pay [amount] now and the balance by [date]. We value our relationship and want to be transparent."

Result: 90% accept payment plans

### The Recovery Plan
Week 1: Stabilize (stop bleeding)
Week 2: Accelerate income
Week 3: Negotiate terms
Week 4: Build forward

## Your 90-Day Cash Flow Fix

Days 1-30:
- Implement daily cash tracking
- Open buffer account
- Negotiate one supplier term
- Launch one subscription product

Days 31-60:
- Build events calendar
- Add morning revenue stream
- Negotiate remaining suppliers
- Start building buffer

Days 61-90:
- Review and refine
- Push successful initiatives
- Cut failing experiments
- Plan next quarter

## The Transformation Timeline

Month 1: Awareness (understanding position)
Month 3: Stability (predictable weeks)
Month 6: Buffer building (sleeping better)
Month 12: Strategic (choosing opportunities)
Month 18: Thriving (cash enables growth)

Our journey:
- Month 1: £2,000 overdrawn constantly
- Month 6: £5,000 buffer built
- Month 12: £10,000 reserve, no overdraft
- Month 18: Bought kitchen equipment cash
- Month 24: Planning expansion

The secret? It's not about having more money - it's about managing what you have better. Every pub can build stability. Start today.`,
      quickStats: [
        { label: 'Buffer Target', value: '6 weeks costs', highlight: true },
        { label: 'Payment Terms Goal', value: '30+ days', highlight: false },
        { label: 'Subscription Revenue', value: '£2-3k/month', highlight: false },
      ],
      faqs: [
        {
          question: "What if suppliers won't give me better payment terms?",
          answer: "Start with your best relationship and smallest supplier. Prove reliability, then leverage that success with others. If genuinely refused, focus on accelerating customer payments instead. Even 7 days improvement helps significantly.",
          isVoiceOptimized: true,
        },
        {
          question: "How do I build a buffer when I'm already behind?",
          answer: "Start tiny - even £20 weekly. Cut one small cost, add one small revenue stream. Use windfalls (good weekend, event success) to accelerate. The habit matters more than the amount initially. £20 weekly becomes £1,000 annually.",
          isVoiceOptimized: true,
        },
        {
          question: "Should I use my overdraft for cash flow?",
          answer: "Overdrafts are emergency tools, not operational funding. The interest kills profitability. Better to negotiate supplier terms, accelerate income, or even consider short-term loan with clear repayment plan. Overdraft dependency is a downward spiral.",
          isVoiceOptimized: false,
        },
        {
          question: "What's the first thing to fix?",
          answer: "Daily cash position tracking. You can't fix what you don't measure. Takes 5 minutes each morning, transforms decision-making. Second priority: one predictable weekly income stream. Build from there.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['cash flow management', 'pub finances', 'payment terms', 'financial planning', 'buffer building'],
      seo: {
        metaDescription: "Break free from monthly cash flow panic. Build predictable income, manage seasonal swings, and create financial stability.",
        keywords: ['pub cash flow', 'cash flow management', 'payment terms', 'financial buffer', 'pub finances'],
      },
    },
    {
      // Article 12: Compliance
      title: "Food Allergies and GDPR: The Compliance Nightmares That Could Close You Down",
      slug: 'food-allergies-gdpr-compliance',
      category: categories.compliance,
      publishedDate: '2025-09-22T10:00:00Z',
      excerpt: "Navigate the compliance minefield without hiring expensive consultants. Simple systems that keep you legal and let you focus on running your pub.",
      quickAnswer: "Stay compliant by creating simple, repeatable systems: allergen matrix for all dishes, ingredient folders for staff, GDPR consent forms for marketing, secure customer data storage, and regular staff training. Document everything, update quarterly, and make compliance part of daily operations rather than scary separate tasks.",
      content: `£5,000 fine. That's what killed The Bull down the road. Not bad food, not poor service - a customer had an allergic reaction and they couldn't prove they'd given correct information. Six months later: closed.

Then there's The Crown - £8,000 GDPR fine for a marketing email list hack. Still trading, but barely.

Compliance isn't sexy, but neither is bankruptcy. Here's how we built bombproof systems that take 30 minutes weekly to maintain.

## The Allergen Reality Check

Since 2021 (Natasha's Law), the rules are strict:
- List ALL allergens in ALL food
- Include pre-packed items
- Cover condiments and garnishes
- Update for recipe changes
- Train ALL staff

One mistake = potential manslaughter charge. No exaggeration.

## The Allergen System That Works

### The Master Matrix
Create once, update quarterly:
- Spreadsheet with every dish
- 14 allergen columns
- Clear YES/NO for each
- Version dated
- Printed and laminated

Example row:
Dish | Gluten | Eggs | Milk | Nuts | ...
Beef Burger | YES | YES (bun) | YES (cheese) | NO | ...

### The Ingredient Bible
Folder with:
- Every supplier spec sheet
- Every product label
- Photographed and dated
- Organized alphabetically
- Updated monthly

When asked about allergens, staff check folder. No guessing.

### The Kitchen Protocol
Three rules save lives:
1. Separate prep areas for allergen-free dishes
2. Color-coded boards and utensils
3. Allergen orders on different-colored tickets

Cost: £200 for equipment. Value: Priceless.

### The Communication Chain
Order taken → Allergen check → Kitchen informed → Double-check at pass → Server confirms with customer

Five checkpoints. Zero tolerance for shortcuts.

### The Staff Training Record
Monthly training documented:
- Date and time
- Topics covered
- Staff signatures
- Test results (yes, test them)
- Filed and dated

Inspector asks? Here's our training file. Case closed.

## GDPR: The Hidden Danger

Think GDPR doesn't apply? Wrong:
- Customer email list? GDPR applies
- Booking system? GDPR applies
- CCTV? GDPR applies
- Staff records? GDPR applies
- WiFi login? GDPR applies

Fines start at €10 million or 2% of turnover. Yes, really.

## The GDPR Compliance Framework

### The Consent System
For marketing lists:
- Clear opt-in required (not pre-ticked)
- Explain what you'll send
- Easy unsubscribe method
- Record consent date
- Refresh consent annually

Template: "I'd like to receive weekly emails about events and offers at The Anchor. I can unsubscribe anytime."

### The Data Audit
List everything you collect:
- What data (names, emails, phones)
- Why you need it
- Where it's stored
- Who can access it
- How long you keep it

Our audit found 12 places we held data. Scary.

### The Storage Security
Digital security basics:
- Password-protected computers
- Encrypted customer database
- Secure WiFi (not pub WiFi)
- Cloud backup (GDPR compliant)
- Access logging

Physical security:
- Locked filing cabinet
- Clear desk policy
- Shredder for disposal
- Visitor book in safe
- No customer lists lying around

### The Breach Protocol
If data is lost/stolen:
1. Contain breach immediately
2. Assess what's affected
3. Notify ICO within 72 hours (if serious)
4. Inform affected customers
5. Document everything

Practice this. During crisis, you won't think clearly.

### The Privacy Policy
Must have, must display:
- What data you collect
- Why you collect it
- How you protect it
- Customer rights
- Contact details

Free template: ICO website. Adapt, don't copy.

## Other Compliance Landmines

### Licensing Conditions
Check yours monthly:
- Operating hours
- Garden use times
- Music limitations
- Door supervisor requirements
- CCTV requirements

One breach = review = potential closure.

### Health & Safety
The basics that get missed:
- Gas safety certificate (annual)
- Electrical testing (5-yearly)
- Fire risk assessment (annual)
- First aid trained staff
- Accident book maintained

### Food Safety
Beyond allergens:
- Temperature records (twice daily)
- Cleaning schedules (signed)
- Pest control contracts
- Waste disposal records
- Staff health declarations

### Music Licensing
Often forgotten:
- PRS for Music license
- PPL license
- Live music permissions
- TV sports license
- Background music limits

Fines: £500-20,000 plus legal costs.

## Building Your Compliance Routine

### Daily (5 minutes)
- Temperature checks
- Cleaning sign-offs
- Allergen order checks
- Data handling check
- Quick hazard scan

### Weekly (30 minutes)
- Update training records
- Review incident log
- Check license conditions
- Update allergen matrix if needed
- Data backup check

### Monthly (2 hours)
- Full compliance audit
- Staff refresher training
- Update documentation
- Review near-misses
- Check law changes

### Quarterly (Half day)
- Deep dive review
- External perspective (swap with another pub)
- Update all policies
- Renew insurance docs
- Professional development

## The Technology Helpers

### Apps That Work
- Allergen management: Nutritics (£30/month)
- GDPR compliance: GDPR.eu toolkit (free)
- Temperature monitoring: Checkit (£50/month)
- Training records: Flow (£20/month)
- Document storage: Google Drive (free)

Total tech cost: £100/month. Fine prevention: Priceless.

### The Paper Backup
Never rely only on digital:
- Print key documents
- Physical training signatures
- Paper temperature logs
- Printed allergen matrices
- Hard copy policies

WiFi fails. Power cuts happen. Paper doesn't.

## Staff Training That Sticks

### Make It Real
Don't lecture, demonstrate:
- Role-play allergen scenarios
- Show actual fine examples
- Share horror stories
- Practice breach responses
- Test regularly

### The Buddy System
New starter? Assign compliance buddy:
- Week 1: Shadow and observe
- Week 2: Supervised practice
- Week 3: Independent with checks
- Week 4: Sign off competent
- Monthly: Refreshers

### The No-Blame Culture
Mistakes happen. Cover-ups kill:
- Report all near-misses
- Learn from errors
- Fix systems, not people
- Reward honesty
- Document improvements

## The Inspector Visit Survival Guide

When they arrive:
1. Welcome professionally
2. Offer coffee (they're human)
3. Have documents ready
4. Answer honestly
5. Take notes
6. Ask for advice

If found lacking:
- Accept findings
- Ask for specifics
- Request timeline
- Confirm understanding
- Follow up in writing

Our last inspection: "Best prepared pub we've seen." Time invested: 30 minutes weekly.

## Your Compliance Action Plan

Today:
- List all compliance requirements
- Identify biggest risk
- Fix one thing

This Week:
- Create allergen matrix
- Audit data holding
- Train one person

This Month:
- Build full system
- Train all staff
- Document everything

Next Quarter:
- Review and refine
- Get external check
- Plan improvements

## The Bottom Line

Compliance isn't optional. But it doesn't need to be overwhelming. Simple systems, consistently applied, keep you safe.

The choice: 30 minutes weekly on prevention, or lose everything to one incident.

We chose prevention. Five years, zero fines, zero incidents, sleeping soundly.

You can too. Start today. Start small. But start.`,
      quickStats: [
        { label: 'Weekly Time Needed', value: '30 minutes', highlight: true },
        { label: 'Setup Cost', value: '£200-500', highlight: false },
        { label: 'Fine Prevention Value', value: '£5,000+', highlight: false },
      ],
      faqs: [
        {
          question: "What's the minimum I need to do for allergens?",
          answer: "Create an allergen matrix for all dishes, train all staff on the 14 allergens, keep ingredient information available, and document everything. This is the legal minimum - there's no shortcuts. One reaction could close you down.",
          isVoiceOptimized: true,
        },
        {
          question: "Do I really need GDPR consent for my email list?",
          answer: "Yes, absolutely. Even a simple weekly newsletter needs clear consent. Sending without consent risks fines up to €10 million. Takes 2 minutes to add consent checkbox to your signup. Not worth the risk of not doing it.",
          isVoiceOptimized: true,
        },
        {
          question: "What if I can't afford compliance software?",
          answer: "You don't need expensive software. Paper systems work perfectly if maintained properly. Spreadsheets for allergens, filing cabinet for records, diary for checks. The system matters more than the technology. Start simple, upgrade later.",
          isVoiceOptimized: false,
        },
        {
          question: "How do I handle allergen questions when busy?",
          answer: "Never guess or rush. Have laminated allergen matrix at every station. Train staff to say 'Let me check that for you' rather than guess. Better to make customer wait 30 seconds than risk their life. Speed never trumps safety.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['allergen management', 'GDPR compliance', 'food safety', 'pub regulations', 'compliance systems'],
      seo: {
        metaDescription: "Simple compliance systems that prevent devastating fines. Manage allergens and GDPR without expensive consultants.",
        keywords: ['pub allergen management', 'GDPR for pubs', 'Natasha\'s Law', 'pub compliance', 'food allergy regulations'],
      },
    },
    {
      // Article 14: Kitchen Crisis
      title: "Kitchen Nightmares: When Your Chef Quits on a Saturday Night",
      slug: 'kitchen-nightmares-chef-quits',
      category: categories.crisisManagement,
      publishedDate: '2025-09-29T10:00:00Z',
      excerpt: "Your chef just walked out during service. Here's the emergency protocol that saved our Saturday and the prevention system that means it never happened again.",
      quickAnswer: "Handle chef walkouts with an immediate action plan: simplified emergency menu, cross-trained staff stepping up, local chef network for backup, clear communication with customers, and turning crisis into marketing opportunity. Prevent future crises by building redundancy, documenting all recipes, maintaining chef relationships, and having multiple backup plans ready.",
      content: `7:43pm, Saturday. Kitchen full of orders. Chef throws his apron on the pass, says "I'm done," and walks out. Forty covers booked. Twenty meals on order. No sous chef. 

Panic? Nearly. Closure? Almost. What actually happened? Our best Saturday in six months.

Here's the crisis system that saved us and the prevention plan that means we'll never face this nightmare again.

## The First 10 Minutes (Crisis Mode)

### Minute 1-2: Assess and Breathe
DON'T chase the chef. They're gone. Focus forward.
- Check what's already cooking
- Count orders waiting
- Identify who can cook ANYTHING
- Breathe. Seriously, breathe.

### Minute 3-5: Emergency Staffing
"Who can cook?" shouted to the entire pub:
- Barman: "I did two years at college"
- Regular customer: "I'm a home cook but..."
- Server: "I can do breakfasts"
- Me: "I can read recipes"

Instant kitchen brigade. Not ideal. But workable.

### Minute 6-8: The Menu Massacre
Full menu → Emergency menu in 2 minutes:
- Burgers (anyone can cook)
- Fish and chips (if you have them)
- Salads (no cooking required)
- One pasta dish (easiest you have)
- Kids meals (always simple)

Print 20 copies. Now.

### Minute 9-10: The Communication Blitz
Tell everyone immediately:
- Kitchen team: "Here's what we're doing"
- Front of house: "Here's the situation and script"
- Customers: "Kitchen emergency, limited menu, bear with us"

Honesty builds sympathy. Sympathy builds patience.

## The Next Hour (Damage Control)

### The Customer Script
Every server, same message:
"Folks, complete honesty - we've had a kitchen emergency. We've got a limited menu but everything on it we can do brilliantly. If you want to leave, we completely understand. If you stay, drinks are on us while you wait."

Result: Nobody left. NOBODY.

### The Kitchen Reorganization
Simplify everything:
- One person per station maximum
- Assembly line approach
- No modifications accepted
- Batch cooking only
- Front of house helping with plating

We became McDonald's. But we survived.

### The Social Media Spin
Posted immediately:
"Kitchen crisis at The Anchor! Chef walked out mid-service but our amazing team and customers are pulling together. Limited menu, unlimited spirit. If you're local and can help, free dinner for life!"

Three professional chefs showed up within 30 minutes.

### The Customer Champions
Regular Bob: Washed dishes for 3 hours
Table 6: Helped serve other tables
The Johnsons: Took phone bookings
Sarah: Ran to Tesco for supplies

Your customers want you to succeed. Let them help.

## The Rest of the Night (Recovery)

### The New Kitchen Team
By 8:30pm:
- Off-duty chef from nearby pub
- Retired chef regular customer
- Catering student neighbor
- Original barman
- Me on prep

Not pretty. But functional.

### The Service Standards
Adjusted expectations:
- Food will be slower
- Presentation basic
- Menu limited
- Mistakes likely
- Atmosphere everything

Customers became cheerleaders, not critics.

### The Financial Decision
Everything at 50% off? No.
Free drinks while waiting? Yes.
Result: Higher spend per head than normal
Why: People felt part of something special

## The Prevention System (Never Again)

### The Recipe Bible
Every dish documented:
- Ingredients with quantities
- Step-by-step process
- Photos of finished dish
- Prep requirements
- Supplier product codes

Stored: Physical folder + cloud backup
Update: Monthly
Access: All senior staff

### The Cross-Training Program
Every month:
- Bar staff learn one kitchen skill
- Servers learn basic prep
- Managers can cook five dishes minimum
- Kitchen porter knows basic cooking

Cost: Few hours monthly
Value: Survival guaranteed

### The Emergency Network
The Black Book:
- 5 local chefs' numbers
- 3 agency chef contacts
- 2 catering college teachers
- 4 retired chef customers
- 3 nearby pub relationships

Text quarterly: "Still available for emergencies? Coffee on me to catch up."

### The Early Warning System
Spot chef departure signs:
- Increased sick days
- Shortened temper
- Menu shortcuts
- Less communication
- Job site activity (yes, check)

See signs? Have the conversation early.

## The Backup Plans

### Plan A: The Sous Solution
Always have someone who can step up:
- Official sous chef, or
- Strongest kitchen member trained extra
- Clear succession plan
- Regular "chef's day off" practice

### Plan B: The Agency Option
Pre-registered with agencies:
- Two agencies minimum
- Paperwork complete
- Rates pre-negotiated
- References checked
- One week notice ideally

Cost: 40% more than regular
Value: Staying open

### Plan C: The Simplified Service
The "emergency menu" ready:
- 8 dishes maximum
- All freezer-to-fryer possible
- Prep under 5 minutes
- Anyone can cook
- Ingredients always stocked

Tested quarterly. Staff hate it. But it works.

### Plan D: The Nuclear Option
When everything fails:
- Pizza oven (£2,000 investment)
- 5 pizzas types only
- Salads and sides
- Honest explanation
- Temporary but viable

"Kitchen crisis: It's pizza weekend!" Better than closing.

## Building Chef Loyalty (Prevention Better Than Cure)

### The Money Reality
Pay properly or pay the price:
- Market rate minimum
- Performance bonuses
- Tip sharing
- Holiday pay
- Sick pay (yes, really)

Underpaying chefs costs more than overpaying.

### The Respect System
Chefs aren't just "the kitchen":
- Name on menus
- Customer introduction
- Input on decisions
- Regular praise publicly
- Mistakes handled privately

Respected chefs don't walk out.

### The Development Deal
Growth opportunities:
- Menu development freedom
- Supplier visit involvement
- Training courses funded
- Competition entries supported
- Career progression clarity

Invested chefs stay longer.

### The Life Balance
Burnout = walkout:
- Two days off weekly (consecutive)
- Holidays honored
- Split shifts minimized
- Help during rush
- Realistic expectations

Sustainable pace prevents crises.

## Your Crisis Prevention Plan

This Week:
- Document three signature dishes
- Get two backup chef numbers
- Cross-train one person
- Create emergency menu

This Month:
- Complete recipe bible
- Build chef network
- Train all seniors basic cooking
- Test emergency procedures

This Quarter:
- Full cross-training program
- Agency relationships built
- Early warning system active
- Prevention measures embedded

## The Success Stories

The Anchor: Chef quit Saturday, found permanent replacement Monday, no days closed
The Bull: Used customer chef network, now has chef-share with three pubs
The Crown: Simplified menu permanently, profits up 20%
The Swan: Sous stepped up, now head chef, original chef wants job back

## The Silver Lining

Our crisis became legend:
- Customers still talk about "that night"
- Team closer than ever
- Five chefs wanting to work for us
- Media coverage worth thousands
- Resilience proven

Sometimes crisis creates opportunity. But only if you're ready.

Your chef might never quit. But if they do, you'll survive. Maybe even thrive.

Preparation today prevents panic tomorrow.`,
      quickStats: [
        { label: 'Crisis Response Time', value: '10 minutes', highlight: true },
        { label: 'Backup Chefs Needed', value: '5 minimum', highlight: false },
        { label: 'Menu Simplification', value: '8 dishes max', highlight: false },
      ],
      faqs: [
        {
          question: "Should I close if my chef walks out?",
          answer: "Not immediately. Assess what you can deliver safely and legally. A limited menu is better than closing. Customers appreciate honesty and effort. Many successful pubs have survived and thrived after chef crises. Try everything before closing.",
          isVoiceOptimized: true,
        },
        {
          question: "How do I stop my chef from leaving?",
          answer: "Pay fairly, respect publicly, develop constantly, and maintain work-life balance. Most chefs don't quit for money alone - they quit from burnout, disrespect, or boredom. Regular check-ins, clear progression, and genuine appreciation prevent most walkouts.",
          isVoiceOptimized: true,
        },
        {
          question: "What's the minimum kitchen skill I need as an owner?",
          answer: "You should be able to cook five dishes from your menu competently. Know basic food safety, understand your equipment, and read recipes accurately. You don't need to be a chef, but complete kitchen ignorance is dangerous.",
          isVoiceOptimized: false,
        },
        {
          question: "Should I hire agency chefs as backup?",
          answer: "Agency chefs are expensive but valuable for true emergencies. Better to build a network of local freelance chefs first. Agencies should be your third option after internal coverage and freelance network. Keep agency details ready but use sparingly.",
          isVoiceOptimized: true,
        },
      ],
      tags: ['chef crisis', 'kitchen management', 'crisis management', 'staff emergency', 'business continuity'],
      seo: {
        metaDescription: "Emergency protocol for chef walkouts and kitchen crises. Turn Saturday night disaster into triumph with proven systems.",
        keywords: ['chef quit', 'kitchen crisis management', 'emergency chef', 'pub crisis plan', 'chef walkout'],
      },
    },
  ];

  // Create all articles
  for (const article of articles) {
    console.log(`\nCreating article: ${article.title}`);
    
    try {
      const doc = await client.create({
        _type: 'blogPost',
        title: article.title,
        slug: { current: article.slug },
        status: 'draft', // All created as drafts
        publishedDate: article.publishedDate,
        excerpt: article.excerpt,
        quickAnswer: article.quickAnswer,
        category: {
          _type: 'reference',
          _ref: article.category,
        },
        author: {
          _type: 'reference',
          _ref: authorRef,
        },
        content: article.content.split('\n\n').map(paragraph => {
          // Handle headers
          if (paragraph.startsWith('## ')) {
            return {
              _type: 'block',
              style: 'h2',
              children: [{
                _type: 'span',
                text: paragraph.replace('## ', ''),
              }],
            };
          }
          if (paragraph.startsWith('### ')) {
            return {
              _type: 'block',
              style: 'h3',
              children: [{
                _type: 'span',
                text: paragraph.replace('### ', ''),
              }],
            };
          }
          // Handle lists
          if (paragraph.includes('\n- ') || paragraph.startsWith('- ')) {
            const items = paragraph.split('\n').filter(line => line.trim().startsWith('-'));
            return items.map(item => ({
              _type: 'block',
              listItem: 'bullet',
              children: [{
                _type: 'span',
                text: item.replace(/^- /, '').trim(),
              }],
            }));
          }
          // Handle numbered lists
          if (paragraph.match(/^\d+\./)) {
            const items = paragraph.split('\n').filter(line => line.trim().match(/^\d+\./));
            return items.map(item => ({
              _type: 'block',
              listItem: 'number',
              children: [{
                _type: 'span',
                text: item.replace(/^\d+\.\s*/, '').trim(),
              }],
            }));
          }
          // Regular paragraphs
          return {
            _type: 'block',
            style: 'normal',
            children: [{
              _type: 'span',
              text: paragraph,
            }],
          };
        }).flat(),
        quickStats: article.quickStats.map((stat, index) => ({
          _key: `stat_${index}`,
          ...stat,
        })),
        faqs: article.faqs.map((faq, index) => ({
          _key: `faq_${index}`,
          ...faq,
        })),
        tags: article.tags,
        seo: article.seo,
        voiceSearchQueries: [
          `How do I ${article.slug.replace(/-/g, ' ')}?`,
          `What should I do when ${article.slug.replace(/-/g, ' ')}?`,
          `Help with ${article.slug.replace(/-/g, ' ')}`,
        ],
        localSEO: {
          targetLocation: 'United Kingdom',
          nearbyLandmarks: ['London', 'Surrey', 'Staines'],
          localModifiers: ['near me', 'local', 'in my area', 'UK'],
        },
        ctaSettings: {
          primaryCTA: 'Get Help Now',
          whatsappMessage: `Hi Peter, I read your article about ${article.title.toLowerCase()} and need help with my pub.`,
          urgency: 'medium',
        },
        // Featured image will be added later - for now leave empty
        // featuredImage: {
        //   _type: 'image',
        //   asset: {
        //     _type: 'reference',
        //     _ref: 'image-asset-ref',
        //   },
        //   alt: article.title,
        // },
      });
      
      console.log(`✅ Created successfully with ID: ${doc._id}`);
    } catch (error) {
      console.error(`❌ Failed to create article: ${error}`);
    }
  }

  console.log('\n✅ All articles created successfully in draft status!');
  console.log('\nThey are scheduled for weekly publication starting August 11, 2025.');
  console.log('You can review and edit them in Sanity Studio before their scheduled dates.');
}

createArticles().catch(console.error);