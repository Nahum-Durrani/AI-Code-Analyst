import React, { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import Editor from '@monaco-editor/react';
import Select from 'react-select';



const App = () => {
  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];

  const [selectedOption, setselectedOption] = useState(options[0]);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dark background (similar to bg-zinc-900)
      borderColor: '#3f3f46',
      color: '#fff',
      width: "100%"
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#18181b', // dropdown bg
      color: '#fff',
      width: "100%"
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',  // selected option text
      width: "100%"
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#27272a' : '#18181b',  // hover effect
      color: '#fff',
      cursor: 'pointer',
      // width: "30%"
    }),
    input: (provided) => ({
      ...provided,
      color: '#fff',
      width: "100%"
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#a1a1aa',  // placeholder text color
      width: "100%"
    }),
  };

  return(
    <>
      <Navbar />
      <div className="main flex justify-between" style={{ height: "calc(100vh - 90px" }}>
        <div className="left h-[80%] w-[50%]">
        <div className="tabs"></div>
          <Select
            value={selectedOption}
            onChange={(e) => {setSelectedOption(e) }}
            options={options}
            styles={customStyles}
          />
          <Editor height="100%" theme='vs-dark' language="javascript" valuealue="// some comment" />;
        </div>
      </div>
    </>
  )
}

export default App