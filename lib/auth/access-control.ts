import { getServerSession } from 'next-auth';
import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import { redirect } from 'next/navigation';

export type UserAccess = {
  userId: number;
  hospitalId: number | null;
  role: string;
  isSuperAdmin: boolean;
};

/**
 * Gets the authenticated user's access information.
 * Redirects to login if not authenticated.
 */
export const getUserAccess = async (): Promise<UserAccess> => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  return {
    userId: +session.user.id,
    hospitalId: session.user.hospitalId,
    role: session.user.role,
    isSuperAdmin: session.user.role === 'superadmin',
  };
};

/**
 * Checks if a user has access to a specific hospital
 */
export const validateHospitalAccess = (access: UserAccess, targetHospitalId: number | null) => {
  if (access.isSuperAdmin) return true;
  return access.hospitalId === targetHospitalId;
};

/**
 * Enforces hospital access, throws error if access denied
 */
export const enforceHospitalAccess = (access: UserAccess, targetHospitalId: number | null) => {
  if (!validateHospitalAccess(access, targetHospitalId)) {
    throw new Error('You do not have access to this hospital');
  }
};

/**
 * Enforces clinical access (nurse/doctor), throws error if access denied
 */
export const enforceClinicianAccess = (access: UserAccess) => {
  if (access.role !== 'nurse' && access.role !== 'doctor') {
    throw new Error('Only nurses and doctors can perform this action');
  }
};
