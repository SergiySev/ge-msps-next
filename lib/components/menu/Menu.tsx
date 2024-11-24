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
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';

export default function Menu({ className }: { className?: string }) {
  const currentPath = usePathname();

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

  return (
    <Navbar className={clsx('', className)} position="static">
      <NavbarBrand>
        <NavbarItem isActive={isActive('/')}>
          <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>
            მთავარი
          </Link>
        </NavbarItem>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
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
      <NavbarContent justify="end">
        <NavbarItem isActive={isActive('/exit')}>
          <Button href={`/exit`} as={Link} color="default" variant="ghost">
            გამოსვლა
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
