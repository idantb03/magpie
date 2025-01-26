import { SidebarItem } from '../feature/sidebar/sidebar-item'

export function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <nav className="space-y-2 p-4">
        <SidebarItem href="/">
          <span>Dashboard</span>
        </SidebarItem>
        <SidebarItem href="/books">
          <span>Books</span>
        </SidebarItem>
        <SidebarItem href="/lendings">
          <span>Lendings</span>
        </SidebarItem>
      </nav>
    </aside>
  )
}
