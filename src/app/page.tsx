"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import quotesData from "@/data/quotes.json";
import Description from "@/components/ui/description";
import Header from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="w-screen flex gap-4 flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#fdf6e3] to-[#fef3c7] text-[#44403c] p-4">
      <Header />

      <div className="container max-w-xl w-full">
        <Description />
      </div>

      <Input
        value={Topic}
        onChange={(e) => setTopic(e.target.value)}
        className="w-full max-w-xl border border-[#d6bb57] bg-[#fefce8] text-[#a16207] shadow-sm focus:border-[#a16207] focus:ring-2 focus:ring-[#fde68a]"
        placeholder="Type a topic or pick one from suggestions"
      />

      <div className="gap-4 flex justify-end items-center w-full max-w-xl">
        <Popover>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="text-[#a16207] cursor-pointer text-sm px-3 py-1 rounded border border-[#d6bb57] bg-[#fefce8] hover:bg-[#fde68a] transition shadow"
            >
              Need Ideas &#x1F4A1;
            </button>
          </PopoverTrigger>

          <PopoverContent
            side="top"
            className="w-72 max-h-64 overflow-y-auto shadow-lg bg-[#fff7ed] border border-[#fcd34d] rounded-lg p-4 text-sm text-[#78350f]"
          >
            <p className="font-semibold mb-3 text-[#a16207]">Popular Topics</p>
            <div className="flex flex-wrap gap-2">
              {Object.keys(quotesData.topics)
                .slice(0, 25)
                .map((topic) => (
                  <span
                    key={topic}
                    onClick={() => setTopic(topic)}
                    className="cursor-pointer bg-[#fefce8] hover:bg-[#fde68a] border border-[#fcd34d] text-[#a16207] px-3 py-1 rounded-full text-xs capitalize transition"
                  >
                    {topic}
                  </span>
                ))}
            </div>
          </PopoverContent>
        </Popover>

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
        <div className="relative w-full max-w-md">
          <Carousel className="w-full opacity-0 animate-fadeIn transition-opacity duration-1000">
            <CarouselContent className="-ml-1">
              {quotesToShow.map((quote, index) => (
                <CarouselItem key={index} className="pl-1 md:basis-full">
                  <div className="p-1">
                    <Card className="bg-[#fff7ed] shadow-md rounded-lg border border-[#fcd34d]">
                      <CardContent className="flex h-40 w-full items-center justify-center p-6">
                        <blockquote className="text-[#78350f] text-lg sm:text-xl font-medium italic text-center leading-snug max-w-md">
                          “{quote}”
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10" />
          </Carousel>
        </div>
      )}
    </div>
  );
}
