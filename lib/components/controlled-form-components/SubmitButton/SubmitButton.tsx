import { Button } from '@nextui-org/react';
import clsx from 'clsx';

interface SubmitButtonProps {
  className?: string;
  isEdit?: boolean;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, isEdit = false, isLoading = false }) => {
  return (
    <div className={clsx('mx-auto md:flex-none w-full', className)}>
      <div className="flex items-center justify-center">
        {/* Existing Submit Buttons */}
        {!isEdit && (
          <Button color="primary" type="submit" className="w-full sm:w-1/3" isLoading={isLoading}>
            დამატება
          </Button>
        )}
        {isEdit && (
          <Button color="secondary" type="submit" className="w-full sm:w-1/3" isLoading={isLoading}>
            რედაქტირება
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmitButton;
