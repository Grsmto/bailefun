import { Text } from "@medusajs/ui"

const MedusaCTA = () => {
  return (
    <Text weight="plus" className="flex gap-x-2 items-center">
      Follow us
      <a href="https://www.instagram.com/bailefun" target="_blank" rel="noreferrer">
        <img height="18" width="18" src="https://unpkg.com/simple-icons@v15/icons/instagram.svg" />
      </a>
    </Text>
  )
}

export default MedusaCTA
