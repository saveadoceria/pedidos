import React from 'react';

export const metadata = {
  title: 'Sávea Doceria',
  description: 'Doces de verdade, feitos com cuidado.',
  openGraph: {
    title: 'Sávea Doceria',
    description: 'Doces de verdade, feitos com cuidado.',
    url: 'https://doceriasavea.shop',
    siteName: 'Sávea Doceria',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}