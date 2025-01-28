'use client'

import { Dialog, Button, Flex } from '@radix-ui/themes'
import { TrashIcon } from 'lucide-react'

export function DeleteBookDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="1" className='cursor-pointer'>
          <TrashIcon className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Delete Book</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Are you sure you want to delete "The Great Gatsby"? This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="red">
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
} 