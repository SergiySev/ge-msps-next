'use client';

import { Button, Link } from '@nextui-org/react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: 'diseases', label: 'დაავადებები' },
  { href: 'pd', label: 'პდ' },
  { href: 'kidney-assessment', label: 'შეფასებები' },
  { href: 'infectious', label: 'ინფექციური' },
  { href: 'noninfectious', label: 'არაინფექციური' },
];

type NavButtonProps = {
  href: string;
  label: string;
  activePath: string;
};

function NavButton({ href, label, activePath }: NavButtonProps) {
  return (
    <Button href={href} as={Link} color={activePath === href ? 'primary' : 'default'} variant="light" size="sm">
      {label}
    </Button>
  );
}

export default function ProfileNavigation() {
  const currentPath = usePathname();
  const parts = currentPath.split('/').filter(Boolean);
  const activePath = parts[parts.length - 1];

  return (
    <div className="p-4 flex flex-row gap-4">
      {navItems.map(item => (
        <NavButton key={item.href} href={item.href} label={item.label} activePath={activePath} />
      ))}
    </div>
  );
}
