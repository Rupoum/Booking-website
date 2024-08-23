"use client"
import ComingSoon from "@/components/Home/ComingSoon";
import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";
import Header2 from "@/components/Home/Header2";
import MainHeader from "@/components/Home/MainHeader";

export default function Home() {

  return (
    <div className="">
      <MainHeader />
      <CurrentlyPlaying />

      <ComingSoon />
   
    </div>
  );
}
