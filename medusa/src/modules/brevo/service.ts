import { Logger } from "@medusajs/medusa"
import {
    AbstractNotificationProviderService,
    MedusaError
} from "@medusajs/framework/utils"
import * as Brevo from "@getbrevo/brevo"
import { ProviderSendNotificationDTO, ProviderSendNotificationResultsDTO } from "@medusajs/types"
import { render } from '@react-email/components';

import OrderPlacedEmail, { subject as orderPlacedSubject } from "../../../emails/orderPlaced"

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
    ORDER_PLACED = 'order-placed',
    ORDER_CANCELED = 'order-canceled',
    CUSTOMER_CREATED = 'customer-created',
    PASSWORD_RESET = 'password-reset',
    GIFT_CARD_CREATED = 'gift-card-created',
    ORDER_SHIPPED = 'order-shipped',
    USER_CREATED = 'user-created',
}

const templates: { [key in Templates]?: (props: unknown) => React.ReactNode } = {
    [Templates.ORDER_PLACED]: OrderPlacedEmail,
}

const subjects: { [key in Templates]?: string } = {
    [Templates.ORDER_PLACED]: orderPlacedSubject,
}

export default class BrevoNotificationProviderService extends AbstractNotificationProviderService {
    static identifier = "brevo"

    protected readonly options_: PluginOptions
    protected readonly logger: Logger

    protected client_: Brevo.TransactionalEmailsApi
    protected contactsClient_: Brevo.ContactsApi

    constructor(container: InjectedDependencies, options: PluginOptions) {
        super()

        this.options_ = options
        this.logger = container.logger

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
    //             this.logger.warn("No order placed template configured")
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
    //         this.logger.error(`Error in handleOrderPlaced: ${error.message}`, error)
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

    getTemplate(template: Templates) {
        const allowedTemplates = Object.keys(templates)

        if (!allowedTemplates.includes(template)) {
            return null
        }

        return templates[template]
    }

    getSubject(template: Templates) {
        const allowedSubjects = Object.keys(subjects)

        if (!allowedSubjects.includes(template)) {
            return null
        }

        return subjects[template]
    }


    async send(
        notification: ProviderSendNotificationDTO
    ): Promise<ProviderSendNotificationResultsDTO> {
        console.log('Send!')

        const template = this.getTemplate(notification.template as Templates)

        if (!template) {
            this.logger.error(`Couldn't find an email template for ${notification.template}. The valid options are ${Object.values(Templates)}`)
            return {}
        }

        const templateSubject = this.getSubject(notification.template as Templates)

        if (!templateSubject) {
            this.logger.error(`Couldn't find an email subject for ${notification.template}. The valid options are ${Object.values(Templates)}`)
            return {}
        }

        const templateHtml = await render(template(notification.data))

        console.log(templateHtml)
        console.log(notification.data)

        try {
            const sendSmtpEmail = new Brevo.SendSmtpEmail()
            sendSmtpEmail.sender = {
                email: this.options_.from_email,
                name: this.options_.from_name,
            }
            sendSmtpEmail.htmlContent = templateHtml
            sendSmtpEmail.subject = templateSubject
            sendSmtpEmail.to = [{ email: notification.to }]

            if (notification.data) {
                sendSmtpEmail.params = notification.data
            }

            await this.client_.sendTransacEmail(sendSmtpEmail)

            return {}
        } catch (error) {
            this.logger.error(`Error sending email with template ${notification.template}: ${error.message.response.data}`, error)
            throw error
        }
    }
}
