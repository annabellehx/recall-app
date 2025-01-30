import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";

import { ZapIcon } from "lucide-react";

import UserSignUp from "../signup-form";

export default function SignUpPage() {
  return (
    <>
      <div className="flex justify-end absolute top-0 right-0 p-4">
        <Button variant="ghost">
          <Link href="/auth/login">Log In</Link>
        </Button>
        <ThemeToggle />
      </div>
      <div className="relative flex lg:hidden items-center justify-center pb-10 text-lg font-medium tracking-tight">
        <ZapIcon className="mr-2 h-5 w-5" />
        xccelerate | recall app
      </div>
      <div className="mx-auto flex w-fit flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Enter your email below to sign up for your account
          </p>
        </div>
        <UserSignUp />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  );
}
