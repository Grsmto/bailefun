import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from '@react-email/components';
import type * as React from 'react';

const mockOrder = {
    order: {
        id: 'order_01K7QJGN57D8Z12168G7Y42S0G',
        display_id: 8,
        email: 'amazing.email.address@gmail.com',
        currency_code: 'gbp',
        total: 30,
        subtotal: 30,
        discount_total: 0,
        shipping_total: 4,
        tax_total: 0,
        item_subtotal: 26,
        item_total: 26,
        item_tax_total: 0,
        customer_id: 'cus_01K5WFX7ZEZ8QBJF9K0312MAAK',
        items: [
            {
                id: 'ordli_01K7QK5WJE4WQKV9QX6XN11TH4',
                title: 'Make Berghain baile de favela',
                subtitle: 'BF-02 / M / BLACK',
                thumbnail: 'http://localhost:9000/static/1758491659749-BF_02_mockup_front_2.jpg',
                variant_id: 'variant_01K5FMAX1ZRE67SX69X2AE0X0E',
                product_id: 'prod_01K5FKETDYDG03S5RDJ637NP25',
                product_title: 'Make Berghain baile de favela',
                product_description: '',
                product_subtitle: '',
                product_type: null,
                product_type_id: null,
                product_collection: 'Our first tees',
                product_handle: 'make-berghain-baile-de-favela',
                variant_sku: 'BF-02-M-BLACK',
                variant_barcode: null,
                variant_title: 'BF-02 / M / BLACK',
                variant_option_values: null,
                requires_shipping: true,
                is_giftcard: false,
                is_discountable: true,
                is_tax_inclusive: false,
                is_custom_price: false,
                metadata: {},
                raw_compare_at_unit_price: null,
                raw_unit_price: [Object],
                created_at: '2025-10-16T22:45:17.519Z',
                updated_at: '2025-10-16T22:45:17.519Z',
                deleted_at: null,
                tax_lines: [],
                adjustments: [],
                compare_at_unit_price: null,
                unit_price: 26,
                quantity: 1,
                raw_quantity: [Object],
                detail: [Object],
                subtotal: 26,
                total: 26,
                original_subtotal: 26,
                original_total: 26,
                discount_subtotal: 0,
                discount_tax_total: 0,
                discount_total: 0,
                tax_total: 0,
                original_tax_total: 0,
                refundable_total_per_unit: 26,
                refundable_total: 26,
                fulfilled_total: 0,
                shipped_total: 0,
                return_requested_total: 0,
                return_received_total: 0,
                return_dismissed_total: 0,
                write_off_total: 0,
                raw_subtotal: [Object],
                raw_total: [Object],
                raw_original_subtotal: [Object],
                raw_original_total: [Object],
                raw_discount_subtotal: [Object],
                raw_discount_tax_total: [Object],
                raw_discount_total: [Object],
                raw_tax_total: [Object],
                raw_original_tax_total: [Object],
                raw_refundable_total_per_unit: [Object],
                raw_refundable_total: [Object],
                raw_fulfilled_total: [Object],
                raw_shipped_total: [Object],
                raw_return_requested_total: [Object],
                raw_return_received_total: [Object],
                raw_return_dismissed_total: [Object],
                raw_write_off_total: [Object]
            }
        ],
        shipping_address: {
            id: 'ordaddr_01K7QJGN55Q8MYBHZ4TEM93HR2',
            customer_id: null,
            company: '',
            first_name: 'Adrien',
            last_name: 'Grsmto',
            address_1: 'Flat 12, Some random address',
            address_2: '',
            city: 'London',
            country_code: 'gb',
            province: '',
            postal_code: 'AW 983',
            phone: '07518 123456',
            metadata: null,
            created_at: '2025-10-16T22:33:31.851Z',
            updated_at: '2025-10-16T22:33:31.851Z',
            deleted_at: null
        },
        billing_address: {
            id: 'ordaddr_01K7QJGN557HKVJJK7DXXZ83GM',
            customer_id: null,
            company: '',
            first_name: 'Adrien',
            last_name: 'Denat',
            address_1: 'Flat 12, Some random address',
            address_2: '',
            city: 'London',
            country_code: 'gb',
            province: '',
            postal_code: 'AW 983',
            phone: '07518 123456',
            metadata: null,
            created_at: '2025-10-16T22:33:31.850Z',
            updated_at: '2025-10-16T22:33:31.850Z',
            deleted_at: null
        },
        shipping_methods: [
            {
                id: 'ordsm_01K7QK5WJDE760W5P79SNMBJ6M',
                name: 'Standard Shipping',
                description: null,
                is_tax_inclusive: false,
                is_custom_amount: false,
                shipping_option_id: 'so_01K5FHVYWBWZ9HQ63VNBTKHAQB',
                data: {},
                metadata: null,
                raw_amount: {},
                created_at: '2025-10-16T22:45:17.520Z',
                updated_at: '2025-10-16T22:45:17.520Z',
                deleted_at: null,
                tax_lines: [],
                adjustments: [],
                amount: 4,
                order_id: 'order_01K7QK5WJE0B1XYEN62HFCGYAG',
                detail: {},
                subtotal: 4,
                total: 4,
                original_subtotal: 4,
                original_total: 4,
                discount_total: 0,
                discount_subtotal: 0,
                discount_tax_total: 0,
                tax_total: 0,
                original_tax_total: 0,
                raw_subtotal: {},
                raw_total: {},
                raw_original_subtotal: {},
                raw_original_total: {},
                raw_discount_total: {},
                raw_discount_subtotal: {},
                raw_discount_tax_total: {},
                raw_tax_total: {},
                raw_original_tax_total: {}
            }
        ],
        customer: {
            id: 'cus_01K5WFX7ZEZ8QBJF9K0312MAAK',
            company_name: null,
            first_name: null,
            last_name: null,
            email: 'amazing.email.address@gmail.com',
            phone: null,
            has_account: false,
            metadata: null,
            created_by: null,
            created_at: '2025-09-23T23:52:57.070Z',
            updated_at: '2025-09-23T23:52:57.070Z',
            deleted_at: null
        }
    }
}

