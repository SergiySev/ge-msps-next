import { d } from 'msps/lib/validation/helpers/date';

export const patientsJson = (data, t) => ({
  sheet: t('patients'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('birth_date'), value: row => d(row.birth_date) },
    { label: t('sex'), value: row => t(row.sex) },
    {
      label: t('region'),
      value: row => `${row.region?.name}`,
    },
    {
      label: t('doctor'),
      value: row =>
        `${row.staff_patient_doctor_idTostaff?.first_name[0]}. ${row.staff_patient_doctor_idTostaff?.last_name}`,
    },
    {
      label: t('bmi'),
      value: 'bmi',
    },
    { label: t('transplantation_date'), value: row => d(row.transplantation_date) },
    { label: t('pd_transit_date'), value: row => d(row.pd_transit_date) },
    { label: t('md_diabetes'), value: 'md_diabetes' },
    { label: t('md_hypertension'), value: 'md_hypertension' },
    {
      label: t('md_glomerulonephritis'),
      value: 'md_glomerulonephritis',
    },
    { label: t('md_adptd'), value: 'md_adptd' },
    { label: t('md_lupus'), value: 'md_lupus' },
    { label: t('md_vasculitis'), value: 'md_vasculitis' },
    { label: t('md_amyloidosis'), value: 'md_amyloidosis' },
    { label: t('md_unknown'), value: 'md_unknown' },
    { label: t('md_other'), value: 'md_other' },
    { label: t('md_other_comment'), value: 'md_other_comment' },
    { label: t('cd_heart'), value: 'cd_heart' },
    { label: t('cd_cancer'), value: 'cd_cancer' },
    { label: t('cd_a_pressure'), value: 'cd_a_pressure' },
    { label: t('cd_p_pressure'), value: 'cd_p_pressure' },
    { label: t('cd_cirrhosis'), value: 'cd_cirrhosis' },
    { label: t('cd_demention'), value: 'cd_demention' },
    { label: t('cd_pqod'), value: 'cd_pqod' },
    { label: t('cd_other'), value: 'cd_other' },
    { label: t('cd_other_comment'), value: 'cd_other_comment' },
    { label: t('mors'), value: 'mors' },
    { label: t('mors_date'), value: row => d(row.mors_date) },
    {
      label: t('mors_reason'),
      value: row => (row.mors_reason ? t(row.mors_reason) : ''),
    },
    { label: t('mors_comment'), value: 'mors_comment' },
  ],
  content: [...data],
});
