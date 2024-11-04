"use client"
import { ArrowLeft } from 'lucide-react';
interface NumpadProps {
  inputValue: string;
  onchange: (value: string) => void;
}

function Numpad({ inputValue, onchange }: NumpadProps) {
  const handleButtonClick = (value: string) => {
    onchange(inputValue + value)
  };

  const handleDelete = () => {
    onchange(inputValue.slice(0, -1))
  };

  return (
    <div className="px-10 pt-10">
        <div className="grid grid-cols-3 gap-0 ">
          {[7, 8, 9].map((num) => (
            <button
              key={num}
              className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh]"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}
          {[4, 5, 6].map((num) => (
            <button
              key={num}
              className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh]"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh]"
              onClick={() => handleButtonClick(num.toString())}
            >
              {num}
            </button>
          ))}      
        </div>
        <div className="grid grid-cols-3">
        <button key="." className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh]"
        onClick={() => handleButtonClick(".")}
        >.</button>
        <button key={0} className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh]"
        onClick={() => handleButtonClick("0")}
        >0</button>
        <button key={"delete"} className="font-bold text-lg border border-black hover:bg-gray-300 rounded-md py-[4vh] flex justify-center"
        onClick={() => handleDelete()}
        >{<ArrowLeft/>}</button>
        </div>
    </div>
  );
}

export default Numpad;
