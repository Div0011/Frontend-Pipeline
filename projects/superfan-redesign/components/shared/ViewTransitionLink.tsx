'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ViewTransitionLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const ViewTransitionLink: React.FC<ViewTransitionLinkProps> = ({
  href,
  children,
  className,
  onClick,
  ...props
}) => {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }
    if (e.defaultPrevented) return;

    const isSameOrigin = href.startsWith('/') || href.startsWith(window.location.origin);
    if (!isSameOrigin) return;

    e.preventDefault();

    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => router.push(href));
    } else {
      router.push(href);
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};
