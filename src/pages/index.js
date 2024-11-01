import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/') {
      router.push('/stage1');
    }
  }, [router]);

  return (
    <>
      <Head>
        <title>Interview Creator</title>
        <meta name="description" content="Create your interview questions" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}>
        
      </main>
    </>
  );
}
