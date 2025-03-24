import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Get authenticated user session data
export const getAuthSession = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return {
    id: +session.user.id,
    hospitalId: session.user.hospitalId,
    hospitalName: session.user.hospitalName,
    role: session.user.role,
  };
};

// Basic authentication utilities that use the session data
export const getAuthenticatedUserId = async () => {
  const session = await getAuthSession();
  return session.id;
};

export const getAuthenticatedUserHospitalId = async () => {
  const session = await getAuthSession();
  return session.hospitalId;
};

export const getAuthenticatedUserHospitalName = async () => {
  const session = await getAuthSession();
  return session.hospitalName;
};

export const getAuthenticatedUserRole = async () => {
  const session = await getAuthSession();
  return session.role;
};

// Role check functions
export const isUserAdmin = async () => {
  const session = await getAuthSession();
  return session.role === 'admin';
};

export const isUserManager = async () => {
  const session = await getAuthSession();
  return session.role === 'manager';
};

export const isUserDoctor = async () => {
  const session = await getAuthSession();
  return session.role === 'doctor';
};

export const isUserNurse = async () => {
  const session = await getAuthSession();
  return session.role === 'nurse';
};

// Hospital-specific access control
export const canManageAllHospitals = async () => {
  const session = await getAuthSession();
  return session.role === 'admin';
};

export const canManageHospital = async (hospitalId: number) => {
  const session = await getAuthSession();

  // Admin can manage all hospitals
  if (session.role === 'admin') return true;

  // Manager can only manage their own hospital
  if (session.role === 'manager') {
    return session.hospitalId === hospitalId;
  }

  return false;
};

// User management permissions
export const canManageUsers = async (targetHospitalId?: number) => {
  const session = await getAuthSession();

  // Admin can manage users in all hospitals
  if (session.role === 'admin') return true;

  // Manager can only manage users in their own hospital
  if (session.role === 'manager') {
    return targetHospitalId ? session.hospitalId === targetHospitalId : false;
  }

  return false;
};

// Record access control
export const canCreateOrUpdateRecords = async () => {
  const session = await getAuthSession();
  return session.role === 'nurse' || session.role === 'doctor';
};

export const canAccessRecord = async (recordHospitalId: number) => {
  const session = await getAuthSession();

  // Admin can access all records
  if (session.role === 'admin') return true;

  // Manager, nurse, and doctor can only access records from their hospital
  return session.hospitalId === recordHospitalId;
};

// Robust permission checking for actions
interface ActionPermissionsResult {
  session: Awaited<ReturnType<typeof getAuthSession>>;
  canProceed: boolean;
  error?: string;
}

/**
 * Check create permissions for actions
 * Only nurses and doctors can create records
 */
export const checkCreatePermission = async (): Promise<ActionPermissionsResult> => {
  const session = await getAuthSession();
  const canCreate = session.role === 'nurse' || session.role === 'doctor';

  return {
    session,
    canProceed: canCreate,
    error: canCreate ? undefined : 'You do not have permission to create records',
  };
};

/**
 * Check update permissions for actions
 * Only nurses and doctors can update records
 */
export const checkUpdatePermission = async (): Promise<ActionPermissionsResult> => {
  const session = await getAuthSession();
  const canUpdate = session.role === 'nurse' || session.role === 'doctor';

  return {
    session,
    canProceed: canUpdate,
    error: canUpdate ? undefined : 'You do not have permission to update records',
  };
};

/**
 * Check read permissions for actions
 * All authenticated users can read, but access is limited by hospital
 */
export const checkReadPermission = async (): Promise<ActionPermissionsResult> => {
  const session = await getAuthSession();

  return {
    session,
    canProceed: true,
  };
};

/**
 * Check delete permissions for actions
 * Only nurses and doctors can delete records
 */
export const checkDeletePermission = async (): Promise<ActionPermissionsResult> => {
  const session = await getAuthSession();
  const canDelete = session.role === 'nurse' || session.role === 'doctor';

  return {
    session,
    canProceed: canDelete,
    error: canDelete ? undefined : 'You do not have permission to delete records',
  };
};

/**
 * Check hospital access for records
 * Only records from the user's hospital can be accessed (admin can access all)
 */
export const checkRecordAccess = (
  session: Awaited<ReturnType<typeof getAuthSession>>,
  recordHospitalId: number
): { canAccess: boolean; error?: string } => {
  // Admin can access all records
  if (session.role === 'admin') {
    return { canAccess: true };
  }

  // All other roles can only access records from their hospital
  const canAccess = session.hospitalId === recordHospitalId;

  return {
    canAccess,
    error: canAccess ? undefined : 'You do not have permission to access this record',
  };
};
