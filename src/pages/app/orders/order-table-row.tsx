import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, Search, X } from "lucide-react";
import { OrderDetails } from "./order-details";
import { OrderStatus } from "@/components/order-status";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CancelOrder } from "@/api/cancel-order";
import { GetOrdersResponse } from "@/api/get-orders";
import { ApproveOrder } from "@/api/approve-order";
import { DeliverOrder } from "@/api/deliver-order";
import { DispatchOrder } from "@/api/dispatch-order";

export interface OrderTabRowProps {
  order: {
    orderId: string;
    createdAt: string;
    status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
    customerName: string;
    total: number;
  };
}

export function OrderTableRow({ order }: OrderTabRowProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const queryClient = useQueryClient();

  function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
    const ordersListCache = queryClient.getQueriesData<GetOrdersResponse>({
      queryKey: ["orders"],
    });

    ordersListCache.forEach(([cacheKey, cacheData]) => {
      if (!cacheData) {
        return;
      }

      queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
        ...cacheData,
        orders: cacheData.orders.map((order) => {
          if (order.orderId === orderId) {
            return { ...order, status };
          }

          return order;
        }),
      });
    });
  }

  const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
    useMutation({
      mutationFn: CancelOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "canceled");
      },
    });

  const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
    useMutation({
      mutationFn: ApproveOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "processing");
      },
    });

  const { mutateAsync: dispatchOrderFn, isPending: isDispatchingOrder } =
    useMutation({
      mutationFn: DispatchOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivering");
      },
    });

  const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
    useMutation({
      mutationFn: DeliverOrder,
      async onSuccess(_, { orderId }) {
        updateOrderStatusOnCache(orderId, "delivered");
      },
    });

  return (
    <TableRow>
      <TableCell>
        <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="xs">
              <Search className="h-3 w-3" />
              <span className="sr-only">Detalhes do pedido</span>
            </Button>
          </DialogTrigger>

          <OrderDetails open={isDetailsOpen} orderId={order.orderId} />
        </Dialog>
      </TableCell>
      <TableCell className="font-mono text-xs font-medium">
        {order.orderId}
      </TableCell>
      <TableCell className="text-muted-foreground">{order.createdAt}</TableCell>
      <TableCell>
        <OrderStatus status={order.status} />
      </TableCell>
      <TableCell className="font-medium">{order.customerName}</TableCell>
      <TableCell className="font-medium">
        {(order.total / 100).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </TableCell>
      <TableCell>
        {order.status === "pending" && (
          <Button
            disabled={isApprovingOrder}
            onClick={() => approveOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Aprovar
          </Button>
        )}

        {order.status === "processing" && (
          <Button
            disabled={isDispatchingOrder}
            onClick={() => dispatchOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Em entrega
          </Button>
        )}

        {order.status === "delivering" && (
          <Button
            disabled={isDeliveringOrder}
            onClick={() => deliverOrderFn({ orderId: order.orderId })}
            variant="outline"
            size="xs"
          >
            <ArrowRight className="mr-2 h-3 w-3" /> Entregue
          </Button>
        )}
      </TableCell>
      <TableCell>
        <Button
          disabled={
            !["pending", "processing"].includes(order.status) ||
            isCancelingOrder
          }
          onClick={() => cancelOrderFn({ orderId: order.orderId })}
          variant="ghost"
          size="xs"
        >
          <X className="mr-2 h-3 w-3" /> Cancelar
        </Button>
      </TableCell>
    </TableRow>
  );
}
