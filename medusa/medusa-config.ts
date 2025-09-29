import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,
  },
  projectConfig: {
    workerMode: process.env.MEDUSA_WORKER_MODE as "shared" | "worker" | "server",
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  modules: [
    ...(process.env.REDIS_URL ? [
      {
        resolve: "@medusajs/medusa/cache-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/event-bus-redis",
        options: {
          redisUrl: process.env.REDIS_URL,
        },
      },
      {
        resolve: "@medusajs/medusa/workflow-engine-redis",
        options: {
          redis: {
            url: process.env.REDIS_URL,
          },
        },
      }
    ] : []),
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/payment-stripe",
            id: "stripe",
            options: {
              apiKey: process.env.STRIPE_API_KEY,
            },
          },
        ],
      },
    },
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
            },
          },
        ],
      },
    },
    {
      resolve: "medusa-plugin-brevo-email",
      options: {
        api_key: process.env.BREVO_API_KEY,
        from_email: process.env.BREVO_FROM_EMAIL,
        from_name: process.env.BREVO_FROM_NAME,
        bcc: process.env.BREVO_BCC || null,

        contact_list: {
          enabled: process.env.BREVO_CONTACT_LIST_ENABLED || true,
          contact_list_id: process.env.BREVO_CONTACT_LIST_ID || 2
        },

        pdf: {
          enabled: process.env.BREVO_PDF_ENABLED || false,
          settings: {
            font: process.env.BREVO_PDF_FONT || 'Helvetica',
            // [{file: 'yourfont.ttf', name: 'yourfont'},{file: 'yourfont-bold.ttf', name: 'yourfontbold'}]
            format: process.env.BREVO_PDF_FORMAT || 'A4',
            // see supported formats here: https://pdfkit.org/docs/paper_sizes.html
            margin: {
              top: process.env.BREVO_PDF_MARGIN_TOP || '50',
              right: process.env.BREVO_PDF_MARGIN_RIGHT || '50',
              bottom: process.env.BREVO_PDF_MARGIN_BOTTOM || '50',
              left: process.env.BREVO_PDF_MARGIN_LEFT || '50'
            },
            empty: "" // what to show if variable can't be found. Defaults to __UNDEFINED__
          },
          header: {
            enabled: process.env.BREVO_PDF_HEADER_ENABLED || false,
            content: process.env.BREVO_PDF_HEADER_CONTENT || null,
            // loads empty header if null, otherwise loads the file from `BREVO_PDF_HEADER_CONTENT`
            height: process.env.BREVO_PDF_HEADER_HEIGHT || '50'
          },
          footer: {
            enabled: process.env.BREVO_PDF_FOOTER_ENABLED || false,
            content: process.env.BREVO_PDF_FOOTER_CONTENT || null,
            // loads empty footer if null, otherwise loads the file from `BREVO_PDF_FOOTER_CONTENT`
          },
          templates: {
            invoice: process.env.BREVO_PDF_INVOICE_TEMPLATE || null,
            credit_note: process.env.BREVO_PDF_CREDIT_NOTE_TEMPLATE || null,
            return_invoice: process.env.BREVO_PDF_RETURN_INVOICE_TEMPLATE || null
          }
        },
        events: {
          order: {
            placed: 2,
            canceled: 3,
            shipment_created: 4,
          },
          customer: {
            created: 5,
            password_reset: 6,
          },
          user: {
            created: 7,
            password_reset: 8,
          },
          auth: {
            password_reset: 9,
            verify_account: 10,
          },
          activity: {
            inactive_user: 11,
            inactive_customer: 12,
          }
        },
        upsell: {
          enabled: process.env.BREVO_UPSELL_ENABLED || false,
          template: process.env.BREVO_UPSELL_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
          delay: process.env.BREVO_UPSELL_DELAY || 9, // delay in days
          valid: process.env.BREVO_UPSELL_VALID || 30, // valid in days
          collection: process.env.BREVO_UPSELL_COLLECTION || null,
        },
        abandoned_cart: {
          enabled: process.env.BREVO_ABANDONED_CART_ENABLED || false,
          first: {
            delay: process.env.BREVO_ABANDONED_CART_FIRST_DELAY || 1, // delay in hours
            template: process.env.BREVO_ABANDONED_CART_FIRST_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
          },
          second: {
            delay: process.env.BREVO_ABANDONED_CART_SECOND_DELAY || 24, // delay in hours
            template: process.env.BREVO_ABANDONED_CART_SECOND_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
          },
          third: {
            delay: process.env.BREVO_ABANDONED_CART_THIRD_DELAY || 48, // delay in hours
            template: process.env.BREVO_ABANDONED_CART_THIRD_TEMPLATE || null, // if you supply multiple templates (comma seperated), the plugin will pick one at random
          },
        },
        default_data: {
          // ... default data to be passed to the email template
          product_url: process.env.BREVO_PRODUCT_URL || '',
          product_name: process.env.BREVO_PRODUCT_NAME || '',
          company_name: process.env.BREVO_COMPANY_NAME || '',
          company_address: process.env.BREVO_COMPANY_ADDRESS || '',
        }
      }
    }
  ],

})
