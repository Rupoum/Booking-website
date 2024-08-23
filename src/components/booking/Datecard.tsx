import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Datecard() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="sm:w-44 w-12 "
    >
      <CarouselContent className="">
        {Array.from({ length: 10 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-9 lg:basis-auto">
            <div className="">
              <Card className="w-10 h-10 ">
                <CardContent className="flex  items-center justify-center p-3   ">
                  <span className="text-xs font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
