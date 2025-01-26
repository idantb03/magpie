'use client'

import { Button, TextField, Flex, Select } from '@radix-ui/themes'

export function LendingForm({ lending, onSubmit }: any) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Flex direction="column" gap="3">
        <Select.Root defaultValue={lending?.bookId}>
          <Select.Trigger placeholder="Select a book" />
          <Select.Content>
            <Select.Item value="1">The Great Gatsby</Select.Item>
            <Select.Item value="2">1984</Select.Item>
            {/* More books... */}
          </Select.Content>
        </Select.Root>

        <TextField.Root placeholder="Borrower Name" defaultValue={lending?.borrowerName} />
        <TextField.Root 
          type="date" 
          placeholder="Borrow Date" 
          defaultValue={lending?.borrowDate} 
        />
        <TextField.Root 
          type="date" 
          placeholder="Due Date" 
          defaultValue={lending?.dueDate} 
        />
        
        <Button type="submit">
          Confirm Lending
        </Button>
      </Flex>
    </form>
  )
} 