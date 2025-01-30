"use client";

import { useEffect, useState } from "react";
import { Models, Query } from "appwrite";
import { account, database } from "@/app/appwrite";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./ui/command";

export default function Sidebar() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const [cards, setCards] = useState<Models.Document[]>([]);

  const cardList: {
    group: string;
    items: Models.Document[];
  }[] = [];

  async function fetchUser() {
    try {
      const user = await account.get();
      setUser(user);
    } catch (error: any) {
      window.location.href = "/auth/login";
    }
  }

  async function fetchCards() {
    if (!user) return;
    try {
      const cards = await database.listDocuments("database", "cards", [
        Query.equal("from", user.email),
      ]);
      setCards(cards.documents);
    } catch (error: any) {
      alert("Error fetching cards.");
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchCards();
  }, [user]);

  for (let i = 0; i < cards.length; i++) {
    if (cardList.at(-1)?.group === cards[i].tags[0]) {
      cardList.at(-1)?.items.push(cards[i]);
    } else {
      cardList.push({
        group: cards[i].tags[0],
        items: [cards[i]],
      });
    }
  }

  if (user)
    return (
      <CommandList style={{ overflow: "visible" }}>
        <CommandEmpty>No results found.</CommandEmpty>
        {cardList.map((cards: any) => (
          <CommandGroup key={cards.group} heading={cards.group.toUpperCase()}>
            {cards.items.map((card: any) => (
              <CommandItem
                key={card.$id}
                className="flex gap-2 pl-5 cursor-pointer"
              >
                {card.title}
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    );
}
