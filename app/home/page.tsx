"use client";

import { useEffect, useState } from "react";

import { Models, Query } from "appwrite";
import { account, database } from "../appwrite";

import { format } from "date-fns";
import CardItem from "@/components/card-item";

export default function Home() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();
  const [cards, setCards] = useState<Models.Document[]>([]);

  const cardList: {
    group: string;
    items: Models.Document[];
  }[] = [];

  const pinnedList: Models.Document[] = [];

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
        Query.orderDesc("$createdAt"),
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
    if (cards[i].pinned) {
      pinnedList.push(cards[i]);
    } else {
      if (cardList.at(-1)?.group === format(cards[i].$createdAt, "PPP")) {
        cardList.at(-1)?.items.push(cards[i]);
      } else {
        cardList.push({
          group: format(cards[i].$createdAt, "PPP"),
          items: [cards[i]],
        });
      }
    }
  }

  if (user) {
    return (
      <>
        {pinnedList.length > 0 ? (
          <div>
            <p className="pt-5 pl-5">Pinned Cards</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-2 pt-2">
              {pinnedList.map((card: any) => (
                <div key={card.$id} className="p-2">
                  {CardItem(card)}
                </div>
              ))}
            </div>
            <div className="pt-5 px-5">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Other recalls
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        {cardList.map((cards: any) => (
          <div key={cards.group}>
            <p className="pt-5 pl-5">{cards.group}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 px-2 pt-2">
              {cards.items.map((card: any) => (
                <div key={card.$id} className="p-2">
                  {CardItem(card)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  }
}
