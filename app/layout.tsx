export const metadata = {
  icons: {
    icon: '/favicon.ico?v=2', // Adicionamos o ?v=2 para forçar o navegador a buscar de novo
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}