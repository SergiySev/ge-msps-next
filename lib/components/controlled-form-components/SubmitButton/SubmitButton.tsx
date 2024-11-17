import { Button } from '@nextui-org/react';
import clsx from 'clsx';

interface SubmitButtonProps {
  className?: string;
  isEdit?: boolean;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, isEdit = false, isLoading = false }) => {
  return (
    <div className={clsx('md:w-1/2 mx-auto md:flex-none w-full', className)}>
      {!isEdit && (
        <Button color="primary" type="submit" className="w-full" isLoading={isLoading}>
          დამატება
        </Button>
      )}
      {isEdit && (
        <Button color="secondary" type="submit" className="w-full" isLoading={isLoading}>
          რედაქტირება
        </Button>
      )}
    </div>
  );
};

export default SubmitButton;
