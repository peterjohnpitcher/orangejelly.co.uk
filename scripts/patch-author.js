// Simple script to patch the author document
const projectId = '9brdfanc'
const dataset = 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!token) {
  console.error('SANITY_API_WRITE_TOKEN environment variable is required')
  console.log('\nTo fix the Sanity Studio crash:')
  console.log('1. Go to https://www.sanity.io/manage/project/9brdfanc/api')
  console.log('2. Create a token with "Editor" permissions')
  console.log('3. Run: SANITY_API_WRITE_TOKEN=your_token node scripts/patch-author.js')
  process.exit(1)
}

const mutation = {
  mutations: [
    {
      patch: {
        id: 'author-peter-pitcher',
        unset: ['image']
      }
    }
  ]
}

fetch(`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/${dataset}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify(mutation)
})
.then(res => res.json())
.then(result => {
  console.log('Author document patched successfully!')
  console.log('The Sanity Studio should work now.')
})
.catch(err => {
  console.error('Failed to patch:', err)
})