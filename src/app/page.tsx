"use client";
import Layout from "./components/layout/Layout";
import HomeComponent from "./components/HomeComponent";
import Script from "next/script";

export default function Home() {
  return (
    <Layout>
      <Script
        src="https://apis.google.com/js/platform.js"
        strategy="afterInteractive" // loads after page becomes interactive
        async
        defer
      />
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <HomeComponent />
    </Layout>
  );
}
