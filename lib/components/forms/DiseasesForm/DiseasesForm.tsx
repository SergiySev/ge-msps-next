'use client';

import { type patient as Patient } from '@prisma/client';
import {
  ControlledCheckbox,
  ControlledPatientSelector,
  ControlledTextArea,
  SubmitButton,
} from '../../controlled-form-components';
import clsx from 'clsx';
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { Divider } from '@heroui/react';
import { updateDiseasesClientSchema } from 'msps/lib/validation/diseases';
import { updateDiseases } from 'msps/lib/actions/diseasesAction';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface DiseasesFormProps {
  data: Patient | Partial<Patient>;
  className?: string;
}

const DiseasesForm = ({ data, className }: DiseasesFormProps) => {
  const isEditPage = true;

  const router = useRouter();

  const schema = updateDiseasesClientSchema;

  const {
    form: {
      control,
      formState: { isSubmitting },
      watch,
      setValue,
    },
    handleSubmitWithAction,
    resetFormAndAction,
  } = useHookFormAction(
    async formValues => {
      const action = updateDiseases;
      return action(formValues);
    },
    zodResolver(schema),
    {
      formProps: {
        defaultValues: data,
      },
      actionProps: {
        onSuccess: () => {
          toast.success(`${data.last_name} ${data.first_name} შენახულია!`);
          if (!isEditPage) resetFormAndAction();
          else router.push(`/profile/${data.id}/diseases`);
        },
        onError: ({ error }) => {
          console.error('Error: ', error);
          toast.error(`შეცდომა: ${error.serverError || ''}`);
        },
      },
    }
  );

  const mdOtherValue = watch('md_other');
  const cdOtherValue = watch('cd_other');

  useEffect(() => {
    if (!mdOtherValue) setValue('md_other_comment', '');
  }, [mdOtherValue, setValue]);

  useEffect(() => {
    if (!cdOtherValue) setValue('cd_other_comment', '');
  }, [cdOtherValue, setValue]);

  return (
    <form onSubmit={handleSubmitWithAction} className={clsx(className)}>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <ControlledPatientSelector
            name="id"
            editable={false}
            label="პაციენტი"
            control={control}
            rules={{ required: true }}
          />
        </div>

        <Divider className="md:col-span-2 border-dashed my-4" />

        <h4 className="text-md font-semibold">ძირითადი დაავადებები</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ControlledCheckbox name="md_diabetes" control={control} label="დიაბეტი" />
          <ControlledCheckbox name="md_hypertension" control={control} label="ჰიპერტენზია" />
          <ControlledCheckbox name="md_glomerulonephritis" control={control} label="გლომერულონეფრიტი" />
          <ControlledCheckbox name="md_adptd" control={control} label="ადპთდ" />
          <ControlledCheckbox name="md_lupus" control={control} label="ლუპუს ნეფრიტი" />
          <ControlledCheckbox name="md_vasculitis" control={control} label="ვასკულიტი" />
          <ControlledCheckbox name="md_amyloidosis" control={control} label="ამილოიდოზი" />
          <ControlledCheckbox name="md_unknown" control={control} label="უცნობი" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlledCheckbox name="md_other" control={control} label="სხვა (ძირითადი)" />

          <ControlledTextArea
            name="md_other_comment"
            label="სხვა (ძირითადი) კომენტარი"
            control={control}
            isDisabled={!mdOtherValue}
          />
        </div>

        <Divider className="md:col-span-2 border-dashed my-4" />

        <h4 className="text-md font-semibold">კომორბიდული დაავადებები</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ControlledCheckbox name="cd_heart" control={control} label="გულის უკმარისობა" />
          <ControlledCheckbox name="cd_cancer" control={control} label="სიმსივნე" />
          <ControlledCheckbox name="cd_a_pressure" control={control} label="პორონარული არტერიების დაავადება" />
          <ControlledCheckbox name="cd_p_pressure" control={control} label="პერიფერიული არტერიების დაავადება" />
          <ControlledCheckbox name="cd_cirrhosis" control={control} label="ღვიძლის ციროზი" />
          <ControlledCheckbox name="cd_pqod" control={control} label="ფქოდ" />
          <ControlledCheckbox name="cd_demention" control={control} label="დემენცია" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ControlledCheckbox name="cd_other" control={control} label="სხვა (კომორბიდული)" />

          <ControlledTextArea
            name="cd_other_comment"
            label="სხვა (კომორბიდური) კომენტარი"
            control={control}
            isDisabled={!cdOtherValue}
          />
        </div>

        <Divider className="md:col-span-2 border-dashed my-4" />
      </div>

      <SubmitButton className="mt-8" isEdit={isEditPage} isLoading={isSubmitting} />
    </form>
  );
};

export default DiseasesForm;
