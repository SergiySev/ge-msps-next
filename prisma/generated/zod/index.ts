import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const DepartmentScalarFieldEnumSchema = z.enum(['id','name','weight']);

export const PatientScalarFieldEnumSchema = z.enum(['id','first_name','last_name','birth_date','personal_id','sex','phone','address','bmi','doctor_id','department_id','region_id','transplantation_date','pd_transit_date','md_diabetes','md_hypertension','md_glomerulonephritis','md_adptd','md_lupus','md_vasculitis','md_amyloidosis','md_unknown','md_other','md_other_comment','cd_heart','cd_cancer','cd_a_pressure','cd_p_pressure','cd_cirrhosis','cd_demention','cd_pqod','cd_other','cd_other_comment','mors','mors_date','mors_reason','mors_comment','created_at','updated_at','created_by','updated_by']);

export const PdScalarFieldEnumSchema = z.enum(['id','patient_id','date','pd_modality','solution_per_input','pd_ch_solution_136','pd_ch_solution_227','pd_ch_solution_386','icodextrin','created_at','updated_at','created_by','updated_by']);

export const RegionScalarFieldEnumSchema = z.enum(['id','name','weight']);

export const StaffScalarFieldEnumSchema = z.enum(['id','first_name','last_name','role','username','password','token','active','created_at','updated_at']);

export const InfectiousScalarFieldEnumSchema = z.enum(['id','patient_id','date','infection_type','infection_start_date','infection_end_date','staphylococcus','streptococcus','intestinal_stick','pseudomona','enterococcus','candida','other','other_comment','treatment_start_date','treatment_end_date','vancomycin','ceftazidime','ceftriaxone','cefepime','meropenem','imipenem','ciprofloxacin','cefazolin','gentamicin','clindamycin','rifampicin','rluconazole','created_at','updated_at','created_by','updated_by']);

export const Kidney_assessmentScalarFieldEnumSchema = z.enum(['id','patient_id','check_date','gfr','pet','ktv','ka_comment','created_at','updated_at','created_by','updated_by']);

export const NoninfectiousScalarFieldEnumSchema = z.enum(['id','patient_id','date','hernia','catheter_positioning','catheter_malposition','catheter_intraluminal_occlusion','catheter_extraluminal_occlusion','catheter_rinking','catheter_repositioning','catheter_leakage','hydrothorax','abdominal_leakage','genital_discharge','hepomeritoneum','chyloperitoneum','catheter_decrease','eps','other','other_comment','created_at','updated_at','created_by','updated_by']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);

export const pd_pd_modalitySchema = z.enum(['CAPD','APD']);

export type pd_pd_modalityType = `${z.infer<typeof pd_pd_modalitySchema>}`

export const staff_roleSchema = z.enum(['nurse','doctor','admin']);

export type staff_roleType = `${z.infer<typeof staff_roleSchema>}`

export const pd_solution_per_inputSchema = z.enum(['lt_8','eq_8','eq_10','eq_12','eq_15','eq_17','gt_17']);

export type pd_solution_per_inputType = `${z.infer<typeof pd_solution_per_inputSchema>}`

export const patient_sexSchema = z.enum(['male','female']);

export type patient_sexType = `${z.infer<typeof patient_sexSchema>}`

export const patient_mors_reasonSchema = z.enum(['mors_heart','mors_infection','mors_other']);

export type patient_mors_reasonType = `${z.infer<typeof patient_mors_reasonSchema>}`

export const infectious_infection_typeSchema = z.enum(['peritonitis','catheter_infection','tunnel_infection']);

export type infectious_infection_typeType = `${z.infer<typeof infectious_infection_typeSchema>}`

export const kidney_assessment_petSchema = z.enum(['fast','slow','N']);

export type kidney_assessment_petType = `${z.infer<typeof kidney_assessment_petSchema>}`

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// DEPARTMENT SCHEMA
/////////////////////////////////////////

export const departmentSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  weight: z.number().int().nullable(),
})

export type department = z.infer<typeof departmentSchema>

/////////////////////////////////////////
// PATIENT SCHEMA
/////////////////////////////////////////

export const patientSchema = z.object({
  sex: patient_sexSchema,
  mors_reason: patient_mors_reasonSchema.nullable(),
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().nullable(),
  pd_transit_date: z.coerce.date().nullable(),
  md_diabetes: z.boolean().nullable(),
  md_hypertension: z.boolean().nullable(),
  md_glomerulonephritis: z.boolean().nullable(),
  md_adptd: z.boolean().nullable(),
  md_lupus: z.boolean().nullable(),
  md_vasculitis: z.boolean().nullable(),
  md_amyloidosis: z.boolean().nullable(),
  md_unknown: z.boolean().nullable(),
  md_other: z.boolean().nullable(),
  md_other_comment: z.string().nullable(),
  cd_heart: z.boolean().nullable(),
  cd_cancer: z.boolean().nullable(),
  cd_a_pressure: z.boolean().nullable(),
  cd_p_pressure: z.boolean().nullable(),
  cd_cirrhosis: z.boolean().nullable(),
  cd_demention: z.boolean().nullable(),
  cd_pqod: z.boolean().nullable(),
  cd_other: z.boolean().nullable(),
  cd_other_comment: z.string().nullable(),
  mors: z.boolean().nullable(),
  mors_date: z.coerce.date().nullable(),
  mors_comment: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().nullable(),
})

export type patient = z.infer<typeof patientSchema>

/////////////////////////////////////////
// PD SCHEMA
/////////////////////////////////////////

export const pdSchema = z.object({
  pd_modality: pd_pd_modalitySchema,
  solution_per_input: pd_solution_per_inputSchema,
  id: z.number().int(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_ch_solution_136: z.boolean().nullable(),
  pd_ch_solution_227: z.boolean().nullable(),
  pd_ch_solution_386: z.boolean().nullable(),
  icodextrin: z.boolean().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().nullable(),
})

export type pd = z.infer<typeof pdSchema>

/////////////////////////////////////////
// REGION SCHEMA
/////////////////////////////////////////

export const regionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  weight: z.number().int().nullable(),
})

export type region = z.infer<typeof regionSchema>

/////////////////////////////////////////
// STAFF SCHEMA
/////////////////////////////////////////

export const staffSchema = z.object({
  role: staff_roleSchema.nullable(),
  id: z.number().int(),
  first_name: z.string(),
  last_name: z.string(),
  username: z.string(),
  password: z.string(),
  token: z.string().nullable(),
  active: z.boolean().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
})

export type staff = z.infer<typeof staffSchema>

/////////////////////////////////////////
// INFECTIOUS SCHEMA
/////////////////////////////////////////

export const infectiousSchema = z.object({
  infection_type: infectious_infection_typeSchema,
  id: z.number().int(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_start_date: z.coerce.date().nullable(),
  infection_end_date: z.coerce.date().nullable(),
  staphylococcus: z.boolean().nullable(),
  streptococcus: z.boolean().nullable(),
  intestinal_stick: z.boolean().nullable(),
  pseudomona: z.boolean().nullable(),
  enterococcus: z.boolean().nullable(),
  candida: z.boolean().nullable(),
  other: z.boolean().nullable(),
  other_comment: z.string().nullable(),
  treatment_start_date: z.coerce.date().nullable(),
  treatment_end_date: z.coerce.date().nullable(),
  vancomycin: z.boolean().nullable(),
  ceftazidime: z.boolean().nullable(),
  ceftriaxone: z.boolean().nullable(),
  cefepime: z.boolean().nullable(),
  meropenem: z.boolean().nullable(),
  imipenem: z.boolean().nullable(),
  ciprofloxacin: z.boolean().nullable(),
  cefazolin: z.boolean().nullable(),
  gentamicin: z.boolean().nullable(),
  clindamycin: z.boolean().nullable(),
  rifampicin: z.boolean().nullable(),
  rluconazole: z.boolean().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().nullable(),
})

export type infectious = z.infer<typeof infectiousSchema>

/////////////////////////////////////////
// KIDNEY ASSESSMENT SCHEMA
/////////////////////////////////////////

export const kidney_assessmentSchema = z.object({
  pet: kidney_assessment_petSchema.nullable(),
  id: z.number().int(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().nullable(),
  ktv: z.number().nullable(),
  ka_comment: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().nullable(),
})

export type kidney_assessment = z.infer<typeof kidney_assessmentSchema>

/////////////////////////////////////////
// NONINFECTIOUS SCHEMA
/////////////////////////////////////////

export const noninfectiousSchema = z.object({
  id: z.number().int(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().nullable(),
  catheter_positioning: z.boolean().nullable(),
  catheter_malposition: z.boolean().nullable(),
  catheter_intraluminal_occlusion: z.boolean().nullable(),
  catheter_extraluminal_occlusion: z.boolean().nullable(),
  catheter_rinking: z.boolean().nullable(),
  catheter_repositioning: z.boolean().nullable(),
  catheter_leakage: z.boolean().nullable(),
  hydrothorax: z.boolean().nullable(),
  abdominal_leakage: z.boolean().nullable(),
  genital_discharge: z.boolean().nullable(),
  hepomeritoneum: z.boolean().nullable(),
  chyloperitoneum: z.boolean().nullable(),
  catheter_decrease: z.boolean().nullable(),
  eps: z.boolean().nullable(),
  other: z.boolean().nullable(),
  other_comment: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().nullable(),
})

export type noninfectious = z.infer<typeof noninfectiousSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// DEPARTMENT
//------------------------------------------------------

export const departmentIncludeSchema: z.ZodType<Prisma.departmentInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const departmentArgsSchema: z.ZodType<Prisma.departmentDefaultArgs> = z.object({
  select: z.lazy(() => departmentSelectSchema).optional(),
  include: z.lazy(() => departmentIncludeSchema).optional(),
}).strict();

export const departmentCountOutputTypeArgsSchema: z.ZodType<Prisma.departmentCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => departmentCountOutputTypeSelectSchema).nullish(),
}).strict();

export const departmentCountOutputTypeSelectSchema: z.ZodType<Prisma.departmentCountOutputTypeSelect> = z.object({
  patient: z.boolean().optional(),
}).strict();

export const departmentSelectSchema: z.ZodType<Prisma.departmentSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => DepartmentCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PATIENT
//------------------------------------------------------

export const patientIncludeSchema: z.ZodType<Prisma.patientInclude> = z.object({
  infectious: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  kidney_assessment: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  noninfectious: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  staff_patient_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => departmentArgsSchema)]).optional(),
  staff_patient_doctor_idTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  region: z.union([z.boolean(),z.lazy(() => regionArgsSchema)]).optional(),
  staff_patient_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  pd: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const patientArgsSchema: z.ZodType<Prisma.patientDefaultArgs> = z.object({
  select: z.lazy(() => patientSelectSchema).optional(),
  include: z.lazy(() => patientIncludeSchema).optional(),
}).strict();

export const patientCountOutputTypeArgsSchema: z.ZodType<Prisma.patientCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => patientCountOutputTypeSelectSchema).nullish(),
}).strict();

export const patientCountOutputTypeSelectSchema: z.ZodType<Prisma.patientCountOutputTypeSelect> = z.object({
  infectious: z.boolean().optional(),
  kidney_assessment: z.boolean().optional(),
  noninfectious: z.boolean().optional(),
  pd: z.boolean().optional(),
}).strict();

export const patientSelectSchema: z.ZodType<Prisma.patientSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  birth_date: z.boolean().optional(),
  personal_id: z.boolean().optional(),
  sex: z.boolean().optional(),
  phone: z.boolean().optional(),
  address: z.boolean().optional(),
  bmi: z.boolean().optional(),
  doctor_id: z.boolean().optional(),
  department_id: z.boolean().optional(),
  region_id: z.boolean().optional(),
  transplantation_date: z.boolean().optional(),
  pd_transit_date: z.boolean().optional(),
  md_diabetes: z.boolean().optional(),
  md_hypertension: z.boolean().optional(),
  md_glomerulonephritis: z.boolean().optional(),
  md_adptd: z.boolean().optional(),
  md_lupus: z.boolean().optional(),
  md_vasculitis: z.boolean().optional(),
  md_amyloidosis: z.boolean().optional(),
  md_unknown: z.boolean().optional(),
  md_other: z.boolean().optional(),
  md_other_comment: z.boolean().optional(),
  cd_heart: z.boolean().optional(),
  cd_cancer: z.boolean().optional(),
  cd_a_pressure: z.boolean().optional(),
  cd_p_pressure: z.boolean().optional(),
  cd_cirrhosis: z.boolean().optional(),
  cd_demention: z.boolean().optional(),
  cd_pqod: z.boolean().optional(),
  cd_other: z.boolean().optional(),
  cd_other_comment: z.boolean().optional(),
  mors: z.boolean().optional(),
  mors_date: z.boolean().optional(),
  mors_reason: z.boolean().optional(),
  mors_comment: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  infectious: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  kidney_assessment: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  noninfectious: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  staff_patient_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  department: z.union([z.boolean(),z.lazy(() => departmentArgsSchema)]).optional(),
  staff_patient_doctor_idTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  region: z.union([z.boolean(),z.lazy(() => regionArgsSchema)]).optional(),
  staff_patient_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  pd: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PatientCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PD
//------------------------------------------------------

export const pdIncludeSchema: z.ZodType<Prisma.pdInclude> = z.object({
  staff_pd_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_pd_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

export const pdArgsSchema: z.ZodType<Prisma.pdDefaultArgs> = z.object({
  select: z.lazy(() => pdSelectSchema).optional(),
  include: z.lazy(() => pdIncludeSchema).optional(),
}).strict();

export const pdSelectSchema: z.ZodType<Prisma.pdSelect> = z.object({
  id: z.boolean().optional(),
  patient_id: z.boolean().optional(),
  date: z.boolean().optional(),
  pd_modality: z.boolean().optional(),
  solution_per_input: z.boolean().optional(),
  pd_ch_solution_136: z.boolean().optional(),
  pd_ch_solution_227: z.boolean().optional(),
  pd_ch_solution_386: z.boolean().optional(),
  icodextrin: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  staff_pd_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_pd_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

// REGION
//------------------------------------------------------

export const regionIncludeSchema: z.ZodType<Prisma.regionInclude> = z.object({
  patient: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const regionArgsSchema: z.ZodType<Prisma.regionDefaultArgs> = z.object({
  select: z.lazy(() => regionSelectSchema).optional(),
  include: z.lazy(() => regionIncludeSchema).optional(),
}).strict();

export const regionCountOutputTypeArgsSchema: z.ZodType<Prisma.regionCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => regionCountOutputTypeSelectSchema).nullish(),
}).strict();

export const regionCountOutputTypeSelectSchema: z.ZodType<Prisma.regionCountOutputTypeSelect> = z.object({
  patient: z.boolean().optional(),
}).strict();

export const regionSelectSchema: z.ZodType<Prisma.regionSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  weight: z.boolean().optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => RegionCountOutputTypeArgsSchema)]).optional(),
}).strict()

// STAFF
//------------------------------------------------------

export const staffIncludeSchema: z.ZodType<Prisma.staffInclude> = z.object({
  infectious_infectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  infectious_infectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  noninfectious_noninfectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  patient_patient_created_byTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  patient_patient_doctor_idTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  patient_patient_updated_byTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  pd_pd_created_byTostaff: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  pd_pd_updated_byTostaff: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StaffCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const staffArgsSchema: z.ZodType<Prisma.staffDefaultArgs> = z.object({
  select: z.lazy(() => staffSelectSchema).optional(),
  include: z.lazy(() => staffIncludeSchema).optional(),
}).strict();

export const staffCountOutputTypeArgsSchema: z.ZodType<Prisma.staffCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => staffCountOutputTypeSelectSchema).nullish(),
}).strict();

export const staffCountOutputTypeSelectSchema: z.ZodType<Prisma.staffCountOutputTypeSelect> = z.object({
  infectious_infectious_created_byTostaff: z.boolean().optional(),
  infectious_infectious_updated_byTostaff: z.boolean().optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.boolean().optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.boolean().optional(),
  noninfectious_noninfectious_created_byTostaff: z.boolean().optional(),
  noninfectious_noninfectious_updated_byTostaff: z.boolean().optional(),
  patient_patient_created_byTostaff: z.boolean().optional(),
  patient_patient_doctor_idTostaff: z.boolean().optional(),
  patient_patient_updated_byTostaff: z.boolean().optional(),
  pd_pd_created_byTostaff: z.boolean().optional(),
  pd_pd_updated_byTostaff: z.boolean().optional(),
}).strict();

export const staffSelectSchema: z.ZodType<Prisma.staffSelect> = z.object({
  id: z.boolean().optional(),
  first_name: z.boolean().optional(),
  last_name: z.boolean().optional(),
  role: z.boolean().optional(),
  username: z.boolean().optional(),
  password: z.boolean().optional(),
  token: z.boolean().optional(),
  active: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  infectious_infectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  infectious_infectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => infectiousFindManyArgsSchema)]).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.union([z.boolean(),z.lazy(() => kidney_assessmentFindManyArgsSchema)]).optional(),
  noninfectious_noninfectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => noninfectiousFindManyArgsSchema)]).optional(),
  patient_patient_created_byTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  patient_patient_doctor_idTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  patient_patient_updated_byTostaff: z.union([z.boolean(),z.lazy(() => patientFindManyArgsSchema)]).optional(),
  pd_pd_created_byTostaff: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  pd_pd_updated_byTostaff: z.union([z.boolean(),z.lazy(() => pdFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => StaffCountOutputTypeArgsSchema)]).optional(),
}).strict()

// INFECTIOUS
//------------------------------------------------------

