"use client"

import Numpad from "./numpad"
import { useState } from "react"

function Dashboard() {
    const [inputValues, setInputValues] = useState<{[key:string]:string}>({
        input1: "",
        input2: "",
    })

    const [activeInput, setActiveInput] = useState<string|null>(null)

    const handleInputFocus = (input:string) => {
        setActiveInput(input)
    }

    const handleInputChange = (newValue:string) => {
        if(activeInput){
            setInputValues({
                ...inputValues,
                [activeInput]: newValue
            })
        }
    }
  return (
    <div className="flex h-[90vh]">
      <div className="w-[65%] border border-black">
        <p>Hola</p>
        <input type="text" value={inputValues.input1} readOnly className="border border-black focus:bg-acento" onFocus={()=> handleInputFocus("input1")}
        />
        <input type="text" value={inputValues.input2} readOnly className="border border-black focus:bg-acento" onFocus={()=> handleInputFocus("input2")}
        />
      </div>
      <div className="w-[35%] flex flex-col">
        <div className="border border-black h-1/3">
        <p>Hola pa</p>
        </div>
        <div className="border border-black flex-grow">
        <Numpad inputValue={activeInput ? inputValues[activeInput]:''} onchange={handleInputChange}/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
