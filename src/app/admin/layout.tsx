import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fresh Ceramics Admin Portal',
  description: 'Zero-Code Content Management System and Flagship Portal Administration.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
