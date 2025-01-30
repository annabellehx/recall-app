"use client";

import { useEffect, useState } from "react";

import { Models } from "appwrite";
import { account } from "@/app/appwrite";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";

const accountFormSchema = z.object({
  email: z.string().email(),
  newPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(256, {
      message: "Password must not be longer than 256 characters.",
    }),
  oldPassword: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(256, {
      message: "Password must not be longer than 256 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

export default function AccountForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  async function fetchUser() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error: any) {
      window.location.href = "/auth/login";
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: AccountFormValues) {
    setIsLoading(true);

    try {
      await account.updateEmail(
        form.getValues("email"),
        form.getValues("oldPassword")
      );
      await account.updatePassword(
        form.getValues("newPassword"),
        form.getValues("oldPassword")
      );
      toast({
        description: "Your changes have been saved.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  if (user) {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    disabled={isLoading}
                    defaultValue={user.email}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the email to your account. You can only change this
                  once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the new password to your account. You can only change
                  this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    disabled={isLoading}
                    placeholder="Enter password"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Enter the current password to your account. You can only
                  change this once every 30 days.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Button disabled={isLoading} type="submit">
              {isLoading && (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update account
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
