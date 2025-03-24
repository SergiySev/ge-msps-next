'use client';

import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NavbarBrand,
} from '@heroui/react';
import {
  ChevronDownIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
  GlobeAltIcon,
  ArrowLeftStartOnRectangleIcon,
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';
import { usePermissions } from 'msps/lib/hooks/usePermissions';

export default function Menu({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const t = useTranslations();
  const locale = useLocale();
  const { isAdmin } = usePermissions();

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const isActive = (path: string) => currentPath === path;

  const isAdminOrManager = session?.user?.role === 'admin' || session?.user?.role === 'manager';

  const dropdownMenuItems = [
    {
      key: 'patient',
      href: '/patient/add',
      label: 'Patient',
      icon: UserIcon,
    },
    {
      key: 'infectious',
      href: '/infectious/add',
      label: 'Infectious',
      icon: ClipboardDocumentListIcon,
    },
    {
      key: 'comorbidity',
      href: '/comorbidity/add',
      label: 'Comorbidity',
      icon: ClipboardDocumentCheckIcon,
    },
  ];

  const handleLogout = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
      await signOut({
        redirect: true,
        callbackUrl: `${baseUrl}/login`, // Use dynamic base URL
      });
      toast.success(t('logoutSuccess'));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '';
      toast.error(`${t('logoutError')}${errorMessage ? `: ${errorMessage}` : ''}`);
    }
  };

  const languages = [
    { key: 'ka', label: 'ქართული' },
    { key: 'en', label: 'English' },
  ];

  const handleLanguageChange = (key: string) => {
    // Get the current path
    const pathSegments = currentPath.split('/').filter(Boolean); // Remove empty strings

    // Check if the first segment is a valid language
    const isCurrentPathStartsWithLang = languages.some(lang => pathSegments[0] === lang.key);

    // If path starts with language code, replace it; otherwise, prepend the new language
    const newPathSegments = isCurrentPathStartsWithLang ? [key, ...pathSegments.slice(1)] : [key, ...pathSegments];

    // Create new path with selected locale
    const newPath = `/${newPathSegments.join('/')}`;

    // Use window.location for full page refresh with new language
    window.location.href = newPath;
  };

  return (
    <Navbar className={clsx('', className)} position="static">
      <NavbarBrand>
        <NavbarItem isActive={isActive('/')}>
          <Link href="/" aria-current={isActive('/') ? 'page' : undefined} title={t('menu.home')}>
            <HomeIcon className="w-4 h-4 mr-2" />
            {t('menu.home')}
          </Link>
        </NavbarItem>
        <NavbarItem>
          {session?.user && (
            <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 ml-6">
              <UserIcon className="min-w-4 min-h-4" />
              <span className="text-sm font-medium text-gray-700 underline">{session.user.lastName}</span>
            </Link>
          )}
        </NavbarItem>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <div className="flex items-center gap-2">
          {isAdmin && (
            <Button href="/admin/hospitals" as={Link} color="default" variant="light" size="md">
              <BuildingOfficeIcon className="w-4 h-4" /> {t('hospital.title')}
            </Button>
          )}
          {isAdminOrManager ? (
            <Button href="/staff" as={Link} color="default" variant="light" size="md">
              <UserIcon className="w-4 h-4" /> {t('staff')}
            </Button>
          ) : (
            <DropdownMenu aria-label={t('new')}>
              {dropdownMenuItems.map(({ key, href, label, icon: Icon }) => (
                <DropdownItem key={key} textValue={key} className="m-0 p-0">
                  <Button href={href} as={Link} color="default" variant="light" size="md">
                    <Icon className="w-4 h-4" /> {label}
                  </Button>
                </DropdownItem>
              ))}
            </DropdownMenu>
          )}
        </div>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                startContent={<GlobeAltIcon className="w-4 h-4" />}
                endContent={<ChevronDownIcon className="w-4 h-4" />}
              >
                {languages.find(lang => lang.key === locale)?.label}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Language selection"
              selectionMode="single"
              selectedKeys={new Set([locale])}
              onSelectionChange={keys => {
                const selected = Array.from(keys)[0] as string;
                handleLanguageChange(selected);
              }}
            >
              {languages.map(({ key, label }) => (
                <DropdownItem key={key}>{label}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
        <NavbarItem isActive={isActive('/exit')}>
          <Button
            onPress={handleLogout}
            as={Link}
            color="default"
            variant="ghost"
            title={t('menu.exit')}
            isIconOnly
            startContent={<ArrowLeftStartOnRectangleIcon className="w-4 h-4" />}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
