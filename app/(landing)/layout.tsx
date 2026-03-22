"use client";

import HomeNavbar from "@/app/(landing)/_components/HomeNavbar";

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNavbar />
      {children}
    </>
  );
}
