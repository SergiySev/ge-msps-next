'use client';

import { type kidney_assessment as KidneyAssessment, kidney_assessment_pet } from '@prisma/client';
import {
  ControlledDateInput,
  ControlledSelect,
  SubmitButton,
  ControlledPatientSelector,
  ControlledTextArea,
  ControlledInput,
} from '../../controlled-form-components';

import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createKidneyAssessmentClientSchema,
  updateKidneyAssessmentClientSchema,
} from 'msps/lib/validation/kidney_assessment';
import toast from 'react-hot-toast';
import {
  createKidneyAssessment,
  updateKidneyAssessment,
  deleteKidneyAssessment,
} from 'msps/lib/actions/kidneyAssessmentAction';
import DeleteButton from '../../controlled-form-components/DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface KidneyAssessmentFormProps {
  data: KidneyAssessment | Partial<KidneyAssessment>;
  className?: string;
}

const KidneyAssessmentForm = ({ data, className }: KidneyAssessmentFormProps) => {
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
        return updateKidneyAssessment(formValues);
      }
      return createKidneyAssessment(formValues);
    },
    isEditPage ? zodResolver(updateKidneyAssessmentClientSchema) : zodResolver(createKidneyAssessmentClientSchema),
    {
      formProps: {
        defaultValues: {
          ...data,
        },
      },
      actionProps: {
        onSuccess: ({ input }) => {
          toast.success('შეფასება შენახულია!');
          if (!isEditPage) resetFormAndAction();
          else router.push(`/profile/${data.patient_id}/kidney-assessment`);
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

        <ControlledDateInput name="check_date" label={t('check_date')} control={control} rules={{ required: true }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
          <ControlledInput name="gfr" label="GFR" control={control} />

          <ControlledInput name="ktv" label="Kt/V" control={control} />

          <ControlledSelect
            name="pet"
            control={control}
            label="PET"
            placeholder=" "
            clearable={true}
            clearableText="-- აირჩიეთ --"
            items={Object.entries(kidney_assessment_pet).map(([id, name]) => ({ id, name }))}
          />
        </div>

        <ControlledTextArea name="ka_comment" control={control} label="კომენტარი" className="md:col-span-2" />
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
      {isEditPage && data.id && (
        <DeleteButton
          className="mt-8"
          deleteAction={deleteKidneyAssessment}
          id={data.id}
          onDelete={() => router.push(`/profile/${data.patient_id}/noninfectious`)}
        />
      )}
    </form>
  );
};

export default KidneyAssessmentForm;
