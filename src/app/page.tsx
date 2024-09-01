"use client";

import CurrentlyPlaying from "@/components/Home/CurrentlyPlaying";

import { SwipeCarousel } from "@/components/Home/SwipeCarousel";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

import { Suspense } from "react";

// import { Route } from "lucide-react";
// import { BrowserRouter as Router, Route, switch } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";

export default function Home() {
  return (
    <div className="">
      <Suspense>
        {/* <MainHeader /> */}
        <Navbar />
        <div className="px-16">
          <SwipeCarousel />
        </div>
        <CurrentlyPlaying />

        <Footer />
      </Suspense>
    </div>
  );
}
