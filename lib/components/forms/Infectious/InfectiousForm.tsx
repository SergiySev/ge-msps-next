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
import {
  CreateInfectiousClientSchema,
  createInfectiousClientSchema,
  UpdateInfectiousClientSchema,
  updateInfectiousClientSchema,
} from 'msps/lib/validation/infectious';
import toast from 'react-hot-toast';
import { createInfectious, updateInfectious, deleteInfectious } from 'msps/lib/actions/infectiousAction';
import { useTranslations } from 'next-intl';
import { Divider } from '@heroui/react';
import { useEffect } from 'react';
import DeleteButton from '../../controlled-form-components/DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';

interface InfectiousFormProps {
  data: Infectious | Partial<Infectious>;
  className?: string;
}

const InfectiousForm = ({ data, className }: InfectiousFormProps) => {
  const isEditPage = data.hasOwnProperty('id');

  const t = useTranslations();
  const router = useRouter();

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
      if (isEditPage) {
        return updateInfectious(formValues as UpdateInfectiousClientSchema);
      }
      return createInfectious(formValues as CreateInfectiousClientSchema);
    },
    isEditPage ? zodResolver(updateInfectiousClientSchema) : zodResolver(createInfectiousClientSchema),
    {
      formProps: {
        defaultValues: {
          ...data,
        },
      },
      actionProps: {
        onSuccess: () => {
          toast.success(t('assessment_saved'));
          if (!isEditPage) resetFormAndAction();
          else router.push(`/profile/${data.patient_id}/infectious`);
        },
        onError: ({ error }) => {
          console.error('Error: ', error);
          toast.error(`${t('error')}: ${error.serverError || ''}`);
        },
      },
    }
  );

  const otherValue = watch('other');
  const otherAntibioticsValue = watch('other_antibiotics');

  useEffect(() => {
    if (!otherValue) setValue('other_comment', '');
    if (!otherAntibioticsValue) setValue('other_antibiotics_comment', '');
  }, [otherValue, otherAntibioticsValue, setValue]);

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ControlledPatientSelector
          name="patient_id"
          editable={!isEditPage}
          label={t('patient')}
          control={control}
          rules={{
            required: t('patient_id_required'),
          }}
        />

        <ControlledDateInput name="date" label={t('check_date')} control={control} rules={{ required: true }} />

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

      <h4 className="text-md font-semibold md:col-span-2 my-4">მკურნალობა</h4>

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
        <ControlledCheckbox name="fluconazole" label={t('fluconazole')} control={control} />
        <ControlledCheckbox name="other_antibiotics" label={t('other_antibiotics')} control={control} />
        <ControlledTextArea
          name="other_antibiotics_comment"
          label={t('other_antibiotics_comment')}
          control={control}
          isDisabled={!otherAntibioticsValue}
        />
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
        <ControlledDateInput name="treatment_start_date" label={t('treatment_start_date')} control={control} />
        <ControlledDateInput name="treatment_end_date" label={t('treatment_end_date')} control={control} />
      </div>

      <Divider className="md:col-span-2 border-dashed my-4" />

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
      {isEditPage && data.id && (
        <DeleteButton
          className="mt-8"
          deleteAction={deleteInfectious}
          id={data.id}
          onDelete={() => router.push(`/profile/${data.patient_id}/noninfectious`)}
        />
      )}
    </form>
  );
};

export default InfectiousForm;
