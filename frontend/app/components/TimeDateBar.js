"use client";
import { useState, useEffect } from "react";

export default function TimeDateBar() {
  const useDate = () => {
    const locale = "en";
    const [today, setDate] = useState(new Date());

    useEffect(() => {
      const timer = setInterval(() => {
        setDate(new Date());
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }, []);

    const date = today.toISOString().split("T")[0];
    const time = today.toLocaleTimeString();

    return {
      date,
      time,
    };
  };

  return (
    <div className="flex items-center text-white rounded-lg w-full bg-white bg-opacity-20 px-4 py-2 mb-6">
      <div className="mr-4 w-1/4">Date: {useDate().date}</div>
      <div className="mr-4 w-1/4">Time: {useDate().time}</div>
      <div className="mr-4 w-1/4">Temperature: 26&deg;C</div>
      <div className="w-1/4">Humidity: 27 g</div>
    </div>
  );
}
