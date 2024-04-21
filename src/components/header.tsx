"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CustomFlowbiteTheme, DarkThemeToggle, Navbar } from "flowbite-react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      // Get the current setting from local storage or default to true
      const savedMode = localStorage.getItem("darkMode");
      return savedMode ? JSON.parse(savedMode) : true;
    }
    // Default value if window is not defined
    return true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const headerTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      base: "bg-blue-100 dark:bg-blue-950 px-2 py-2.5 sm:px-4",
      inner: {
        base: "mx-auto flex flex-wrap items-end justify-between",
      },
    },
    link: {
      base: "block py-2 pl-3 pr-4 md:p-0",
      active: {
        on: "bg-sky-700 text-white dark:text-white md:bg-transparent md:text-sky-700",
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-sky-700 md:dark:hover:bg-transparent md:dark:hover:text-white",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  };

  return (
    <Navbar theme={headerTheme} fluid rounded>
      <Navbar.Brand as={Link} href="https://flowbite-react.com">
        <img
          src="../favicon.ico"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Hockey App
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle onClick={() => setDarkMode(!darkMode)} />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="#" disabled>
          About
        </Navbar.Link>
        <Navbar.Link href="/standings">Standings</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
