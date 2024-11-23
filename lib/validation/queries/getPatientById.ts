import prisma from 'msps/lib/prisma';

export const getPatientById = async (id: number) => {
  return await prisma.patient.findFirst({
    where: { id },
    select: { birth_date: true, mors_date: true },
  });
};
