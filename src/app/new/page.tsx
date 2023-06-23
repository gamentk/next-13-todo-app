import { prisma } from '@/db';
import { redirect } from 'next/navigation';
import Link from 'next/link';

async function createTodo(data: FormData) {
    'use server'

    const title = data.get('title')?.valueOf();
    if (typeof title !== 'string' || title.length === 0) {
        throw new Error('Invalid title.');
    }

    await prisma.todo.create({ data: { title, complete: false } });
    redirect('/');
}

export default function Page() {
    return (
        <>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-2xl">New</h1>
            </header>
            <form
                action={createTodo}
                className="flex flex-col gap-2"
            >
                <input
                    type="text"
                    name="title"
                    className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                />
                <div className="flex justify-end gap-1">
                    <Link
                        href=".."
                        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        className="border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100"
                    >
                        Create
                    </button>
                </div>
            </form>
        </>
    );
}