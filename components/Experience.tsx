"use client";

import { Card, CardContent } from "@/components/ui/card";
import { experiences } from "@/lib/data";
import { MapPin } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-4 bg-[#1a1a1a]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white">
            Experience
          </h2>
          <div className="w-16 sm:w-20 h-1 bg-blue-600 mx-auto" />
          <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base">
            My working experience
          </p>
        </div>

        <div className="space-y-6">
          {experiences.map((item) => (
            <Card key={item.id} className="bg-[#2a2a2a] border-gray-700 w-full">
              <CardContent className="p-6 sm:p-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {item.title}{" "}
                      <span className="text-gray-400 font-normal">
                        @ {item.company}
                      </span>
                    </h3>
                    <p className="flex items-center gap-1 text-sm text-gray-400 mt-1">
                      <MapPin className="size-3.5 text-blue-500" />
                      {item.location}
                    </p>
                  </div>
                  <p className="text-sm text-gray-400 whitespace-nowrap">
                    {item.period}
                  </p>
                </div>

                {/* Responsibilities */}
                <ul className="space-y-3">
                  {item.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 mt-0.5 sm:mt-1 flex-shrink-0">
                        •
                      </span>
                      <span className="text-sm sm:text-base text-gray-300 leading-relaxed">
                        {resp}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
