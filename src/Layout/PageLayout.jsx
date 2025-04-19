import React, { useState } from "react";
import Section from "../Components/FilmCategories/FilmCategories";
import Header from "../Components/Header/Header";
import Search from "../Pages/SearchPage/SearchPage";
import { Heart, PersonRounded, Save } from "../utils/icon";

export default function PageLayout({ children }) {
  const [clickButton, setClickButton] = useState({
    home: false,
    profile: false,
    saved: false,
    liked: false,
    logOut: false,
  });
  return (
    <div className="bg-black relative ">
      <Header />

      {children}

 
    </div>
  );
}
