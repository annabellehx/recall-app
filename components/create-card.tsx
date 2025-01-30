import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";

import { ID, Models } from "appwrite";
import { account, database } from "@/app/appwrite";

export default function CreateCard() {
  const [user, setUser] = useState<Models.User<Models.Preferences>>();

  const [url, setURL] = useState<string>("");
  const [title, setTitle] = useState<string>("Card Title");
  const [tags, setTags] = useState<string[]>(["Untagged Card"]);
  const [description, setDesc] = useState<string[]>(["Card Description"]);
  const [imageURL, setImageURL] = useState<string>("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    const user = await account.get();
    setUser(user);

    const wikiurl =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=extracts&exintro&explaintext&titles=".concat(
        url.split("wikipedia.org/wiki/")[1]
      );

    const response = await fetch(wikiurl);
    const jsonContent = await response.json();

    // You should probably add some validathin here to make sure pages exists
    const pages = jsonContent.query.pages;
    const pageIds = Object.keys(pages);

    // Here we only take the first response since we know there is only one.
    const firstPageId = pageIds.length ? pageIds[0] : null;
    const title: string = firstPageId ? pages[firstPageId].title : null;
    const extract: string = firstPageId ? pages[firstPageId].extract : null;
    const description: string[] = extract.split("\n");

    setTitle(title);
    setDesc(description);

    const tags: string[] = ["Untagged card"];
    setTags(tags);

    const wikiImageURL =
      "https://en.wikipedia.org/w/api.php?format=json&action=query&origin=*&prop=pageimages&pithumbsize=1000&titles=".concat(
        url.split("wikipedia.org/wiki/")[1]
      );

    const imageResponse = await fetch(wikiImageURL);
    const jsonImageContent = await imageResponse.json();
    const imagePages = jsonImageContent.query.pages;

    const imageURL: string = firstPageId
      ? imagePages[firstPageId].thumbnail.source
      : null;

    setImageURL(imageURL);

    try {
      await database.createDocument("database", "cards", ID.unique(), {
        from: user.email,
        title: title,
        tags: tags,
        description: description,
        url: url,
        image: imageURL,
        pinned: false,
      });
      window.location.reload();
    } catch (error: any) {
      alert("Error creating card.");
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Recall Card</DialogTitle>
        <DialogDescription>
          Paste a URL to summarize or type to search anything to recall it.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={onSubmit}>
        <Input
          id="url"
          type="url"
          placeholder="URL"
          value={url}
          onChange={(event) => setURL(event.target.value)}
        />
        <div className="grid grid-cols-1">
          <Button type="submit" className="my-2">
            Recall
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
