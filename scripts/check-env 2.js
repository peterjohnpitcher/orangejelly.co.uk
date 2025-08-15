require('dotenv').config({ path: '.env.local' });

console.log('PROJECT_ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
console.log('Is demo?:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'demo-project');
console.log(
  'Enabled?:',
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== 'demo-project'
);
