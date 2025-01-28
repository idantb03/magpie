'use client'

import { Table } from '@radix-ui/themes'
import { EditBookDialog } from './edit-book-dialog'
import { DeleteBookDialog } from './delete-book-dialog'

export function BookRow() {
  return (
    <Table.Row>
      <Table.Cell>The Great Gatsby</Table.Cell>
      <Table.Cell>F. Scott Fitzgerald</Table.Cell>
      <Table.Cell>978-3-16-148410-0</Table.Cell>
      <Table.Cell>1925</Table.Cell>
      <Table.Cell>
        <div className="flex flex-row gap-4">
          <EditBookDialog />
          <DeleteBookDialog />
        </div>
      </Table.Cell>
    </Table.Row>
  )
}