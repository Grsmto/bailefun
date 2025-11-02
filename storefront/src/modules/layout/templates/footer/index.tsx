import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="content-container mb-6 xsmall:mb-24">
      <div className="content-container px-8 xsmall:px-22 flex flex-col w-full bg-accent rounded-4xl">
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-12 xsmall:py-22">
          <div>
            <LocalizedClientLink
              href="/"
              className="text-sm hover:text-ui-fg-base uppercase"
            >
              <img height="36" width="36" src="/bailefun.svg" />
            </LocalizedClientLink>
          </div>
          <div className="text-small-regular gap-10 md:gap-x-16 grid">
            {/* {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Products
                </span>
                <ul
                  className="grid grid-cols-1 gap-2"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-sm txt-small"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-ui-fg-base",
                            children && "txt-small-plus"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-3 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-ui-fg-base"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )} */}
            {/* {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">
                  Collections
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-2 text-sm txt-small",
                    {
                      "grid-cols-2": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-ui-fg-base"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )} */}
            <div className="flex flex-col gap-y-2">
              <span className="text-small-semi">BAILEFUN</span>
              <ul className="grid grid-cols-1 gap-y-2 text-sm txt-small">
                <li>
                  <a
                    href="mailto:contact@bailefun.com"
                    className="hover:text-ui-fg-base"
                  >
                    Contact
                  </a>
                </li>
                <MedusaCTA />
              </ul>
            </div>
          </div>
        </div>
        <span className="font-conthrax uppercase text-[clamp(1.5rem,12.6vw,12rem)] -ml-[calc((var(--spacing)*8)+4vw)] xsmall:-ml-[calc((var(--spacing)*22)+2vw)] -mb-1 small:-mb-4 leading-[1]">BAILEFUN</span>
        <div className="flex w-full mb-10 justify-between">
          <Text className="text-small-regular xsmall:text-sm">
            © {new Date().getFullYear()} BAILEFUN. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
