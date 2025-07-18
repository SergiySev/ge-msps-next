import { d } from 'msps/lib/validation/helpers/date';

export const infectiousJson = (data: unknown, t: (key: string) => string) => ({
  sheet: t('infectious'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('patient'), value: 'patient_id' },
    { label: t('date'), value: (row: { date: Date }) => d(row.date) },
    { label: t('infection_type'), value: (row: { infection_type: string }) => t(row.infection_type) },
    { label: t('infection_start_date'), value: (row: { infection_start_date: Date }) => d(row.infection_start_date) },
    { label: t('infection_end_date'), value: (row: { infection_end_date: Date }) => d(row.infection_end_date) },
    { label: t('staphylococcus'), value: 'staphylococcus' },
    { label: t('streptococcus'), value: 'streptococcus' },
    { label: t('intestinal_stick'), value: 'intestinal_stick' },
    { label: t('pseudomona'), value: 'pseudomona' },
    { label: t('enterococcus'), value: 'enterococcus' },
    { label: t('candida'), value: 'candida' },
    { label: t('other'), value: 'other' },
    { label: t('other_comment'), value: 'other_comment' },
    { label: t('treatment_start_date'), value: (row: { treatment_start_date: Date }) => d(row.treatment_start_date) },
    { label: t('treatment_end_date'), value: (row: { treatment_end_date: Date }) => d(row.treatment_end_date) },
    { label: t('vancomycin'), value: 'vancomycin' },
    { label: t('ceftazidime'), value: 'ceftazidime' },
    { label: t('ceftriaxone'), value: 'ceftriaxone' },
    { label: t('cefepime'), value: 'cefepime' },
    { label: t('meropenem'), value: 'meropenem' },
    { label: t('imipenem'), value: 'imipenem' },
    { label: t('ciprofloxacin'), value: 'ciprofloxacin' },
    { label: t('cefazolin'), value: 'cefazolin' },
    { label: t('gentamicin'), value: 'gentamicin' },
    { label: t('clindamycin'), value: 'clindamycin' },
    { label: t('rifampicin'), value: 'rifampicin' },
    { label: t('fluconazole'), value: 'fluconazole' },
    { label: t('other_antibiotics'), value: 'other_antibiotics' },
    { label: t('other_antibiotics_comment'), value: 'other_antibiotics_comment' },
    {
      label: t('hospital.title'),
      value: 'hospital_name',
    },
  ],
  content: [...(data as [])],
});
