import { Logger } from "@medusajs/medusa"
import {
    AbstractNotificationProviderService,
    MedusaError
} from "@medusajs/framework/utils"
import * as Brevo from "@getbrevo/brevo"
import { ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/types"

type InjectedDependencies = {
    logger: Logger
    manager: any
    // orderService: any
    // cartService: any
    // totalsService: any
    // giftCardService: any
    // fulfillmentService: any
}

export type PluginOptions = {
    api_key: string
    from_email: string
    from_name: string
    order_placed_template: number
    order_canceled_template: number
    customer_created_template: number
    user_password_reset_template: number
    gift_card_created_template: number
    order_shipped_template: number
    localization?: {
        default: string
        [key: string]: string
    }
}

export enum Templates {
    order_placed = 'order-placed',
    order_canceled = 'order-canceled',
    customer_created = 'customer-created',
    password_reset = 'password-reset',
    gift_card_created = 'gift-card-created',
    order_shipped = 'order-shipped',
    user_created = 'user-created',
}

const templates = {
    [Templates.order_placed]: 2,
    [Templates.order_canceled]: 2,
    [Templates.customer_created]: 4,
    [Templates.password_reset]: 3,
    [Templates.gift_card_created]: 5,
    [Templates.order_shipped]: 6,
    [Templates.user_created]: 7,
}

export default class BrevoNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "brevo"

    protected readonly options_: PluginOptions
    protected readonly logger_: Logger
    // protected readonly orderService_: any
    // protected readonly cartService_: any
    // protected readonly totalsService_: any
    // protected readonly giftCardService_: any
    // protected readonly fulfillmentService_: any

    protected client_: Brevo.TransactionalEmailsApi
    protected contactsClient_: Brevo.ContactsApi

    constructor(container: InjectedDependencies, options: PluginOptions) {
        super()

        this.options_ = options
        this.logger_ = container.logger
        // this.orderService_ = container.orderService
        // this.cartService_ = container.cartService
        // this.totalsService_ = container.totalsService
        // this.giftCardService_ = container.giftCardService
        // this.fulfillmentService_ = container.fulfillmentService

        // Initialize Brevo clients
        this.client_ = new Brevo.TransactionalEmailsApi()
        this.client_.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, options.api_key)

        this.contactsClient_ = new Brevo.ContactsApi()
        this.contactsClient_.setApiKey(Brevo.ContactsApiApiKeys.apiKey, options.api_key)
    }

    static validateOptions(options: Record<any, any>) {
        if (!options.api_key) {
            throw new MedusaError(
                MedusaError.Types.INVALID_DATA,
                "Option `api_key` is required in the provider's options."
            )
        }
        // if (!options.from) {
        //     throw new MedusaError(
        //         MedusaError.Types.INVALID_DATA,
        //         "Option `from` is required in the provider's options."
        //     )
        // }
    }


    // async handleOrderPlaced({ id }: { id: string }): Promise<void> {
    //     try {
    //         const order = await this.orderService_.retrieve(id, {
    //             relations: ["customer", "billing_address", "shipping_address", "items"],
    //         })

    //         if (!this.options_.order_placed_template) {
    //             this.logger_.warn("No order placed template configured")
    //             return
    //         }

    //         await this.send(
    //             this.options_.order_placed_template,
    //             order.email,
    //             {
    //                 order,
    //                 date: DateTime.fromJSDate(order.created_at).toFormat("yyyy-MM-dd"),
    //             },
    //             this.getLocale(order)
    //         )
    //     } catch (error) {
    //         this.logger_.error(`Error in handleOrderPlaced: ${error.message}`, error)
    //         throw error
    //     }
    // }

    private getLocale(order: any): string {
        if (!this.options_.localization) {
            return "en"
        }

        const region = order.region_id
        return this.options_.localization[region] || this.options_.localization.default || "en"
    }

    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        console.log('Send!')

        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail()
            sendSmtpEmail.sender = {
                email: this.options_.from_email,
                name: this.options_.from_name,
            }
            sendSmtpEmail.templateId = templates[notification.template]
            sendSmtpEmail.to = [{ email: notification.to }]

            if (notification.data) {
                sendSmtpEmail.params = notification.data
            }

            await this.client_.sendTransacEmail(sendSmtpEmail)

            return {}
        } catch (error) {
            this.logger_.error(`Error sending email with template ${templates[notification.template]}: ${error.message}`, error)
            throw error
        }
    }
}
