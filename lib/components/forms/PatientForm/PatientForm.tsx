'use client';

import { type patient as Patient, type region as Region, patient_sex, patient_mors_reason } from '@prisma/client';
import {
  ControlledCheckbox,
  ControlledInput,
  ControlledDateInput,
  ControlledStaffSelector,
  ControlledSelect,
  SubmitButton,
  ControlledRadioGroup,
  ControlledTextArea,
} from '../../controlled-form-components';
import { createPatient, deletePatient, updatePatient } from 'msps/lib/actions/patientAction';
import { Divider } from "@heroui/react";
import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePatientClientSchema, createPatientClientSchema } from 'msps/lib/validation/patient';
import toast from 'react-hot-toast';
import DeleteButton from '../../controlled-form-components/DeleteButton/DeleteButton';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

interface PatientFormProps {
  patient: Patient | Partial<Patient>;
  regions: Region[];
  className?: string;
}

const PatientForm = ({ patient, regions, className }: PatientFormProps) => {
  const isEditPage = patient.hasOwnProperty('id');
  const t = useTranslations();

  const schema = isEditPage ? updatePatientClientSchema : createPatientClientSchema;
  const router = useRouter();

  const {
    form: {
      control,
      watch,
      setValue,
      formState: { isSubmitting },
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      const action = isEditPage ? updatePatient : createPatient;
      return action(formValues);
    },
    zodResolver(schema),
    {
      formProps: {
        defaultValues: patient,
      },
      actionProps: {
        onSuccess: ({ input }) => {
          console.log('Success: ', `${input.last_name} ${input.first_name}`);
          toast.success(`${input.last_name} ${input.first_name} შენახულია!`);
          if (!isEditPage) resetFormAndAction();
        },
        onError: ({ error }) => {
          console.log('Error: ', error);
          toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  const morsCheckbox = watch('mors');

  const handleMorsChange = (value: boolean) => {
    if (!value) {
      setValue('mors_date', undefined);
      setValue('mors_reason', undefined);
      setValue('mors_comment', undefined);
    }
  };

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <SubmitButton className="mb-8" isEdit={isEditPage} isLoading={isSubmitting} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ControlledInput name="last_name" control={control} rules={{ required: true }} label={t('last_name')} />
        <ControlledInput name="first_name" control={control} rules={{ required: true }} label={t('first_name')} />
        <ControlledInput
          name="personal_id"
          control={control}
          rules={{ required: true }}
          label={t('personal_id')}
          max={11}
          min={11}
        />
        <ControlledDateInput name="birth_date" control={control} rules={{ required: true }} label={t('birth_date')} />
        <ControlledRadioGroup
          control={control}
          rules={{ required: true }}
          label={t('sex')}
          items={[
            { value: patient_sex.male, label: t(patient_sex.male) },
            { value: patient_sex.female, label: t(patient_sex.female) },
          ]}
          name="sex"
        />
        <ControlledInput name="bmi" control={control} label={t('bmi')} />
        <ControlledInput name="phone" control={control} label={t('phone')} />
        <ControlledSelect
          name="region_id"
          control={control}
          rules={{ required: true }}
          label={t('region')}
          items={regions}
        />
        <ControlledInput name="address" control={control} label={t('address')} className="md:col-span-2" />
        <Divider className="md:col-span-2 border-dashed my-4" />
        <ControlledStaffSelector
          role="doctor"
          name="doctor_id"
          control={control}
          rules={{ required: true }}
          label={t('doctor')}
        />
        <Divider className="md:col-span-2 border-dashed my-4" />
        <ControlledDateInput name="pd_transit_date" control={control} label={t('pd_transit_date')} />
        <ControlledDateInput name="transplantation_date" control={control} label={t('transplantation_date')} />
        <Divider className="md:col-span-2 border-dashed my-4" />

        <div className="md:col-span-2">
          <ControlledCheckbox name="mors" control={control} label={t('mors')} onValueChange={handleMorsChange} />
        </div>

        {morsCheckbox && (
          <>
            <ControlledDateInput name="mors_date" control={control} label={t('mors_date')} />
            <ControlledSelect
              name="mors_reason"
              control={control}
              label={t('mors_reason')}
              placeholder=" "
              clearable={true}
              clearableText={t('form.clearable_text')}
              items={[
                { id: patient_mors_reason.mors_heart, name: t(patient_mors_reason.mors_heart) },
                { id: patient_mors_reason.mors_infection, name: t(patient_mors_reason.mors_infection) },
                { id: patient_mors_reason.mors_other, name: t(patient_mors_reason.mors_other) },
              ]}
            />
            <ControlledTextArea
              name="mors_comment"
              control={control}
              label={t('mors_comment')}
              className="md:col-span-2"
            />
          </>
        )}
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
      {isEditPage && patient.id && (
        <DeleteButton
          id={patient.id}
          deleteAction={deletePatient}
          onDelete={() => router.push('/')}
          customMessage={t('form.delete_patient_warning')}
        />
      )}
    </form>
  );
};

export default PatientForm;
