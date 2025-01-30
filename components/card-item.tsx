import Link from "next/link";

import { Models } from "appwrite";
import { database } from "@/app/appwrite";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { PinIcon, ZoomInIcon } from "lucide-react";

export default function CardItem(card: Models.Document) {
  async function pinCard() {
    await database.updateDocument("database", "cards", card.$id, {
      pinned: true,
    });
    window.location.reload();
  }

  async function unpinCard() {
    await database.updateDocument("database", "cards", card.$id, {
      pinned: false,
    });
    window.location.reload();
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-cols-2 items-center justify-between">
          <CardTitle className="text-lg">{card.title}</CardTitle>
          <div>
            <Button variant="ghost" size="icon">
              <Link href={"/home/items/".concat(card.$id)}>
                <ZoomInIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              {card.pinned ? (
                <PinIcon
                  fill="currentColor"
                  className="h-4 w-4 rotate-45"
                  onClick={unpinCard}
                />
              ) : (
                <PinIcon className="h-4 w-4 rotate-45" onClick={pinCard} />
              )}
            </Button>
          </div>
        </div>
        <CardDescription>
          <div className="text-[15px] h-[80px] overflow-hidden">
            <p>{card.description[0]}</p>
          </div>
          <div className="flex flex-wrap pt-2 h-[35px] overflow-hidden">
            {card.tags.map((tag: string) => (
              <div className="pt-1 pr-1" key={tag}>
                <Badge className="font-normal uppercase">{tag}</Badge>
              </div>
            ))}
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
