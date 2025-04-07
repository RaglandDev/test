import { neon } from '@neondatabase/serverless';

async function getData() {
  const sql = neon(process.env.DATABASE_URL ?? '');
  const response = await sql`SELECT * FROM member`;
  return response;
}

export default async function Home() {
  const data = await getData();

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  );
}
