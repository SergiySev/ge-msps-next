'use client';

import { pd_pd_modality, pd_solution_per_input, type pd as PD } from '@prisma/client';
import {
  ControlledDateInput,
  SubmitButton,
  ControlledPatientSelector,
  ControlledRadioGroup,
  ControlledCheckbox,
} from '../../controlled-form-components';

import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPDClientSchema, updatePDClientSchema } from 'msps/lib/validation/pd';
import toast from 'react-hot-toast';
import { createPD, deletePD, updatePD } from 'msps/lib/actions/pdAction';
import { useTranslations } from 'next-intl';
import { Divider } from '@heroui/react';
import DeleteButton from '../../controlled-form-components/DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';

interface PDFormProps {
  data: PD | Partial<PD>;
  className?: string;
}

const PDForm = ({ data, className }: PDFormProps) => {
  const isEditPage = data.hasOwnProperty('id');

  const t = useTranslations();
  const router = useRouter();

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      if (isEditPage) {
        return updatePD(formValues);
      }
      return createPD(formValues);
    },
    isEditPage ? zodResolver(updatePDClientSchema) : zodResolver(createPDClientSchema),
    {
      formProps: {
        defaultValues: {
          ...data,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success('შეფასება შენახულია!');
          if (!isEditPage) resetFormAndAction();
          else router.push(`/profile/${data.patient_id}/pd`);
        },
        onError: ({ error }) => {
          console.error('Error: ', error);
          toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlledPatientSelector
          name="patient_id"
          editable={!isEditPage}
          label="პაციენტი"
          control={control}
          rules={{ required: true }}
        />

        <ControlledDateInput name="date" label="თარიღი" control={control} rules={{ required: true }} />

        <Divider className="md:col-span-2 border-dashed my-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
          <ControlledRadioGroup
            name="pd_modality"
            label={t('pd_modality')}
            control={control}
            orientation="vertical"
            rules={{ required: true }}
            items={[
              { value: pd_pd_modality.CAPD, label: t(pd_pd_modality.CAPD) },
              { value: pd_pd_modality.APD, label: t(pd_pd_modality.APD) },
            ]}
          />
          <div className="flex flex-col gap-4">
            <ControlledCheckbox name="icodextrin" control={control} label={t('icodextrin')} />
            <ControlledCheckbox name="pd_ch_solution_136" control={control} label={t('pd_ch_solution_136')} />
            <ControlledCheckbox name="pd_ch_solution_227" control={control} label={t('pd_ch_solution_227')} />
            <ControlledCheckbox name="pd_ch_solution_386" control={control} label={t('pd_ch_solution_386')} />
          </div>
          <ControlledRadioGroup
            name="solution_per_input"
            label={t('solution_per_input')}
            control={control}
            orientation="vertical"
            rules={{ required: true }}
            items={[
              { value: pd_solution_per_input.lt_8, label: t(pd_solution_per_input.lt_8) },
              { value: pd_solution_per_input.eq_8, label: t(pd_solution_per_input.eq_8) },
              { value: pd_solution_per_input.eq_10, label: t(pd_solution_per_input.eq_10) },
              { value: pd_solution_per_input.eq_12, label: t(pd_solution_per_input.eq_12) },
              { value: pd_solution_per_input.eq_15, label: t(pd_solution_per_input.eq_15) },
              { value: pd_solution_per_input.eq_17, label: t(pd_solution_per_input.eq_17) },
              { value: pd_solution_per_input.gt_17, label: t(pd_solution_per_input.gt_17) },
            ]}
          />
        </div>
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
      {isEditPage && data.id && (
        <DeleteButton
          className="mt-8"
          deleteAction={deletePD}
          id={data.id}
          onDelete={() => router.push(`/profile/${data.patient_id}/pd`)}
        />
      )}
    </form>
  );
};

export default PDForm;
