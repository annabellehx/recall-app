"use client";

import { useEffect, useState } from "react";

import { Models, Query } from "appwrite";
import { account, database } from "@/app/appwrite";

import CardHeader from "./card-header";

export default function CardPage({
  params,
}: {
  params: { documentId: string };
}) {
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
        Query.equal("$id", params.documentId),
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

  if (card) {
    return (
      <div className="w-full">
        {CardHeader(card)}
        <div className="pt-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            {card.title}
          </h2>
          <p className="text-muted-foreground">{card.tags[0]}</p>
          <a className="p-1">
            <center>
              <img src={card.image} />
            </center>
          </a>
          <ul>
            {card.description.map((paragraph: any, key: number) => (
              <li key={key} className="inline-block p-2">
                {paragraph}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
