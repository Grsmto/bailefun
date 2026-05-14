// src/subscribers/handle-revalidation.ts
import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework/subscribers"

export default async function handleRevalidation({ event }: SubscriberArgs<any>) {
    const STOREFRONT_URL = process.env.STOREFRONT_URL

    // We want to trigger the "products" case in your switch statement
    const tags = "products"

    const url = `${STOREFRONT_URL}/api/revalidate?tags=${tags}`

    try {
        const res = await fetch(url)
        if (res.ok) {
            console.log(`Successfully signaled Next.js to revalidate paths for: ${tags}`)
        }
    } catch (err) {
        console.error("Failed to reach Next.js revalidation endpoint", err)
    }
}

export const config: SubscriberConfig = {
    event: [
        "product.created",
        "product.updated",
        "product.deleted",
        "product_category.created",
        "product_category.updated",
        "price_list.updated",
    ],
    context: {
        subscriberId: "next-revalidation-handler",
    },
}