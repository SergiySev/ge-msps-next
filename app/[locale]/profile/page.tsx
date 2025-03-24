import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import prisma from 'msps/lib/prisma';
import { ProfileForm } from 'msps/lib/components/profile/ProfileForm';

export default async function ProfilePage() {
  const t = await getTranslations();
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/');
  }

  const staffMember = await prisma.staff.findUnique({
    where: { id: parseInt(session.user.id) },
  });

  if (!staffMember) {
    redirect('/');
  }

  return (
    <>
      <h4 className="text-xl font-semibold">{t('profile')}</h4>
      <ProfileForm
        initialUsername={staffMember.username}
        initialFirstName={staffMember.first_name || ''}
        initialLastName={staffMember.last_name || ''}
      />
    </>
  );
}
