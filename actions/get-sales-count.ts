import prismadb from "@/lib/prismadb"

export const getSalesCount = async (storeId:string) => {
  const orders = await prismadb.order.count({
    where: {
      storeId,
      isPaid: true
    }
  })

  return orders
}