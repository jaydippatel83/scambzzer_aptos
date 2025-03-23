"use client"; 
import DashboardLayout from "../components/layout/DashboardLayout";
import Layout from "../components/layout/Layout";
import InactiveSubs from "../components/subscription";

export default function SubscriptionPage() {
  return  (
    <Layout>
       <DashboardLayout>
        <InactiveSubs />
       </DashboardLayout>
    </Layout>
  );
}
