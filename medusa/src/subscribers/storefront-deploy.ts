import {
    type SubscriberConfig,
    type SubscriberArgs
} from "@medusajs/framework/subscribers"

export default async function handleContentChange({
    event,
    container,
}: SubscriberArgs<any>) {
    const COOLIFY_WEBHOOK = process.env.STOREFRONT_DEPLOY_WEBHOOK

    if (!COOLIFY_WEBHOOK) {
        return console.error("STOREFRONT_DEPLOY_WEBHOOK is missing in .env")
    }

    try {
        const response = await fetch(COOLIFY_WEBHOOK)

        if (response.ok) {
            console.log(`Successfully triggered Coolify deploy via event: ${event.name}`)
        }
    } catch (error) {
        console.error("Failed to trigger Coolify deployment:", error)
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
        subscriberId: "coolify-deploy-handler",
    },
}