'use client';

import { type noninfectious as Noninfectious } from '@prisma/client';
import {
  ControlledDateInput,
  SubmitButton,
  ControlledPatientSelector,
  ControlledCheckbox,
  ControlledTextArea,
} from '../../controlled-form-components';

import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { createNoninfectiousClientSchema, updateNoninfectiousClientSchema } from 'msps/lib/validation/noninfectious';
import toast from 'react-hot-toast';
import { createNoninfectious, updateNoninfectious } from 'msps/lib/actions/noninfectiousAction';
import { useTranslations } from 'next-intl';
import { Divider } from '@nextui-org/react';
import { useEffect } from 'react';

interface NoninfectiousFormProps {
  data: Noninfectious | Partial<Noninfectious>;
  className?: string;
}

const NoninfectiousForm = ({ data, className }: NoninfectiousFormProps) => {
  const isEditPage = data.hasOwnProperty('id');
  const schema = isEditPage ? updateNoninfectiousClientSchema : createNoninfectiousClientSchema;

  const t = useTranslations();

  const {
    form: {
      control,
      formState: { isSubmitting },
      setValue,
      watch,
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      const action = isEditPage ? updateNoninfectious : createNoninfectious;
      return action(formValues);
    },
    zodResolver(schema),
    {
      formProps: {
        defaultValues: {
          ...data,
        },
      },
      actionProps: {
        onSuccess: ({ input }) => {
          console.log('Success: ', input);
          toast.success('შეფასება შენახულია!');
          if (!isEditPage) resetFormAndAction();
        },
        onError: ({ error }) => {
          toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  const otherValue = watch('other');

  useEffect(() => {
    if (!otherValue) setValue('other_comment', '');
  }, [otherValue, setValue]);

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

        <ControlledDateInput name="date" label="ჩატარების თარიღი" control={control} rules={{ required: true }} />

        <Divider className="md:col-span-2 border-dashed my-4" />

        <h4 className="text-md font-semibold md:col-span-2 my-4">არაინფექციურის დამატება</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
          <ControlledCheckbox name="hernia" label={t('hernia')} control={control} />
          <ControlledCheckbox name="catheter_positioning" label={t('catheter_positioning')} control={control} />
          <ControlledCheckbox name="catheter_repositioning" label={t('catheter_repositioning')} control={control} />
          <ControlledCheckbox name="catheter_malposition" label={t('catheter_malposition')} control={control} />
          <ControlledCheckbox
            name="catheter_intraluminal_occlusion"
            label={t('catheter_intraluminal_occlusion')}
            control={control}
          />
          <ControlledCheckbox
            name="catheter_extraluminal_occlusion"
            label={t('catheter_extraluminal_occlusion')}
            control={control}
          />
          <ControlledCheckbox name="catheter_rinking" label={t('catheter_rinking')} control={control} />
          <ControlledCheckbox name="catheter_leakage" label={t('catheter_leakage')} control={control} />
          <ControlledCheckbox name="hydrothorax" label={t('hydrothorax')} control={control} />
          <ControlledCheckbox name="abdominal_leakage" label={t('abdominal_leakage')} control={control} />
          <ControlledCheckbox name="genital_discharge" label={t('genital_discharge')} control={control} />
          <ControlledCheckbox name="hepomeritoneum" label={t('hepomeritoneum')} control={control} />
          <ControlledCheckbox name="chyloperitoneum" label={t('chyloperitoneum')} control={control} />
          <ControlledCheckbox name="catheter_decrease" label={t('catheter_decrease')} control={control} />
          <ControlledCheckbox name="eps" label={t('eps')} control={control} />
          <ControlledCheckbox name="other" label={t('other')} control={control} />
          <ControlledTextArea
            name="other_comment"
            label={t('other_comment')}
            control={control}
            isDisabled={!otherValue}
          />
        </div>

        <Divider className="md:col-span-2 border-dashed my-4" />
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
    </form>
  );
};

export default NoninfectiousForm;
