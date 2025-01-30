import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

import SidebarNav from "./sidebar-nav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/home/settings/profile",
  },
  {
    title: "Account",
    href: "/home/settings/account",
  },
  {
    title: "Appearance",
    href: "/home/settings/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="grid w-full space-y-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Settings</h2>
          <p className="text-muted-foreground ">
            Manage your account settings and set appearance preferences.
          </p>
        </div>
        <Separator className="w-full" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-y-0">
          <aside className="lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
