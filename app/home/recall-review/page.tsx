import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import { InfoIcon, LineChartIcon } from "lucide-react";

import ProgressChart from "./progress-chart";

export default function RecallReview() {
  return (
    <div className="flex items-center justify-between p-5">
      <div className="w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recall Review</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="pt-5">
          <h2 className="text-2xl font-semibold tracking-tight">
            Recall Review
          </h2>
          <p className="text-muted-foreground ">
            Recall Review uses spaced repetition to enhance your knowledge
            retention. Each session includes up to 10 questions from your cards.
          </p>
          <div className="my-5 p-3 rounded-md border">
            <p className="flex font-medium items-center">
              <InfoIcon className="mr-2 h-5 w-5" />
              No questions to review
            </p>
            <Separator className="my-2" />
            <p>
              Create more questions from your saved content to start the review.
            </p>
          </div>
          <div className="my-5 p-3 rounded-md border">
            <p className="flex font-medium items-center mb-4">
              <LineChartIcon className="mr-2 h-5 w-5" />
              Your Progress
            </p>
            <center>
              <ProgressChart />
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
