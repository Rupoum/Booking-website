import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

const Header = () => {
  const [items, setItems] = useState([
    {
      name: "Switzerland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/qCkd9jS/img1.jpg",
    },
    {
      name: "Finland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/jrRb11q/img2.jpg",
    },
    {
      name: "Iceland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/NSwVv8D/img3.jpg",
    },
    {
      name: "Australia",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
    },
    {
      name: "Netherland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/jTQfmTq/img5.jpg",
    },
    {
      name: "Ireland",
      des: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab, eum!",
      img: "https://i.ibb.co/RNkk6L0/img6.jpg",
    },
  ]);

  const nextSlide = () => {
    setItems((prevItems) => [...prevItems.slice(1), prevItems[0]]);
  };

  const prevSlide = () => {
    setItems((prevItems) => [
      prevItems[prevItems.length - 1],
      ...prevItems.slice(0, prevItems.length - 1),
    ]);
  };

  return (
    <div className="relative w-full h-screen  bg-gray-200 overflow-hidden">
      <div className="relative w-[1000px] h-[600px] bg-white shadow-2xl flex items-center">
        <div className="flex items-center justify-center w-full h-full overflow-hidden relative">
          {items.map((item, index) => (
            <div
              key={index}
              className={`absolute top-1/2 transform -translate-y-1/2 rounded-2xl shadow-2xl transition-transform duration-500 ease-in-out bg-center bg-cover ${
                index === 0
                  ? "w-full h-full rounded-none"
                  : index === 1
                  ? "w-[200px] h-[300px] left-1/2 -translate-x-1/2"
                  : index === 2
                  ? "w-[200px] h-[300px] left-[calc(50%+220px)]"
                  : "hidden opacity-0"
              }`}
              style={{ backgroundImage: `url(${item.img})` }}
            >
              {index === 0 && (
                <div className="absolute top-1/2 left-[100px] transform -translate-y-1/2 text-left text-white">
                  <div className="text-4xl font-bold uppercase opacity-0 animate-fadeIn">
                    {item.name}
                  </div>
                  <div className="mt-2 mb-4  opacity-0 animate-fadeIn animation-delay-300">
                    {item.des}
                  </div>
                  <button className="px-4 py-2 border-none cursor-pointer opacity-0 animate-fadeIn animation-delay-600 bg-gray-700 text-white rounded-md">
                    See More
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="absolute bottom-5 flex justify-center w-full space-x-4">
          {/* <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-md border-2 border-black transition hover:bg-gray-500 hover:text-white flex justify-center items-center"
          >
            <ChevronLeft />
          </button> */}
          <Button
            onClick={prevSlide}
            className="w-10 h-10 rounded-md border-2 border-black transition hover:bg-gray-500 hover:text-white flex justify-center items-center"
          >
            {" "}
            <ChevronLeft />
          </Button>
          {/* <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-md border-2 border-black transition hover:bg-gray-500 hover:text-white flex justify-center items-center"
          >
            <ChevronRight />
          </button> */}
          <Button
            onClick={prevSlide}
            className="w-10 h-10 rounded-md border-2 border-black transition hover:bg-gray-500 hover:text-white flex justify-center items-center"
          >
            {" "}
            <ChevronRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
