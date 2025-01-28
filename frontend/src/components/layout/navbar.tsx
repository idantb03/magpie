import { NavigationMenu } from '@radix-ui/react-navigation-menu'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center w-full">
        <NavigationMenu className="w-full">
          <div className="flex w-full justify-between px-8 items-center">
            <Link href="/" className="font-bold text-xl">
              Magpie
            </Link>
            <Link href="/profile">Profile</Link>
          </div>
        </NavigationMenu>
      </div>
    </header>
  )
}
