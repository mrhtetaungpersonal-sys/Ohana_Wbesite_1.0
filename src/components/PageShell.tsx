import { ReactNode } from 'react';

interface PageShellProps {
  children: ReactNode;
  className?: string;
}

export default function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className={`max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </div>
  );
}