export const infectiousIncludeSchema: z.ZodType<Prisma.infectiousInclude> = z.object({
  staff_infectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_infectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

export const infectiousArgsSchema: z.ZodType<Prisma.infectiousDefaultArgs> = z.object({
  select: z.lazy(() => infectiousSelectSchema).optional(),
  include: z.lazy(() => infectiousIncludeSchema).optional(),
}).strict();

export const infectiousSelectSchema: z.ZodType<Prisma.infectiousSelect> = z.object({
  id: z.boolean().optional(),
  patient_id: z.boolean().optional(),
  date: z.boolean().optional(),
  infection_type: z.boolean().optional(),
  infection_start_date: z.boolean().optional(),
  infection_end_date: z.boolean().optional(),
  staphylococcus: z.boolean().optional(),
  streptococcus: z.boolean().optional(),
  intestinal_stick: z.boolean().optional(),
  pseudomona: z.boolean().optional(),
  enterococcus: z.boolean().optional(),
  candida: z.boolean().optional(),
  other: z.boolean().optional(),
  other_comment: z.boolean().optional(),
  treatment_start_date: z.boolean().optional(),
  treatment_end_date: z.boolean().optional(),
  vancomycin: z.boolean().optional(),
  ceftazidime: z.boolean().optional(),
  ceftriaxone: z.boolean().optional(),
  cefepime: z.boolean().optional(),
  meropenem: z.boolean().optional(),
  imipenem: z.boolean().optional(),
  ciprofloxacin: z.boolean().optional(),
  cefazolin: z.boolean().optional(),
  gentamicin: z.boolean().optional(),
  clindamycin: z.boolean().optional(),
  rifampicin: z.boolean().optional(),
  rluconazole: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  staff_infectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_infectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

// KIDNEY ASSESSMENT
//------------------------------------------------------

export const kidney_assessmentIncludeSchema: z.ZodType<Prisma.kidney_assessmentInclude> = z.object({
  staff_kidney_assessment_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_kidney_assessment_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

export const kidney_assessmentArgsSchema: z.ZodType<Prisma.kidney_assessmentDefaultArgs> = z.object({
  select: z.lazy(() => kidney_assessmentSelectSchema).optional(),
  include: z.lazy(() => kidney_assessmentIncludeSchema).optional(),
}).strict();

export const kidney_assessmentSelectSchema: z.ZodType<Prisma.kidney_assessmentSelect> = z.object({
  id: z.boolean().optional(),
  patient_id: z.boolean().optional(),
  check_date: z.boolean().optional(),
  gfr: z.boolean().optional(),
  pet: z.boolean().optional(),
  ktv: z.boolean().optional(),
  ka_comment: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  staff_kidney_assessment_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_kidney_assessment_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

// NONINFECTIOUS
//------------------------------------------------------

export const noninfectiousIncludeSchema: z.ZodType<Prisma.noninfectiousInclude> = z.object({
  staff_noninfectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_noninfectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()

export const noninfectiousArgsSchema: z.ZodType<Prisma.noninfectiousDefaultArgs> = z.object({
  select: z.lazy(() => noninfectiousSelectSchema).optional(),
  include: z.lazy(() => noninfectiousIncludeSchema).optional(),
}).strict();

export const noninfectiousSelectSchema: z.ZodType<Prisma.noninfectiousSelect> = z.object({
  id: z.boolean().optional(),
  patient_id: z.boolean().optional(),
  date: z.boolean().optional(),
  hernia: z.boolean().optional(),
  catheter_positioning: z.boolean().optional(),
  catheter_malposition: z.boolean().optional(),
  catheter_intraluminal_occlusion: z.boolean().optional(),
  catheter_extraluminal_occlusion: z.boolean().optional(),
  catheter_rinking: z.boolean().optional(),
  catheter_repositioning: z.boolean().optional(),
  catheter_leakage: z.boolean().optional(),
  hydrothorax: z.boolean().optional(),
  abdominal_leakage: z.boolean().optional(),
  genital_discharge: z.boolean().optional(),
  hepomeritoneum: z.boolean().optional(),
  chyloperitoneum: z.boolean().optional(),
  catheter_decrease: z.boolean().optional(),
  eps: z.boolean().optional(),
  other: z.boolean().optional(),
  other_comment: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  created_by: z.boolean().optional(),
  updated_by: z.boolean().optional(),
  staff_noninfectious_created_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
  patient: z.union([z.boolean(),z.lazy(() => patientArgsSchema)]).optional(),
  staff_noninfectious_updated_byTostaff: z.union([z.boolean(),z.lazy(() => staffArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const departmentWhereInputSchema: z.ZodType<Prisma.departmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => departmentWhereInputSchema),z.lazy(() => departmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => departmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => departmentWhereInputSchema),z.lazy(() => departmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  patient: z.lazy(() => PatientListRelationFilterSchema).optional()
}).strict();

export const departmentOrderByWithRelationInputSchema: z.ZodType<Prisma.departmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patient: z.lazy(() => patientOrderByRelationAggregateInputSchema).optional()
}).strict();

export const departmentWhereUniqueInputSchema: z.ZodType<Prisma.departmentWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => departmentWhereInputSchema),z.lazy(() => departmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => departmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => departmentWhereInputSchema),z.lazy(() => departmentWhereInputSchema).array() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  patient: z.lazy(() => PatientListRelationFilterSchema).optional()
}).strict());

export const departmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.departmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => departmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => departmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => departmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => departmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => departmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const departmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.departmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => departmentScalarWhereWithAggregatesInputSchema),z.lazy(() => departmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => departmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => departmentScalarWhereWithAggregatesInputSchema),z.lazy(() => departmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const patientWhereInputSchema: z.ZodType<Prisma.patientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => patientWhereInputSchema),z.lazy(() => patientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => patientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => patientWhereInputSchema),z.lazy(() => patientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birth_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  personal_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sex: z.union([ z.lazy(() => Enumpatient_sexFilterSchema),z.lazy(() => patient_sexSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bmi: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  doctor_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  region_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transplantation_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  pd_transit_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  md_diabetes: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_hypertension: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_adptd: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_lupus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_vasculitis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_amyloidosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_unknown: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cd_heart: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cancer: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_a_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_p_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_demention: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_pqod: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mors: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  mors_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => Enumpatient_mors_reasonNullableFilterSchema),z.lazy(() => patient_mors_reasonSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  infectious: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  kidney_assessment: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  noninfectious: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  staff_patient_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  department: z.union([ z.lazy(() => DepartmentRelationFilterSchema),z.lazy(() => departmentWhereInputSchema) ]).optional(),
  staff_patient_doctor_idTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  region: z.union([ z.lazy(() => RegionRelationFilterSchema),z.lazy(() => regionWhereInputSchema) ]).optional(),
  staff_patient_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
  pd: z.lazy(() => PdListRelationFilterSchema).optional()
}).strict();

export const patientOrderByWithRelationInputSchema: z.ZodType<Prisma.patientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  personal_id: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  transplantation_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_transit_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_diabetes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_hypertension: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_glomerulonephritis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_adptd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_lupus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_vasculitis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_amyloidosis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_unknown: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_heart: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_cancer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_a_pressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_p_pressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_cirrhosis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_demention: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_pqod: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_reason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  infectious: z.lazy(() => infectiousOrderByRelationAggregateInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentOrderByRelationAggregateInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousOrderByRelationAggregateInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  department: z.lazy(() => departmentOrderByWithRelationInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  region: z.lazy(() => regionOrderByWithRelationInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  pd: z.lazy(() => pdOrderByRelationAggregateInputSchema).optional()
}).strict();

export const patientWhereUniqueInputSchema: z.ZodType<Prisma.patientWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    personal_id: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    personal_id: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  personal_id: z.string().optional(),
  AND: z.union([ z.lazy(() => patientWhereInputSchema),z.lazy(() => patientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => patientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => patientWhereInputSchema),z.lazy(() => patientWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birth_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  sex: z.union([ z.lazy(() => Enumpatient_sexFilterSchema),z.lazy(() => patient_sexSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bmi: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  doctor_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  region_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  transplantation_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  pd_transit_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  md_diabetes: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_hypertension: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_adptd: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_lupus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_vasculitis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_amyloidosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_unknown: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cd_heart: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cancer: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_a_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_p_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_demention: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_pqod: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mors: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  mors_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => Enumpatient_mors_reasonNullableFilterSchema),z.lazy(() => patient_mors_reasonSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  infectious: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  kidney_assessment: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  noninfectious: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  staff_patient_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  department: z.union([ z.lazy(() => DepartmentRelationFilterSchema),z.lazy(() => departmentWhereInputSchema) ]).optional(),
  staff_patient_doctor_idTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  region: z.union([ z.lazy(() => RegionRelationFilterSchema),z.lazy(() => regionWhereInputSchema) ]).optional(),
  staff_patient_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
  pd: z.lazy(() => PdListRelationFilterSchema).optional()
}).strict());

export const patientOrderByWithAggregationInputSchema: z.ZodType<Prisma.patientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  personal_id: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  phone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  address: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  transplantation_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_transit_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_diabetes: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_hypertension: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_glomerulonephritis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_adptd: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_lupus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_vasculitis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_amyloidosis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_unknown: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  md_other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_heart: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_cancer: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_a_pressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_p_pressure: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_cirrhosis: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_demention: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_pqod: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cd_other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_reason: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  mors_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => patientCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => patientAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => patientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => patientMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => patientSumOrderByAggregateInputSchema).optional()
}).strict();

export const patientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.patientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => patientScalarWhereWithAggregatesInputSchema),z.lazy(() => patientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => patientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => patientScalarWhereWithAggregatesInputSchema),z.lazy(() => patientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  birth_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  personal_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sex: z.union([ z.lazy(() => Enumpatient_sexWithAggregatesFilterSchema),z.lazy(() => patient_sexSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bmi: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  doctor_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  region_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  transplantation_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  pd_transit_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  md_diabetes: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_hypertension: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_adptd: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_lupus: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_vasculitis: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_amyloidosis: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_unknown: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_other: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  md_other_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  cd_heart: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cancer: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_a_pressure: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_p_pressure: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_demention: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_pqod: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  mors: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  mors_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => Enumpatient_mors_reasonNullableWithAggregatesFilterSchema),z.lazy(() => patient_mors_reasonSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const pdWhereInputSchema: z.ZodType<Prisma.pdWhereInput> = z.object({
  AND: z.union([ z.lazy(() => pdWhereInputSchema),z.lazy(() => pdWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => pdWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => pdWhereInputSchema),z.lazy(() => pdWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pd_modality: z.union([ z.lazy(() => Enumpd_pd_modalityFilterSchema),z.lazy(() => pd_pd_modalitySchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => Enumpd_solution_per_inputFilterSchema),z.lazy(() => pd_solution_per_inputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  icodextrin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  staff_pd_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_pd_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict();

export const pdOrderByWithRelationInputSchema: z.ZodType<Prisma.pdOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  pd_modality: z.lazy(() => SortOrderSchema).optional(),
  solution_per_input: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_ch_solution_227: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_ch_solution_386: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icodextrin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staff_pd_created_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  patient: z.lazy(() => patientOrderByWithRelationInputSchema).optional(),
  staff_pd_updated_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional()
}).strict();

export const pdWhereUniqueInputSchema: z.ZodType<Prisma.pdWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => pdWhereInputSchema),z.lazy(() => pdWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => pdWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => pdWhereInputSchema),z.lazy(() => pdWhereInputSchema).array() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pd_modality: z.union([ z.lazy(() => Enumpd_pd_modalityFilterSchema),z.lazy(() => pd_pd_modalitySchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => Enumpd_solution_per_inputFilterSchema),z.lazy(() => pd_solution_per_inputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  icodextrin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  staff_pd_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_pd_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict());

export const pdOrderByWithAggregationInputSchema: z.ZodType<Prisma.pdOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  pd_modality: z.lazy(() => SortOrderSchema).optional(),
  solution_per_input: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_ch_solution_227: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pd_ch_solution_386: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  icodextrin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => pdCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => pdAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => pdMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => pdMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => pdSumOrderByAggregateInputSchema).optional()
}).strict();

export const pdScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.pdScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => pdScalarWhereWithAggregatesInputSchema),z.lazy(() => pdScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => pdScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => pdScalarWhereWithAggregatesInputSchema),z.lazy(() => pdScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  pd_modality: z.union([ z.lazy(() => Enumpd_pd_modalityWithAggregatesFilterSchema),z.lazy(() => pd_pd_modalitySchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => Enumpd_solution_per_inputWithAggregatesFilterSchema),z.lazy(() => pd_solution_per_inputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  icodextrin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const regionWhereInputSchema: z.ZodType<Prisma.regionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => regionWhereInputSchema),z.lazy(() => regionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => regionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => regionWhereInputSchema),z.lazy(() => regionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  patient: z.lazy(() => PatientListRelationFilterSchema).optional()
}).strict();

export const regionOrderByWithRelationInputSchema: z.ZodType<Prisma.regionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  patient: z.lazy(() => patientOrderByRelationAggregateInputSchema).optional()
}).strict();

export const regionWhereUniqueInputSchema: z.ZodType<Prisma.regionWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => regionWhereInputSchema),z.lazy(() => regionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => regionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => regionWhereInputSchema),z.lazy(() => regionWhereInputSchema).array() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  patient: z.lazy(() => PatientListRelationFilterSchema).optional()
}).strict());

export const regionOrderByWithAggregationInputSchema: z.ZodType<Prisma.regionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => regionCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => regionAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => regionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => regionMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => regionSumOrderByAggregateInputSchema).optional()
}).strict();

export const regionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.regionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => regionScalarWhereWithAggregatesInputSchema),z.lazy(() => regionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => regionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => regionScalarWhereWithAggregatesInputSchema),z.lazy(() => regionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  weight: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const staffWhereInputSchema: z.ZodType<Prisma.staffWhereInput> = z.object({
  AND: z.union([ z.lazy(() => staffWhereInputSchema),z.lazy(() => staffWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => staffWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => staffWhereInputSchema),z.lazy(() => staffWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => Enumstaff_roleNullableFilterSchema),z.lazy(() => staff_roleSchema) ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => PdListRelationFilterSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => PdListRelationFilterSchema).optional()
}).strict();

export const staffOrderByWithRelationInputSchema: z.ZodType<Prisma.staffOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousOrderByRelationAggregateInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousOrderByRelationAggregateInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentOrderByRelationAggregateInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentOrderByRelationAggregateInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousOrderByRelationAggregateInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousOrderByRelationAggregateInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientOrderByRelationAggregateInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientOrderByRelationAggregateInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientOrderByRelationAggregateInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdOrderByRelationAggregateInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdOrderByRelationAggregateInputSchema).optional()
}).strict();

export const staffWhereUniqueInputSchema: z.ZodType<Prisma.staffWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    username: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    username: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  username: z.string().optional(),
  AND: z.union([ z.lazy(() => staffWhereInputSchema),z.lazy(() => staffWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => staffWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => staffWhereInputSchema),z.lazy(() => staffWhereInputSchema).array() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => Enumstaff_roleNullableFilterSchema),z.lazy(() => staff_roleSchema) ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => InfectiousListRelationFilterSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => Kidney_assessmentListRelationFilterSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => NoninfectiousListRelationFilterSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => PatientListRelationFilterSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => PdListRelationFilterSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => PdListRelationFilterSchema).optional()
}).strict());

export const staffOrderByWithAggregationInputSchema: z.ZodType<Prisma.staffOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  active: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => staffCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => staffAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => staffMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => staffMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => staffSumOrderByAggregateInputSchema).optional()
}).strict();

export const staffScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.staffScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => staffScalarWhereWithAggregatesInputSchema),z.lazy(() => staffScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => staffScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => staffScalarWhereWithAggregatesInputSchema),z.lazy(() => staffScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  first_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => Enumstaff_roleNullableWithAggregatesFilterSchema),z.lazy(() => staff_roleSchema) ]).optional().nullable(),
  username: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  active: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const infectiousWhereInputSchema: z.ZodType<Prisma.infectiousWhereInput> = z.object({
  AND: z.union([ z.lazy(() => infectiousWhereInputSchema),z.lazy(() => infectiousWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => infectiousWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => infectiousWhereInputSchema),z.lazy(() => infectiousWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  infection_type: z.union([ z.lazy(() => Enuminfectious_infection_typeFilterSchema),z.lazy(() => infectious_infection_typeSchema) ]).optional(),
  infection_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  infection_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  staphylococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  streptococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  intestinal_stick: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pseudomona: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enterococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  candida: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  treatment_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  treatment_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vancomycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftazidime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftriaxone: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefepime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meropenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  imipenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ciprofloxacin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefazolin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  gentamicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  clindamycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rifampicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rluconazole: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  staff_infectious_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_infectious_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousOrderByWithRelationInputSchema: z.ZodType<Prisma.infectiousOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  infection_type: z.lazy(() => SortOrderSchema).optional(),
  infection_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  infection_end_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staphylococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  streptococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intestinal_stick: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pseudomona: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enterococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  candida: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  treatment_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  treatment_end_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  vancomycin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ceftazidime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ceftriaxone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cefepime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meropenem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imipenem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ciprofloxacin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cefazolin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gentamicin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  clindamycin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rifampicin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rluconazole: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staff_infectious_created_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  patient: z.lazy(() => patientOrderByWithRelationInputSchema).optional(),
  staff_infectious_updated_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional()
}).strict();

export const infectiousWhereUniqueInputSchema: z.ZodType<Prisma.infectiousWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => infectiousWhereInputSchema),z.lazy(() => infectiousWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => infectiousWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => infectiousWhereInputSchema),z.lazy(() => infectiousWhereInputSchema).array() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  infection_type: z.union([ z.lazy(() => Enuminfectious_infection_typeFilterSchema),z.lazy(() => infectious_infection_typeSchema) ]).optional(),
  infection_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  infection_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  staphylococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  streptococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  intestinal_stick: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pseudomona: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enterococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  candida: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  treatment_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  treatment_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vancomycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftazidime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftriaxone: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefepime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meropenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  imipenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ciprofloxacin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefazolin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  gentamicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  clindamycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rifampicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rluconazole: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  staff_infectious_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_infectious_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict());

export const infectiousOrderByWithAggregationInputSchema: z.ZodType<Prisma.infectiousOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  infection_type: z.lazy(() => SortOrderSchema).optional(),
  infection_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  infection_end_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staphylococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  streptococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  intestinal_stick: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pseudomona: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  enterococcus: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  candida: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  treatment_start_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  treatment_end_date: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  vancomycin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ceftazidime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ceftriaxone: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cefepime: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  meropenem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  imipenem: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ciprofloxacin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  cefazolin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gentamicin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  clindamycin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rifampicin: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rluconazole: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => infectiousCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => infectiousAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => infectiousMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => infectiousMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => infectiousSumOrderByAggregateInputSchema).optional()
}).strict();

export const infectiousScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.infectiousScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => infectiousScalarWhereWithAggregatesInputSchema),z.lazy(() => infectiousScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => infectiousScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => infectiousScalarWhereWithAggregatesInputSchema),z.lazy(() => infectiousScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  infection_type: z.union([ z.lazy(() => Enuminfectious_infection_typeWithAggregatesFilterSchema),z.lazy(() => infectious_infection_typeSchema) ]).optional(),
  infection_start_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  infection_end_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  staphylococcus: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  streptococcus: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  intestinal_stick: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  pseudomona: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  enterococcus: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  candida: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  treatment_start_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  treatment_end_date: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  vancomycin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  ceftazidime: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  ceftriaxone: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cefepime: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  meropenem: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  imipenem: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  ciprofloxacin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  cefazolin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  gentamicin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  clindamycin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  rifampicin: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  rluconazole: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const kidney_assessmentWhereInputSchema: z.ZodType<Prisma.kidney_assessmentWhereInput> = z.object({
  AND: z.union([ z.lazy(() => kidney_assessmentWhereInputSchema),z.lazy(() => kidney_assessmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => kidney_assessmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => kidney_assessmentWhereInputSchema),z.lazy(() => kidney_assessmentWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  check_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  gfr: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  pet: z.union([ z.lazy(() => Enumkidney_assessment_petNullableFilterSchema),z.lazy(() => kidney_assessment_petSchema) ]).optional().nullable(),
  ktv: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ka_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_kidney_assessment_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentOrderByWithRelationInputSchema: z.ZodType<Prisma.kidney_assessmentOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  check_date: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pet: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ktv: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ka_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  patient: z.lazy(() => patientOrderByWithRelationInputSchema).optional(),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional()
}).strict();

export const kidney_assessmentWhereUniqueInputSchema: z.ZodType<Prisma.kidney_assessmentWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => kidney_assessmentWhereInputSchema),z.lazy(() => kidney_assessmentWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => kidney_assessmentWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => kidney_assessmentWhereInputSchema),z.lazy(() => kidney_assessmentWhereInputSchema).array() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  check_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  gfr: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  pet: z.union([ z.lazy(() => Enumkidney_assessment_petNullableFilterSchema),z.lazy(() => kidney_assessment_petSchema) ]).optional().nullable(),
  ktv: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ka_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_kidney_assessment_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict());

export const kidney_assessmentOrderByWithAggregationInputSchema: z.ZodType<Prisma.kidney_assessmentOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  check_date: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  pet: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ktv: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  ka_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => kidney_assessmentCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => kidney_assessmentAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => kidney_assessmentMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => kidney_assessmentMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => kidney_assessmentSumOrderByAggregateInputSchema).optional()
}).strict();

