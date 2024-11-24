import NoninfectiousForm from 'msps/lib/components/forms/Noninfectious/NoninfectiousForm';

export default async function NonifectiousAddPage() {
  return (
    <>
      <h4 className="text-xl font-semibold">არაინფექციურის დამატება</h4>
      <NoninfectiousForm
        className="mt-8"
        data={{
          other_comment: '',
        }}
      />
    </>
  );
}
