"use client";

import { useEffect, useState } from "react";
import { Models } from "appwrite";
import { account } from "@/app/appwrite";

import { Command, CommandInput } from "@/components/ui/command";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

interface HomeProps {
  children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeProps) {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  async function checkAuth() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error: any) {
      window.location.href = "/auth/login";
      alert("User is not logged in.");
    }
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="w-full">
      <Header />
      <div className="grid w-full h-full pt-[52px]">
        <aside className="hidden lg:flex md:flex">
          <div className="fixed flex flex-col gap-2 w-[250px] border-r h-screen p-2">
            <Command style={{ overflow: "visible" }}>
              <div className="rounded-md border shadow-sm">
                <CommandInput placeholder="Search Card & Tags..." />
              </div>
              <Sidebar />
            </Command>
          </div>
        </aside>
        <div className="grid w-full h-full lg:pl-[250px] md:pl-[250px]">
          {children}
        </div>
      </div>
    </div>
  );
}
