import { ProfileForm } from 'msps/lib/components/profile/ProfileForm';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const locale = getLocale();
  const t = await getTranslations({ locale });

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t('profile')}</h1>
      <ProfileForm initialUsername={session.user.username} />
    </div>
  );
}
