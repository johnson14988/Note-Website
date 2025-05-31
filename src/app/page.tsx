import Link from 'next/link';

export default function Home() {
  return (
      <main>
        <h1>Welcome</h1>
        <p>This is a Next.js Site</p>
          <Link href="/about">去关于页面</Link>
      </main>
  )
}
