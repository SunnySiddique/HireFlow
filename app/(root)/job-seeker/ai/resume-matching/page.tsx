"use client";

import dynamic from "next/dynamic";

const AICoachUploadPage = dynamic(
  () => import("../_components/AICoachUploadPage"),
  { ssr: false },
);
const ResumeJobRecommendationsPage = () => {
  return (
    <>
      <AICoachUploadPage />
    </>
  );
};

export default ResumeJobRecommendationsPage;
