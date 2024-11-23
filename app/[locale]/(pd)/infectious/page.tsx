import { infectious_infection_type } from '@prisma/client';
import InfectiousForm from 'msps/lib/components/forms/Infectious/InfectiousForm';

export default async function InfectiousAddPage() {
  return (
    <>
      <h4 className="text-xl font-semibold">ინფექციურის დამატება</h4>
      <InfectiousForm
        className="mt-8"
        data={{
          infection_type: infectious_infection_type.peritonitis,
        }}
      />
    </>
  );
}
