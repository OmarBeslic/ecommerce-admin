import { format } from "date-fns";
import OrderClient from "./components/client";
import prismadb from "@/lib/prismadb";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";


const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params?.storeId,
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const formattedOrders: OrderColumn[] = orders.map((order) => ({
        id: order.id,
        address: order.address,
        phone: order.phone,
        products: order.orderItems.map((item) => item.product.name).join(", "),
        isPaid: order.isPaid,
        totalPrice: formatter.format(order.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(order.createdAt, "MMMM do, yyyy"),
    }))
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    );
};

export default OrdersPage;
