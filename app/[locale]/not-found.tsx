import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const locale = getLocale();
  const t = await getTranslations({ locale });

  return (
    <div className="mt-12 rounded-lg border-2 border-red-500 p-5 text-center">
      <h1 className="pb-4 pt-4 text-2xl text-red-500">{t('not_found.title')}</h1>
      <p>{t('not_found.message')}</p>
      <Link href="/" legacyBehavior>
        <a className="bold inline-block p-2 pb-4 pt-4 text-blue-500 underline">{t('not_found.home_link')}</a>
      </Link>
    </div>
  );
}
