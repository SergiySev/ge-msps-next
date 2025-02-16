'use client';

import { Button, Link } from "@heroui/react";
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const navItems = [
  { href: 'diseases', label: 'diseases' },
  { href: 'pd', label: 'pd' },
  { href: 'kidney-assessment', label: 'kidney_assessment' },
  { href: 'infectious', label: 'infectious' },
  { href: 'noninfectious', label: 'noninfectious' },
];

type NavButtonProps = {
  href: string;
  label: string;
  activePath: string;
  t: (key: string) => string;
};

function NavButton({ href, label, activePath, t }: NavButtonProps) {
  return (
    <Button href={href} as={Link} color={activePath === href ? 'primary' : 'default'} variant="light" size="sm">
      {t(label)}
    </Button>
  );
}

export default function ProfileNavigation() {
  const currentPath = usePathname();
  const parts = currentPath.split('/').filter(Boolean);
  const activePath = parts[parts.length - 1];
  const t = useTranslations('profile_navigation');

  return (
    <div className="p-4 flex flex-row gap-4">
      {navItems.map(item => (
        <NavButton key={item.href} href={item.href} label={item.label} activePath={activePath} t={t} />
      ))}
    </div>
  );
}
