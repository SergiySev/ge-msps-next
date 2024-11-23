import { Button } from '@nextui-org/react';
import { patientsJson } from './sheets/patient.sheet';
import { pdJson } from './sheets/pd.sheet';
import { infectiousJson } from './sheets/infectious.sheet';
import { noninfectiousJson } from './sheets/noninfectious.sheet';
import { assessmentJson } from './sheets/assessment.sheet';
import xlsx from 'json-as-xlsx';
import { TableCellsIcon } from '@heroicons/react/16/solid';

export default function XLSXButton() {
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

    const x = <TableCellsIcon />;

    xlsx(
      [
        patientsJson(response.patients),
        pdJson(response.pds),
        infectiousJson(response.infections),
        noninfectiousJson(response.noninfections),
        assessmentJson(response.assessments),
      ],
      {
        ...settings,
        fileName: `pd_data_${new Date().toISOString().replaceAll(':', '').replace('T', '-').slice(0, 17)}`,
      }
    );
  };

  return (
    <Button color="secondary" onClick={() => download()} startContent={<TableCellsIcon className="min-w-6 min-h-6" />}>
      პდ - ექსელის გადმოწერა
    </Button>
  );
}
