import { api } from "@/lib/axios";

export interface GetDayOrdersAmountResponse {
  amount: number;
  diffFromYesterday: number;
}

export async function getDayOrdersAmount() {
  try {
    const response = await api.get<GetDayOrdersAmountResponse>(
      "/metrics/day-orders-amount",
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch day orders amount:", error);
    throw error;
  }
}
