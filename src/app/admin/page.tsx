"use client";
import ComingSoon from "@/components/Home/ComingSoon";
import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";

import { SwipeCarousel } from "@/components/Home/SwipeCarousel";

import Footer from "@/components/Home/Footer";
import HeaderNavAdmin from "@/components/Home/NavbarAdmin";

export default function Home() {
  return (
    <div className="">
      {/* <MainHeader /> */}
      <HeaderNavAdmin />
      <div className="px-16">
        <SwipeCarousel />
      </div>
      <CurrentlyPlaying />

      <ComingSoon />
      <Footer />
    </div>
  );
}
