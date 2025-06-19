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
      className="bg-white hover:shadow-xl transition-shadow rounded-xl p-6 w-44 h-48 flex flex-col items-center justify-center shadow-md border border-[#E0ECF5]"
    >
      <div className="w-16 h-16 mb-4 relative">
        <Image src={iconSrc} alt={title} fill className="object-contain" />
      </div>
      <span className="text-[#2078BF] text-lg font-medium text-center">{title}</span>
    </button>
  );
}
