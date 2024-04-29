import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { Provider } from "@/components/provider/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Teslo Shop",
    default: 'Home | Teslo Shop'
  },
  description: 'A Yu-Gi-Oh! Card Shop',
}

export default function RootLayout ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* <link rel="icon" href="/favicon.ico" sizes="any" /> */}
        <link
          rel="icon1"
          href="/icon1?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
