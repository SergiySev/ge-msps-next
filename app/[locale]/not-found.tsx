import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mt-12 rounded-lg border-2 border-red-500 p-5 text-center">
      <h1 className="pb-4 pt-4 text-2xl text-red-500">ვერ მოიძებნა</h1>
      <p>ასეთი გვერდი ან მოცემი ვერ მოიძებნა</p>
      <Link href="/" legacyBehavior>
        <a className="bold inline-block p-2 pb-4 pt-4 text-blue-500 underline">
          მთავარი გვერდი
        </a>
      </Link>
    </div>
  );
}