export const kidney_assessmentScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.kidney_assessmentScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => kidney_assessmentScalarWhereWithAggregatesInputSchema),z.lazy(() => kidney_assessmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => kidney_assessmentScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => kidney_assessmentScalarWhereWithAggregatesInputSchema),z.lazy(() => kidney_assessmentScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  check_date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  gfr: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  pet: z.union([ z.lazy(() => Enumkidney_assessment_petNullableWithAggregatesFilterSchema),z.lazy(() => kidney_assessment_petSchema) ]).optional().nullable(),
  ktv: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  ka_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const noninfectiousWhereInputSchema: z.ZodType<Prisma.noninfectiousWhereInput> = z.object({
  AND: z.union([ z.lazy(() => noninfectiousWhereInputSchema),z.lazy(() => noninfectiousWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => noninfectiousWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => noninfectiousWhereInputSchema),z.lazy(() => noninfectiousWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hernia: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_positioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_malposition: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_rinking: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_repositioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hydrothorax: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  abdominal_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  genital_discharge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hepomeritoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chyloperitoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_decrease: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  eps: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  staff_noninfectious_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_noninfectious_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousOrderByWithRelationInputSchema: z.ZodType<Prisma.noninfectiousOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hernia: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_positioning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_malposition: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_rinking: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_repositioning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_leakage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hydrothorax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  abdominal_leakage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  genital_discharge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hepomeritoneum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chyloperitoneum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_decrease: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eps: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional(),
  patient: z.lazy(() => patientOrderByWithRelationInputSchema).optional(),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffOrderByWithRelationInputSchema).optional()
}).strict();

export const noninfectiousWhereUniqueInputSchema: z.ZodType<Prisma.noninfectiousWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => noninfectiousWhereInputSchema),z.lazy(() => noninfectiousWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => noninfectiousWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => noninfectiousWhereInputSchema),z.lazy(() => noninfectiousWhereInputSchema).array() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hernia: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_positioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_malposition: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_rinking: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_repositioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hydrothorax: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  abdominal_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  genital_discharge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hepomeritoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chyloperitoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_decrease: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  eps: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  staff_noninfectious_created_byTostaff: z.union([ z.lazy(() => StaffRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional(),
  patient: z.union([ z.lazy(() => PatientRelationFilterSchema),z.lazy(() => patientWhereInputSchema) ]).optional(),
  staff_noninfectious_updated_byTostaff: z.union([ z.lazy(() => StaffNullableRelationFilterSchema),z.lazy(() => staffWhereInputSchema) ]).optional().nullable(),
}).strict());

export const noninfectiousOrderByWithAggregationInputSchema: z.ZodType<Prisma.noninfectiousOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hernia: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_positioning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_malposition: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_rinking: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_repositioning: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_leakage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hydrothorax: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  abdominal_leakage: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  genital_discharge: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hepomeritoneum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chyloperitoneum: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  catheter_decrease: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  eps: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  other_comment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => noninfectiousCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => noninfectiousAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => noninfectiousMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => noninfectiousMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => noninfectiousSumOrderByAggregateInputSchema).optional()
}).strict();

export const noninfectiousScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.noninfectiousScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => noninfectiousScalarWhereWithAggregatesInputSchema),z.lazy(() => noninfectiousScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => noninfectiousScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => noninfectiousScalarWhereWithAggregatesInputSchema),z.lazy(() => noninfectiousScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  hernia: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_positioning: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_malposition: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_rinking: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_repositioning: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_leakage: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  hydrothorax: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  abdominal_leakage: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  genital_discharge: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  hepomeritoneum: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  chyloperitoneum: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_decrease: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  eps: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const departmentCreateInputSchema: z.ZodType<Prisma.departmentCreateInput> = z.object({
  name: z.string(),
  weight: z.number().int().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const departmentUncheckedCreateInputSchema: z.ZodType<Prisma.departmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable(),
  patient: z.lazy(() => patientUncheckedCreateNestedManyWithoutDepartmentInputSchema).optional()
}).strict();

export const departmentUpdateInputSchema: z.ZodType<Prisma.departmentUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const departmentUncheckedUpdateInputSchema: z.ZodType<Prisma.departmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUncheckedUpdateManyWithoutDepartmentNestedInputSchema).optional()
}).strict();

export const departmentCreateManyInputSchema: z.ZodType<Prisma.departmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const departmentUpdateManyMutationInputSchema: z.ZodType<Prisma.departmentUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const departmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.departmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const patientCreateInputSchema: z.ZodType<Prisma.patientCreateInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateInputSchema: z.ZodType<Prisma.patientUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUpdateInputSchema: z.ZodType<Prisma.patientUpdateInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateInputSchema: z.ZodType<Prisma.patientUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientCreateManyInputSchema: z.ZodType<Prisma.patientCreateManyInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const patientUpdateManyMutationInputSchema: z.ZodType<Prisma.patientUpdateManyMutationInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const patientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdCreateInputSchema: z.ZodType<Prisma.pdCreateInput> = z.object({
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutPdInputSchema),
  staff_pd_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const pdUncheckedCreateInputSchema: z.ZodType<Prisma.pdUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdUpdateInputSchema: z.ZodType<Prisma.pdUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPd_pd_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutPdNestedInputSchema).optional(),
  staff_pd_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPd_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const pdUncheckedUpdateInputSchema: z.ZodType<Prisma.pdUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdCreateManyInputSchema: z.ZodType<Prisma.pdCreateManyInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdUpdateManyMutationInputSchema: z.ZodType<Prisma.pdUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdUncheckedUpdateManyInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const regionCreateInputSchema: z.ZodType<Prisma.regionCreateInput> = z.object({
  name: z.string(),
  weight: z.number().int().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const regionUncheckedCreateInputSchema: z.ZodType<Prisma.regionUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable(),
  patient: z.lazy(() => patientUncheckedCreateNestedManyWithoutRegionInputSchema).optional()
}).strict();

export const regionUpdateInputSchema: z.ZodType<Prisma.regionUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const regionUncheckedUpdateInputSchema: z.ZodType<Prisma.regionUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUncheckedUpdateManyWithoutRegionNestedInputSchema).optional()
}).strict();

export const regionCreateManyInputSchema: z.ZodType<Prisma.regionCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const regionUpdateManyMutationInputSchema: z.ZodType<Prisma.regionUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const regionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.regionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const staffCreateInputSchema: z.ZodType<Prisma.staffCreateInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateInputSchema: z.ZodType<Prisma.staffUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUpdateInputSchema: z.ZodType<Prisma.staffUpdateInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateInputSchema: z.ZodType<Prisma.staffUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffCreateManyInputSchema: z.ZodType<Prisma.staffCreateManyInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable()
}).strict();

export const staffUpdateManyMutationInputSchema: z.ZodType<Prisma.staffUpdateManyMutationInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const staffUncheckedUpdateManyInputSchema: z.ZodType<Prisma.staffUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousCreateInputSchema: z.ZodType<Prisma.infectiousCreateInput> = z.object({
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutInfectiousInputSchema),
  staff_infectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_updated_byTostaffInputSchema).optional()
}).strict();

export const infectiousUncheckedCreateInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousUpdateInputSchema: z.ZodType<Prisma.infectiousUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutInfectious_infectious_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutInfectiousNestedInputSchema).optional(),
  staff_infectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutInfectious_infectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const infectiousUncheckedUpdateInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousCreateManyInputSchema: z.ZodType<Prisma.infectiousCreateManyInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousUpdateManyMutationInputSchema: z.ZodType<Prisma.infectiousUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousUncheckedUpdateManyInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentCreateInputSchema: z.ZodType<Prisma.kidney_assessmentCreateInput> = z.object({
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutKidney_assessmentInputSchema),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedCreateInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentUpdateInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateInput> = z.object({
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutKidney_assessment_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutKidney_assessmentNestedInputSchema).optional(),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedUpdateInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentCreateManyInputSchema: z.ZodType<Prisma.kidney_assessmentCreateManyInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentUpdateManyMutationInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyMutationInput> = z.object({
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousCreateInputSchema: z.ZodType<Prisma.noninfectiousCreateInput> = z.object({
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutNoninfectiousInputSchema),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional()
}).strict();

export const noninfectiousUncheckedCreateInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousUpdateInputSchema: z.ZodType<Prisma.noninfectiousUpdateInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutNoninfectious_noninfectious_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutNoninfectiousNestedInputSchema).optional(),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutNoninfectious_noninfectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const noninfectiousUncheckedUpdateInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousCreateManyInputSchema: z.ZodType<Prisma.noninfectiousCreateManyInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousUpdateManyMutationInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyMutationInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousUncheckedUpdateManyInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const PatientListRelationFilterSchema: z.ZodType<Prisma.PatientListRelationFilter> = z.object({
  every: z.lazy(() => patientWhereInputSchema).optional(),
  some: z.lazy(() => patientWhereInputSchema).optional(),
  none: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const patientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.patientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const departmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.departmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const departmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.departmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const departmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.departmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const departmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.departmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const departmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.departmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const Enumpatient_sexFilterSchema: z.ZodType<Prisma.Enumpatient_sexFilter> = z.object({
  equals: z.lazy(() => patient_sexSchema).optional(),
  in: z.lazy(() => patient_sexSchema).array().optional(),
  notIn: z.lazy(() => patient_sexSchema).array().optional(),
  not: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => NestedEnumpatient_sexFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumpatient_mors_reasonNullableFilterSchema: z.ZodType<Prisma.Enumpatient_mors_reasonNullableFilter> = z.object({
  equals: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  in: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  notIn: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const InfectiousListRelationFilterSchema: z.ZodType<Prisma.InfectiousListRelationFilter> = z.object({
  every: z.lazy(() => infectiousWhereInputSchema).optional(),
  some: z.lazy(() => infectiousWhereInputSchema).optional(),
  none: z.lazy(() => infectiousWhereInputSchema).optional()
}).strict();

export const Kidney_assessmentListRelationFilterSchema: z.ZodType<Prisma.Kidney_assessmentListRelationFilter> = z.object({
  every: z.lazy(() => kidney_assessmentWhereInputSchema).optional(),
  some: z.lazy(() => kidney_assessmentWhereInputSchema).optional(),
  none: z.lazy(() => kidney_assessmentWhereInputSchema).optional()
}).strict();

export const NoninfectiousListRelationFilterSchema: z.ZodType<Prisma.NoninfectiousListRelationFilter> = z.object({
  every: z.lazy(() => noninfectiousWhereInputSchema).optional(),
  some: z.lazy(() => noninfectiousWhereInputSchema).optional(),
  none: z.lazy(() => noninfectiousWhereInputSchema).optional()
}).strict();

export const StaffRelationFilterSchema: z.ZodType<Prisma.StaffRelationFilter> = z.object({
  is: z.lazy(() => staffWhereInputSchema).optional(),
  isNot: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const DepartmentRelationFilterSchema: z.ZodType<Prisma.DepartmentRelationFilter> = z.object({
  is: z.lazy(() => departmentWhereInputSchema).optional(),
  isNot: z.lazy(() => departmentWhereInputSchema).optional()
}).strict();

export const RegionRelationFilterSchema: z.ZodType<Prisma.RegionRelationFilter> = z.object({
  is: z.lazy(() => regionWhereInputSchema).optional(),
  isNot: z.lazy(() => regionWhereInputSchema).optional()
}).strict();

export const StaffNullableRelationFilterSchema: z.ZodType<Prisma.StaffNullableRelationFilter> = z.object({
  is: z.lazy(() => staffWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => staffWhereInputSchema).optional().nullable()
}).strict();

export const PdListRelationFilterSchema: z.ZodType<Prisma.PdListRelationFilter> = z.object({
  every: z.lazy(() => pdWhereInputSchema).optional(),
  some: z.lazy(() => pdWhereInputSchema).optional(),
  none: z.lazy(() => pdWhereInputSchema).optional()
}).strict();

export const infectiousOrderByRelationAggregateInputSchema: z.ZodType<Prisma.infectiousOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const kidney_assessmentOrderByRelationAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const noninfectiousOrderByRelationAggregateInputSchema: z.ZodType<Prisma.noninfectiousOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const pdOrderByRelationAggregateInputSchema: z.ZodType<Prisma.pdOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientCountOrderByAggregateInputSchema: z.ZodType<Prisma.patientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  personal_id: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  transplantation_date: z.lazy(() => SortOrderSchema).optional(),
  pd_transit_date: z.lazy(() => SortOrderSchema).optional(),
  md_diabetes: z.lazy(() => SortOrderSchema).optional(),
  md_hypertension: z.lazy(() => SortOrderSchema).optional(),
  md_glomerulonephritis: z.lazy(() => SortOrderSchema).optional(),
  md_adptd: z.lazy(() => SortOrderSchema).optional(),
  md_lupus: z.lazy(() => SortOrderSchema).optional(),
  md_vasculitis: z.lazy(() => SortOrderSchema).optional(),
  md_amyloidosis: z.lazy(() => SortOrderSchema).optional(),
  md_unknown: z.lazy(() => SortOrderSchema).optional(),
  md_other: z.lazy(() => SortOrderSchema).optional(),
  md_other_comment: z.lazy(() => SortOrderSchema).optional(),
  cd_heart: z.lazy(() => SortOrderSchema).optional(),
  cd_cancer: z.lazy(() => SortOrderSchema).optional(),
  cd_a_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_p_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_cirrhosis: z.lazy(() => SortOrderSchema).optional(),
  cd_demention: z.lazy(() => SortOrderSchema).optional(),
  cd_pqod: z.lazy(() => SortOrderSchema).optional(),
  cd_other: z.lazy(() => SortOrderSchema).optional(),
  cd_other_comment: z.lazy(() => SortOrderSchema).optional(),
  mors: z.lazy(() => SortOrderSchema).optional(),
  mors_date: z.lazy(() => SortOrderSchema).optional(),
  mors_reason: z.lazy(() => SortOrderSchema).optional(),
  mors_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientAvgOrderByAggregateInputSchema: z.ZodType<Prisma.patientAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.patientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  personal_id: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  transplantation_date: z.lazy(() => SortOrderSchema).optional(),
  pd_transit_date: z.lazy(() => SortOrderSchema).optional(),
  md_diabetes: z.lazy(() => SortOrderSchema).optional(),
  md_hypertension: z.lazy(() => SortOrderSchema).optional(),
  md_glomerulonephritis: z.lazy(() => SortOrderSchema).optional(),
  md_adptd: z.lazy(() => SortOrderSchema).optional(),
  md_lupus: z.lazy(() => SortOrderSchema).optional(),
  md_vasculitis: z.lazy(() => SortOrderSchema).optional(),
  md_amyloidosis: z.lazy(() => SortOrderSchema).optional(),
  md_unknown: z.lazy(() => SortOrderSchema).optional(),
  md_other: z.lazy(() => SortOrderSchema).optional(),
  md_other_comment: z.lazy(() => SortOrderSchema).optional(),
  cd_heart: z.lazy(() => SortOrderSchema).optional(),
  cd_cancer: z.lazy(() => SortOrderSchema).optional(),
  cd_a_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_p_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_cirrhosis: z.lazy(() => SortOrderSchema).optional(),
  cd_demention: z.lazy(() => SortOrderSchema).optional(),
  cd_pqod: z.lazy(() => SortOrderSchema).optional(),
  cd_other: z.lazy(() => SortOrderSchema).optional(),
  cd_other_comment: z.lazy(() => SortOrderSchema).optional(),
  mors: z.lazy(() => SortOrderSchema).optional(),
  mors_date: z.lazy(() => SortOrderSchema).optional(),
  mors_reason: z.lazy(() => SortOrderSchema).optional(),
  mors_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientMinOrderByAggregateInputSchema: z.ZodType<Prisma.patientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  birth_date: z.lazy(() => SortOrderSchema).optional(),
  personal_id: z.lazy(() => SortOrderSchema).optional(),
  sex: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  transplantation_date: z.lazy(() => SortOrderSchema).optional(),
  pd_transit_date: z.lazy(() => SortOrderSchema).optional(),
  md_diabetes: z.lazy(() => SortOrderSchema).optional(),
  md_hypertension: z.lazy(() => SortOrderSchema).optional(),
  md_glomerulonephritis: z.lazy(() => SortOrderSchema).optional(),
  md_adptd: z.lazy(() => SortOrderSchema).optional(),
  md_lupus: z.lazy(() => SortOrderSchema).optional(),
  md_vasculitis: z.lazy(() => SortOrderSchema).optional(),
  md_amyloidosis: z.lazy(() => SortOrderSchema).optional(),
  md_unknown: z.lazy(() => SortOrderSchema).optional(),
  md_other: z.lazy(() => SortOrderSchema).optional(),
  md_other_comment: z.lazy(() => SortOrderSchema).optional(),
  cd_heart: z.lazy(() => SortOrderSchema).optional(),
  cd_cancer: z.lazy(() => SortOrderSchema).optional(),
  cd_a_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_p_pressure: z.lazy(() => SortOrderSchema).optional(),
  cd_cirrhosis: z.lazy(() => SortOrderSchema).optional(),
  cd_demention: z.lazy(() => SortOrderSchema).optional(),
  cd_pqod: z.lazy(() => SortOrderSchema).optional(),
  cd_other: z.lazy(() => SortOrderSchema).optional(),
  cd_other_comment: z.lazy(() => SortOrderSchema).optional(),
  mors: z.lazy(() => SortOrderSchema).optional(),
  mors_date: z.lazy(() => SortOrderSchema).optional(),
  mors_reason: z.lazy(() => SortOrderSchema).optional(),
  mors_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientSumOrderByAggregateInputSchema: z.ZodType<Prisma.patientSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bmi: z.lazy(() => SortOrderSchema).optional(),
  doctor_id: z.lazy(() => SortOrderSchema).optional(),
  department_id: z.lazy(() => SortOrderSchema).optional(),
  region_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const Enumpatient_sexWithAggregatesFilterSchema: z.ZodType<Prisma.Enumpatient_sexWithAggregatesFilter> = z.object({
  equals: z.lazy(() => patient_sexSchema).optional(),
  in: z.lazy(() => patient_sexSchema).array().optional(),
  notIn: z.lazy(() => patient_sexSchema).array().optional(),
  not: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => NestedEnumpatient_sexWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpatient_sexFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpatient_sexFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const Enumpatient_mors_reasonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumpatient_mors_reasonNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  in: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  notIn: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NestedEnumpatient_mors_reasonNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema).optional()
}).strict();

export const Enumpd_pd_modalityFilterSchema: z.ZodType<Prisma.Enumpd_pd_modalityFilter> = z.object({
  equals: z.lazy(() => pd_pd_modalitySchema).optional(),
  in: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  notIn: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  not: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => NestedEnumpd_pd_modalityFilterSchema) ]).optional(),
}).strict();

export const Enumpd_solution_per_inputFilterSchema: z.ZodType<Prisma.Enumpd_solution_per_inputFilter> = z.object({
  equals: z.lazy(() => pd_solution_per_inputSchema).optional(),
  in: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  notIn: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  not: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema) ]).optional(),
}).strict();

export const PatientRelationFilterSchema: z.ZodType<Prisma.PatientRelationFilter> = z.object({
  is: z.lazy(() => patientWhereInputSchema).optional(),
  isNot: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const pdCountOrderByAggregateInputSchema: z.ZodType<Prisma.pdCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  pd_modality: z.lazy(() => SortOrderSchema).optional(),
  solution_per_input: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_136: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_227: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_386: z.lazy(() => SortOrderSchema).optional(),
  icodextrin: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const pdAvgOrderByAggregateInputSchema: z.ZodType<Prisma.pdAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const pdMaxOrderByAggregateInputSchema: z.ZodType<Prisma.pdMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  pd_modality: z.lazy(() => SortOrderSchema).optional(),
  solution_per_input: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_136: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_227: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_386: z.lazy(() => SortOrderSchema).optional(),
  icodextrin: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const pdMinOrderByAggregateInputSchema: z.ZodType<Prisma.pdMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  pd_modality: z.lazy(() => SortOrderSchema).optional(),
  solution_per_input: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_136: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_227: z.lazy(() => SortOrderSchema).optional(),
  pd_ch_solution_386: z.lazy(() => SortOrderSchema).optional(),
  icodextrin: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const pdSumOrderByAggregateInputSchema: z.ZodType<Prisma.pdSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumpd_pd_modalityWithAggregatesFilterSchema: z.ZodType<Prisma.Enumpd_pd_modalityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => pd_pd_modalitySchema).optional(),
  in: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  notIn: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  not: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => NestedEnumpd_pd_modalityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpd_pd_modalityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpd_pd_modalityFilterSchema).optional()
}).strict();

export const Enumpd_solution_per_inputWithAggregatesFilterSchema: z.ZodType<Prisma.Enumpd_solution_per_inputWithAggregatesFilter> = z.object({
  equals: z.lazy(() => pd_solution_per_inputSchema).optional(),
  in: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  notIn: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  not: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => NestedEnumpd_solution_per_inputWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema).optional()
}).strict();

