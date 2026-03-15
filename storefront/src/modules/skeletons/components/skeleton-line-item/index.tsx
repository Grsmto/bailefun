import { Table } from "@medusajs/ui"

const SkeletonLineItem = () => {
  return (
    <Table.Row className="w-full m-4">
      <Table.Cell className="small:w-24 w-12 pl-0! p-4 pr-3">
        <div className="aspect-square rounded-lg flex bg-gray-200 animate-pulse" />
      </Table.Cell>
      <Table.Cell className="text-left pr-3">
        <div className="flex flex-col gap-y-2">
          <div className="w-32 h-4 bg-gray-200 animate-pulse" />
          <div className="w-24 h-4 bg-gray-200 animate-pulse" />
        </div>
      </Table.Cell>
      <Table.Cell>
        <div className="flex gap-3 items-center">
          <div className="w-4 h-8 bg-gray-200 animate-pulse" />
          <div className="w-14 h-10 bg-gray-200 animate-pulse" />
        </div>
      </Table.Cell>
      <Table.Cell className="hidden small:table-cell">
        <div className="flex gap-2">
          <div className="w-12 h-6 bg-gray-200 animate-pulse" />
        </div>
      </Table.Cell>
      <Table.Cell className="pr-0!">
        <div className="flex gap-2">
          <div className="w-12 h-6 bg-gray-200 ml-auto animate-pulse" />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SkeletonLineItem
