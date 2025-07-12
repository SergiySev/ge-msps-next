import { z } from 'zod';
// import { ActionWithId } from './actionTypes';

export const createHospitalClientSchema = z.object({
  name: z.string().min(2, 'Hospital name must be at least 2 characters').max(255),
  active: z.boolean().default(true),
});

export const updateHospitalClientSchema = createHospitalClientSchema.merge(
  z.object({
    id: z.number(),
  })
);

export type CreateHospitalFormType = z.infer<typeof createHospitalClientSchema>;
export type UpdateHospitalFormType = z.infer<typeof updateHospitalClientSchema>;

// Server schemas
export const createHospitalServerSchema = createHospitalClientSchema;

export const updateHospitalServerSchema = updateHospitalClientSchema;

export const deleteHospitalServerSchema = z.object({
  id: z.number(),
});
