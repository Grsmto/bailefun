import { deleteLineItem } from "@lib/data/cart"
import { Spinner } from "@medusajs/icons"
import { Trash2Icon } from "lucide-react"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex gap-x-1 text-sm hover:text-ui-fg-base cursor-pointer"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash2Icon className="size-3.5 mt-[2px]" />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
