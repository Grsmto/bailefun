"use client"

import { clx } from "@medusajs/ui"
import { StoreCart, StoreRegion } from "@medusajs/types"
import { usePathname } from "next/navigation"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import CountrySelect from "@modules/layout/components/country-select"
import { useState, useEffect } from "react"


export default function Nav({ regions, cart }: { regions: StoreRegion[], cart: StoreCart | null }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const isHome = !!regions.find(region => region.countries?.find(country => `/${country.iso_2}` === pathname))

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop
      const viewportHeight = window.innerHeight
      setIsScrolled(scrollPosition > viewportHeight * 0.6)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={clx("sticky top-0 inset-x-0 z-50 group", isScrolled || !isHome ? '' : 'mix-blend-hue')}>
      <header className="absolute w-full h-16 mx-auto duration-200 z-50">
        <nav className="content-container txt-xsmall-plus text-sm flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="font-conthrax uppercase"
              data-testid="nav-store-link"
            >
              BAILEFUN
            </LocalizedClientLink>
          </div>

          {/* <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div> */}

          <div className="flex items-center xsmall:gap-x-2 h-full flex-1 basis-0 justify-end -mr-3">
            {/* <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-ui-fg-base"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div> */}
            {regions && (
              <CountrySelect
                regions={regions}
              />
            )}
            <CartDropdown cart={cart} />
          </div>
        </nav>
      </header>
    </div>
  )
}
