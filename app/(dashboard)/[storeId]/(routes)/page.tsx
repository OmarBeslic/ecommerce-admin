import { getGraphRevenue } from "@/actions/get-graph-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";
import { CreditCard, DollarSign, Package, PackageIcon } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}
const DashboardPage = async ({ params }: DashboardPageProps) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const salesCount = await getSalesCount(params.storeId);
  const stockCount = await getStockCount(params.storeId);
  const graphData = await getGraphRevenue(params.storeId);
  const cardMap = [
    {
      title: "Total revenue",
      description: "Overview of your store",
      icon: <DollarSign className="w-4 h-4 text-muted-foreground" />,
      value: formatter.format(totalRevenue),
    },
    {
      title: "Sales",
      description: "Overview of your store",
      icon: <CreditCard className="w-4 h-4 text-muted-foreground" />,
      value: salesCount,
    },
    {
      title: "Products in stock",
      description: "Overview of your store",
      icon: <PackageIcon className="w-4 h-4 text-muted-foreground" />,
      value: stockCount,
    },
  ]
  return <div className="flex-col">
    <div className="flex-1 space-y-4 p-8 pt-6">
      <Heading title="Dashboard" description="Overview of your store" />
      <Separator />
      <div className="grid gap-4 grid-cols-3">
        {
          cardMap.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent className=" text-2xl font-bold">
                {card.value}
              </CardContent>
            </Card>
          ))
        }
      </div>
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview data={graphData} />
        </CardContent>
      </Card>
    </div>
  </div>;
};

export default DashboardPage;
