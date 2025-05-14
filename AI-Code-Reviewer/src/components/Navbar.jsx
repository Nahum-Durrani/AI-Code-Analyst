import React from 'react'
import { BrainCircuit, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    return (
        <>
            <div className={`nav flex items-center justify-between h-[90px] ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'}`} style={{ padding: "0px 150px" }}>
                <div className="logo flex items-center gap-[10px]">
                    <BrainCircuit size={30} color='#9333ea' />
                    <span className={`text-2xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-black'}`}>AI Code Analyst</span>
                </div>
                <div className="icons flex items-center gap-[20px]">
                    <button
                        onClick={toggleTheme}
                        className={`rounded-full p-2 transition-colors duration-200
                                ${isDarkMode
                                ? 'text-white hover:bg-[#9333ea]/20'  // brighter purple tint on hover
                                : 'text-zinc-800 hover:bg-zinc-200'}`}
                        title="Toggle Theme"
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                </div>
            </div>
        </>
    )
}

export default Navbar
