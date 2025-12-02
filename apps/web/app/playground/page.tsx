"use client";

import { PlaygroundItem } from "@/components/PlaygroundItem";
import { useGravity } from "@/hooks/useGravity";
import { Tabs, Tab } from "@heroui/react";
import { Orbit, LayoutGrid } from "lucide-react";
import { useState } from "react";

const PLAYGROUND_ITEMS = [
  "Playground Item 1",
  "Playground Item 2",
  "Playground Item 3",
  "Playground Item 4",
  "Playground Item 5",
  "Playground Item 6",
];

export default function PlaygroundPage() {
  const [mode, setMode] = useState<"grid" | "gravity">("grid");

  const { containerRef } = useGravity({
    active: mode === "gravity",
    delay: 100,
    gravity: 0.8,
    floorBounce: 0.5,
    wallBounce: 0.4,
  });

  const handleItemClick = (item: string) => {
    console.log("Clicked:", item);
  };

  return (
    <div className="w-full h-full overflow-hidden bg-white dark:bg-black">
      <div className="p-0 h-full w-full max-w-[1920px] mx-auto flex flex-col">
        {/* Header with Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 shrink-0 flex-row p-6 sm:p-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-black dark:text-white">
            Playground
          </h1>

          <Tabs
            aria-label="Layout Options"
            selectedKey={mode}
            onSelectionChange={(key) => setMode(key as "grid" | "gravity")}
            classNames={{
              tabList: "bg-neutral-100 dark:bg-neutral-800 p-1 gap-1",
              cursor: "bg-white dark:bg-neutral-700 shadow-sm",
              tab: "h-9 px-3 data-[selected=true]:text-black dark:data-[selected=true]:text-white text-neutral-500 dark:text-neutral-400",
              tabContent:
                "group-data-[selected=true]:text-black dark:group-data-[selected=true]:text-white",
            }}
          >
            <Tab
              key="grid"
              title={
                <div className="flex items-center justify-center">
                  <LayoutGrid className="w-4 h-4" />
                </div>
              }
            />
            <Tab
              key="gravity"
              title={
                <div className="flex items-center justify-center">
                  <Orbit className="w-4 h-4" />
                </div>
              }
            />
          </Tabs>
        </div>

        {/* Gravity Container */}
        <div
          ref={containerRef}
          className="relative flex-1 w-full flex flex-wrap gap-4 content-start justify-center"
        >
          {PLAYGROUND_ITEMS.map((item, index) => (
            <div key={index} className="inline-block h-fit">
              <PlaygroundItem
                title={item}
                onClick={() => handleItemClick(item)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
