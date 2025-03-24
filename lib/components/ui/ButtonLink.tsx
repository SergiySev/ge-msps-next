'use client';

import { Button, ButtonProps } from '@heroui/react';
import Link from 'next/link';
import { ReactNode } from 'react';

interface ButtonLinkProps extends ButtonProps {
  href: string;
  children: ReactNode;
}

const ButtonLink = ({ href, children, ...props }: ButtonLinkProps) => {
  return (
    <Link href={href}>
      <Button {...props}>{children}</Button>
    </Link>
  );
};

export default ButtonLink;
