import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown'
import RingLoader from "react-spinners/RingLoader";

const App = () => {
  const options = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
    { value: 'php', label: 'PHP' },
    { value: 'ruby', label: 'Ruby' },
    { value: 'go', label: 'Go' },
    { value: 'swift', label: 'Swift' },
    { value: 'kotlin', label: 'Kotlin' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'rust', label: 'Rust' },
    { value: 'dart', label: 'Dart' },
    { value: 'scala', label: 'Scala' },
    { value: 'perl', label: 'Perl' },
    { value: 'haskell', label: 'Haskell' },
    { value: 'elixir', label: 'Elixir' },
    { value: 'r', label: 'R' },
    { value: 'matlab', label: 'MATLAB' },
    { value: 'bash', label: 'Bash' }
  ];

  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  const ai = new GoogleGenAI({ apiKey: "AIzaSyA61qMvJPOvufQjEvB4NRoTjHO3xPJco50" });

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#18181b' : '#f3f4f6',
      borderColor: isDarkMode ? '#3f3f46' : '#d1d5db',
      color: isDarkMode ? '#fff' : '#000',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: isDarkMode ? '#18181b' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      zIndex: 100,
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: isDarkMode ? '#fff' : '#000',
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? (isDarkMode ? '#27272a' : '#e5e7eb')
        : (isDarkMode ? '#18181b' : '#fff'),
      color: isDarkMode ? '#fff' : '#000',
      cursor: 'pointer'
    }),
    input: (provided) => ({
      ...provided,
      color: isDarkMode ? '#fff' : '#000',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: isDarkMode ? '#a1a1aa' : '#6b7280',
      width: "100%"
    }),
  };

  async function reviewCode() {
    setResponse("");
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `You are an expert-level software developer, skilled in writing efficient, clean, and advanced code.
I’m sharing a piece of code written in ${selectedOption.value}.
Your job is to deeply review this code and provide the following:

1️⃣ A quality rating: Better, Good, Normal, or Bad.
2️⃣ Detailed suggestions for improvement, including best practices and advanced alternatives.
3️⃣ A clear explanation of what the code does, step by step.
4️⃣ A list of any potential bugs or logical errors, if found.
5️⃣ Identification of syntax errors or runtime errors, if present.
6️⃣ Solutions and recommendations on how to fix each identified issue.

Analyze it like a senior developer reviewing a pull request.

Code: ${code}
`,
    });
    setResponse(response.text);
    setLoading(false);
  }

  return (
    <>
      <Navbar isDarkMode={isDarkMode} toggleTheme={() => setIsDarkMode(!isDarkMode)} />
      <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
        <div className="flex justify-between" style={{ height: "calc(100vh - 90px)" }}>
          <div className="left h-[87.5%] w-[50%]">
            <div className="tabs mt-5 px-5 mb-3 w-full flex items-center gap-[10px]">
              <Select
                value={selectedOption}
                onChange={(e) => { setSelectedOption(e) }}
                options={options}
                styles={customStyles}
                menuPortalTarget={document.body}
              />
              <button className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800">Fix Code</button>
              <button
                onClick={() => {
                  if (code === "") {
                    alert("Please enter code first");
                  } else {
                    reviewCode();
                  }
                }}
                className="btnNormal bg-zinc-900 min-w-[120px] transition-all hover:bg-zinc-800"
              >
                Review
              </button>
            </div>

            <Editor
              height="100%"
              theme={isDarkMode ? 'vs-dark' : 'light'}
              language={selectedOption.value}
              value={code}
              onChange={(e) => { setCode(e) }}
            />
          </div>

          <div className={`right overflow-scroll p-[10px] ${isDarkMode ? 'bg-zinc-900' : 'bg-gray-100'} w-[50%] h-[101%]`}>
            <div className="topTab border-b border-t border-zinc-700 flex items-center h-[60px]">
              <p className='font-bold text-[17px]'>Response</p>
            </div>
            {loading && <RingLoader color='#9333ea' />}
            <Markdown>{response}</Markdown>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
