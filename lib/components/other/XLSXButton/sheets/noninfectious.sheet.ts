import { getLabel } from './label';

export const noninfectiousJson = (data: never) => ({
  sheet: getLabel('noninfectious'),
  columns: [
    { label: getLabel('record'), value: 'id' },
    { label: getLabel('patient'), value: 'patient_id' },
    { label: getLabel('check_date'), value: 'date' },
    { label: getLabel('hernia'), value: 'hernia' },
    { label: getLabel('catheter_positioning'), value: 'catheter_positioning' },
    { label: getLabel('catheter_malposition'), value: 'catheter_malposition' },
    { label: getLabel('catheter_intraluminal_occlusion'), value: 'catheter_intraluminal_occlusion' },
    { label: getLabel('catheter_extraluminal_occlusion'), value: 'catheter_extraluminal_occlusion' },
    { label: getLabel('catheter_rinking'), value: 'catheter_rinking' },
    { label: getLabel('catheter_repositioning'), value: 'catheter_repositioning' },
    { label: getLabel('catheter_leakage'), value: 'catheter_leakage' },
    { label: getLabel('hydrothorax'), value: 'hydrothorax' },
    { label: getLabel('abdominal_leakage'), value: 'abdominal_leakage' },
    { label: getLabel('genital_discharge'), value: 'genital_discharge' },
    { label: getLabel('hepomeritoneum'), value: 'hepomeritoneum' },
    { label: getLabel('chyloperitoneum'), value: 'chyloperitoneum' },
    { label: getLabel('catheter_decrease'), value: 'catheter_decrease' },
    { label: getLabel('eps'), value: 'eps' },
    { label: getLabel('other'), value: 'other' },
    { label: getLabel('other_comment'), value: 'other_comment' },
  ],
  content: [...data],
});
