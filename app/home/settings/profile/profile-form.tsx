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
import { toast } from "@/components/ui/use-toast";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
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

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: ProfileFormValues) {
    setIsLoading(true);

    await account.updateName(form.getValues("name"));
    toast({
      description: "Your changes have been saved.",
    });

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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name"
                    disabled={isLoading}
                    defaultValue={user.name}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter username"
                    disabled={true}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is the username to your account. You can only change this
                  once every 30 days.
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
              Update profile
            </Button>
          </div>
        </form>
      </Form>
    );
  }
}
