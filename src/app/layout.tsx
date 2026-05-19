//import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
//import { AuthProvider } from "@/providers/authprovider";

//root layout for web app
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en">
          <body>
             <div className="min-h-screen flex flex-col">
                <Navbar />

                  <main className="flex-1">
                      {children}
                  </main>

                <Footer />
             </div>
              
          </body>
      </html>
    </>
  );
}
