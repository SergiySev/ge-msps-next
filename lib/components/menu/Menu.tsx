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

const tagAStyles =
  'relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity';
const tagLiStyles = 'text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold';

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
              <DropdownItem key={key} startContent={<Icon className="w-4 h-4" />} textValue={key}>
                <Link href={href} className="text-sm text-black">
                  {label}
                </Link>
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
