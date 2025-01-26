'use client'

import { Table } from '@radix-ui/themes'
import { LendingRow } from './lending-row'
import { useState } from 'react'
import { Pagination } from '@/components/common/pagination'

export function LendingsList() {
  const [currentPage, setCurrentPage] = useState(1)
  
  return (
    <div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Book Title</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Borrower</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Borrow Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Due Date</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <LendingRow />
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