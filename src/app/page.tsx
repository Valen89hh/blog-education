import Logo from "@/components/ui/logo";
import CallAction from "@/components/widgets/call-action";
import EducationalCategories from "@/components/widgets/educational-categories";
import Hero from "@/components/widgets/hero";
import MainPost from "@/components/widgets/main-post";
import TopCategories from "@/components/widgets/top-categories";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero/>
      <MainPost/>
      <CallAction/>
      <TopCategories/>
      <EducationalCategories/>
    </>
  );
}