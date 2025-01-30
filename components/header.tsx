"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";

import { MenuIcon, PlusIcon, ZapIcon } from "lucide-react";

import CreateCard from "./create-card";
import UserMenu from "./user-menu";

export default function Header() {
  return (
    <div className="fixed grid grid-cols-2 border-b items-center h-[52px] w-full bg-background">
      <div className="text-lg font-medium p-2 tracking-tight">
        <Link href="/home">
          <div className="flex items-center justify-start">
            <ZapIcon className="mr-2 h-5 w-5" />
            <p className="hidden lg:flex md:flex sm:flex">
              xccelerate | recall app
            </p>
          </div>
        </Link>
      </div>
      <div className="flex gap-2 p-2 justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button color="primary">
              <PlusIcon className="mr-2 h-5 w-5" /> Create Recall Card
            </Button>
          </DialogTrigger>
          <CreateCard />
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <UserMenu />
        </DropdownMenu>
      </div>
    </div>
  );
}
