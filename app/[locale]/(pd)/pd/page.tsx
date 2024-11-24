import { pd_pd_modality, pd_solution_per_input } from '@prisma/client';
import { PDForm } from 'msps/lib/components/forms';

export default async function PDAddPage() {
  return (
    <>
      <h4 className="text-xl font-semibold">პდ დამატება</h4>
      <PDForm
        className="mt-8"
        data={{
          pd_modality: pd_pd_modality.CAPD,
          solution_per_input: pd_solution_per_input.lt_8,
        }}
      />
    </>
  );
}
