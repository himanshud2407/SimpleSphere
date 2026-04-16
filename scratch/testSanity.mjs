import { createClient } from '@sanity/client';

const client = createClient({
  projectId: '4hou47s4',
  dataset: 'production',
  useCdn: false, // Turn off CDN to see fresh data
  apiVersion: '2024-03-15',
});

async function testFetch() {
  try {
    console.log('Fetching blogs...');
    const data = await client.fetch('*[_type == "post"]');
    console.log('Found documents:', data.length);
    if (data.length > 0) {
      console.log('First blog title:', data[0].title);
    } else {
      console.log('No blogs found with _type == "post".');
      const allTypes = await client.fetch('array::unique(*._type)');
      console.log('Available types in dataset:', allTypes);
    }
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}

testFetch();
