'use client'

import { Table } from '@radix-ui/themes'
import { BookRow } from './book-row'
import { useState } from 'react'
import { Pagination } from '@/components/common/pagination'

export function BooksList() {
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>ISBN</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Published Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <BookRow />
        </Table.Body>
      </Table.Root>
      <div className="mt-4">
        <Pagination 
          currentPage={currentPage}
          totalPages={10} 
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}