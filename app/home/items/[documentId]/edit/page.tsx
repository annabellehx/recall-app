"use client";

import { useEffect, useState } from "react";

import { Models, Query } from "appwrite";
import { account, database } from "@/app/appwrite";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const cardFormSchema = z.object({
  title: z.string().optional(),
  tags: z.string().optional(),
  description: z.string().optional(),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

export default function EditCard({
  params,
}: {
  params: { documentId: string };
}) {
  const id = params.documentId;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const [card, setCard] = useState<Models.Document>();

  async function fetchUser() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error: any) {
      window.location.href = "/auth/login";
    }
  }

  async function fetchCard() {
    if (!user) return;
    try {
      const cards = await database.listDocuments("database", "cards", [
        Query.equal("from", user.email),
        Query.equal("$id", id),
      ]);
      setCard(cards.documents[0]);
    } catch (error: any) {
      alert("Error fetching card.");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCard();
  }, [user]);

  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    mode: "onSubmit",
  });

  async function onSubmit(data: CardFormValues) {
    setIsLoading(true);

    try {
      await database.updateDocument("database", "cards", id, {
        title: form.getValues("title"),
        tags: form.getValues("tags")?.split(", "),
        description: form.getValues("description")?.split("\n\n"),
      });
      window.location.href = "/home/items/".concat(id);
    } catch (error: any) {
      alert(error.message);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  if (card)
    return (
      <div className="w-full">
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/home">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={"/home/items/".concat(id)}>
                  {card.title}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="pt-5">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="pt-5 space-y-8"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter title"
                        disabled={isLoading}
                        defaultValue={card.title}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter tags"
                        disabled={isLoading}
                        defaultValue={card.tags.join(", ")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    {" "}
                    <FormLabel>Card Description</FormLabel>
                    <FormControl>
                      <Textarea
                        className="h-[350px] overflow-visible"
                        placeholder="Enter description"
                        disabled={isLoading}
                        defaultValue={card.description.join("\n\n")}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex items-center justify-end">
                <Button disabled={isLoading} type="submit">
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update card
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    );
}
