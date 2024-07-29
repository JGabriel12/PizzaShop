import { api } from "@/lib/axios";

export interface ApproveOrderParams {
  orderId: string;
}

export async function ApproveOrder({ orderId }: ApproveOrderParams) {
  await api.patch(`/orders/${orderId}/approve`);
}
