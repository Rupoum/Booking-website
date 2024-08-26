"use client";
import ComingSoon from "@/components/Home/ComingSoon";
import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";
import Header2 from "@/components/Home/Header2";
import MainHeader from "@/components/Home/MainHeader";
import { SwipeCarousel } from "@/components/Home/SwipeCarousel";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export default function Home() {
  return (
    <div className="">
      {/* <MainHeader /> */}
      <Navbar />
      <div className="px-16">
        <SwipeCarousel />
      </div>
      <CurrentlyPlaying />

      <ComingSoon />
      <Footer />
    </div>
  );
}
