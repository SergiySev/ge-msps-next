import { UserCircleIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function ProfileLink({ href }: { href: string }) {
  const t = useTranslations();

  return (
    <Link href={href} className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-600 mb-4">
      <UserCircleIcon className="w-4 h-4" />
      <span>{t('profile')}</span>
    </Link>
  );
}
