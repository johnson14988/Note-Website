// app/page.tsx 或 pages/index.tsx

import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Header from '../components/Header'  // 路径根据你的目录结构调整

interface NoteMeta {
    slug: string
    title: string
    date: string
}

function getNotesMeta(): NoteMeta[] {
    const notesDir = path.join(process.cwd(), 'notes')
    if (!fs.existsSync(notesDir)) return []

    const files = fs.readdirSync(notesDir).filter(f => f.endsWith('.md'))

    return files
        .map(filename => {
            const slug = filename.replace(/\.md$/, '')
            const content = fs.readFileSync(path.join(notesDir, filename), 'utf-8')

            const matchTitle = content.match(/title:\s*(.+)/)
            const matchDate = content.match(/date:\s*(.+)/)

            return {
                slug,
                title: matchTitle ? matchTitle[1].trim() : slug,
                date: matchDate ? matchDate[1].trim() : '',
            }
        })
        .sort((a, b) => b.date.localeCompare(a.date))
}

export default function Home() {
    const notes = getNotesMeta()

    return (
        <main className="p-6">
            <Header />

            <p>This is a Next.js Site</p>

            <nav className="mt-6 mb-8">
                <Link
                    href="/upload"
                    className="inline-block bg-blue-600 text-white px-4 py-2 rounded"
                >
                    ➕ 创建新笔记
                </Link>
            </nav>

            <section>
                <h2 className="text-2xl font-semibold mb-4">笔记列表</h2>
                {notes.length === 0 ? (
                    <p>还没有笔记，快去创建一个吧！</p>
                ) : (
                    <ul>
                        {notes.map(note => (
                            <li key={note.slug} className="mb-3">
                                <Link
                                    href={`/notes/${note.slug}`}
                                    className="text-blue-700 hover:underline"
                                >
                                    {note.title}
                                </Link>
                                <br />
                                <small className="text-gray-500">{note.date}</small>
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    )
}
