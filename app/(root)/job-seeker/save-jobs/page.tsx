"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { DUMMY_SAVED_JOBS } from "@/constants";
import {
  Briefcase,
  Globe2,
  HeartCrack,
  MapPin,
  MoreVertical,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SavedJobsPage = () => {
  return (
    <Card className="border-none">
      <CardHeader className="p-0">
        <CardTitle className="text-xl">Saved Jobs</CardTitle>
        <CardDescription>Jobs you have saved will appear here.</CardDescription>
      </CardHeader>
      <Separator className="my-4" />
      <CardContent className="p-0">
        <div className="space-y-4">
          {DUMMY_SAVED_JOBS.map((job) => (
            <Card key={job.id}>
              <CardHeader className="flex-row items-start gap-4">
                <Image
                  src={job.companyLogo}
                  alt={job.companyName}
                  width={64}
                  height={64}
                  className="rounded-lg"
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <Link href={`/jobs/${job.id}`}>
                      <CardTitle className="text-lg hover:underline">
                        {job.title}
                      </CardTitle>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <HeartCrack className="mr-2 h-4 w-4" />
                          Un-save
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="text-sm">
                    {job.companyName}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {job.location}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Briefcase className="h-3 w-3" />
                    {job.jobType}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe2 className="h-3 w-3" />
                    {job.locationType}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Posted on {job.postedAt}
                </div>
                <Button asChild>
                  <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavedJobsPage;
