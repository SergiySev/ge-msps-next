'use client';

import { useTranslations } from 'next-intl';
import Menu, { DropdownMenuItem, Language } from 'msps/lib/components/menu/Menu';
import { UserIcon, ClipboardDocumentListIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/16/solid';

interface NavigationProps {
  className?: string;
}

export default function Navigation({ className }: NavigationProps) {
  const t = useTranslations();

  const dropdownMenuItems: DropdownMenuItem[] = [
    {
      key: 'patient',
      href: '/patient',
      label: t('menu.patient'),
      icon: UserIcon,
    },
    {
      key: 'kidney-assessment',
      href: '/kidney-assessment',
      label: t('menu.assessment'),
      icon: ClipboardDocumentListIcon,
    },
    {
      key: 'infectious',
      href: '/infectious',
      label: t('menu.infectious'),
      icon: ClipboardDocumentCheckIcon,
    },
    {
      key: 'noninfectious',
      href: '/noninfectious',
      label: t('menu.noninfectious'),
      icon: ClipboardDocumentCheckIcon,
    },
  ];

  const languages: Language[] = [
    { key: 'ka', label: 'ქართული' },
    { key: 'en', label: 'English' },
  ];

  return <Menu className={className} dropdownMenuItems={dropdownMenuItems} languages={languages} />;
}
