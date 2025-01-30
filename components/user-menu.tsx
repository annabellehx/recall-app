import Link from "next/link";
import { useEffect, useState } from "react";

import { Models } from "appwrite";
import { account } from "@/app/appwrite";

import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import {
  GraduationCapIcon,
  LogOutIcon,
  SettingsIcon,
  WaypointsIcon,
} from "lucide-react";

import ThemeToggle from "./theme-toggle";

export default function UserMenu() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  async function fetchUser() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error: any) {
      window.location.href = "/auth/login";
    }
  }

  async function logOut() {
    await account.deleteSession("current");
    window.location.href = "/auth/login";
  }

  useEffect(() => {
    fetchUser();
  }, []);

  if (user) {
    return (
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex items-center justify-between gap-2">
            <div className="grow">
              <p className="text-[15px] font-medium">{user.name}</p>
              <p className="text-[15px] font-normal text-neutral-500">
                {user.email}
              </p>
            </div>
            <ThemeToggle />
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          <WaypointsIcon className="h-5 w-5" />
          <Link href="/home/knowledge-graph">Knowledge Graph</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
          <GraduationCapIcon className="h-5 w-5" />
          <Link href="/home/recall-review">Recall Review</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2">
          <SettingsIcon className="h-5 w-5" />
          <Link href="/home/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2" onClick={logOut}>
          <LogOutIcon className="h-5 w-5" />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    );
  }
}
