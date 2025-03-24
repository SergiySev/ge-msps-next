'use client';

import ButtonLink from '../ui/ButtonLink';
import StatusBadge from '../ui/StatusBadge';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

// Match the hospital type from Prisma
interface Hospital {
  id: number;
  name: string;
  active: boolean;
}

interface HospitalListProps {
  hospitals: Hospital[];
}

const HospitalList = ({ hospitals }: HospitalListProps) => {
  const t = useTranslations();
  const hospitalT = useTranslations('hospital');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">{hospitalT('title')}</h1>
        <ButtonLink href="/admin/hospitals/new" color="primary">
          {hospitalT('add')}
        </ButtonLink>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('id')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('name')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('status')}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {hospitalT('actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {hospitals.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                  {hospitalT('no_records')}
                </td>
              </tr>
            ) : (
              hospitals.map(hospital => (
                <tr key={hospital.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{hospital.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{hospital.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <StatusBadge isActive={hospital.active} activeText={t('active')} inactiveText={t('inactive')} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/hospitals/${hospital.id}`} className="text-blue-600 hover:text-blue-900 mr-4">
                      {t('edit')}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HospitalList;
