'use client';

import { type patient as Patient, type department as Department, type region as Region } from '@prisma/client';
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
import { createPatient, updatePatient } from 'msps/lib/actions/patientAction';
import { Divider } from '@nextui-org/react';
import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { updatePatientClientSchema, createPatientClientSchema } from 'msps/lib/validation/patient';
import toast from 'react-hot-toast';

interface PatientFormProps {
  patient: Patient | Partial<Patient>;
  departments: Department[];
  regions: Region[];
  className?: string;
}

const PatientForm = ({ patient, regions, departments, className }: PatientFormProps) => {
  const isEdit = patient.hasOwnProperty('id');

  const schema = isEdit ? updatePatientClientSchema : createPatientClientSchema;

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
      const action = isEdit ? updatePatient : createPatient;
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
          if (!isEdit) resetFormAndAction();
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
      <SubmitButton className="mb-8" isEdit={isEdit} isLoading={isSubmitting} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ControlledInput name="last_name" control={control} rules={{ required: true }} label="გვარი" />
        <ControlledInput name="first_name" control={control} rules={{ required: true }} label="სახელი" />
        <ControlledInput
          name="personal_id"
          control={control}
          rules={{ required: true }}
          label="პირადი ნომერი"
          max={11}
          min={11}
        />
        <ControlledDateInput name="birth_date" control={control} rules={{ required: true }} label="დაბადების თარიღი" />
        <ControlledRadioGroup
          control={control}
          rules={{ required: true }}
          label="სქესი"
          items={[
            { value: 'male', label: 'მამრობითი' },
            { value: 'female', label: 'მდედრობითი' },
          ]}
          name="sex"
        />
        <ControlledInput name="bmi" control={control} label="BMI" />
        <ControlledInput name="phone" control={control} label="ტელეფონის ნომერი" />
        <ControlledSelect
          name="region_id"
          control={control}
          rules={{ required: true }}
          label="რეგიონი"
          items={regions}
        />
        <ControlledInput name="address" control={control} label="მისამართი" className="md:col-span-2" />
        <Divider className="md:col-span-2 border-dashed" />
        <ControlledSelect
          name="department_id"
          control={control}
          rules={{ required: true }}
          label="სადიალიზო ცენტრი"
          items={departments}
        />
        <ControlledStaffSelector
          role="doctor"
          name="doctor_id"
          control={control}
          rules={{ required: true }}
          label="Doctor"
        />
        <Divider className="md:col-span-2 border-dashed" />
        <ControlledDateInput name="pd_transit_date" control={control} label="ჰემოდიალიზზე გადასვლის თარიღი" />
        <ControlledDateInput name="transplantation_date" control={control} label="ტრანსპლანტაციის თარიღი" />
        <Divider className="md:col-span-2 border-dashed" />

        <div className="md:col-span-2">
          <ControlledCheckbox name="mors" control={control} label="MORS" onValueChange={handleMorsChange} />
        </div>

        {morsCheckbox && (
          <>
            <ControlledDateInput name="mors_date" control={control} label="MORS თარიღი" />
            <ControlledSelect
              name="mors_reason"
              control={control}
              label="MORS მიზეზი"
              placeholder=" "
              clearable={true}
              clearableText="-- აირჩიეთ --"
              items={[
                { id: 'mors_heart', name: 'გულ-სისხლძარღვთა სისტემა' },
                { id: 'mors_infection', name: 'ინფექცია' },
                { id: 'mors_other', name: 'სხვა' },
              ]}
            />

            <ControlledTextArea
              name="mors_comment"
              control={control}
              label="MORS კომენტარი"
              className="md:col-span-2"
            />
          </>
        )}
      </div>

      <SubmitButton className="mt-8" isEdit={isEdit} isLoading={isSubmitting} />
    </form>
  );
};

export default PatientForm;
