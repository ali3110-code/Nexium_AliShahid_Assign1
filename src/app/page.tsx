"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import quotesData from "@/data/quotes.json";
import Description from "@/components/ui/description";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { PenLine } from "lucide-react";

export default function Home() {
  const [Topic, setTopic] = useState<string>("");
  const [quotesToShow, setQuotesToShow] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showCarousel, setShowCarousel] = useState<boolean>(false);

  const generate = () => {
    if (!Topic) {
      setErrorMessage("Please select or type a topic.");
      setQuotesToShow([]);
      setShowCarousel(false);
      return;
    }

    const key = Topic.toLowerCase().trim() as keyof typeof quotesData.topics;
    const quotes = quotesData.topics[key];

    if (quotes) {
      setErrorMessage("");
      setQuotesToShow([]);
      setShowCarousel(false);
      setTimeout(() => {
        setQuotesToShow(quotes);
        setShowCarousel(true);
      }, 1500);
    } else {
      setErrorMessage("No quotes found for this topic.");
      setQuotesToShow([]);
      setShowCarousel(false);
    }
  };

  return (
    <div className="flex gap-4 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fdf6e3] to-[#fef3c7] text-[#44403c]">
      <Header />
      <div className="container w-120">
        <Description />
      </div>

      <Input
        value={Topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-120 border border-[#d6bb57] bg-[#fefce8] text-[#a16207] shadow-sm focus:border-[#a16207] focus:ring-2 focus:ring-[#fde68a]"
        placeholder="Type topic or select below"
      />
      <div className="flex justify-between items-center w-120">
        <Select onValueChange={(value) => setTopic(value)}>
          <SelectTrigger className="w-40 border border-[#d6bb57] bg-[#fefce8] text-[#a16207] shadow-sm focus:border-[#a16207] focus:ring-2 focus:ring-[#fde68a]">
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(quotesData.topics).map((topic) => (
              <SelectItem key={topic} value={topic}>
                {topic.charAt(0).toUpperCase() + topic.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={generate}
          className="bg-[#ca8a04] hover:bg-[#a16207] text-white shadow-md w-40"
        >
          <PenLine className="h-4 w-4" />
          Generate
        </Button>
      </div>

      {errorMessage && (
        <p className="text-red-600 font-medium mt-2">{errorMessage}</p>
      )}

      {showCarousel && quotesToShow.length > 0 && (
        <Carousel className="w-full max-w-md opacity-0 animate-fadeIn transition-opacity duration-1000">
          <CarouselContent className="-ml-1">
            {quotesToShow.map((quote, index) => (
              <CarouselItem key={index} className="pl-1 md:basis-full">
                <div className="p-1">
                  <Card className="bg-[#fff7ed] shadow-md rounded-lg border border-[#fcd34d]">
                    <CardContent className="flex h-40 w-full items-center justify-center p-6 text-[#78350f] text-lg font-semibold">
                      <span className="text-lg font-medium text-center">
                        {index + 1}. {quote}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
}
