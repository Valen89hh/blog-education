import AnalfabetismoChart from "@/components/charts/analfabetismo-chart";
import EducationChart from "@/components/charts/educational-chart";
import Container from "@/components/containers/container";
import Logo from "@/components/ui/logo";
import CallAction from "@/components/widgets/call-action";
import EducationalCategories from "@/components/widgets/educational-categories";
import EncuestaSection from "@/components/widgets/encuesta-section";
import FocusGroup from "@/components/widgets/focus-group";
import Hero from "@/components/widgets/hero";
import MainPost from "@/components/widgets/main-post";
import Testimonios from "@/components/widgets/testimonios";
import TopCategories from "@/components/widgets/top-categories";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero/>
      <MainPost/>
      <EncuestaSection/>
      <EducationalCategories/>
      <Testimonios/>
    </>
  );
}