export const regionCountOrderByAggregateInputSchema: z.ZodType<Prisma.regionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const regionAvgOrderByAggregateInputSchema: z.ZodType<Prisma.regionAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const regionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.regionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const regionMinOrderByAggregateInputSchema: z.ZodType<Prisma.regionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const regionSumOrderByAggregateInputSchema: z.ZodType<Prisma.regionSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  weight: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumstaff_roleNullableFilterSchema: z.ZodType<Prisma.Enumstaff_roleNullableFilter> = z.object({
  equals: z.lazy(() => staff_roleSchema).optional().nullable(),
  in: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  notIn: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NestedEnumstaff_roleNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const staffCountOrderByAggregateInputSchema: z.ZodType<Prisma.staffCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const staffAvgOrderByAggregateInputSchema: z.ZodType<Prisma.staffAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const staffMaxOrderByAggregateInputSchema: z.ZodType<Prisma.staffMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const staffMinOrderByAggregateInputSchema: z.ZodType<Prisma.staffMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  first_name: z.lazy(() => SortOrderSchema).optional(),
  last_name: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  username: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  active: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const staffSumOrderByAggregateInputSchema: z.ZodType<Prisma.staffSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enumstaff_roleNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumstaff_roleNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => staff_roleSchema).optional().nullable(),
  in: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  notIn: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NestedEnumstaff_roleNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstaff_roleNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstaff_roleNullableFilterSchema).optional()
}).strict();

export const Enuminfectious_infection_typeFilterSchema: z.ZodType<Prisma.Enuminfectious_infection_typeFilter> = z.object({
  equals: z.lazy(() => infectious_infection_typeSchema).optional(),
  in: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  notIn: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema) ]).optional(),
}).strict();

export const infectiousCountOrderByAggregateInputSchema: z.ZodType<Prisma.infectiousCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  infection_type: z.lazy(() => SortOrderSchema).optional(),
  infection_start_date: z.lazy(() => SortOrderSchema).optional(),
  infection_end_date: z.lazy(() => SortOrderSchema).optional(),
  staphylococcus: z.lazy(() => SortOrderSchema).optional(),
  streptococcus: z.lazy(() => SortOrderSchema).optional(),
  intestinal_stick: z.lazy(() => SortOrderSchema).optional(),
  pseudomona: z.lazy(() => SortOrderSchema).optional(),
  enterococcus: z.lazy(() => SortOrderSchema).optional(),
  candida: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  treatment_start_date: z.lazy(() => SortOrderSchema).optional(),
  treatment_end_date: z.lazy(() => SortOrderSchema).optional(),
  vancomycin: z.lazy(() => SortOrderSchema).optional(),
  ceftazidime: z.lazy(() => SortOrderSchema).optional(),
  ceftriaxone: z.lazy(() => SortOrderSchema).optional(),
  cefepime: z.lazy(() => SortOrderSchema).optional(),
  meropenem: z.lazy(() => SortOrderSchema).optional(),
  imipenem: z.lazy(() => SortOrderSchema).optional(),
  ciprofloxacin: z.lazy(() => SortOrderSchema).optional(),
  cefazolin: z.lazy(() => SortOrderSchema).optional(),
  gentamicin: z.lazy(() => SortOrderSchema).optional(),
  clindamycin: z.lazy(() => SortOrderSchema).optional(),
  rifampicin: z.lazy(() => SortOrderSchema).optional(),
  rluconazole: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const infectiousAvgOrderByAggregateInputSchema: z.ZodType<Prisma.infectiousAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const infectiousMaxOrderByAggregateInputSchema: z.ZodType<Prisma.infectiousMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  infection_type: z.lazy(() => SortOrderSchema).optional(),
  infection_start_date: z.lazy(() => SortOrderSchema).optional(),
  infection_end_date: z.lazy(() => SortOrderSchema).optional(),
  staphylococcus: z.lazy(() => SortOrderSchema).optional(),
  streptococcus: z.lazy(() => SortOrderSchema).optional(),
  intestinal_stick: z.lazy(() => SortOrderSchema).optional(),
  pseudomona: z.lazy(() => SortOrderSchema).optional(),
  enterococcus: z.lazy(() => SortOrderSchema).optional(),
  candida: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  treatment_start_date: z.lazy(() => SortOrderSchema).optional(),
  treatment_end_date: z.lazy(() => SortOrderSchema).optional(),
  vancomycin: z.lazy(() => SortOrderSchema).optional(),
  ceftazidime: z.lazy(() => SortOrderSchema).optional(),
  ceftriaxone: z.lazy(() => SortOrderSchema).optional(),
  cefepime: z.lazy(() => SortOrderSchema).optional(),
  meropenem: z.lazy(() => SortOrderSchema).optional(),
  imipenem: z.lazy(() => SortOrderSchema).optional(),
  ciprofloxacin: z.lazy(() => SortOrderSchema).optional(),
  cefazolin: z.lazy(() => SortOrderSchema).optional(),
  gentamicin: z.lazy(() => SortOrderSchema).optional(),
  clindamycin: z.lazy(() => SortOrderSchema).optional(),
  rifampicin: z.lazy(() => SortOrderSchema).optional(),
  rluconazole: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const infectiousMinOrderByAggregateInputSchema: z.ZodType<Prisma.infectiousMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  infection_type: z.lazy(() => SortOrderSchema).optional(),
  infection_start_date: z.lazy(() => SortOrderSchema).optional(),
  infection_end_date: z.lazy(() => SortOrderSchema).optional(),
  staphylococcus: z.lazy(() => SortOrderSchema).optional(),
  streptococcus: z.lazy(() => SortOrderSchema).optional(),
  intestinal_stick: z.lazy(() => SortOrderSchema).optional(),
  pseudomona: z.lazy(() => SortOrderSchema).optional(),
  enterococcus: z.lazy(() => SortOrderSchema).optional(),
  candida: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  treatment_start_date: z.lazy(() => SortOrderSchema).optional(),
  treatment_end_date: z.lazy(() => SortOrderSchema).optional(),
  vancomycin: z.lazy(() => SortOrderSchema).optional(),
  ceftazidime: z.lazy(() => SortOrderSchema).optional(),
  ceftriaxone: z.lazy(() => SortOrderSchema).optional(),
  cefepime: z.lazy(() => SortOrderSchema).optional(),
  meropenem: z.lazy(() => SortOrderSchema).optional(),
  imipenem: z.lazy(() => SortOrderSchema).optional(),
  ciprofloxacin: z.lazy(() => SortOrderSchema).optional(),
  cefazolin: z.lazy(() => SortOrderSchema).optional(),
  gentamicin: z.lazy(() => SortOrderSchema).optional(),
  clindamycin: z.lazy(() => SortOrderSchema).optional(),
  rifampicin: z.lazy(() => SortOrderSchema).optional(),
  rluconazole: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const infectiousSumOrderByAggregateInputSchema: z.ZodType<Prisma.infectiousSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Enuminfectious_infection_typeWithAggregatesFilterSchema: z.ZodType<Prisma.Enuminfectious_infection_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => infectious_infection_typeSchema).optional(),
  in: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  notIn: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => NestedEnuminfectious_infection_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema).optional()
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const Enumkidney_assessment_petNullableFilterSchema: z.ZodType<Prisma.Enumkidney_assessment_petNullableFilter> = z.object({
  equals: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  in: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  notIn: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentCountOrderByAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  check_date: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.lazy(() => SortOrderSchema).optional(),
  pet: z.lazy(() => SortOrderSchema).optional(),
  ktv: z.lazy(() => SortOrderSchema).optional(),
  ka_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const kidney_assessmentAvgOrderByAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.lazy(() => SortOrderSchema).optional(),
  ktv: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const kidney_assessmentMaxOrderByAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  check_date: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.lazy(() => SortOrderSchema).optional(),
  pet: z.lazy(() => SortOrderSchema).optional(),
  ktv: z.lazy(() => SortOrderSchema).optional(),
  ka_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const kidney_assessmentMinOrderByAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  check_date: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.lazy(() => SortOrderSchema).optional(),
  pet: z.lazy(() => SortOrderSchema).optional(),
  ktv: z.lazy(() => SortOrderSchema).optional(),
  ka_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const kidney_assessmentSumOrderByAggregateInputSchema: z.ZodType<Prisma.kidney_assessmentSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  gfr: z.lazy(() => SortOrderSchema).optional(),
  ktv: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const Enumkidney_assessment_petNullableWithAggregatesFilterSchema: z.ZodType<Prisma.Enumkidney_assessment_petNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  in: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  notIn: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NestedEnumkidney_assessment_petNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema).optional()
}).strict();

export const noninfectiousCountOrderByAggregateInputSchema: z.ZodType<Prisma.noninfectiousCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hernia: z.lazy(() => SortOrderSchema).optional(),
  catheter_positioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_malposition: z.lazy(() => SortOrderSchema).optional(),
  catheter_intraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_extraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_rinking: z.lazy(() => SortOrderSchema).optional(),
  catheter_repositioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_leakage: z.lazy(() => SortOrderSchema).optional(),
  hydrothorax: z.lazy(() => SortOrderSchema).optional(),
  abdominal_leakage: z.lazy(() => SortOrderSchema).optional(),
  genital_discharge: z.lazy(() => SortOrderSchema).optional(),
  hepomeritoneum: z.lazy(() => SortOrderSchema).optional(),
  chyloperitoneum: z.lazy(() => SortOrderSchema).optional(),
  catheter_decrease: z.lazy(() => SortOrderSchema).optional(),
  eps: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const noninfectiousAvgOrderByAggregateInputSchema: z.ZodType<Prisma.noninfectiousAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const noninfectiousMaxOrderByAggregateInputSchema: z.ZodType<Prisma.noninfectiousMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hernia: z.lazy(() => SortOrderSchema).optional(),
  catheter_positioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_malposition: z.lazy(() => SortOrderSchema).optional(),
  catheter_intraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_extraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_rinking: z.lazy(() => SortOrderSchema).optional(),
  catheter_repositioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_leakage: z.lazy(() => SortOrderSchema).optional(),
  hydrothorax: z.lazy(() => SortOrderSchema).optional(),
  abdominal_leakage: z.lazy(() => SortOrderSchema).optional(),
  genital_discharge: z.lazy(() => SortOrderSchema).optional(),
  hepomeritoneum: z.lazy(() => SortOrderSchema).optional(),
  chyloperitoneum: z.lazy(() => SortOrderSchema).optional(),
  catheter_decrease: z.lazy(() => SortOrderSchema).optional(),
  eps: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const noninfectiousMinOrderByAggregateInputSchema: z.ZodType<Prisma.noninfectiousMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  date: z.lazy(() => SortOrderSchema).optional(),
  hernia: z.lazy(() => SortOrderSchema).optional(),
  catheter_positioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_malposition: z.lazy(() => SortOrderSchema).optional(),
  catheter_intraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_extraluminal_occlusion: z.lazy(() => SortOrderSchema).optional(),
  catheter_rinking: z.lazy(() => SortOrderSchema).optional(),
  catheter_repositioning: z.lazy(() => SortOrderSchema).optional(),
  catheter_leakage: z.lazy(() => SortOrderSchema).optional(),
  hydrothorax: z.lazy(() => SortOrderSchema).optional(),
  abdominal_leakage: z.lazy(() => SortOrderSchema).optional(),
  genital_discharge: z.lazy(() => SortOrderSchema).optional(),
  hepomeritoneum: z.lazy(() => SortOrderSchema).optional(),
  chyloperitoneum: z.lazy(() => SortOrderSchema).optional(),
  catheter_decrease: z.lazy(() => SortOrderSchema).optional(),
  eps: z.lazy(() => SortOrderSchema).optional(),
  other: z.lazy(() => SortOrderSchema).optional(),
  other_comment: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const noninfectiousSumOrderByAggregateInputSchema: z.ZodType<Prisma.noninfectiousSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  patient_id: z.lazy(() => SortOrderSchema).optional(),
  created_by: z.lazy(() => SortOrderSchema).optional(),
  updated_by: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const patientCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.patientCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientCreateWithoutDepartmentInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedCreateNestedManyWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUncheckedCreateNestedManyWithoutDepartmentInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientCreateWithoutDepartmentInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyDepartmentInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const patientUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.patientUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientCreateWithoutDepartmentInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const patientUncheckedUpdateManyWithoutDepartmentNestedInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutDepartmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientCreateWithoutDepartmentInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema),z.lazy(() => patientCreateOrConnectWithoutDepartmentInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyDepartmentInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutDepartmentInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutDepartmentInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutDepartmentInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutDepartmentInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.infectiousCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutPatient_patient_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const departmentCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.departmentCreateNestedOneWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => departmentCreateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => departmentCreateOrConnectWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => departmentWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_doctor_idTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const regionCreateNestedOneWithoutPatientInputSchema: z.ZodType<Prisma.regionCreateNestedOneWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => regionCreateWithoutPatientInputSchema),z.lazy(() => regionUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => regionCreateOrConnectWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => regionWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const pdCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.pdCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdCreateWithoutPatientInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema),z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedCreateNestedManyWithoutPatientInputSchema: z.ZodType<Prisma.pdUncheckedCreateNestedManyWithoutPatientInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdCreateWithoutPatientInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema),z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyPatientInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const Enumpatient_sexFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumpatient_sexFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => patient_sexSchema).optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumpatient_mors_reasonFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => patient_mors_reasonSchema).optional().nullable()
}).strict();

export const infectiousUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_created_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutPatient_patient_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_created_byTostaffInputSchema) ]).optional(),
}).strict();

export const departmentUpdateOneRequiredWithoutPatientNestedInputSchema: z.ZodType<Prisma.departmentUpdateOneRequiredWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => departmentCreateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => departmentCreateOrConnectWithoutPatientInputSchema).optional(),
  upsert: z.lazy(() => departmentUpsertWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => departmentWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => departmentUpdateToOneWithWhereWithoutPatientInputSchema),z.lazy(() => departmentUpdateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedUpdateWithoutPatientInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_doctor_idTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutPatient_patient_doctor_idTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUpdateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_doctor_idTostaffInputSchema) ]).optional(),
}).strict();

export const regionUpdateOneRequiredWithoutPatientNestedInputSchema: z.ZodType<Prisma.regionUpdateOneRequiredWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => regionCreateWithoutPatientInputSchema),z.lazy(() => regionUncheckedCreateWithoutPatientInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => regionCreateOrConnectWithoutPatientInputSchema).optional(),
  upsert: z.lazy(() => regionUpsertWithoutPatientInputSchema).optional(),
  connect: z.lazy(() => regionWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => regionUpdateToOneWithWhereWithoutPatientInputSchema),z.lazy(() => regionUpdateWithoutPatientInputSchema),z.lazy(() => regionUncheckedUpdateWithoutPatientInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_updated_byTostaffInputSchema) ]).optional(),
}).strict();

export const pdUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.pdUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdCreateWithoutPatientInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema),z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateWithoutPatientInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedUpdateManyWithoutPatientNestedInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutPatientNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdCreateWithoutPatientInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema),z.lazy(() => pdCreateOrConnectWithoutPatientInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyPatientInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutPatientInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutPatientInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutPatientInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutPatientInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const staffCreateNestedOneWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutPd_pd_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPd_pd_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const patientCreateNestedOneWithoutPdInputSchema: z.ZodType<Prisma.patientCreateNestedOneWithoutPdInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutPdInputSchema),z.lazy(() => patientUncheckedCreateWithoutPdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutPdInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutPd_pd_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPd_pd_updated_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const Enumpd_pd_modalityFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumpd_pd_modalityFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => pd_pd_modalitySchema).optional()
}).strict();

export const Enumpd_solution_per_inputFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enumpd_solution_per_inputFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => pd_solution_per_inputSchema).optional()
}).strict();

export const staffUpdateOneRequiredWithoutPd_pd_created_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutPd_pd_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPd_pd_created_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutPd_pd_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_created_byTostaffInputSchema) ]).optional(),
}).strict();

export const patientUpdateOneRequiredWithoutPdNestedInputSchema: z.ZodType<Prisma.patientUpdateOneRequiredWithoutPdNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutPdInputSchema),z.lazy(() => patientUncheckedCreateWithoutPdInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutPdInputSchema).optional(),
  upsert: z.lazy(() => patientUpsertWithoutPdInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => patientUpdateToOneWithWhereWithoutPdInputSchema),z.lazy(() => patientUpdateWithoutPdInputSchema),z.lazy(() => patientUncheckedUpdateWithoutPdInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneWithoutPd_pd_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneWithoutPd_pd_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutPd_pd_updated_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutPd_pd_updated_byTostaffInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_updated_byTostaffInputSchema) ]).optional(),
}).strict();

