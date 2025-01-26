'use client'

import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes'
import { PencilIcon } from 'lucide-react'

export function EditBookDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button variant="ghost" size="1" className='cursor-pointer'>
          <PencilIcon className="h-4 w-4" />
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Book</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your book details.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Title
            </Text>
            <TextField.Root
              defaultValue="The Great Gatsby"
              placeholder="Enter book title"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Author
            </Text>
            <TextField.Root
              defaultValue="F. Scott Fitzgerald"
              placeholder="Enter author name"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              ISBN
            </Text>
            <TextField.Root
              defaultValue="978-3-16-148410-0"
              placeholder="Enter ISBN"
            />
          </label>

          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Year
            </Text>
            <TextField.Root
              type="number"
              defaultValue="1925"
              placeholder="Enter publication year"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save Changes</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
} 