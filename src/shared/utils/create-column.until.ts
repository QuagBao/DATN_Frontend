export const createColumn = (id: string, header: string) => ({
  accessorKey: id,
  header,
  cell: (info: { getValue: () => unknown }) => info.getValue()
})
