'use client';

import { usePathname } from 'next/navigation';

import PrivateRoute from 'components/PrivateRoute/PrivateRoute';

import { checkIsPublicRoute } from 'functions/check-is-public-route';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isPublicPage = checkIsPublicRoute(pathname);

  return (
    <head>
      <body>
        <div style={{ margin: '0 auto' }}>
          {isPublicPage && children}

          {!isPublicPage && <PrivateRoute>{children}</PrivateRoute>}
        </div>
      </body>
    </head>
  );
}