export const patientCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.patientCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientCreateWithoutRegionInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema),z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedCreateNestedManyWithoutRegionInputSchema: z.ZodType<Prisma.patientUncheckedCreateNestedManyWithoutRegionInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientCreateWithoutRegionInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema),z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyRegionInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.patientUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientCreateWithoutRegionInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema),z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedUpdateManyWithoutRegionNestedInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutRegionNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientCreateWithoutRegionInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema),z.lazy(() => patientCreateOrConnectWithoutRegionInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyRegionInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutRegionInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutRegionInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutRegionInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutRegionInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientCreateNestedManyWithoutStaff_patient_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdCreateNestedManyWithoutStaff_pd_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableEnumstaff_roleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumstaff_roleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => staff_roleSchema).optional().nullable()
}).strict();

export const infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema: z.ZodType<Prisma.patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema: z.ZodType<Prisma.patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema: z.ZodType<Prisma.pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array(),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => infectiousWhereUniqueInputSchema),z.lazy(() => infectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array(),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => kidney_assessmentWhereUniqueInputSchema),z.lazy(() => kidney_assessmentWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array(),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => noninfectiousWhereUniqueInputSchema),z.lazy(() => noninfectiousWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema).array(),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => patientWhereUniqueInputSchema),z.lazy(() => patientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema).array(),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  createMany: z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => pdWhereUniqueInputSchema),z.lazy(() => pdWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const staffCreateNestedOneWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutInfectious_infectious_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const patientCreateNestedOneWithoutInfectiousInputSchema: z.ZodType<Prisma.patientCreateNestedOneWithoutInfectiousInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutInfectiousInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutInfectiousInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutInfectious_infectious_updated_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const Enuminfectious_infection_typeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.Enuminfectious_infection_typeFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => infectious_infection_typeSchema).optional()
}).strict();

export const staffUpdateOneRequiredWithoutInfectious_infectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutInfectious_infectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutInfectious_infectious_created_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutInfectious_infectious_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_created_byTostaffInputSchema) ]).optional(),
}).strict();

export const patientUpdateOneRequiredWithoutInfectiousNestedInputSchema: z.ZodType<Prisma.patientUpdateOneRequiredWithoutInfectiousNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutInfectiousInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutInfectiousInputSchema).optional(),
  upsert: z.lazy(() => patientUpsertWithoutInfectiousInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => patientUpdateToOneWithWhereWithoutInfectiousInputSchema),z.lazy(() => patientUpdateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutInfectiousInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneWithoutInfectious_infectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneWithoutInfectious_infectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutInfectious_infectious_updated_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutInfectious_infectious_updated_byTostaffInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]).optional(),
}).strict();

export const staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const patientCreateNestedOneWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientCreateNestedOneWithoutKidney_assessmentInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutKidney_assessmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutKidney_assessmentInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableEnumkidney_assessment_petFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => kidney_assessment_petSchema).optional().nullable()
}).strict();

export const staffUpdateOneRequiredWithoutKidney_assessment_kidney_assessment_created_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutKidney_assessment_kidney_assessment_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]).optional(),
}).strict();

export const patientUpdateOneRequiredWithoutKidney_assessmentNestedInputSchema: z.ZodType<Prisma.patientUpdateOneRequiredWithoutKidney_assessmentNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutKidney_assessmentInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutKidney_assessmentInputSchema).optional(),
  upsert: z.lazy(() => patientUpsertWithoutKidney_assessmentInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => patientUpdateToOneWithWhereWithoutKidney_assessmentInputSchema),z.lazy(() => patientUpdateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedUpdateWithoutKidney_assessmentInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]).optional(),
}).strict();

export const staffCreateNestedOneWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutNoninfectious_noninfectious_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const patientCreateNestedOneWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientCreateNestedOneWithoutNoninfectiousInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutNoninfectiousInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutNoninfectiousInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional()
}).strict();

export const staffCreateNestedOneWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateNestedOneWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional()
}).strict();

export const staffUpdateOneRequiredWithoutNoninfectious_noninfectious_created_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneRequiredWithoutNoninfectious_noninfectious_created_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutNoninfectious_noninfectious_created_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutNoninfectious_noninfectious_created_byTostaffInputSchema).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]).optional(),
}).strict();

export const patientUpdateOneRequiredWithoutNoninfectiousNestedInputSchema: z.ZodType<Prisma.patientUpdateOneRequiredWithoutNoninfectiousNestedInput> = z.object({
  create: z.union([ z.lazy(() => patientCreateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutNoninfectiousInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => patientCreateOrConnectWithoutNoninfectiousInputSchema).optional(),
  upsert: z.lazy(() => patientUpsertWithoutNoninfectiousInputSchema).optional(),
  connect: z.lazy(() => patientWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => patientUpdateToOneWithWhereWithoutNoninfectiousInputSchema),z.lazy(() => patientUpdateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutNoninfectiousInputSchema) ]).optional(),
}).strict();

export const staffUpdateOneWithoutNoninfectious_noninfectious_updated_byTostaffNestedInputSchema: z.ZodType<Prisma.staffUpdateOneWithoutNoninfectious_noninfectious_updated_byTostaffNestedInput> = z.object({
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => staffCreateOrConnectWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional(),
  upsert: z.lazy(() => staffUpsertWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => staffWhereInputSchema) ]).optional(),
  connect: z.lazy(() => staffWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedEnumpatient_sexFilterSchema: z.ZodType<Prisma.NestedEnumpatient_sexFilter> = z.object({
  equals: z.lazy(() => patient_sexSchema).optional(),
  in: z.lazy(() => patient_sexSchema).array().optional(),
  notIn: z.lazy(() => patient_sexSchema).array().optional(),
  not: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => NestedEnumpatient_sexFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumpatient_mors_reasonNullableFilterSchema: z.ZodType<Prisma.NestedEnumpatient_mors_reasonNullableFilter> = z.object({
  equals: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  in: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  notIn: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedEnumpatient_sexWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumpatient_sexWithAggregatesFilter> = z.object({
  equals: z.lazy(() => patient_sexSchema).optional(),
  in: z.lazy(() => patient_sexSchema).array().optional(),
  notIn: z.lazy(() => patient_sexSchema).array().optional(),
  not: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => NestedEnumpatient_sexWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpatient_sexFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpatient_sexFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const NestedEnumpatient_mors_reasonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumpatient_mors_reasonNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  in: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  notIn: z.lazy(() => patient_mors_reasonSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NestedEnumpatient_mors_reasonNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpatient_mors_reasonNullableFilterSchema).optional()
}).strict();

export const NestedEnumpd_pd_modalityFilterSchema: z.ZodType<Prisma.NestedEnumpd_pd_modalityFilter> = z.object({
  equals: z.lazy(() => pd_pd_modalitySchema).optional(),
  in: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  notIn: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  not: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => NestedEnumpd_pd_modalityFilterSchema) ]).optional(),
}).strict();

export const NestedEnumpd_solution_per_inputFilterSchema: z.ZodType<Prisma.NestedEnumpd_solution_per_inputFilter> = z.object({
  equals: z.lazy(() => pd_solution_per_inputSchema).optional(),
  in: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  notIn: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  not: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema) ]).optional(),
}).strict();

export const NestedEnumpd_pd_modalityWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumpd_pd_modalityWithAggregatesFilter> = z.object({
  equals: z.lazy(() => pd_pd_modalitySchema).optional(),
  in: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  notIn: z.lazy(() => pd_pd_modalitySchema).array().optional(),
  not: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => NestedEnumpd_pd_modalityWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpd_pd_modalityFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpd_pd_modalityFilterSchema).optional()
}).strict();

export const NestedEnumpd_solution_per_inputWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumpd_solution_per_inputWithAggregatesFilter> = z.object({
  equals: z.lazy(() => pd_solution_per_inputSchema).optional(),
  in: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  notIn: z.lazy(() => pd_solution_per_inputSchema).array().optional(),
  not: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => NestedEnumpd_solution_per_inputWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumpd_solution_per_inputFilterSchema).optional()
}).strict();

export const NestedEnumstaff_roleNullableFilterSchema: z.ZodType<Prisma.NestedEnumstaff_roleNullableFilter> = z.object({
  equals: z.lazy(() => staff_roleSchema).optional().nullable(),
  in: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  notIn: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NestedEnumstaff_roleNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedEnumstaff_roleNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumstaff_roleNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => staff_roleSchema).optional().nullable(),
  in: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  notIn: z.lazy(() => staff_roleSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NestedEnumstaff_roleNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumstaff_roleNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumstaff_roleNullableFilterSchema).optional()
}).strict();

export const NestedEnuminfectious_infection_typeFilterSchema: z.ZodType<Prisma.NestedEnuminfectious_infection_typeFilter> = z.object({
  equals: z.lazy(() => infectious_infection_typeSchema).optional(),
  in: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  notIn: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema) ]).optional(),
}).strict();

export const NestedEnuminfectious_infection_typeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnuminfectious_infection_typeWithAggregatesFilter> = z.object({
  equals: z.lazy(() => infectious_infection_typeSchema).optional(),
  in: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  notIn: z.lazy(() => infectious_infection_typeSchema).array().optional(),
  not: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => NestedEnuminfectious_infection_typeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema).optional(),
  _max: z.lazy(() => NestedEnuminfectious_infection_typeFilterSchema).optional()
}).strict();

export const NestedEnumkidney_assessment_petNullableFilterSchema: z.ZodType<Prisma.NestedEnumkidney_assessment_petNullableFilter> = z.object({
  equals: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  in: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  notIn: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedEnumkidney_assessment_petNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumkidney_assessment_petNullableWithAggregatesFilter> = z.object({
  equals: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  in: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  notIn: z.lazy(() => kidney_assessment_petSchema).array().optional().nullable(),
  not: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NestedEnumkidney_assessment_petNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumkidney_assessment_petNullableFilterSchema).optional()
}).strict();

export const patientCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.patientCreateWithoutDepartmentInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutDepartmentInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutDepartmentInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutDepartmentInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const patientCreateManyDepartmentInputEnvelopeSchema: z.ZodType<Prisma.patientCreateManyDepartmentInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => patientCreateManyDepartmentInputSchema),z.lazy(() => patientCreateManyDepartmentInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const patientUpsertWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUpsertWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => patientUpdateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedUpdateWithoutDepartmentInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutDepartmentInputSchema) ]),
}).strict();

export const patientUpdateWithWhereUniqueWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUpdateWithWhereUniqueWithoutDepartmentInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => patientUpdateWithoutDepartmentInputSchema),z.lazy(() => patientUncheckedUpdateWithoutDepartmentInputSchema) ]),
}).strict();

export const patientUpdateManyWithWhereWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUpdateManyWithWhereWithoutDepartmentInput> = z.object({
  where: z.lazy(() => patientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => patientUpdateManyMutationInputSchema),z.lazy(() => patientUncheckedUpdateManyWithoutDepartmentInputSchema) ]),
}).strict();

export const patientScalarWhereInputSchema: z.ZodType<Prisma.patientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => patientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => patientScalarWhereInputSchema),z.lazy(() => patientScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  first_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  last_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  birth_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  personal_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sex: z.union([ z.lazy(() => Enumpatient_sexFilterSchema),z.lazy(() => patient_sexSchema) ]).optional(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bmi: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  doctor_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  department_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  region_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  transplantation_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  pd_transit_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  md_diabetes: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_hypertension: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_adptd: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_lupus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_vasculitis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_amyloidosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_unknown: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  md_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  cd_heart: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cancer: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_a_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_p_pressure: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_demention: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_pqod: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cd_other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  mors: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  mors_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => Enumpatient_mors_reasonNullableFilterSchema),z.lazy(() => patient_mors_reasonSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const infectiousCreateWithoutPatientInputSchema: z.ZodType<Prisma.infectiousCreateWithoutPatientInput> = z.object({
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_created_byTostaffInputSchema),
  staff_infectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_updated_byTostaffInputSchema).optional()
}).strict();

export const infectiousUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.infectiousCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const infectiousCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.infectiousCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => infectiousCreateManyPatientInputSchema),z.lazy(() => infectiousCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const kidney_assessmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentCreateWithoutPatientInput> = z.object({
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const kidney_assessmentCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.kidney_assessmentCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => kidney_assessmentCreateManyPatientInputSchema),z.lazy(() => kidney_assessmentCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const noninfectiousCreateWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousCreateWithoutPatientInput> = z.object({
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional()
}).strict();

export const noninfectiousUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const noninfectiousCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.noninfectiousCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => noninfectiousCreateManyPatientInputSchema),z.lazy(() => noninfectiousCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const staffCreateWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutPatient_patient_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutPatient_patient_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutPatient_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_created_byTostaffInputSchema) ]),
}).strict();

export const departmentCreateWithoutPatientInputSchema: z.ZodType<Prisma.departmentCreateWithoutPatientInput> = z.object({
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const departmentUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.departmentUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const departmentCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.departmentCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => departmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => departmentCreateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const staffCreateWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const regionCreateWithoutPatientInputSchema: z.ZodType<Prisma.regionCreateWithoutPatientInput> = z.object({
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const regionUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.regionUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  weight: z.number().int().optional().nullable()
}).strict();

export const regionCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.regionCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => regionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => regionCreateWithoutPatientInputSchema),z.lazy(() => regionUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const staffCreateWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutPatient_patient_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutPatient_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const pdCreateWithoutPatientInputSchema: z.ZodType<Prisma.pdCreateWithoutPatientInput> = z.object({
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_created_byTostaffInputSchema),
  staff_pd_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const pdUncheckedCreateWithoutPatientInputSchema: z.ZodType<Prisma.pdUncheckedCreateWithoutPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdCreateOrConnectWithoutPatientInputSchema: z.ZodType<Prisma.pdCreateOrConnectWithoutPatientInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const pdCreateManyPatientInputEnvelopeSchema: z.ZodType<Prisma.pdCreateManyPatientInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => pdCreateManyPatientInputSchema),z.lazy(() => pdCreateManyPatientInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const infectiousUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => infectiousUpdateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => infectiousCreateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const infectiousUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateWithoutPatientInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const infectiousUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => infectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateManyMutationInputSchema),z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const infectiousScalarWhereInputSchema: z.ZodType<Prisma.infectiousScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => infectiousScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => infectiousScalarWhereInputSchema),z.lazy(() => infectiousScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  infection_type: z.union([ z.lazy(() => Enuminfectious_infection_typeFilterSchema),z.lazy(() => infectious_infection_typeSchema) ]).optional(),
  infection_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  infection_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  staphylococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  streptococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  intestinal_stick: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pseudomona: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  enterococcus: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  candida: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  treatment_start_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  treatment_end_date: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  vancomycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftazidime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ceftriaxone: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefepime: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  meropenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  imipenem: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  ciprofloxacin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  cefazolin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  gentamicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  clindamycin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rifampicin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  rluconazole: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const kidney_assessmentUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutPatientInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => kidney_assessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateManyMutationInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const kidney_assessmentScalarWhereInputSchema: z.ZodType<Prisma.kidney_assessmentScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => kidney_assessmentScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => kidney_assessmentScalarWhereInputSchema),z.lazy(() => kidney_assessmentScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  check_date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  gfr: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  pet: z.union([ z.lazy(() => Enumkidney_assessment_petNullableFilterSchema),z.lazy(() => kidney_assessment_petSchema) ]).optional().nullable(),
  ktv: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  ka_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const noninfectiousUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const noninfectiousUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateWithoutPatientInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const noninfectiousUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => noninfectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateManyMutationInputSchema),z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const noninfectiousScalarWhereInputSchema: z.ZodType<Prisma.noninfectiousScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => noninfectiousScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => noninfectiousScalarWhereInputSchema),z.lazy(() => noninfectiousScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  hernia: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_positioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_malposition: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_rinking: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_repositioning: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hydrothorax: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  abdominal_leakage: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  genital_discharge: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  hepomeritoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  chyloperitoneum: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  catheter_decrease: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  eps: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  other_comment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const staffUpsertWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutPatient_patient_created_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_created_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutPatient_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_created_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutPatient_patient_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutPatient_patient_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutPatient_patient_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const departmentUpsertWithoutPatientInputSchema: z.ZodType<Prisma.departmentUpsertWithoutPatientInput> = z.object({
  update: z.union([ z.lazy(() => departmentUpdateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => departmentCreateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedCreateWithoutPatientInputSchema) ]),
  where: z.lazy(() => departmentWhereInputSchema).optional()
}).strict();

export const departmentUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.departmentUpdateToOneWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => departmentWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => departmentUpdateWithoutPatientInputSchema),z.lazy(() => departmentUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const departmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.departmentUpdateWithoutPatientInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const departmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.departmentUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const staffUpsertWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_doctor_idTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_doctor_idTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_doctor_idTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutPatient_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutPatient_patient_doctor_idTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const regionUpsertWithoutPatientInputSchema: z.ZodType<Prisma.regionUpsertWithoutPatientInput> = z.object({
  update: z.union([ z.lazy(() => regionUpdateWithoutPatientInputSchema),z.lazy(() => regionUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => regionCreateWithoutPatientInputSchema),z.lazy(() => regionUncheckedCreateWithoutPatientInputSchema) ]),
  where: z.lazy(() => regionWhereInputSchema).optional()
}).strict();

export const regionUpdateToOneWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.regionUpdateToOneWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => regionWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => regionUpdateWithoutPatientInputSchema),z.lazy(() => regionUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const regionUpdateWithoutPatientInputSchema: z.ZodType<Prisma.regionUpdateWithoutPatientInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const regionUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.regionUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  weight: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const staffUpsertWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutPatient_patient_updated_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPatient_patient_updated_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutPatient_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutPatient_patient_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPatient_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutPatient_patient_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutPatient_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutPatient_patient_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const pdUpsertWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.pdUpsertWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => pdUpdateWithoutPatientInputSchema),z.lazy(() => pdUncheckedUpdateWithoutPatientInputSchema) ]),
  create: z.union([ z.lazy(() => pdCreateWithoutPatientInputSchema),z.lazy(() => pdUncheckedCreateWithoutPatientInputSchema) ]),
}).strict();

export const pdUpdateWithWhereUniqueWithoutPatientInputSchema: z.ZodType<Prisma.pdUpdateWithWhereUniqueWithoutPatientInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => pdUpdateWithoutPatientInputSchema),z.lazy(() => pdUncheckedUpdateWithoutPatientInputSchema) ]),
}).strict();

export const pdUpdateManyWithWhereWithoutPatientInputSchema: z.ZodType<Prisma.pdUpdateManyWithWhereWithoutPatientInput> = z.object({
  where: z.lazy(() => pdScalarWhereInputSchema),
  data: z.union([ z.lazy(() => pdUpdateManyMutationInputSchema),z.lazy(() => pdUncheckedUpdateManyWithoutPatientInputSchema) ]),
}).strict();

export const pdScalarWhereInputSchema: z.ZodType<Prisma.pdScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => pdScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => pdScalarWhereInputSchema),z.lazy(() => pdScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  patient_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  date: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  pd_modality: z.union([ z.lazy(() => Enumpd_pd_modalityFilterSchema),z.lazy(() => pd_pd_modalitySchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => Enumpd_solution_per_inputFilterSchema),z.lazy(() => pd_solution_per_inputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  icodextrin: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  created_by: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  updated_by: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const staffCreateWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutPd_pd_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutPd_pd_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutPd_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_created_byTostaffInputSchema) ]),
}).strict();

