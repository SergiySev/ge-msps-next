import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

type UserRole = 'admin' | 'manager' | 'doctor' | 'nurse';

interface UsePermissionsResult {
  isAdmin: boolean;
  isManager: boolean;
  isDoctor: boolean;
  isNurse: boolean;
  canCreateOrUpdate: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canManageAllHospitals: boolean;
  hospitalId: number | null;
  role: UserRole | null;
}

export const usePermissions = (): UsePermissionsResult => {
  const { data: session } = useSession();

  return useMemo(() => {
    const role = session?.user?.role as UserRole | undefined;
    const hospitalId = session?.user?.hospitalId as number | undefined;

    return {
      isAdmin: role === 'admin',
      isManager: role === 'manager',
      isDoctor: role === 'doctor',
      isNurse: role === 'nurse',
      canCreateOrUpdate: role === 'nurse' || role === 'doctor',
      canDelete: role === 'nurse' || role === 'doctor',
      canManageUsers: role === 'admin' || role === 'manager',
      canManageAllHospitals: role === 'admin',
      hospitalId: hospitalId ?? null,
      role: role ?? null,
    };
  }, [session]);
};
