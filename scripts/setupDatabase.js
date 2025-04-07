require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

const sql = neon(process.env.DATABASE_URL);

// Function to set up the table
async function setup() {
  await sql`
    CREATE TABLE IF NOT EXISTS member (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    );
  `;
  console.log('✅ Table is ready');
}

// Function to insert sample users
async function seedDatabase() {
  // Insert sample users
  const users = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' }
  ];

  for (let user of users) {
    await sql`
      INSERT INTO member (name) 
      VALUES (${user.name})
    `;
  }

  console.log('✅ Sample users have been added');
}

// Run setup and seed
async function main() {
  try {
    await setup();  // Create table if not exists
    await seedDatabase();  // Add sample users
  } catch (err) {
    console.error('❌ DB setup failed:', err);
  }
}

main();
