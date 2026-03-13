import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { getCountryCode } from "@lib/data/cookies"

export const metadata: Metadata = {
  title: "BAILEFUN",
  description:
    "T-shirts designed in London for brasileiros",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const countryCode = await getCountryCode()

  if (!countryCode) {
    return null
  }

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collections={collections} region={region} />
      </ul>
    </>
  )
}
