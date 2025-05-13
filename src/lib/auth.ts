// lib/auth.ts

import axios from "axios";

export interface SubscriptionData {
  plan: string;
  paymentType: string;
  paymentId: string;
  status: string;
  amount: number;
  startDate: string;
  endDate: string;
}

export interface UserData {
  id: string;
  email: string;
  name: string | null;
  avtar: string | null;
  subscriptionData: SubscriptionData | null;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/current-user`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