export const patientCreateWithoutPdInputSchema: z.ZodType<Prisma.patientCreateWithoutPdInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutPdInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutPdInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutPdInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutPdInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutPdInputSchema),z.lazy(() => patientUncheckedCreateWithoutPdInputSchema) ]),
}).strict();

export const staffCreateWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutPd_pd_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutPd_pd_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutPd_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpsertWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutPd_pd_created_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_created_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutPd_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutPd_pd_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_created_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutPd_pd_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutPd_pd_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutPd_pd_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientUpsertWithoutPdInputSchema: z.ZodType<Prisma.patientUpsertWithoutPdInput> = z.object({
  update: z.union([ z.lazy(() => patientUpdateWithoutPdInputSchema),z.lazy(() => patientUncheckedUpdateWithoutPdInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutPdInputSchema),z.lazy(() => patientUncheckedCreateWithoutPdInputSchema) ]),
  where: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const patientUpdateToOneWithWhereWithoutPdInputSchema: z.ZodType<Prisma.patientUpdateToOneWithWhereWithoutPdInput> = z.object({
  where: z.lazy(() => patientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => patientUpdateWithoutPdInputSchema),z.lazy(() => patientUncheckedUpdateWithoutPdInputSchema) ]),
}).strict();

export const patientUpdateWithoutPdInputSchema: z.ZodType<Prisma.patientUpdateWithoutPdInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutPdInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutPdInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const staffUpsertWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutPd_pd_updated_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutPd_pd_updated_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutPd_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutPd_pd_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutPd_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutPd_pd_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutPd_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutPd_pd_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional()
}).strict();

export const patientCreateWithoutRegionInputSchema: z.ZodType<Prisma.patientCreateWithoutRegionInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutRegionInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutRegionInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutRegionInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutRegionInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const patientCreateManyRegionInputEnvelopeSchema: z.ZodType<Prisma.patientCreateManyRegionInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => patientCreateManyRegionInputSchema),z.lazy(() => patientCreateManyRegionInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const patientUpsertWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.patientUpsertWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => patientUpdateWithoutRegionInputSchema),z.lazy(() => patientUncheckedUpdateWithoutRegionInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutRegionInputSchema),z.lazy(() => patientUncheckedCreateWithoutRegionInputSchema) ]),
}).strict();

export const patientUpdateWithWhereUniqueWithoutRegionInputSchema: z.ZodType<Prisma.patientUpdateWithWhereUniqueWithoutRegionInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => patientUpdateWithoutRegionInputSchema),z.lazy(() => patientUncheckedUpdateWithoutRegionInputSchema) ]),
}).strict();

export const patientUpdateManyWithWhereWithoutRegionInputSchema: z.ZodType<Prisma.patientUpdateManyWithWhereWithoutRegionInput> = z.object({
  where: z.lazy(() => patientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => patientUpdateManyMutationInputSchema),z.lazy(() => patientUncheckedUpdateManyWithoutRegionInputSchema) ]),
}).strict();

export const infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateWithoutStaff_infectious_created_byTostaffInput> = z.object({
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedOneWithoutInfectiousInputSchema),
  staff_infectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_updated_byTostaffInputSchema).optional()
}).strict();

export const infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateOrConnectWithoutStaff_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.infectiousCreateManyStaff_infectious_created_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousCreateManyStaff_infectious_created_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutInfectious_infectious_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutInfectiousInputSchema)
}).strict();

export const infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateOrConnectWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.infectiousCreateManyStaff_infectious_updated_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousCreateManyStaff_infectious_updated_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedOneWithoutKidney_assessmentInputSchema),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutKidney_assessmentInputSchema)
}).strict();

export const kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateOrConnectWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedOneWithoutNoninfectiousInputSchema),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema).optional()
}).strict();

export const noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateOrConnectWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutNoninfectiousInputSchema)
}).strict();

export const noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateOrConnectWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const patientCreateWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientCreateWithoutStaff_patient_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutStaff_patient_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutStaff_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema) ]),
}).strict();

export const patientCreateManyStaff_patient_created_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_created_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientCreateManyStaff_patient_created_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientCreateWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const patientCreateManyStaff_patient_doctor_idTostaffInputEnvelopeSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_doctor_idTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientCreateManyStaff_patient_doctor_idTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const patientCreateWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientCreateWithoutStaff_patient_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutStaff_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const patientCreateManyStaff_patient_updated_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_updated_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientCreateManyStaff_patient_updated_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const pdCreateWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdCreateWithoutStaff_pd_created_byTostaffInput> = z.object({
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  patient: z.lazy(() => patientCreateNestedOneWithoutPdInputSchema),
  staff_pd_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedCreateWithoutStaff_pd_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdCreateOrConnectWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdCreateOrConnectWithoutStaff_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema) ]),
}).strict();

export const pdCreateManyStaff_pd_created_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.pdCreateManyStaff_pd_created_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdCreateManyStaff_pd_created_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const pdCreateWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdCreateWithoutStaff_pd_updated_byTostaffInput> = z.object({
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPd_pd_created_byTostaffInputSchema),
  patient: z.lazy(() => patientCreateNestedOneWithoutPdInputSchema)
}).strict();

export const pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdCreateOrConnectWithoutStaff_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const pdCreateManyStaff_pd_updated_byTostaffInputEnvelopeSchema: z.ZodType<Prisma.pdCreateManyStaff_pd_updated_byTostaffInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdCreateManyStaff_pd_updated_byTostaffInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpsertWithWhereUniqueWithoutStaff_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => infectiousUpdateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutStaff_infectious_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateWithWhereUniqueWithoutStaff_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateWithoutStaff_infectious_created_byTostaffInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutStaff_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithWhereWithoutStaff_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateManyMutationInputSchema),z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpsertWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => infectiousUpdateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutStaff_infectious_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => infectiousCreateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedCreateWithoutStaff_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateWithWhereUniqueWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateWithoutStaff_infectious_updated_byTostaffInputSchema),z.lazy(() => infectiousUncheckedUpdateWithoutStaff_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateManyWithWhereWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => infectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => infectiousUpdateManyMutationInputSchema),z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateManyMutationInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpsertWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => kidney_assessmentCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedCreateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithWhereUniqueWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyWithWhereWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => kidney_assessmentScalarWhereInputSchema),
  data: z.union([ z.lazy(() => kidney_assessmentUpdateManyMutationInputSchema),z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateManyMutationInputSchema),z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpsertWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => noninfectiousUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => noninfectiousCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedCreateWithoutStaff_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithWhereUniqueWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema),z.lazy(() => noninfectiousUncheckedUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateManyWithWhereWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => noninfectiousScalarWhereInputSchema),
  data: z.union([ z.lazy(() => noninfectiousUpdateManyMutationInputSchema),z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUpsertWithWhereUniqueWithoutStaff_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_created_byTostaffInputSchema) ]),
}).strict();

export const patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithWhereUniqueWithoutStaff_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_created_byTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_created_byTostaffInputSchema) ]),
}).strict();

export const patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateManyWithWhereWithoutStaff_patient_created_byTostaffInput> = z.object({
  where: z.lazy(() => patientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => patientUpdateManyMutationInputSchema),z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffInputSchema) ]),
}).strict();

export const patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUpsertWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_doctor_idTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithWhereUniqueWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_doctor_idTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUpdateManyWithWhereWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  where: z.lazy(() => patientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => patientUpdateManyMutationInputSchema),z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffInputSchema) ]),
}).strict();

export const patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUpsertWithWhereUniqueWithoutStaff_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedCreateWithoutStaff_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithWhereUniqueWithoutStaff_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => patientUpdateWithoutStaff_patient_updated_byTostaffInputSchema),z.lazy(() => patientUncheckedUpdateWithoutStaff_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateManyWithWhereWithoutStaff_patient_updated_byTostaffInput> = z.object({
  where: z.lazy(() => patientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => patientUpdateManyMutationInputSchema),z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffInputSchema) ]),
}).strict();

export const pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUpsertWithWhereUniqueWithoutStaff_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => pdUpdateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedUpdateWithoutStaff_pd_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_created_byTostaffInputSchema) ]),
}).strict();

export const pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateWithWhereUniqueWithoutStaff_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => pdUpdateWithoutStaff_pd_created_byTostaffInputSchema),z.lazy(() => pdUncheckedUpdateWithoutStaff_pd_created_byTostaffInputSchema) ]),
}).strict();

export const pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateManyWithWhereWithoutStaff_pd_created_byTostaffInput> = z.object({
  where: z.lazy(() => pdScalarWhereInputSchema),
  data: z.union([ z.lazy(() => pdUpdateManyMutationInputSchema),z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffInputSchema) ]),
}).strict();

export const pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUpsertWithWhereUniqueWithoutStaff_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => pdUpdateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedUpdateWithoutStaff_pd_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => pdCreateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedCreateWithoutStaff_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateWithWhereUniqueWithoutStaff_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => pdWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => pdUpdateWithoutStaff_pd_updated_byTostaffInputSchema),z.lazy(() => pdUncheckedUpdateWithoutStaff_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateManyWithWhereWithoutStaff_pd_updated_byTostaffInput> = z.object({
  where: z.lazy(() => pdScalarWhereInputSchema),
  data: z.union([ z.lazy(() => pdUpdateManyMutationInputSchema),z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffInputSchema) ]),
}).strict();

export const staffCreateWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const patientCreateWithoutInfectiousInputSchema: z.ZodType<Prisma.patientCreateWithoutInfectiousInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutInfectiousInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutInfectiousInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutInfectiousInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutInfectiousInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutInfectiousInputSchema) ]),
}).strict();

export const staffCreateWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpsertWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_created_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutInfectious_infectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_created_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutInfectious_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutInfectious_infectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientUpsertWithoutInfectiousInputSchema: z.ZodType<Prisma.patientUpsertWithoutInfectiousInput> = z.object({
  update: z.union([ z.lazy(() => patientUpdateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutInfectiousInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutInfectiousInputSchema) ]),
  where: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const patientUpdateToOneWithWhereWithoutInfectiousInputSchema: z.ZodType<Prisma.patientUpdateToOneWithWhereWithoutInfectiousInput> = z.object({
  where: z.lazy(() => patientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => patientUpdateWithoutInfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutInfectiousInputSchema) ]),
}).strict();

export const patientUpdateWithoutInfectiousInputSchema: z.ZodType<Prisma.patientUpdateWithoutInfectiousInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutInfectiousInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutInfectiousInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const staffUpsertWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutInfectious_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutInfectious_infectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const patientCreateWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientCreateWithoutKidney_assessmentInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutKidney_assessmentInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutKidney_assessmentInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutKidney_assessmentInputSchema) ]),
}).strict();

export const staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpsertWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientUpsertWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientUpsertWithoutKidney_assessmentInput> = z.object({
  update: z.union([ z.lazy(() => patientUpdateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedUpdateWithoutKidney_assessmentInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedCreateWithoutKidney_assessmentInputSchema) ]),
  where: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const patientUpdateToOneWithWhereWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientUpdateToOneWithWhereWithoutKidney_assessmentInput> = z.object({
  where: z.lazy(() => patientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => patientUpdateWithoutKidney_assessmentInputSchema),z.lazy(() => patientUncheckedUpdateWithoutKidney_assessmentInputSchema) ]),
}).strict();

export const patientUpdateWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientUpdateWithoutKidney_assessmentInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutKidney_assessmentInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutKidney_assessmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const staffUpsertWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutKidney_assessment_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_updated_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const patientCreateWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientCreateWithoutNoninfectiousInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious: z.lazy(() => infectiousCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentCreateNestedManyWithoutPatientInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_created_byTostaffInputSchema),
  department: z.lazy(() => departmentCreateNestedOneWithoutPatientInputSchema),
  staff_patient_doctor_idTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_doctor_idTostaffInputSchema),
  region: z.lazy(() => regionCreateNestedOneWithoutPatientInputSchema),
  staff_patient_updated_byTostaff: z.lazy(() => staffCreateNestedOneWithoutPatient_patient_updated_byTostaffInputSchema).optional(),
  pd: z.lazy(() => pdCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientUncheckedCreateWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientUncheckedCreateWithoutNoninfectiousInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutPatientInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedCreateNestedManyWithoutPatientInputSchema).optional()
}).strict();

export const patientCreateOrConnectWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientCreateOrConnectWithoutNoninfectiousInput> = z.object({
  where: z.lazy(() => patientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => patientCreateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutNoninfectiousInputSchema) ]),
}).strict();

export const staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.lazy(() => staff_roleSchema).optional().nullable(),
  username: z.string(),
  password: z.string(),
  token: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_created_byTostaffInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedCreateNestedManyWithoutStaff_infectious_updated_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedCreateNestedManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedCreateNestedManyWithoutStaff_noninfectious_created_byTostaffInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_created_byTostaffInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_doctor_idTostaffInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedCreateNestedManyWithoutStaff_patient_updated_byTostaffInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_created_byTostaffInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedCreateNestedManyWithoutStaff_pd_updated_byTostaffInputSchema).optional()
}).strict();

export const staffCreateOrConnectWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffCreateOrConnectWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpsertWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutNoninfectious_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutNoninfectious_noninfectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_updated_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientUpsertWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientUpsertWithoutNoninfectiousInput> = z.object({
  update: z.union([ z.lazy(() => patientUpdateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutNoninfectiousInputSchema) ]),
  create: z.union([ z.lazy(() => patientCreateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedCreateWithoutNoninfectiousInputSchema) ]),
  where: z.lazy(() => patientWhereInputSchema).optional()
}).strict();

export const patientUpdateToOneWithWhereWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientUpdateToOneWithWhereWithoutNoninfectiousInput> = z.object({
  where: z.lazy(() => patientWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => patientUpdateWithoutNoninfectiousInputSchema),z.lazy(() => patientUncheckedUpdateWithoutNoninfectiousInputSchema) ]),
}).strict();

export const patientUpdateWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientUpdateWithoutNoninfectiousInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutNoninfectiousInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutNoninfectiousInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const staffUpsertWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpsertWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  update: z.union([ z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]),
  create: z.union([ z.lazy(() => staffCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedCreateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]),
  where: z.lazy(() => staffWhereInputSchema).optional()
}).strict();

export const staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateToOneWithWhereWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  where: z.lazy(() => staffWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => staffUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema),z.lazy(() => staffUncheckedUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema) ]),
}).strict();

export const staffUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const staffUncheckedUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.staffUncheckedUpdateWithoutNoninfectious_noninfectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => staff_roleSchema),z.lazy(() => NullableEnumstaff_roleFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  username: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  active: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious_infectious_created_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffNestedInputSchema).optional(),
  infectious_infectious_updated_byTostaff: z.lazy(() => infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_created_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  kidney_assessment_kidney_assessment_updated_byTostaff: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffNestedInputSchema).optional(),
  noninfectious_noninfectious_created_byTostaff: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffNestedInputSchema).optional(),
  patient_patient_created_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffNestedInputSchema).optional(),
  patient_patient_doctor_idTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffNestedInputSchema).optional(),
  patient_patient_updated_byTostaff: z.lazy(() => patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffNestedInputSchema).optional(),
  pd_pd_created_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffNestedInputSchema).optional(),
  pd_pd_updated_byTostaff: z.lazy(() => pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const patientCreateManyDepartmentInputSchema: z.ZodType<Prisma.patientCreateManyDepartmentInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const patientUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUpdateWithoutDepartmentInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateManyWithoutDepartmentInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutDepartmentInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousCreateManyPatientInputSchema: z.ZodType<Prisma.infectiousCreateManyPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentCreateManyPatientInputSchema: z.ZodType<Prisma.kidney_assessmentCreateManyPatientInput> = z.object({
  id: z.number().int().optional(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousCreateManyPatientInputSchema: z.ZodType<Prisma.noninfectiousCreateManyPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdCreateManyPatientInputSchema: z.ZodType<Prisma.pdCreateManyPatientInput> = z.object({
  id: z.number().int().optional(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousUpdateWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUpdateWithoutPatientInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutInfectious_infectious_created_byTostaffNestedInputSchema).optional(),
  staff_infectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutInfectious_infectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const infectiousUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentUpdateWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithoutPatientInput> = z.object({
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutKidney_assessment_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousUpdateWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithoutPatientInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutNoninfectious_noninfectious_created_byTostaffNestedInputSchema).optional(),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutNoninfectious_noninfectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const noninfectiousUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdUpdateWithoutPatientInputSchema: z.ZodType<Prisma.pdUpdateWithoutPatientInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPd_pd_created_byTostaffNestedInputSchema).optional(),
  staff_pd_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPd_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const pdUncheckedUpdateWithoutPatientInputSchema: z.ZodType<Prisma.pdUncheckedUpdateWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdUncheckedUpdateManyWithoutPatientInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutPatientInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const patientCreateManyRegionInputSchema: z.ZodType<Prisma.patientCreateManyRegionInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const patientUpdateWithoutRegionInputSchema: z.ZodType<Prisma.patientUpdateWithoutRegionInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutRegionInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateManyWithoutRegionInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutRegionInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousCreateManyStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateManyStaff_infectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const infectiousCreateManyStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousCreateManyStaff_infectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  infection_type: z.lazy(() => infectious_infection_typeSchema).optional(),
  infection_start_date: z.coerce.date().optional().nullable(),
  infection_end_date: z.coerce.date().optional().nullable(),
  staphylococcus: z.boolean().optional().nullable(),
  streptococcus: z.boolean().optional().nullable(),
  intestinal_stick: z.boolean().optional().nullable(),
  pseudomona: z.boolean().optional().nullable(),
  enterococcus: z.boolean().optional().nullable(),
  candida: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  treatment_start_date: z.coerce.date().optional().nullable(),
  treatment_end_date: z.coerce.date().optional().nullable(),
  vancomycin: z.boolean().optional().nullable(),
  ceftazidime: z.boolean().optional().nullable(),
  ceftriaxone: z.boolean().optional().nullable(),
  cefepime: z.boolean().optional().nullable(),
  meropenem: z.boolean().optional().nullable(),
  imipenem: z.boolean().optional().nullable(),
  ciprofloxacin: z.boolean().optional().nullable(),
  cefazolin: z.boolean().optional().nullable(),
  gentamicin: z.boolean().optional().nullable(),
  clindamycin: z.boolean().optional().nullable(),
  rifampicin: z.boolean().optional().nullable(),
  rluconazole: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateManyStaff_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentCreateManyStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  check_date: z.coerce.date(),
  gfr: z.number().optional().nullable(),
  pet: z.lazy(() => kidney_assessment_petSchema).optional().nullable(),
  ktv: z.number().optional().nullable(),
  ka_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const noninfectiousCreateManyStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateManyStaff_noninfectious_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousCreateManyStaff_noninfectious_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  hernia: z.boolean().optional().nullable(),
  catheter_positioning: z.boolean().optional().nullable(),
  catheter_malposition: z.boolean().optional().nullable(),
  catheter_intraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_extraluminal_occlusion: z.boolean().optional().nullable(),
  catheter_rinking: z.boolean().optional().nullable(),
  catheter_repositioning: z.boolean().optional().nullable(),
  catheter_leakage: z.boolean().optional().nullable(),
  hydrothorax: z.boolean().optional().nullable(),
  abdominal_leakage: z.boolean().optional().nullable(),
  genital_discharge: z.boolean().optional().nullable(),
  hepomeritoneum: z.boolean().optional().nullable(),
  chyloperitoneum: z.boolean().optional().nullable(),
  catheter_decrease: z.boolean().optional().nullable(),
  eps: z.boolean().optional().nullable(),
  other: z.boolean().optional().nullable(),
  other_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const patientCreateManyStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const patientCreateManyStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_doctor_idTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const patientCreateManyStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientCreateManyStaff_patient_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  first_name: z.string(),
  last_name: z.string(),
  birth_date: z.coerce.date(),
  personal_id: z.string(),
  sex: z.lazy(() => patient_sexSchema).optional(),
  phone: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  bmi: z.number(),
  doctor_id: z.number().int(),
  department_id: z.number().int(),
  region_id: z.number().int(),
  transplantation_date: z.coerce.date().optional().nullable(),
  pd_transit_date: z.coerce.date().optional().nullable(),
  md_diabetes: z.boolean().optional().nullable(),
  md_hypertension: z.boolean().optional().nullable(),
  md_glomerulonephritis: z.boolean().optional().nullable(),
  md_adptd: z.boolean().optional().nullable(),
  md_lupus: z.boolean().optional().nullable(),
  md_vasculitis: z.boolean().optional().nullable(),
  md_amyloidosis: z.boolean().optional().nullable(),
  md_unknown: z.boolean().optional().nullable(),
  md_other: z.boolean().optional().nullable(),
  md_other_comment: z.string().optional().nullable(),
  cd_heart: z.boolean().optional().nullable(),
  cd_cancer: z.boolean().optional().nullable(),
  cd_a_pressure: z.boolean().optional().nullable(),
  cd_p_pressure: z.boolean().optional().nullable(),
  cd_cirrhosis: z.boolean().optional().nullable(),
  cd_demention: z.boolean().optional().nullable(),
  cd_pqod: z.boolean().optional().nullable(),
  cd_other: z.boolean().optional().nullable(),
  cd_other_comment: z.string().optional().nullable(),
  mors: z.boolean().optional().nullable(),
  mors_date: z.coerce.date().optional().nullable(),
  mors_reason: z.lazy(() => patient_mors_reasonSchema).optional().nullable(),
  mors_comment: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const pdCreateManyStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdCreateManyStaff_pd_created_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  updated_by: z.number().int().optional().nullable()
}).strict();

export const pdCreateManyStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdCreateManyStaff_pd_updated_byTostaffInput> = z.object({
  id: z.number().int().optional(),
  patient_id: z.number().int(),
  date: z.coerce.date(),
  pd_modality: z.lazy(() => pd_pd_modalitySchema).optional(),
  solution_per_input: z.lazy(() => pd_solution_per_inputSchema).optional(),
  pd_ch_solution_136: z.boolean().optional().nullable(),
  pd_ch_solution_227: z.boolean().optional().nullable(),
  pd_ch_solution_386: z.boolean().optional().nullable(),
  icodextrin: z.boolean().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  created_by: z.number().int()
}).strict();

export const infectiousUpdateWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateWithoutStaff_infectious_created_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutInfectiousNestedInputSchema).optional(),
  staff_infectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutInfectious_infectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const infectiousUncheckedUpdateWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateWithoutStaff_infectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutStaff_infectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const infectiousUpdateWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUpdateWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_infectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutInfectious_infectious_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutInfectiousNestedInputSchema).optional()
}).strict();

export const infectiousUncheckedUpdateWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffInputSchema: z.ZodType<Prisma.infectiousUncheckedUpdateManyWithoutStaff_infectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_type: z.union([ z.lazy(() => infectious_infection_typeSchema),z.lazy(() => Enuminfectious_infection_typeFieldUpdateOperationsInputSchema) ]).optional(),
  infection_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infection_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staphylococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  streptococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  intestinal_stick: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pseudomona: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  enterococcus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  candida: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_start_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  treatment_end_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  vancomycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftazidime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ceftriaxone: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefepime: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meropenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  imipenem: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ciprofloxacin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cefazolin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gentamicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  clindamycin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rifampicin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rluconazole: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const kidney_assessmentUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutKidney_assessmentNestedInputSchema).optional(),
  staff_kidney_assessment_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutKidney_assessment_kidney_assessment_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const kidney_assessmentUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUpdateWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_kidney_assessment_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutKidney_assessment_kidney_assessment_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutKidney_assessmentNestedInputSchema).optional()
}).strict();

export const kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffInputSchema: z.ZodType<Prisma.kidney_assessmentUncheckedUpdateManyWithoutStaff_kidney_assessment_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  check_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  gfr: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pet: z.union([ z.lazy(() => kidney_assessment_petSchema),z.lazy(() => NullableEnumkidney_assessment_petFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ktv: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  ka_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const noninfectiousUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutNoninfectiousNestedInputSchema).optional(),
  staff_noninfectious_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutNoninfectious_noninfectious_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const noninfectiousUncheckedUpdateWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const noninfectiousUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUpdateWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_noninfectious_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutNoninfectious_noninfectious_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutNoninfectiousNestedInputSchema).optional()
}).strict();

export const noninfectiousUncheckedUpdateWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffInputSchema: z.ZodType<Prisma.noninfectiousUncheckedUpdateManyWithoutStaff_noninfectious_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  hernia: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_positioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_malposition: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_intraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_extraluminal_occlusion: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_rinking: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_repositioning: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hydrothorax: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  abdominal_leakage: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  genital_discharge: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hepomeritoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chyloperitoneum: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  catheter_decrease: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  eps: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const patientUpdateWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithoutStaff_patient_created_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutStaff_patient_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const patientUpdateWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPatient_patient_updated_byTostaffNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_doctor_idTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const patientUpdateWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUpdateWithoutStaff_patient_updated_byTostaffInput> = z.object({
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  infectious: z.lazy(() => infectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUpdateManyWithoutPatientNestedInputSchema).optional(),
  staff_patient_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_created_byTostaffNestedInputSchema).optional(),
  department: z.lazy(() => departmentUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  staff_patient_doctor_idTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPatient_patient_doctor_idTostaffNestedInputSchema).optional(),
  region: z.lazy(() => regionUpdateOneRequiredWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateWithoutStaff_patient_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  infectious: z.lazy(() => infectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  kidney_assessment: z.lazy(() => kidney_assessmentUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  noninfectious: z.lazy(() => noninfectiousUncheckedUpdateManyWithoutPatientNestedInputSchema).optional(),
  pd: z.lazy(() => pdUncheckedUpdateManyWithoutPatientNestedInputSchema).optional()
}).strict();

export const patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffInputSchema: z.ZodType<Prisma.patientUncheckedUpdateManyWithoutStaff_patient_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  first_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  last_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  birth_date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  personal_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sex: z.union([ z.lazy(() => patient_sexSchema),z.lazy(() => Enumpatient_sexFieldUpdateOperationsInputSchema) ]).optional(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bmi: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  doctor_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  department_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  region_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  transplantation_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_transit_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_diabetes: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_hypertension: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_glomerulonephritis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_adptd: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_lupus: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_vasculitis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_amyloidosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_unknown: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  md_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_heart: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cancer: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_a_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_p_pressure: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_cirrhosis: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_demention: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_pqod: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  cd_other_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_date: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_reason: z.union([ z.lazy(() => patient_mors_reasonSchema),z.lazy(() => NullableEnumpatient_mors_reasonFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  mors_comment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const pdUpdateWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateWithoutStaff_pd_created_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutPdNestedInputSchema).optional(),
  staff_pd_updated_byTostaff: z.lazy(() => staffUpdateOneWithoutPd_pd_updated_byTostaffNestedInputSchema).optional()
}).strict();

export const pdUncheckedUpdateWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedUpdateWithoutStaff_pd_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutStaff_pd_created_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_by: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const pdUpdateWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUpdateWithoutStaff_pd_updated_byTostaffInput> = z.object({
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  staff_pd_created_byTostaff: z.lazy(() => staffUpdateOneRequiredWithoutPd_pd_created_byTostaffNestedInputSchema).optional(),
  patient: z.lazy(() => patientUpdateOneRequiredWithoutPdNestedInputSchema).optional()
}).strict();

export const pdUncheckedUpdateWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedUpdateWithoutStaff_pd_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffInputSchema: z.ZodType<Prisma.pdUncheckedUpdateManyWithoutStaff_pd_updated_byTostaffInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  patient_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  date: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  pd_modality: z.union([ z.lazy(() => pd_pd_modalitySchema),z.lazy(() => Enumpd_pd_modalityFieldUpdateOperationsInputSchema) ]).optional(),
  solution_per_input: z.union([ z.lazy(() => pd_solution_per_inputSchema),z.lazy(() => Enumpd_solution_per_inputFieldUpdateOperationsInputSchema) ]).optional(),
  pd_ch_solution_136: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_227: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pd_ch_solution_386: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  icodextrin: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_by: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const departmentFindFirstArgsSchema: z.ZodType<Prisma.departmentFindFirstArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereInputSchema.optional(),
  orderBy: z.union([ departmentOrderByWithRelationInputSchema.array(),departmentOrderByWithRelationInputSchema ]).optional(),
  cursor: departmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const departmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.departmentFindFirstOrThrowArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereInputSchema.optional(),
  orderBy: z.union([ departmentOrderByWithRelationInputSchema.array(),departmentOrderByWithRelationInputSchema ]).optional(),
  cursor: departmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const departmentFindManyArgsSchema: z.ZodType<Prisma.departmentFindManyArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereInputSchema.optional(),
  orderBy: z.union([ departmentOrderByWithRelationInputSchema.array(),departmentOrderByWithRelationInputSchema ]).optional(),
  cursor: departmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ DepartmentScalarFieldEnumSchema,DepartmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const departmentAggregateArgsSchema: z.ZodType<Prisma.departmentAggregateArgs> = z.object({
  where: departmentWhereInputSchema.optional(),
  orderBy: z.union([ departmentOrderByWithRelationInputSchema.array(),departmentOrderByWithRelationInputSchema ]).optional(),
  cursor: departmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const departmentGroupByArgsSchema: z.ZodType<Prisma.departmentGroupByArgs> = z.object({
  where: departmentWhereInputSchema.optional(),
  orderBy: z.union([ departmentOrderByWithAggregationInputSchema.array(),departmentOrderByWithAggregationInputSchema ]).optional(),
  by: DepartmentScalarFieldEnumSchema.array(),
  having: departmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const departmentFindUniqueArgsSchema: z.ZodType<Prisma.departmentFindUniqueArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereUniqueInputSchema,
}).strict() ;

export const departmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.departmentFindUniqueOrThrowArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereUniqueInputSchema,
}).strict() ;

export const patientFindFirstArgsSchema: z.ZodType<Prisma.patientFindFirstArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereInputSchema.optional(),
  orderBy: z.union([ patientOrderByWithRelationInputSchema.array(),patientOrderByWithRelationInputSchema ]).optional(),
  cursor: patientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const patientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.patientFindFirstOrThrowArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereInputSchema.optional(),
  orderBy: z.union([ patientOrderByWithRelationInputSchema.array(),patientOrderByWithRelationInputSchema ]).optional(),
  cursor: patientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const patientFindManyArgsSchema: z.ZodType<Prisma.patientFindManyArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereInputSchema.optional(),
  orderBy: z.union([ patientOrderByWithRelationInputSchema.array(),patientOrderByWithRelationInputSchema ]).optional(),
  cursor: patientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PatientScalarFieldEnumSchema,PatientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const patientAggregateArgsSchema: z.ZodType<Prisma.patientAggregateArgs> = z.object({
  where: patientWhereInputSchema.optional(),
  orderBy: z.union([ patientOrderByWithRelationInputSchema.array(),patientOrderByWithRelationInputSchema ]).optional(),
  cursor: patientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const patientGroupByArgsSchema: z.ZodType<Prisma.patientGroupByArgs> = z.object({
  where: patientWhereInputSchema.optional(),
  orderBy: z.union([ patientOrderByWithAggregationInputSchema.array(),patientOrderByWithAggregationInputSchema ]).optional(),
  by: PatientScalarFieldEnumSchema.array(),
  having: patientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const patientFindUniqueArgsSchema: z.ZodType<Prisma.patientFindUniqueArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereUniqueInputSchema,
}).strict() ;

export const patientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.patientFindUniqueOrThrowArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereUniqueInputSchema,
}).strict() ;

export const pdFindFirstArgsSchema: z.ZodType<Prisma.pdFindFirstArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereInputSchema.optional(),
  orderBy: z.union([ pdOrderByWithRelationInputSchema.array(),pdOrderByWithRelationInputSchema ]).optional(),
  cursor: pdWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PdScalarFieldEnumSchema,PdScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const pdFindFirstOrThrowArgsSchema: z.ZodType<Prisma.pdFindFirstOrThrowArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereInputSchema.optional(),
  orderBy: z.union([ pdOrderByWithRelationInputSchema.array(),pdOrderByWithRelationInputSchema ]).optional(),
  cursor: pdWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PdScalarFieldEnumSchema,PdScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const pdFindManyArgsSchema: z.ZodType<Prisma.pdFindManyArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereInputSchema.optional(),
  orderBy: z.union([ pdOrderByWithRelationInputSchema.array(),pdOrderByWithRelationInputSchema ]).optional(),
  cursor: pdWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PdScalarFieldEnumSchema,PdScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const pdAggregateArgsSchema: z.ZodType<Prisma.pdAggregateArgs> = z.object({
  where: pdWhereInputSchema.optional(),
  orderBy: z.union([ pdOrderByWithRelationInputSchema.array(),pdOrderByWithRelationInputSchema ]).optional(),
  cursor: pdWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const pdGroupByArgsSchema: z.ZodType<Prisma.pdGroupByArgs> = z.object({
  where: pdWhereInputSchema.optional(),
  orderBy: z.union([ pdOrderByWithAggregationInputSchema.array(),pdOrderByWithAggregationInputSchema ]).optional(),
  by: PdScalarFieldEnumSchema.array(),
  having: pdScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const pdFindUniqueArgsSchema: z.ZodType<Prisma.pdFindUniqueArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereUniqueInputSchema,
}).strict() ;

export const pdFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.pdFindUniqueOrThrowArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereUniqueInputSchema,
}).strict() ;

export const regionFindFirstArgsSchema: z.ZodType<Prisma.regionFindFirstArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereInputSchema.optional(),
  orderBy: z.union([ regionOrderByWithRelationInputSchema.array(),regionOrderByWithRelationInputSchema ]).optional(),
  cursor: regionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const regionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.regionFindFirstOrThrowArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereInputSchema.optional(),
  orderBy: z.union([ regionOrderByWithRelationInputSchema.array(),regionOrderByWithRelationInputSchema ]).optional(),
  cursor: regionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const regionFindManyArgsSchema: z.ZodType<Prisma.regionFindManyArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereInputSchema.optional(),
  orderBy: z.union([ regionOrderByWithRelationInputSchema.array(),regionOrderByWithRelationInputSchema ]).optional(),
  cursor: regionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ RegionScalarFieldEnumSchema,RegionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const regionAggregateArgsSchema: z.ZodType<Prisma.regionAggregateArgs> = z.object({
  where: regionWhereInputSchema.optional(),
  orderBy: z.union([ regionOrderByWithRelationInputSchema.array(),regionOrderByWithRelationInputSchema ]).optional(),
  cursor: regionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const regionGroupByArgsSchema: z.ZodType<Prisma.regionGroupByArgs> = z.object({
  where: regionWhereInputSchema.optional(),
  orderBy: z.union([ regionOrderByWithAggregationInputSchema.array(),regionOrderByWithAggregationInputSchema ]).optional(),
  by: RegionScalarFieldEnumSchema.array(),
  having: regionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const regionFindUniqueArgsSchema: z.ZodType<Prisma.regionFindUniqueArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereUniqueInputSchema,
}).strict() ;

export const regionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.regionFindUniqueOrThrowArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereUniqueInputSchema,
}).strict() ;

export const staffFindFirstArgsSchema: z.ZodType<Prisma.staffFindFirstArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereInputSchema.optional(),
  orderBy: z.union([ staffOrderByWithRelationInputSchema.array(),staffOrderByWithRelationInputSchema ]).optional(),
  cursor: staffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StaffScalarFieldEnumSchema,StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const staffFindFirstOrThrowArgsSchema: z.ZodType<Prisma.staffFindFirstOrThrowArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereInputSchema.optional(),
  orderBy: z.union([ staffOrderByWithRelationInputSchema.array(),staffOrderByWithRelationInputSchema ]).optional(),
  cursor: staffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StaffScalarFieldEnumSchema,StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const staffFindManyArgsSchema: z.ZodType<Prisma.staffFindManyArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereInputSchema.optional(),
  orderBy: z.union([ staffOrderByWithRelationInputSchema.array(),staffOrderByWithRelationInputSchema ]).optional(),
  cursor: staffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ StaffScalarFieldEnumSchema,StaffScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const staffAggregateArgsSchema: z.ZodType<Prisma.staffAggregateArgs> = z.object({
  where: staffWhereInputSchema.optional(),
  orderBy: z.union([ staffOrderByWithRelationInputSchema.array(),staffOrderByWithRelationInputSchema ]).optional(),
  cursor: staffWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const staffGroupByArgsSchema: z.ZodType<Prisma.staffGroupByArgs> = z.object({
  where: staffWhereInputSchema.optional(),
  orderBy: z.union([ staffOrderByWithAggregationInputSchema.array(),staffOrderByWithAggregationInputSchema ]).optional(),
  by: StaffScalarFieldEnumSchema.array(),
  having: staffScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const staffFindUniqueArgsSchema: z.ZodType<Prisma.staffFindUniqueArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereUniqueInputSchema,
}).strict() ;

export const staffFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.staffFindUniqueOrThrowArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereUniqueInputSchema,
}).strict() ;

export const infectiousFindFirstArgsSchema: z.ZodType<Prisma.infectiousFindFirstArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereInputSchema.optional(),
  orderBy: z.union([ infectiousOrderByWithRelationInputSchema.array(),infectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: infectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfectiousScalarFieldEnumSchema,InfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const infectiousFindFirstOrThrowArgsSchema: z.ZodType<Prisma.infectiousFindFirstOrThrowArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereInputSchema.optional(),
  orderBy: z.union([ infectiousOrderByWithRelationInputSchema.array(),infectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: infectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfectiousScalarFieldEnumSchema,InfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const infectiousFindManyArgsSchema: z.ZodType<Prisma.infectiousFindManyArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereInputSchema.optional(),
  orderBy: z.union([ infectiousOrderByWithRelationInputSchema.array(),infectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: infectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ InfectiousScalarFieldEnumSchema,InfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const infectiousAggregateArgsSchema: z.ZodType<Prisma.infectiousAggregateArgs> = z.object({
  where: infectiousWhereInputSchema.optional(),
  orderBy: z.union([ infectiousOrderByWithRelationInputSchema.array(),infectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: infectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const infectiousGroupByArgsSchema: z.ZodType<Prisma.infectiousGroupByArgs> = z.object({
  where: infectiousWhereInputSchema.optional(),
  orderBy: z.union([ infectiousOrderByWithAggregationInputSchema.array(),infectiousOrderByWithAggregationInputSchema ]).optional(),
  by: InfectiousScalarFieldEnumSchema.array(),
  having: infectiousScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const infectiousFindUniqueArgsSchema: z.ZodType<Prisma.infectiousFindUniqueArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereUniqueInputSchema,
}).strict() ;

export const infectiousFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.infectiousFindUniqueOrThrowArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereUniqueInputSchema,
}).strict() ;

export const kidney_assessmentFindFirstArgsSchema: z.ZodType<Prisma.kidney_assessmentFindFirstArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereInputSchema.optional(),
  orderBy: z.union([ kidney_assessmentOrderByWithRelationInputSchema.array(),kidney_assessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: kidney_assessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Kidney_assessmentScalarFieldEnumSchema,Kidney_assessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const kidney_assessmentFindFirstOrThrowArgsSchema: z.ZodType<Prisma.kidney_assessmentFindFirstOrThrowArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereInputSchema.optional(),
  orderBy: z.union([ kidney_assessmentOrderByWithRelationInputSchema.array(),kidney_assessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: kidney_assessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Kidney_assessmentScalarFieldEnumSchema,Kidney_assessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const kidney_assessmentFindManyArgsSchema: z.ZodType<Prisma.kidney_assessmentFindManyArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereInputSchema.optional(),
  orderBy: z.union([ kidney_assessmentOrderByWithRelationInputSchema.array(),kidney_assessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: kidney_assessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ Kidney_assessmentScalarFieldEnumSchema,Kidney_assessmentScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const kidney_assessmentAggregateArgsSchema: z.ZodType<Prisma.kidney_assessmentAggregateArgs> = z.object({
  where: kidney_assessmentWhereInputSchema.optional(),
  orderBy: z.union([ kidney_assessmentOrderByWithRelationInputSchema.array(),kidney_assessmentOrderByWithRelationInputSchema ]).optional(),
  cursor: kidney_assessmentWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const kidney_assessmentGroupByArgsSchema: z.ZodType<Prisma.kidney_assessmentGroupByArgs> = z.object({
  where: kidney_assessmentWhereInputSchema.optional(),
  orderBy: z.union([ kidney_assessmentOrderByWithAggregationInputSchema.array(),kidney_assessmentOrderByWithAggregationInputSchema ]).optional(),
  by: Kidney_assessmentScalarFieldEnumSchema.array(),
  having: kidney_assessmentScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const kidney_assessmentFindUniqueArgsSchema: z.ZodType<Prisma.kidney_assessmentFindUniqueArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereUniqueInputSchema,
}).strict() ;

export const kidney_assessmentFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.kidney_assessmentFindUniqueOrThrowArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereUniqueInputSchema,
}).strict() ;

export const noninfectiousFindFirstArgsSchema: z.ZodType<Prisma.noninfectiousFindFirstArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereInputSchema.optional(),
  orderBy: z.union([ noninfectiousOrderByWithRelationInputSchema.array(),noninfectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: noninfectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoninfectiousScalarFieldEnumSchema,NoninfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const noninfectiousFindFirstOrThrowArgsSchema: z.ZodType<Prisma.noninfectiousFindFirstOrThrowArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereInputSchema.optional(),
  orderBy: z.union([ noninfectiousOrderByWithRelationInputSchema.array(),noninfectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: noninfectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoninfectiousScalarFieldEnumSchema,NoninfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const noninfectiousFindManyArgsSchema: z.ZodType<Prisma.noninfectiousFindManyArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereInputSchema.optional(),
  orderBy: z.union([ noninfectiousOrderByWithRelationInputSchema.array(),noninfectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: noninfectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ NoninfectiousScalarFieldEnumSchema,NoninfectiousScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const noninfectiousAggregateArgsSchema: z.ZodType<Prisma.noninfectiousAggregateArgs> = z.object({
  where: noninfectiousWhereInputSchema.optional(),
  orderBy: z.union([ noninfectiousOrderByWithRelationInputSchema.array(),noninfectiousOrderByWithRelationInputSchema ]).optional(),
  cursor: noninfectiousWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const noninfectiousGroupByArgsSchema: z.ZodType<Prisma.noninfectiousGroupByArgs> = z.object({
  where: noninfectiousWhereInputSchema.optional(),
  orderBy: z.union([ noninfectiousOrderByWithAggregationInputSchema.array(),noninfectiousOrderByWithAggregationInputSchema ]).optional(),
  by: NoninfectiousScalarFieldEnumSchema.array(),
  having: noninfectiousScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const noninfectiousFindUniqueArgsSchema: z.ZodType<Prisma.noninfectiousFindUniqueArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereUniqueInputSchema,
}).strict() ;

export const noninfectiousFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.noninfectiousFindUniqueOrThrowArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereUniqueInputSchema,
}).strict() ;

export const departmentCreateArgsSchema: z.ZodType<Prisma.departmentCreateArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  data: z.union([ departmentCreateInputSchema,departmentUncheckedCreateInputSchema ]),
}).strict() ;

export const departmentUpsertArgsSchema: z.ZodType<Prisma.departmentUpsertArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereUniqueInputSchema,
  create: z.union([ departmentCreateInputSchema,departmentUncheckedCreateInputSchema ]),
  update: z.union([ departmentUpdateInputSchema,departmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const departmentCreateManyArgsSchema: z.ZodType<Prisma.departmentCreateManyArgs> = z.object({
  data: z.union([ departmentCreateManyInputSchema,departmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const departmentDeleteArgsSchema: z.ZodType<Prisma.departmentDeleteArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  where: departmentWhereUniqueInputSchema,
}).strict() ;

export const departmentUpdateArgsSchema: z.ZodType<Prisma.departmentUpdateArgs> = z.object({
  select: departmentSelectSchema.optional(),
  include: departmentIncludeSchema.optional(),
  data: z.union([ departmentUpdateInputSchema,departmentUncheckedUpdateInputSchema ]),
  where: departmentWhereUniqueInputSchema,
}).strict() ;

export const departmentUpdateManyArgsSchema: z.ZodType<Prisma.departmentUpdateManyArgs> = z.object({
  data: z.union([ departmentUpdateManyMutationInputSchema,departmentUncheckedUpdateManyInputSchema ]),
  where: departmentWhereInputSchema.optional(),
}).strict() ;

export const departmentDeleteManyArgsSchema: z.ZodType<Prisma.departmentDeleteManyArgs> = z.object({
  where: departmentWhereInputSchema.optional(),
}).strict() ;

export const patientCreateArgsSchema: z.ZodType<Prisma.patientCreateArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  data: z.union([ patientCreateInputSchema,patientUncheckedCreateInputSchema ]),
}).strict() ;

export const patientUpsertArgsSchema: z.ZodType<Prisma.patientUpsertArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereUniqueInputSchema,
  create: z.union([ patientCreateInputSchema,patientUncheckedCreateInputSchema ]),
  update: z.union([ patientUpdateInputSchema,patientUncheckedUpdateInputSchema ]),
}).strict() ;

export const patientCreateManyArgsSchema: z.ZodType<Prisma.patientCreateManyArgs> = z.object({
  data: z.union([ patientCreateManyInputSchema,patientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const patientDeleteArgsSchema: z.ZodType<Prisma.patientDeleteArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  where: patientWhereUniqueInputSchema,
}).strict() ;

export const patientUpdateArgsSchema: z.ZodType<Prisma.patientUpdateArgs> = z.object({
  select: patientSelectSchema.optional(),
  include: patientIncludeSchema.optional(),
  data: z.union([ patientUpdateInputSchema,patientUncheckedUpdateInputSchema ]),
  where: patientWhereUniqueInputSchema,
}).strict() ;

export const patientUpdateManyArgsSchema: z.ZodType<Prisma.patientUpdateManyArgs> = z.object({
  data: z.union([ patientUpdateManyMutationInputSchema,patientUncheckedUpdateManyInputSchema ]),
  where: patientWhereInputSchema.optional(),
}).strict() ;

export const patientDeleteManyArgsSchema: z.ZodType<Prisma.patientDeleteManyArgs> = z.object({
  where: patientWhereInputSchema.optional(),
}).strict() ;

export const pdCreateArgsSchema: z.ZodType<Prisma.pdCreateArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  data: z.union([ pdCreateInputSchema,pdUncheckedCreateInputSchema ]),
}).strict() ;

export const pdUpsertArgsSchema: z.ZodType<Prisma.pdUpsertArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereUniqueInputSchema,
  create: z.union([ pdCreateInputSchema,pdUncheckedCreateInputSchema ]),
  update: z.union([ pdUpdateInputSchema,pdUncheckedUpdateInputSchema ]),
}).strict() ;

export const pdCreateManyArgsSchema: z.ZodType<Prisma.pdCreateManyArgs> = z.object({
  data: z.union([ pdCreateManyInputSchema,pdCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const pdDeleteArgsSchema: z.ZodType<Prisma.pdDeleteArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  where: pdWhereUniqueInputSchema,
}).strict() ;

export const pdUpdateArgsSchema: z.ZodType<Prisma.pdUpdateArgs> = z.object({
  select: pdSelectSchema.optional(),
  include: pdIncludeSchema.optional(),
  data: z.union([ pdUpdateInputSchema,pdUncheckedUpdateInputSchema ]),
  where: pdWhereUniqueInputSchema,
}).strict() ;

export const pdUpdateManyArgsSchema: z.ZodType<Prisma.pdUpdateManyArgs> = z.object({
  data: z.union([ pdUpdateManyMutationInputSchema,pdUncheckedUpdateManyInputSchema ]),
  where: pdWhereInputSchema.optional(),
}).strict() ;

export const pdDeleteManyArgsSchema: z.ZodType<Prisma.pdDeleteManyArgs> = z.object({
  where: pdWhereInputSchema.optional(),
}).strict() ;

export const regionCreateArgsSchema: z.ZodType<Prisma.regionCreateArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  data: z.union([ regionCreateInputSchema,regionUncheckedCreateInputSchema ]),
}).strict() ;

export const regionUpsertArgsSchema: z.ZodType<Prisma.regionUpsertArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereUniqueInputSchema,
  create: z.union([ regionCreateInputSchema,regionUncheckedCreateInputSchema ]),
  update: z.union([ regionUpdateInputSchema,regionUncheckedUpdateInputSchema ]),
}).strict() ;

export const regionCreateManyArgsSchema: z.ZodType<Prisma.regionCreateManyArgs> = z.object({
  data: z.union([ regionCreateManyInputSchema,regionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const regionDeleteArgsSchema: z.ZodType<Prisma.regionDeleteArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  where: regionWhereUniqueInputSchema,
}).strict() ;

export const regionUpdateArgsSchema: z.ZodType<Prisma.regionUpdateArgs> = z.object({
  select: regionSelectSchema.optional(),
  include: regionIncludeSchema.optional(),
  data: z.union([ regionUpdateInputSchema,regionUncheckedUpdateInputSchema ]),
  where: regionWhereUniqueInputSchema,
}).strict() ;

export const regionUpdateManyArgsSchema: z.ZodType<Prisma.regionUpdateManyArgs> = z.object({
  data: z.union([ regionUpdateManyMutationInputSchema,regionUncheckedUpdateManyInputSchema ]),
  where: regionWhereInputSchema.optional(),
}).strict() ;

export const regionDeleteManyArgsSchema: z.ZodType<Prisma.regionDeleteManyArgs> = z.object({
  where: regionWhereInputSchema.optional(),
}).strict() ;

export const staffCreateArgsSchema: z.ZodType<Prisma.staffCreateArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  data: z.union([ staffCreateInputSchema,staffUncheckedCreateInputSchema ]),
}).strict() ;

export const staffUpsertArgsSchema: z.ZodType<Prisma.staffUpsertArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereUniqueInputSchema,
  create: z.union([ staffCreateInputSchema,staffUncheckedCreateInputSchema ]),
  update: z.union([ staffUpdateInputSchema,staffUncheckedUpdateInputSchema ]),
}).strict() ;

export const staffCreateManyArgsSchema: z.ZodType<Prisma.staffCreateManyArgs> = z.object({
  data: z.union([ staffCreateManyInputSchema,staffCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const staffDeleteArgsSchema: z.ZodType<Prisma.staffDeleteArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  where: staffWhereUniqueInputSchema,
}).strict() ;

export const staffUpdateArgsSchema: z.ZodType<Prisma.staffUpdateArgs> = z.object({
  select: staffSelectSchema.optional(),
  include: staffIncludeSchema.optional(),
  data: z.union([ staffUpdateInputSchema,staffUncheckedUpdateInputSchema ]),
  where: staffWhereUniqueInputSchema,
}).strict() ;

export const staffUpdateManyArgsSchema: z.ZodType<Prisma.staffUpdateManyArgs> = z.object({
  data: z.union([ staffUpdateManyMutationInputSchema,staffUncheckedUpdateManyInputSchema ]),
  where: staffWhereInputSchema.optional(),
}).strict() ;

export const staffDeleteManyArgsSchema: z.ZodType<Prisma.staffDeleteManyArgs> = z.object({
  where: staffWhereInputSchema.optional(),
}).strict() ;

export const infectiousCreateArgsSchema: z.ZodType<Prisma.infectiousCreateArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  data: z.union([ infectiousCreateInputSchema,infectiousUncheckedCreateInputSchema ]),
}).strict() ;

export const infectiousUpsertArgsSchema: z.ZodType<Prisma.infectiousUpsertArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereUniqueInputSchema,
  create: z.union([ infectiousCreateInputSchema,infectiousUncheckedCreateInputSchema ]),
  update: z.union([ infectiousUpdateInputSchema,infectiousUncheckedUpdateInputSchema ]),
}).strict() ;

export const infectiousCreateManyArgsSchema: z.ZodType<Prisma.infectiousCreateManyArgs> = z.object({
  data: z.union([ infectiousCreateManyInputSchema,infectiousCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const infectiousDeleteArgsSchema: z.ZodType<Prisma.infectiousDeleteArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  where: infectiousWhereUniqueInputSchema,
}).strict() ;

export const infectiousUpdateArgsSchema: z.ZodType<Prisma.infectiousUpdateArgs> = z.object({
  select: infectiousSelectSchema.optional(),
  include: infectiousIncludeSchema.optional(),
  data: z.union([ infectiousUpdateInputSchema,infectiousUncheckedUpdateInputSchema ]),
  where: infectiousWhereUniqueInputSchema,
}).strict() ;

export const infectiousUpdateManyArgsSchema: z.ZodType<Prisma.infectiousUpdateManyArgs> = z.object({
  data: z.union([ infectiousUpdateManyMutationInputSchema,infectiousUncheckedUpdateManyInputSchema ]),
  where: infectiousWhereInputSchema.optional(),
}).strict() ;

export const infectiousDeleteManyArgsSchema: z.ZodType<Prisma.infectiousDeleteManyArgs> = z.object({
  where: infectiousWhereInputSchema.optional(),
}).strict() ;

export const kidney_assessmentCreateArgsSchema: z.ZodType<Prisma.kidney_assessmentCreateArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  data: z.union([ kidney_assessmentCreateInputSchema,kidney_assessmentUncheckedCreateInputSchema ]),
}).strict() ;

export const kidney_assessmentUpsertArgsSchema: z.ZodType<Prisma.kidney_assessmentUpsertArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereUniqueInputSchema,
  create: z.union([ kidney_assessmentCreateInputSchema,kidney_assessmentUncheckedCreateInputSchema ]),
  update: z.union([ kidney_assessmentUpdateInputSchema,kidney_assessmentUncheckedUpdateInputSchema ]),
}).strict() ;

export const kidney_assessmentCreateManyArgsSchema: z.ZodType<Prisma.kidney_assessmentCreateManyArgs> = z.object({
  data: z.union([ kidney_assessmentCreateManyInputSchema,kidney_assessmentCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const kidney_assessmentDeleteArgsSchema: z.ZodType<Prisma.kidney_assessmentDeleteArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  where: kidney_assessmentWhereUniqueInputSchema,
}).strict() ;

export const kidney_assessmentUpdateArgsSchema: z.ZodType<Prisma.kidney_assessmentUpdateArgs> = z.object({
  select: kidney_assessmentSelectSchema.optional(),
  include: kidney_assessmentIncludeSchema.optional(),
  data: z.union([ kidney_assessmentUpdateInputSchema,kidney_assessmentUncheckedUpdateInputSchema ]),
  where: kidney_assessmentWhereUniqueInputSchema,
}).strict() ;

export const kidney_assessmentUpdateManyArgsSchema: z.ZodType<Prisma.kidney_assessmentUpdateManyArgs> = z.object({
  data: z.union([ kidney_assessmentUpdateManyMutationInputSchema,kidney_assessmentUncheckedUpdateManyInputSchema ]),
  where: kidney_assessmentWhereInputSchema.optional(),
}).strict() ;

export const kidney_assessmentDeleteManyArgsSchema: z.ZodType<Prisma.kidney_assessmentDeleteManyArgs> = z.object({
  where: kidney_assessmentWhereInputSchema.optional(),
}).strict() ;

export const noninfectiousCreateArgsSchema: z.ZodType<Prisma.noninfectiousCreateArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  data: z.union([ noninfectiousCreateInputSchema,noninfectiousUncheckedCreateInputSchema ]),
}).strict() ;

export const noninfectiousUpsertArgsSchema: z.ZodType<Prisma.noninfectiousUpsertArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereUniqueInputSchema,
  create: z.union([ noninfectiousCreateInputSchema,noninfectiousUncheckedCreateInputSchema ]),
  update: z.union([ noninfectiousUpdateInputSchema,noninfectiousUncheckedUpdateInputSchema ]),
}).strict() ;

export const noninfectiousCreateManyArgsSchema: z.ZodType<Prisma.noninfectiousCreateManyArgs> = z.object({
  data: z.union([ noninfectiousCreateManyInputSchema,noninfectiousCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const noninfectiousDeleteArgsSchema: z.ZodType<Prisma.noninfectiousDeleteArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  where: noninfectiousWhereUniqueInputSchema,
}).strict() ;

export const noninfectiousUpdateArgsSchema: z.ZodType<Prisma.noninfectiousUpdateArgs> = z.object({
  select: noninfectiousSelectSchema.optional(),
  include: noninfectiousIncludeSchema.optional(),
  data: z.union([ noninfectiousUpdateInputSchema,noninfectiousUncheckedUpdateInputSchema ]),
  where: noninfectiousWhereUniqueInputSchema,
}).strict() ;

export const noninfectiousUpdateManyArgsSchema: z.ZodType<Prisma.noninfectiousUpdateManyArgs> = z.object({
  data: z.union([ noninfectiousUpdateManyMutationInputSchema,noninfectiousUncheckedUpdateManyInputSchema ]),
  where: noninfectiousWhereInputSchema.optional(),
}).strict() ;

export const noninfectiousDeleteManyArgsSchema: z.ZodType<Prisma.noninfectiousDeleteManyArgs> = z.object({
  where: noninfectiousWhereInputSchema.optional(),
}).strict() ;