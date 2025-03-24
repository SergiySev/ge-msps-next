import { authOptions } from 'msps/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// Basic authentication utilities
export const getAuthenticatedUserId = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  return +session.user.id;
};

export const getAuthenticatedUserHospitalId = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.hospitalId) {
    redirect('/login');
  }

  return session.user.hospitalId;
};

export const getAuthenticatedUserHospitalName = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.hospitalName) {
    redirect('/login');
  }

  return session.user.hospitalName;
};

// Role-based access control
export const getAuthenticatedUserRole = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.role) {
    redirect('/login');
  }

  return session.user.role;
};

// Role check functions
export const isUserAdmin = async () => {
  const role = await getAuthenticatedUserRole();
  return role === 'admin';
};

export const isUserManager = async () => {
  const role = await getAuthenticatedUserRole();
  return role === 'manager';
};

export const isUserDoctor = async () => {
  const role = await getAuthenticatedUserRole();
  return role === 'doctor';
};

export const isUserNurse = async () => {
  const role = await getAuthenticatedUserRole();
  return role === 'nurse';
};

// Hospital-specific access control
export const canManageAllHospitals = async () => {
  const role = await getAuthenticatedUserRole();
  return role === 'admin';
};

export const canManageHospital = async (hospitalId: number) => {
  const role = await getAuthenticatedUserRole();
  const userHospitalId = await getAuthenticatedUserHospitalId();

  // Admin can manage all hospitals
  if (role === 'admin') return true;

  // Manager can only manage their own hospital
  if (role === 'manager') {
    return userHospitalId === hospitalId;
  }

  return false;
};

// User management permissions
export const canManageUsers = async (targetHospitalId?: number) => {
  const role = await getAuthenticatedUserRole();
  const userHospitalId = await getAuthenticatedUserHospitalId();

  // Admin can manage users in all hospitals
  if (role === 'admin') return true;

  // Manager can only manage users in their own hospital
  if (role === 'manager') {
    return targetHospitalId ? userHospitalId === targetHospitalId : false;
  }

  return false;
};
