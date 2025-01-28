"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface SidebarItemProps {
  href: string
  children: React.ReactNode
}

export function SidebarItem({ href, children }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center rounded-lg px-3 py-2 transition-colors",
        "hover:bg-accent",
        isActive && "bg-accent"
      )}
    >
      <motion.span 
        className={cn("", isActive && "font-bold")}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.span>
    </Link>
  )
}