"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type DatecardProps = {
  dates?: Date[];
  onSelectDate: (date: Date) => void;
};

export function Datecard({ dates = [], onSelectDate }: DatecardProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onSelectDate(date);
  };

  return (
    <Carousel opts={{ align: "center" }} className="w-24 ml-12 sm:ml-0 sm:w-44">
      <CarouselContent>
        {dates.map((date, index) => {
          const isSelected =
            selectedDate?.toDateString() === date.toDateString();
          return (
            <CarouselItem
              key={index}
              className="md:basis-auto lg:basis-auto"
              onClick={() => handleDateClick(date)}
            >
              <Card
                className={`w-20 h-10 cursor-pointer hover:bg-green-200 ${
                  isSelected ? "bg-green-600 text-white" : ""
                }`}
              >
                <CardContent className="flex items-center justify-center p-3">
                  <span className="text-xs font-semibold">
                    {date.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </CardContent>
              </Card>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
