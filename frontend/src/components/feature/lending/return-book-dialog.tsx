'use client'

import { Button, Dialog, Flex } from '@radix-ui/themes'
import { RotateCcwIcon } from 'lucide-react'

export function ReturnBookDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="1" className='cursor-pointer'>
          <RotateCcwIcon className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Return Book</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Confirm the return of "The Great Gatsby" by John Doe?
        </Dialog.Description>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="green">
              Confirm Return
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
} 