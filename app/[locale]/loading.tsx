import { Spinner } from '@nextui-org/react';

export default function Loading() {
  return (
    <div className="w-full h-80 flex justify-center items-center">
      <Spinner size="lg" color="primary" label="იტვირთება..." />
    </div>
  );
}
