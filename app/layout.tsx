import type { Metadata } from "next";
// Import all the fonts you intend to use
import { Geist, Geist_Mono, Montserrat, Playwrite_DE_Grund, Raleway } from "next/font/google";
import "./globals.css";
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-montserrat",
});

const raleway = Raleway({
  subsets: ["latin"],
  display: 'swap',
  variable: "--font-raleway",
});

const playwriteDEG = Playwrite_DE_Grund({
    display: 'swap',
    variable: '--font-playwrite-deg',

});


export const metadata: Metadata = {
  title: "Questlog",
  description: "Gamify Your Progress",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${raleway.variable} ${playwriteDEG.variable} antialiased`}
      >
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={true}
          closeOnClick={false}
          rtl={false}
        />
      </body>
    </html>
  );
}