import { d } from 'msps/lib/validation/helpers/date';

export const noninfectiousJson = (data: unknown, t) => ({
  sheet: t('noninfectious'),
  columns: [
    { label: t('record'), value: 'id' },
    { label: t('patient'), value: 'patient_id' },
    { label: t('check_date'), value: row => d(row.date) },
    { label: t('hernia'), value: 'hernia' },
    { label: t('catheter_positioning'), value: 'catheter_positioning' },
    { label: t('catheter_malposition'), value: 'catheter_malposition' },
    { label: t('catheter_intraluminal_occlusion'), value: 'catheter_intraluminal_occlusion' },
    { label: t('catheter_extraluminal_occlusion'), value: 'catheter_extraluminal_occlusion' },
    { label: t('catheter_rinking'), value: 'catheter_rinking' },
    { label: t('catheter_repositioning'), value: 'catheter_repositioning' },
    { label: t('catheter_leakage'), value: 'catheter_leakage' },
    { label: t('hydrothorax'), value: 'hydrothorax' },
    { label: t('abdominal_leakage'), value: 'abdominal_leakage' },
    { label: t('genital_discharge'), value: 'genital_discharge' },
    { label: t('hepomeritoneum'), value: 'hepomeritoneum' },
    { label: t('chyloperitoneum'), value: 'chyloperitoneum' },
    { label: t('catheter_decrease'), value: 'catheter_decrease' },
    { label: t('eps'), value: 'eps' },
    { label: t('other'), value: 'other' },
    { label: t('other_comment'), value: 'other_comment' },
  ],
  content: [...data],
});
