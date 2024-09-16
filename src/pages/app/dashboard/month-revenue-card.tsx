import { getMonthRevenueAmount } from "@/api/get-month-revenue";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { DollarSign } from "lucide-react";
import { MetricCardSkeleton } from "./Metric-card-skeleton";

export function MonthRevenueCard() {
  const { data: monthRevenueAmount } = useQuery({
    queryKey: ["metics", "month-receipt"],
    queryFn: getMonthRevenueAmount,
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Receita total (mês)
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-1">
        {monthRevenueAmount ? (
          <>
            <span className="text-2xl font-bold tracking-tight">
              R$ {monthRevenueAmount?.receipt}
            </span>
            <p className="text-sm text-muted-foreground">
              <span className="text-emerald-500 dark:text-emerald-400">
                {monthRevenueAmount?.diffFromLastMonth.toLocaleString("pt-BR")}
              </span>{" "}
              em relação ao mês passado
            </p>
          </>
        ) : (
          <MetricCardSkeleton />
        )}
      </CardContent>
    </Card>
  );
}
