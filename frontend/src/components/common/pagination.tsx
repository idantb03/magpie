import { Button, Flex, Text } from '@radix-ui/themes'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <Flex gap="3" align="center">
      <Button 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="soft"
      >
        Previous
      </Button>
      <Text>Page {currentPage} of {totalPages}</Text>
      <Button 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="soft"
      >
        Next
      </Button>
    </Flex>
  )
}