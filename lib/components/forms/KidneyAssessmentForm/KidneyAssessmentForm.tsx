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
import { createKidneyAssessment, updateKidneyAssessment } from 'msps/lib/actions/kidneyAssessmentAction';

interface KidneyAssessmentFormProps {
  kidneyAssessment: KidneyAssessment | Partial<KidneyAssessment>;
  className?: string;
}

const KidneyAssessmentForm = ({ kidneyAssessment, className }: KidneyAssessmentFormProps) => {
  const isEdit = kidneyAssessment.hasOwnProperty('id');
  const schema = isEdit ? updateKidneyAssessmentClientSchema : createKidneyAssessmentClientSchema;

  const {
    form: {
      control,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      const action = isEdit ? updateKidneyAssessment : createKidneyAssessment;
      console.log('KidneyAssessmentForm: ', formValues);
      return action(formValues);
    },
    zodResolver(schema),
    {
      formProps: {
        defaultValues: {
          ...kidneyAssessment,
        },
      },
      actionProps: {
        onSuccess: ({ input }) => {
          console.log('Success: ', input);
          toast.success('შეფასება შენახულია!');
          if (!isEdit) resetFormAndAction();
        },
        onError: ({ error }) => {
          toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlledPatientSelector name="patient_id" label="პაციენტი" control={control} rules={{ required: true }} />

        <ControlledDateInput name="check_date" label="თარიღის თარიღი" control={control} rules={{ required: true }} />

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

      <SubmitButton className="mt-8" isEdit={isEdit} isLoading={isSubmitting} />
    </form>
  );
};

export default KidneyAssessmentForm;
