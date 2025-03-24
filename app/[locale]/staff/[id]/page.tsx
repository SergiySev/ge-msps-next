import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import prisma from 'msps/lib/prisma';
import { StaffManagementForm } from 'msps/lib/components/staff/StaffManagementForm';
import Link from 'next/link';

export default async function StaffDetailPage(props: { params: Promise<{ locale: string; id: string }> }) {
  const params = await props.params;
  const t = await getTranslations();
  const session = await getServerSession(authOptions);

  if (!session?.user || !['manager', 'admin'].includes(session.user.role)) {
    redirect('/');
  }

  const staffMember = await prisma.staff.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!staffMember) {
    redirect('/staff');
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h4 className="text-xl font-semibold">{t('staffManagement')}</h4>
        <Link href="/staff" className="text-blue-500 hover:text-blue-700">
          {t('backToList')}
        </Link>
      </div>
      <StaffManagementForm staffMember={staffMember} />
    </div>
  );
}
