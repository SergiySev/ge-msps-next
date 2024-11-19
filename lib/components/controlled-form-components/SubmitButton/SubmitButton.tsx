import { Button } from '@nextui-org/react';
import clsx from 'clsx';

interface SubmitButtonProps {
  className?: string;
  isEdit?: boolean;
  isLoading?: boolean;
  showDelete?: boolean; // Control delete button visibility
  onDelete?: () => void; // Callback for delete action
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ 
  className, 
  isEdit = false, 
  isLoading = false,
  showDelete = false,
  onDelete,
}) => {
  return (
    <div className={clsx('md:w-1/2 mx-auto md:flex-none w-full flex items-center', className)}>
      {/* Existing Submit Buttons */}
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

      {/* Delete Button */}
      {showDelete && (
        <Button 
          color="danger" 
          className="ml-2" // Add margin for spacing
          onClick={onDelete} 
          type="button" // Prevent form submission
        >
          Delete 
        </Button>
      )}
    </div>
  );
};

export default SubmitButton;
