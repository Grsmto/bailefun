"use client"

import { useCallback, useEffect, useState, useContext } from "react"
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { StripePaymentElementChangeEvent } from "@stripe/stripe-js"
import { StripeContext } from "../payment-wrapper/stripe-wrapper"
import { CheckCircleSolid, CreditCard } from "@medusajs/icons"
import { Container, Heading, Text, clx } from "@medusajs/ui"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { isStripe as isStripeFunc, paymentInfoMap } from "@lib/constants"
import { initiatePaymentSession } from "@lib/data/cart"
import ErrorMessage from "@modules/checkout/components/error-message"
import PaymentContainer, {
  StripeCardContainer,
} from "@modules/checkout/components/payment-container"
import { Button } from "@/components/ui/button"
import { RadioGroup } from "@/components/ui/radio-group"
import Divider from "@modules/common/components/divider"

const Payment = ({
  cart,
  availablePaymentMethods,
}: {
  cart: any
  availablePaymentMethods: any[]
}) => {
  const paymentMethod = availablePaymentMethods[0];
  console.log(paymentMethod)
  const activeSession = cart.payment_collection?.payment_sessions?.find(
    (paymentSession: any) => paymentSession.status === "pending"
  )

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [stripeComplete, setStripeComplete] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("")

  const stripeReady = useContext(StripeContext)
  const stripe = stripeReady ? useStripe() : null
  const elements = stripeReady ? useElements() : null

  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const isOpen = searchParams.get("step") === "payment"

  const isStripe = isStripeFunc(selectedPaymentMethod)

  const handlePaymentElementChange = async (
    event: StripePaymentElementChangeEvent
  ) => {
    // Catches the selected payment method and sets it to state
    if (event.value.type) {
      setSelectedPaymentMethod(event.value.type)
    }

    // Sets stripeComplete on form completion
    setStripeComplete(event.complete)

    // Clears any errors on successful completion
    if (event.complete) {
      setError(null)
    }
  }

  const paidByGiftcard =
    cart?.gift_cards && cart?.gift_cards?.length > 0 && cart?.total === 0

  const paymentReady =
    (activeSession && cart?.shipping_methods.length !== 0) || paidByGiftcard

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

  const handleEdit = () => {
    router.push(pathname + "?" + createQueryString("step", "payment"), {
      scroll: false,
    })
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Check if the necessary context is ready
      if (!stripe || !elements) {
        setError("Payment processing not ready. Please try again.")
        return
      }

      // Submit the payment method details
      await elements.submit().catch((err) => {
        console.error(err)
        setError(err.message || "An error occurred with the payment")
        return
      })

      // Navigate to the final checkout step
      router.push(pathname + "?" + createQueryString("step", "review"), {
        scroll: false,
      })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  const initStripe = async () => {
    try {
      await initiatePaymentSession(cart, {
        // TODO: change the provider ID if using a different ID in medusa-config.ts
        provider_id: "pp_stripe_stripe",
      })
    } catch (err) {
      console.error("Failed to initialize Stripe session:", err)
      setError("Failed to initialize payment. Please try again.")
    }
  }

  useEffect(() => {
    if (!activeSession && isOpen) {
      initStripe()
    }
  }, [cart, isOpen, activeSession])

  useEffect(() => {
    setError(null)
  }, [isOpen])

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-6">
        <Heading
          level="h2"
          className={clx(
            "flex flex-row gap-x-2 items-baseline items-center",
            {
              "opacity-50 pointer-events-none select-none":
                !isOpen && !paymentReady,
            }
          )}
        >
          Payment
          {!isOpen && paymentReady && <CheckCircleSolid />}
        </Heading>
        {!isOpen && paymentReady && (
          <Text>
            <button
              onClick={handleEdit}
              className="text-ui-fg-interactive hover:text-ui-fg-interactive-hover"
              data-testid="edit-payment-button"
            >
              Edit
            </button>
          </Text>
        )}
      </div>
      <div>
        <div className={isOpen ? "block" : "hidden"}>
          {!paidByGiftcard &&
            availablePaymentMethods?.length &&
            stripeReady && (
              <div className="mt-5 transition-all duration-150 ease-in-out">
                <PaymentElement
                  onChange={handlePaymentElementChange}
                  options={{
                    layout: "accordion",
                  }}
                />
              </div>
            )
          }

          <ErrorMessage
            error={error}
            data-testid="payment-method-error-message"
          />

          <Button
            className="mt-6"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !stripeComplete ||
              !stripe ||
              !elements ||
              (!selectedPaymentMethod && !paidByGiftcard)
            }
            data-testid="submit-payment-button"
          >
            Continue to review
          </Button>
        </div>


        <div className={isOpen ? "hidden" : "block"}>
          {cart && paymentReady && activeSession && selectedPaymentMethod ? (
            <div className="flex items-start gap-x-1 w-full">
              <div className="flex flex-col w-1/3">
                <span className="mb-1 text-small-regular">
                  Payment method
                </span>
                <div className="flex items-center w-fit gap-x-1 bg-ui-button-neutral-hover">
                  {paymentInfoMap[selectedPaymentMethod]?.icon || (
                    <CreditCard />
                  )}
                  <Text
                    className="text-sm"
                    data-testid="payment-method-summary"
                  >
                    {paymentInfoMap[activeSession?.provider_id]?.title ||
                      activeSession?.provider_id}
                  </Text>
                </div>
              </div>
              <div className="flex flex-col w-1/3">
                <span className="mb-1 text-small-regular">
                  Payment details
                </span>
                <div
                  className="flex gap-2 text-sm items-center"
                  data-testid="payment-details-summary"
                >
                  <Text>Another step may appear</Text>
                </div>
              </div>
            </div>
          ) : paidByGiftcard ? (
            <div className="flex flex-col w-1/3">
              <Text className="mb-1" size="small">
                Payment method
              </Text>
              <Text
                className="text-sm"
                data-testid="payment-method-summary"
              >
                Gift card
              </Text>
            </div>
          ) : null}
        </div>
      </div>
      <Divider className="mt-8" />
    </div>
  )
}

export default Payment
