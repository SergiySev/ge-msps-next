import { getLabel } from './label';

export const patientsJson = data => ({
  sheet: getLabel('patients'),
  columns: [
    { label: getLabel('record'), value: 'id' },
    { label: getLabel('birth_date'), value: 'birth_date' },
    { label: getLabel('sex'), value: 'sex' },
    {
      label: getLabel('region'),
      value: row => `${row.region?.name}`,
    },
    {
      label: getLabel('doctor'),
      value: row => `${row.staff?.first_name[0]}. ${row.staff?.last_name}`,
    },
    {
      label: getLabel('department'),
      value: row => `${row.department?.name}`,
    },
    {
      label: getLabel('bmi'),
      value: 'bmi',
    },
    { label: getLabel('transplantation_date'), value: 'transplantation_date' },
    { label: getLabel('pd_transit_date'), value: 'pd_transit_date' },
    { label: getLabel('md_diabetes'), value: 'md_diabetes' },
    { label: getLabel('md_hypertension'), value: 'md_hypertension' },
    {
      label: getLabel('md_glomerulonephritis'),
      value: 'md_glomerulonephritis',
    },
    { label: getLabel('md_adptd'), value: 'md_adptd' },
    { label: getLabel('md_lupus'), value: 'md_lupus' },
    { label: getLabel('md_vasculitis'), value: 'md_vasculitis' },
    { label: getLabel('md_amyloidosis'), value: 'md_amyloidosis' },
    { label: getLabel('md_unknown'), value: 'md_unknown' },
    { label: getLabel('md_other'), value: 'md_other' },
    { label: getLabel('md_other_comment'), value: 'md_other_comment' },
    { label: getLabel('cd_heart'), value: 'cd_heart' },
    { label: getLabel('cd_cancer'), value: 'cd_cancer' },
    { label: getLabel('cd_a_pressure'), value: 'cd_a_pressure' },
    { label: getLabel('cd_p_pressure'), value: 'cd_p_pressure' },
    { label: getLabel('cd_cirrhosis'), value: 'cd_cirrhosis' },
    { label: getLabel('cd_demention'), value: 'cd_demention' },
    { label: getLabel('cd_pqod'), value: 'cd_pqod' },
    { label: getLabel('cd_other'), value: 'cd_other' },
    { label: getLabel('cd_other_comment'), value: 'cd_other_comment' },
    { label: getLabel('mors'), value: 'mors' },
    { label: getLabel('mors_date'), value: 'mors_date' },
    {
      label: getLabel('mors_reason'),
      value: row => (row.mors_reason ? getLabel(row.mors_reason) : ''),
    },
    { label: getLabel('mors_comment'), value: 'mors_comment' },
  ],
  content: [...data],
});
