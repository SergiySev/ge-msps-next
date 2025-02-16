'use client';

import { PencilSquareIcon } from '@heroicons/react/16/solid';
import { Button, Link } from "@heroui/react";
import { patient as Patient } from '@prisma/client';

export default function ProfileHeader({ patient }: { patient: Patient }) {
  return (
    <div className="flex w-full items-center space-x-2 p-2">
      <div className="w-full font-bold">
        {patient.last_name} {patient.first_name}
      </div>
      <Button href={`/patient/${patient.id}`} as={Link} color="default" isIconOnly variant="light" size="sm">
        <PencilSquareIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
