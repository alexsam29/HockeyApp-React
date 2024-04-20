'use client'
import { useEffect, useState } from "react";

export default function Header() {
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, [darkMode]);
      
    return (
        <header className="flex items-center justify-between w-full p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-semibold">Hockey App</h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/contact">Contact</a>
                    </li>
                </ul>
            </nav>
            <button onClick={() => setDarkMode(!darkMode)}>
                Toggle Dark Mode
            </button>
        </header>
    );
}