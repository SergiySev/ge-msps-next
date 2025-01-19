import { Button } from '@nextui-org/react';
import { patientsJson } from './sheets/patient.sheet';
import { pdJson } from './sheets/pd.sheet';
import { infectiousJson } from './sheets/infectious.sheet';
import { noninfectiousJson } from './sheets/noninfectious.sheet';
import { assessmentJson } from './sheets/assessment.sheet';
import xlsx from 'json-as-xlsx';
import { TableCellsIcon } from '@heroicons/react/16/solid';
import { useTranslations } from 'next-intl';
import { d } from 'msps/lib/validation/helpers/date';

export default function XLSXButton() {
  const t = useTranslations();

  const settings = {
    // fileName: 'pd_data', // Name of the resulting spreadsheet
    extraLength: 4, // A bigger number means that columns will be wider
    writeMode: 'writeFile', // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
    writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    // RTL: true, // Display the columns from right-to-left (the default value is false)
  };

  const download = async () => {
    const fetchData = await fetch('/api/xlsx');
    const response = await fetchData.json();

    xlsx(
      [
        // @ts-expect-error: Type mismatch due to dynamic data structure
        patientsJson(response.patients, t),
        // @ts-expect-error: Type mismatch due to dynamic data structure
        pdJson(response.pds, t),
        // @ts-expect-error: Type mismatch due to dynamic data structure
        infectiousJson(response.infections, t),
        // @ts-expect-error: Type mismatch due to dynamic data structure
        noninfectiousJson(response.noninfections, t),
        // @ts-expect-error: Type mismatch due to dynamic data structure
        assessmentJson(response.assessments, t),
      ],
      {
        ...settings,
        fileName: `pd_data_${d(new Date())}`,
      }
    );
  };

  return (
    <Button color="secondary" onPress={() => download()} startContent={<TableCellsIcon className="min-w-6 min-h-6" />}>
      პდ - ექსელის გადმოწერა
    </Button>
  );
}
