'use client';

import { infectious_infection_type, type infectious as Infectious } from '@prisma/client';
import {
  ControlledDateInput,
  SubmitButton,
  ControlledPatientSelector,
  ControlledRadioGroup,
  ControlledCheckbox,
  ControlledTextArea,
} from '../../controlled-form-components';

import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { createInfectiousClientSchema, updateInfectiousClientSchema } from 'msps/lib/validation/infectious';
import toast from 'react-hot-toast';
import { createInfectious, updateInfectious } from 'msps/lib/actions/infectiousAction';
import { useTranslations } from 'next-intl';
import { Divider } from '@nextui-org/react';
import { useEffect } from 'react';

interface InfectiousFormProps {
  data: Infectious | Partial<Infectious>;
  className?: string;
}

const InfectiousForm = ({ data, className }: InfectiousFormProps) => {
  const isEditPage = data.hasOwnProperty('id');
  const schema = isEditPage ? updateInfectiousClientSchema : createInfectiousClientSchema;

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
      const action = isEditPage ? updateInfectious : createInfectious;
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

        <div className="grid grid-cols-1">
          <ControlledRadioGroup
            name="infection_type"
            label={t('infection_type')}
            control={control}
            rules={{ required: true }}
            items={[
              { value: infectious_infection_type.peritonitis, label: t(infectious_infection_type.peritonitis) },
              {
                value: infectious_infection_type.catheter_infection,
                label: t(infectious_infection_type.catheter_infection),
              },
              {
                value: infectious_infection_type.tunnel_infection,
                label: t(infectious_infection_type.tunnel_infection),
              },
            ]}
          />
        </div>
        <div className="grid grid-cols-1 gap-4">
          <ControlledDateInput name="infection_start_date" label={t('infection_start_date')} control={control} />
          <ControlledDateInput name="infection_end_date" label={t('infection_end_date')} control={control} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2"></div>
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <h4 className="text-md font-semibold md:col-span-2 my-4">ინფექციის გამომწვევი</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
        <ControlledCheckbox name="staphylococcus" label={t('staphylococcus')} control={control} />
        <ControlledCheckbox name="streptococcus" label={t('streptococcus')} control={control} />
        <ControlledCheckbox name="intestinal_stick" label={t('intestinal_stick')} control={control} />
        <ControlledCheckbox name="pseudomona" label={t('pseudomona')} control={control} />
        <ControlledCheckbox name="enterococcus" label={t('enterococcus')} control={control} />
        <ControlledCheckbox name="candida" label={t('candida')} control={control} />
        <ControlledCheckbox name="other" label={t('other')} control={control} />
        <ControlledTextArea
          name="other_comment"
          label={t('other_comment')}
          control={control}
          isDisabled={!otherValue}
        />
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <h4 className="text-md font-semibold md:col-span-2 my-4">ინფექციის გამომწვევი</h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-2">
        <ControlledCheckbox name="vancomycin" label={t('vancomycin')} control={control} />
        <ControlledCheckbox name="ceftazidime" label={t('ceftazidime')} control={control} />
        <ControlledCheckbox name="ceftriaxone" label={t('ceftriaxone')} control={control} />
        <ControlledCheckbox name="cefepime" label={t('cefepime')} control={control} />
        <ControlledCheckbox name="meropenem" label={t('meropenem')} control={control} />
        <ControlledCheckbox name="imipenem" label={t('imipenem')} control={control} />
        <ControlledCheckbox name="ciprofloxacin" label={t('ciprofloxacin')} control={control} />
        <ControlledCheckbox name="cefazolin" label={t('cefazolin')} control={control} />
        <ControlledCheckbox name="gentamicin" label={t('gentamicin')} control={control} />
        <ControlledCheckbox name="clindamycin" label={t('clindamycin')} control={control} />
        <ControlledCheckbox name="rifampicin" label={t('rifampicin')} control={control} />
        <ControlledCheckbox name="rluconazole" label={t('rluconazole')} control={control} />
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
        <ControlledDateInput
          name="treatment_start_date"
          label={t('treatment_start_date')}
          control={control}
          rules={{ required: true }}
        />
        <ControlledDateInput
          name="treatment_end_date"
          label={t('treatment_end_date')}
          control={control}
          rules={{ required: true }}
        />
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
    </form>
  );
};

export default InfectiousForm;
