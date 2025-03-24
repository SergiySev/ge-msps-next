import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import prisma from 'msps/lib/prisma';
import { StaffList } from 'msps/lib/components/staff/StaffList';

export default async function StaffPage() {
  const session = await getServerSession(authOptions);
  const locale = getLocale();
  const t = await getTranslations({ locale });

  if (!session) {
    redirect('/auth/signin');
  }

  // Check if user has manager or admin role
  if (!['manager', 'admin'].includes(session.user.role)) {
    console.log('Access denied - insufficient role'); // Debug access denied
    redirect('/');
  }

  const staff = await prisma.staff.findMany({
    select: {
      id: true,
      username: true,
      role: true,
      active: true,
      created_at: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });

  return (
    <>
      <h4 className="text-xl font-semibold pb-4">{t('staffManagement')}</h4>
      <StaffList staff={staff} />
    </>
  );
}
