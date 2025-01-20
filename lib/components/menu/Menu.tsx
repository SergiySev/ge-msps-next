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
} from '@nextui-org/react';
import {
  ChevronDownIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
  GlobeAltIcon,
  ArrowLeftStartOnRectangleIcon,
} from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';
import { signOut, useSession } from 'next-auth/react';
import { useLocale } from 'next-intl';

export default function Menu({ className }: { className?: string }) {
  const { data: session, status } = useSession();
  const currentPath = usePathname();
  const t = useTranslations();

  const locale = useLocale();
  const isLanguageSwithcherEnabled = false;

  if (status === 'loading' || status === 'unauthenticated') {
    return null;
  }

  const isActive = (path: string) => currentPath === path;

  const dropdownMenuItems = [
    {
      key: 'pd',
      href: '/pd',
      label: 'პდ',
      icon: PlusIcon,
    },
    {
      key: 'kidney-assessment',
      href: '/kidney-assessment',
      label: 'შეფასება',
      icon: PlusIcon,
    },
    {
      key: 'infectious',
      href: '/infectious',
      label: 'ინფექციური',
      icon: PlusIcon,
    },
    {
      key: 'noninfectious',
      href: '/noninfectious',
      label: 'არაინფექციური',
      icon: PlusIcon,
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
    // Get the path segments after the locale
    const pathSegments = currentPath.split('/').slice(2);
    // Create new path with selected locale
    const newPath = `/${key}/${pathSegments.join('/')}`;
    console.log('Current path:', currentPath);
    console.log('New path:', newPath);
    // Use replace instead of push to avoid adding to history stack
    window.location.href = newPath; // Use window.location instead of router
  };

  return (
    <Navbar className={clsx('', className)} position="static">
      <NavbarBrand>
        <NavbarItem isActive={isActive('/')}>
          <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>
            <HomeIcon className="w-4 h-4 mr-2" />
            მთავარი
          </Link>
        </NavbarItem>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <Dropdown className="shadow-md border rounded-lg">
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDownIcon className="w-4 h-4" />}
                radius="sm"
                variant="light"
              >
                ახალი...
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu aria-label="ახალი...">
            {dropdownMenuItems.map(({ key, href, label, icon: Icon }) => (
              <DropdownItem key={key} textValue={key} className="m-0 p-0">
                <Button href={href} as={Link} color="default" variant="light" size="md">
                  <Icon className="w-4 h-4" /> {label}
                </Button>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          {session?.user && (
            <Link href="/profile" className="flex items-center gap-2 hover:opacity-80">
              <UserIcon className="min-w-4 min-h-4" />
              <span className="text-sm font-medium text-gray-700 underline">
                {session.user.lastName} {session.user.firstName}
              </span>
            </Link>
          )}
        </NavbarItem>
        {isLanguageSwithcherEnabled && (
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
        )}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem isActive={isActive('/exit')}>
          <Button
            onPress={handleLogout}
            as={Link}
            color="default"
            variant="ghost"
            title="გამოსვლა"
            isIconOnly
            startContent={<ArrowLeftStartOnRectangleIcon className="min-w-6 min-h-6" />}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
