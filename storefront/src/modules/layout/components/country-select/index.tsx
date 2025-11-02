"use client"

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useMemo, useState } from "react"
import ReactCountryFlag from "react-country-flag"
import { useToggleState } from "@medusajs/ui"
import { ChevronsUpDownIcon } from "lucide-react"

import { useParams, usePathname } from "next/navigation"
import { updateRegion } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"

type CountrySelectProps = {
  regions: HttpTypes.StoreRegion[]
}

const CountrySelect = ({ regions }: CountrySelectProps) => {
  const toggleState = useToggleState()
  const [current, setCurrent] = useState<
    | { country: string | undefined; region: string; label: string | undefined }
    | undefined
  >(undefined)

  const { countryCode } = useParams()
  const currentPath = usePathname().split(`/${countryCode}`)[1]
  const { state, close, open, toggle } = toggleState

  const options = useMemo(() => {
    return regions
      ?.map((r) => {
        return r.countries?.map((c) => ({
          country: c.iso_2,
          region: r.id,
          label: c.display_name,
        }))
      })
      .flat()
      .sort((a, b) => (a?.label ?? "").localeCompare(b?.label ?? ""))
  }, [regions])

  useEffect(() => {
    if (countryCode) {
      const option = options?.find((o) => o?.country === countryCode)
      setCurrent(option)
    }
  }, [options, countryCode])

  const handleChange = (country: string) => {
    updateRegion(country, currentPath)
    close()
  }

  if (!regions || !current) {
    return null
  }

  return (
    <div>
      <Popover open={state} onOpenChange={toggle}>
        <PopoverTrigger
          render={(props) => (
            <Button
              {...props}
              variant="ghost"
              size="sm"
              role="combobox"
              aria-expanded={open}
            >
              <div className="txt-compact-small flex items-start gap-x-2">
                <span className="hidden xsmall:block">Shipping to:</span>
                <span className="txt-compact-small flex items-center gap-x-2">
                  {/* @ts-ignore */}
                  <ReactCountryFlag
                    svg
                    style={{
                      width: "16px",
                      height: "16px",
                    }}
                    countryCode={current.country ?? ""}
                  />
                  <span className="hidden xsmall:block">{current.label}</span>
                </span>
              </div>
              <ChevronsUpDownIcon className="size-4 shrink-0 xsmall:opacity-50 -mr-1" />
            </Button>
          )}
        />
        <PopoverContent className="w-[250px] p-0" sideOffset={4} arrow={false}>
          <Command>
            <CommandList>
              <CommandGroup>
                {options?.map((o, index) => {
                  return (
                    <CommandItem
                      key={index}
                      value={o?.country}
                      onSelect={(currentValue) => {
                        handleChange(currentValue)
                        close()
                      }}
                      className="py-2 hover:bg-gray-200 px-3 cursor-pointer flex items-center gap-x-2"
                    >
                      {/* @ts-ignore */}
                      <ReactCountryFlag
                        svg
                        style={{
                          width: "16px",
                          height: "16px",
                        }}
                        countryCode={o?.country ?? ""}
                      />{" "}
                      {o?.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default CountrySelect
