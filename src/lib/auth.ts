export interface SubscriptionData {
  plan: number;
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

export interface SignupInput {
  email: string;
  password: string;
  name: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T | null;
  error?: string;
  details?: any;
}

const API_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export function nameFromEmail(email: string): string {
  // get everything before the "@"
  const local = email.split("@")[0] || "";

  // split on dots, underscores, hyphens or plus‐signs, drop empties
  const parts = local.split(/[\.\_\-\+]+/).filter((p) => p.length > 0);

  // capitalize each part
  const words = parts.map(
    (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
  );

  return words.join(" ");
}

export const fetchCurrentUser = async () => {
  try {
    const response = await fetch(`${API_URL}/api/auth/current-user`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data?.data;
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = async () => {
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

export async function signupUser(
  input: SignupInput
): Promise<ApiResponse<null>> {
  const res = await fetch(`${API_URL}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const json = (await res.json()) as ApiResponse<null>;

  return json;
}

export async function loginUser(input: LoginInput): Promise<ApiResponse<any>> {
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(input),
  });

  const json = (await res.json()) as ApiResponse<any>;
  return json;
}