interface OrderPlacedEmailProps {
    order: {
        display_id: number
        shipping_address: {
            first_name: string
            last_name: string
            address_1: string
            city: string
            country_code: string
            postal_code: string
        }
        items: {
            title: string,
            thumbnail: string,
            variant_title: string,
            quantity: number,
            unit_price: number,
            total: number,
            subtotal: number,
            discount_total: number,
            tax_total: number,
        }[]
        customer: {
            first_name: string | null
            last_name: string | null
            email: string
        }
    }
}

const OrderPlacedEmailTemplate = ({ order }: OrderPlacedEmailProps) => {
    console.log(order)
    return (
        <Html>
            <Head />
            <Body style={main}>
                <Preview>
                    Get your order summary, estimated delivery date and more
                </Preview>
                <Container style={container}>
                    <Hr style={global.hr} />
                    <Section style={message}>
                        <Img
                            src={`${process.env.S3_FILE_URL}/bailefun.jpg`}
                            width="66"
                            height="22"
                            alt="BAILEFUN"
                            style={{ margin: 'auto' }}
                        />
                        <Heading style={global.heading}>We received your order.</Heading>
                        <Text style={global.text}>
                            You order's is on its way. Use the link above to track its progress.
                        </Text>
                        <Text style={{ ...global.text, marginTop: 24 }}>
                            We´ve also charged your payment method for the cost of your order
                            and will be removing any authorization holds. For payment details,
                            please visit your Orders page on Nike.com or in the Nike app.
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Text style={adressTitle}>Shipping to: {order.customer.first_name} {order.customer.last_name}</Text>
                        <Text style={{ ...global.text, fontSize: 14 }}>
                            {order.shipping_address.address_1}, {order.shipping_address.city}, {order.shipping_address.country_code} {order.shipping_address.postal_code}
                        </Text>
                    </Section>
                    <Hr style={global.hr} />
                    <Section
                        style={{ ...paddingX, paddingTop: '40px', paddingBottom: '40px' }}
                    >
                        {order.items.map((item) => (
                            <Row>
                                <Column>
                                    <Img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        style={{ float: 'left' }}
                                        width="260px"
                                    />
                                </Column>
                                <Column style={{ verticalAlign: 'top', paddingLeft: '12px' }}>
                                    <Text style={{ ...paragraph, fontWeight: '500' }}>
                                        {item.title}
                                    </Text>
                                    <Text style={global.text}>{item.variant_title}</Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={global.defaultPadding}>
                        <Row style={{ display: 'inline-flex', marginBottom: 40 }}>
                            <Column style={{ width: '170px' }}>
                                <Text style={global.paragraphWithBold}>Order Number</Text>
                                <Text style={track.number}>{order.display_id}</Text>
                            </Column>
                            <Column>
                                <Text style={global.paragraphWithBold}>Order Date</Text>
                                <Text style={track.number}>{new Date().toLocaleDateString()}</Text>
                            </Column>
                        </Row>
                    </Section>
                    <Hr style={global.hr} />
                    <Section style={paddingY}>
                        <Row>
                            <Text style={global.heading}>BAILEFUN.FUN</Text>
                        </Row>
                    </Section>
                    <Hr style={{ ...global.hr, marginTop: '12px' }} />
                    <Section style={paddingY}>
                        <Row>
                            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                                Please contact us if you have any questions. (If you reply to this
                                email, we won't be able to see it.)
                            </Text>
                        </Row>
                        <Row>
                            <Text style={footer.text}>
                                © 2025 BAILEFUN. All Rights Reserved.
                            </Text>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html>
    )
};

const paddingX = {
    paddingLeft: '40px',
    paddingRight: '40px',
};

const paddingY = {
    paddingTop: '22px',
    paddingBottom: '22px',
};

const paragraph = {
    margin: '0',
    lineHeight: '2',
};

const global = {
    paddingX,
    paddingY,
    defaultPadding: {
        ...paddingX,
        ...paddingY,
    },
    paragraphWithBold: { ...paragraph, fontWeight: 'bold' },
    heading: {
        fontSize: '32px',
        lineHeight: '1.3',
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: '-1px',
    } as React.CSSProperties,
    text: {
        ...paragraph,
        color: '#747474',
        fontWeight: '500',
    },
    button: {
        border: '1px solid #929292',
        fontSize: '16px',
        textDecoration: 'none',
        padding: '10px 0px',
        width: '220px',
        display: 'block',
        textAlign: 'center',
        fontWeight: 500,
        color: '#000',
    } as React.CSSProperties,
    hr: {
        borderColor: '#E5E5E5',
        margin: '0',
    },
};

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '10px auto',
    width: '600px',
    maxWidth: '100%',
    border: '1px solid #E5E5E5',
};

const track = {
    container: {
        padding: '22px 40px',
        backgroundColor: '#F7F7F7',
    },
    number: {
        margin: '12px 0 0 0',
        fontWeight: 500,
        lineHeight: '1.4',
        color: '#6F6F6F',
    },
};

const message = {
    padding: '40px 74px',
    textAlign: 'center',
} as React.CSSProperties;

const adressTitle = {
    ...paragraph,
    fontSize: '15px',
    fontWeight: 'bold',
};

const footer = {
    policy: {
        width: '166px',
        margin: 'auto',
    },
    text: {
        margin: '0',
        color: '#AFAFAF',
        fontSize: '13px',
        textAlign: 'center',
    } as React.CSSProperties,
};

const OrderPlacedEmail = (props: OrderPlacedEmailProps) => (
    <OrderPlacedEmailTemplate order={props.order ?? mockOrder.order} />
)

export default OrderPlacedEmail

export const subject = 'Oba! Recebimos o seu pedido. We got your BAILEFUN tee order!'