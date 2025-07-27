import React, { useEffect, useState } from "react";
import { preview } from "vite";

const WinCalculator = () => {
  const [exp, SetExp] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    try {
      const prepared = exp
        .replace(/✓/g, "Math.sqrt")
        .replace(/x²/g, "**2")
        .replace(/⅟x/g, "1/")
        .replace(/%/g, "/100");
      const evalResult = eval(prepared);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  const handleClick = (val) => {
    if (val === "C") {
      SetExp("");
      setResult("");
    } else if (val === "CE") {
      SetExp("");
    } else if (val === "⌫") {
      SetExp(exp.slice(0, -1));
    } else if (val === "=") {
      calculate();
    } else if (val === "+/-") {
      SetExp((preview) =>
        preview.charAt(0) === "-" ? preview.slice(1) : "-" + preview
      );
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const handleKeyDown = () => {
    const key = exp.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
      SetExp((preview) => preview + key);
    } else if (key === "Enter") {
      exp.preventDefault();
      calculate();
    } else if (key === "Backscape") {
      SetExp((preview) => preview.slice(0, -1));
    } else if (key === "Escape" || key === "Delete") {
      SetExp("");
      setResult("");
    } else if (key === "%") {
      SetExp((preview) => (preview = "%"));
    } else if (key === "^") {
      setExpression((prev) => prev + "**2");
    } else if (key.toLowerCase() === "r") {
      setExpression((prev) => prev + "√");
    } else if (key.toLowerCase() === "i") {
      setExpression((prev) => prev + "⅟x");
    } else if (key.toLowerCase() === "n") {
      handleClick("+/-");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });



  const buttons = [
    "%", "CE", "C", "⌫",
    "⅟x", "x²", "√", "+",
    "7", "8", "9", "-",
    "4", "5", "6", "*",
    "1", "2", "3", "/",
    "+/-", "0", ".", "=",
  ];

  return (
     <div className="w-[320px] bg-[#1e1e1e] text-white mx-auto mt-10 rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      <div className="p-3 bg-[#2b2b2b] flex items-center justify-between text-sm font-semibold">
        <div className="text-white">Standard</div>
        <div className="text-gray-400">🕘</div>
      </div>

      <div className="px-4 pt-6 pb-2 min-h-[80px] bg-[#1e1e1e]">
        <div className="text-right text-gray-400 text-sm break-all">{expression || "0"}</div>
        <div className="text-right text-3xl text-white font-bold break-all">{result}</div>
      </div>

      <div className="grid grid-cols-4 gap-2 p-3 bg-[#252526]">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(btn)}
            className={`p-4 text-lg rounded-md font-semibold transition active:scale-95
              ${
                btn === "="
                  ? "bg-blue-500 text-white col-span-1"
                  : btn === "C" || btn === "CE"
                  ? "bg-[#444] text-red-400"
                  : ["+", "-", "*", "/", "√", "x²", "⅟x", "%"].includes(btn)
                  ? "bg-[#333] text-blue-300"
                  : "bg-[#2d2d2d] text-white"
              }
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>

  )
};

export default WinCalculator;
