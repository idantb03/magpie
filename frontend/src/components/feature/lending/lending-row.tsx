'use client'

import { Table } from '@radix-ui/themes'
import { ReturnBookDialog } from './return-book-dialog'
import { DeleteLendingDialog } from './delete-lending-dialog'
import { Badge } from '@radix-ui/themes'

export function LendingRow() {
  return (
    <Table.Row>
      <Table.Cell>The Great Gatsby</Table.Cell>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>2024-03-15</Table.Cell>
      <Table.Cell>2024-04-15</Table.Cell>
      <Table.Cell>
        <Badge color="orange">Borrowed</Badge>
      </Table.Cell>
      <Table.Cell>
        <div className="flex flex-row gap-4">
          <ReturnBookDialog />
          <DeleteLendingDialog />
        </div>
      </Table.Cell>
    </Table.Row>
  )
} 