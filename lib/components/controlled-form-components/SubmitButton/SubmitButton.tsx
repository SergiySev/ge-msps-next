import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';

interface SubmitButtonProps {
  className?: string;
  isEdit?: boolean;
  isLoading?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ className, isEdit = false, isLoading = false }) => {
  const t = useTranslations();

  return (
    <div className={clsx('mx-auto md:flex-none w-full', className)}>
      <div className="flex items-center justify-center">
        {!isEdit && (
          <Button color="primary" type="submit" className="w-full sm:w-1/3" isLoading={isLoading}>
            {t('actions.add')}
          </Button>
        )}
        {isEdit && (
          <Button color="secondary" type="submit" className="w-full sm:w-1/3" isLoading={isLoading}>
            {t('actions.edit')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmitButton;
