import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import React from "react"
import { Button } from "@/components/ui/button"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  variants?: HttpTypes.StoreProductVariant[]
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  variants,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (() => {
    if (!variants?.length) {
      return (option.values ?? []).map((v) => v.value)
    }

    const seen = new Set<string>()
    const ordered: string[] = []

    for (const variant of variants) {
      const value = variant.options?.find((o) => o.option_id === option.id)
        ?.value

      if (value && !seen.has(value)) {
        seen.add(value)
        ordered.push(value)
      }
    }

    for (const v of option.values ?? []) {
      if (!seen.has(v.value)) {
        ordered.push(v.value)
      }
    }

    return ordered
  })()

  return (
    <div className="flex flex-col gap-y-3">
      <span className="text-sm">Select {title}</span>
      <div
        className="flex flex-wrap justify-between gap-2"
        data-testid={dataTestId}
      >
        {filteredOptions.map((v) => {
          return (
            <Button
              onClick={() => updateOption(option.id, v)}
              key={v}
              variant="outline"
              className={clx(
                "flex-1",
                {
                  "bg-accent": v === current,
                  " transition-shadow ease-in-out duration-150":
                    v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
