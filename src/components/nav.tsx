'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { LayoutDashboard, FolderKanban, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';

export function Nav() {
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      href: '/projects',
      label: 'Projects',
      icon: FolderKanban,
    },
  ];

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center justify-between">
            <Logo />
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden" />
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:border-t">
        <div className="group-data-[state=expanded]:block hidden">
          <Button asChild className="w-full">
            <Link href="/projects/new">
                <PlusCircle />
                New Project
            </Link>
          </Button>
        </div>
        <div className="group-data-[state=collapsed]:block hidden">
            <Link href="/projects/new">
                <SidebarMenuButton tooltip="New Project">
                    <PlusCircle />
                </SidebarMenuButton>
            </Link>
        </div>
      </SidebarFooter>
    </>
  );
}
