'use client';

import { type patient as Patient } from "@prisma/client";
import { useForm } from "react-hook-form";
import { ControlledCheckbox, ControlledInput } from "../controlled-form-components";

interface PatientFormProps {
    patient: Patient;
}

const PatientForm = ({ patient }: PatientFormProps) => {
    const { register, handleSubmit, control, setValue, setError, formState } = useForm({
        defaultValues: patient
    });
    setError('last_name', { type: 'manual', message: 'This is an error' });
    setError('mors', { type: 'manual', message: 'This is an error' });
    const onSubmit = (data: any) => console.log(data.last_name);
    const onDebug = (data: any) => console.log(data.last_name);

    console.log(patient.last_name);
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <ControlledCheckbox<Patient>
                        color="warning"
                        size="lg"
                        name="mors"
                        control={control}
                        rules={{ required: true }}
                        label="MORS" />
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-1">
                    <ControlledInput<Patient>
                        name="first_name"
                        control={control}
                        rules={{ required: true }}
                        label="Firstname"
                        placeholder="Firstname"
                    />
                </div>
                <div className="sm:col-span-1">
                    <ControlledInput<Patient>
                            name="last_name"
                            control={control}
                            rules={{ required: true }}
                            label="Lastname"
                            placeholder="Lastname"
                        />
                </div>
            </div>
            <input type="submit" />
            <button onClick={onDebug}>Debug</button>
        </form>
    );
}

export default PatientForm;