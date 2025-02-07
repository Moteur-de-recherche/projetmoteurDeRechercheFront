import Link from "next/link";

interface BookCardProps {
  book: { id: number; title: string };
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-bold">{book.title}</h2>
      <Link href={`/book/${book.id}`} className="text-blue-600 mt-2 block">
        Voir plus
      </Link>
    </div>
  );
}
