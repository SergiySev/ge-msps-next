'use client';

import { usePathname } from 'next/navigation';
import { Navbar, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import clsx from 'clsx';

const tagAStyles =
  'relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-foreground no-underline hover:opacity-80 active:opacity-disabled transition-opacity';
const tagLiStyles = 'text-medium whitespace-nowrap box-border list-none data-[active=true]:font-semibold';

export default function Menu({ className }: { className?: string }) {
  const currentPath = usePathname();

  const isActive = (path: string) => currentPath === path;

  return (
    <Navbar className={clsx('', className)} position="static">
      <NavbarItem isActive={isActive('/')}>
        <Link href="/" aria-current={isActive('/') ? 'page' : undefined}>
          მთავარი
        </Link>
      </NavbarItem>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {/* <NavbarItem isActive={isActive('/pds')}>
          <Link color="foreground" href="/pds">
            პდ
          </Link>
        </NavbarItem> */}
        <NavbarItem isActive={isActive('/exit')}>
          <Button href={`/exit`} as={Link} color="default" variant="ghost">
            გამოსვლა
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
