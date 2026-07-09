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
        url: '/og-image.png', // Mantenha o og-image.png na pasta public!
        width: 1200,
        height: 630,
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  // Removemos a parte de "icons" daqui, pois o arquivo na pasta app resolve sozinho!
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