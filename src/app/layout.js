
"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AsMedia",
  description: "AsMedia – Movies & Cartoons platform",
};


export default function RootLayout({ children }) {
  const router= useRouter()
  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(!token){
      router.push("/LoginPage")
    }
  })
  return (
    <html lang="en" >
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
