'use client';

import { ChevronDownIcon } from '@heroicons/react/16/solid';
import { usePathname } from 'next/navigation';
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from '@nextui-org/react';
import clsx from 'clsx';

const tagAStyles =
  'relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity';
const tagLiStyles = 'text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold';

export default function Menu({ className }: { className?: string }) {
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  return (
    <Navbar className={clsx('border-1 rounded-lg border-blue-900', className)} position="static">
      <NavbarItem isActive={isActive('/')}>
        <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>
          მთავარი
        </Link>
      </NavbarItem>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem className={clsx(tagLiStyles)}>
            <DropdownTrigger>
              <Button
                disableRipple
                className={clsx('p-0 bg-transparent data-[hover=true]:bg-transparent', tagAStyles)}
                endContent={<ChevronDownIcon fill="currentColor" className="min-w-6 min-h-6" />}
                radius="sm"
                variant="light"
              >
                Features
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem key="autoscaling" className="w-full text-center">
              <Link color="foreground" href="/patient">
                დამატება
              </Link>
            </DropdownItem>
            <DropdownItem key="usage_metrics" className="w-full text-center">
              <Link color="foreground" href="/">
                ძებნა
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <NavbarItem isActive={isActive('/patients')}>
          <Link color="foreground" href="/patients">
            პაციენტები
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/pds')}>
          <Link color="foreground" href="/pds">
            პდ
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isActive('/assessment')}>
          <Link color="foreground" href="/assessment">
            შეფასება
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
