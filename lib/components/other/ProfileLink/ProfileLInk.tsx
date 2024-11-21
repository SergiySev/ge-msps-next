import { UserCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';

export default function ProfileLink({ href }: { href: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-600 mb-2">
      <UserCircleIcon className="w-4 h-4" />
      <span>ფროფილი</span>
    </Link>
  );
}
