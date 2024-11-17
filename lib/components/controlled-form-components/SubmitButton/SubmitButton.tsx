import { Button } from '@nextui-org/react';
import clsx from 'clsx';

interface SubmitButtonProps {
  className?: string;
  isEdit?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, isEdit = false }) => {
  return (
    <div className={clsx('md:w-1/2 mx-auto md:flex-none w-full', className)}>
      {!isEdit && (
        <Button color="primary" type="submit" className="w-full">
          დამატება
        </Button>
      )}
      {isEdit && (
        <Button color="secondary" type="submit" className="w-full">
          რედაქტირება
        </Button>
      )}
    </div>
  );
};

export default SubmitButton;
