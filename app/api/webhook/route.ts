import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/lib/stripe";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get("Stripe-Signature") as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (error:any) {
    console.log("[WEBHOOK_ERROR]", error);
    return new NextResponse(`Webhook error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session.customer_details?.address;
  
  const addressComponents =[
    address?.city,
    address?.country,
    address?.postal_code,
    address?.state,
    address?.line1,
    address?.line2
  ]
  const addressString = addressComponents.filter(Boolean).join(", ")
  if(event.type === "checkout.session.completed"){
    const order = await prismadb.order.update({
      where: {
        id: session?.metadata?.orderId
      },
      data: {
        isPaid: true,
        address: addressString,
        phone: session?.customer_details?.phone || "",
      },
      include: {
        orderItems: true
      }
    })
    const productIds = order.orderItems.map((item) => item.productId)
    await prismadb.product.updateMany({
      where: {
        id: {
          in: [...productIds]
        }
      },
      data: {
        isArchived:true
      }
    })
  };
  return NextResponse.json(null,{ status:200 });
}
