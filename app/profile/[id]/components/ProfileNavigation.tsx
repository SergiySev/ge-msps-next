'use client';

import { Button, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

export default function ProfileNavigation() {
  const currentPath = usePathname();

  const parts = currentPath.split('/').filter(Boolean);
  const activePath = parts[parts.length - 1];

  return (
    <div className="p-4 flex flex-row gap-4">
      <Button
        href={`diseases`}
        as={Link}
        color={activePath === 'diseases' ? 'primary' : 'default'}
        variant="light"
        size="sm"
      >
        დაავადებები
      </Button>

      <Button
        href={`kidney-assessment`}
        as={Link}
        color={activePath === 'kidney-assessment' ? 'primary' : 'default'}
        variant="light"
        size="sm"
      >
        შეფასებები
      </Button>
    </div>
  );
}
