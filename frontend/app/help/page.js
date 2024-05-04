"use client";

import { useState } from "react";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import NavBar from "../components/NavBar";

const Help = () => {
  const [visible, setVisible] = useState(false);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="bg-black flex items-center p-6 h-screen w-screen">
        <NavBar setVisible={setVisible} visible={visible} />
        <div className="flex items-center rounded-lg h-full w-full"></div>
      </div>
    </ThemeProvider>
  );
};

export default Help;
