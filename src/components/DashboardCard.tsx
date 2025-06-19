"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type DashboardCardProps = {
  title: string;
  iconSrc: string; 
  href: string;   
};

export default function DashboardCard({ title, iconSrc, href }: DashboardCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
  <button
    onClick={handleClick}
    className="bg-white rounded-xl p-6 w-44 h-48 flex flex-col items-center justify-center border border-[#E0ECF5]
              shadow-[0_4px_10px_rgba(32,120,191,0.4)]
              hover:shadow-[0_8px_20px_rgba(32,120,191,0.6)]
              transition-shadow"
  >
    <div className="w-16 h-16 mb-4 relative">
      <Image src={iconSrc} alt={title} fill className="object-contain" />
    </div>
    <span className="text-[#2078BF] text-lg font-medium text-center">{title}</span>
  </button>
  );
}
