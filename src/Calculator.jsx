import React, { useState, useEffect } from "react";

const WindowsStyleCalculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");

  const calculate = () => {
    try {
      const evalResult = eval(expression);
      setResult(evalResult);
    } catch {
      setResult("Error");
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setExpression("");
      setResult("");
    } else if (value === "CE") {
      setExpression("");
    } else if (value === "⌫") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (value === "=") {
      calculate();
    } else if (value === "+/-") {
      setExpression((prev) => {
        const match = prev.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const num = match[0];
          const toggled = num.startsWith("-") ? num.slice(1) : "-" + num;
          return prev.slice(0, -num.length) + toggled;
        }
        return prev;
      });
    } else if (value === "⅟x") {
      setExpression((prev) => {
        const match = prev.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const num = match[0];
          return prev.slice(0, -num.length) + `(1/${num})`;
        }
        return prev;
      });
    } else if (value === "x²") {
      setExpression((prev) => {
        const match = prev.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const num = match[0];
          return prev.slice(0, -num.length) + `(${num}**2)`;
        }
        return prev;
      });
    } else if (value === "√") {
      setExpression((prev) => {
        const match = prev.match(/(-?\d+\.?\d*)$/);
        if (match) {
          const num = match[0];
          return prev.slice(0, -num.length) + `Math.sqrt(${num})`;
        }
        return prev;
      });
    } else if (value === "%") {
      setExpression((prev) => prev + "/100");
    } else {
      setExpression((prev) => prev + value);
    }
  };

  const handleKeyDown = (e) => {
    const key = e.key;

    if (!isNaN(key) || "+-*/.".includes(key)) {
      setExpression((prev) => prev + key);
    } else if (key === "Enter") {
      e.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      setExpression((prev) => prev.slice(0, -1));
    } else if (key === "Escape" || key === "Delete") {
      setExpression("");
      setResult("");
    } else if (key === "%") {
      handleClick("%");
    } else if (key.toLowerCase() === "r") {
      handleClick("√");
    } else if (key.toLowerCase() === "i") {
      handleClick("⅟x");
    } else if (key.toLowerCase() === "n") {
      handleClick("+/-");
    } else if (key === "^") {
      handleClick("x²");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const buttons = [
    "%", "CE", "C", "⌫",
    "⅟x", "x²", "√", "+",
    "7", "8", "9", "-",
    "4", "5", "6", "*",
    "1", "2", "3", "/",
    "+/-", "0", ".", "=",
  ];

  return (
    <div className=" w-[320px] bg-[#1a1f32] text-white mx-auto relative top-[8rem] rounded-xl overflow-hidden shadow-2xl border border-gray-700">
      <div className="p-3 bg-[#1a1f32] flex items-center justify-between text-sm font-semibold ">
        <div className="text-white ">Windows 11 Calculator</div>
      </div>

      <div className="px-4 pt-6 pb-2 min-h-[80px] bg-[#1a1f32]">
        <div className="text-right text-gray-400 text-3xl break-all ">{expression || "0"}</div>
        <div className="text-right text-3xl text-white font-bold break-all">{result}</div>
      </div>

      <div className="grid grid-cols-4 gap-1 p-3 bg-[#1a1f32]">
        {buttons.map((btn, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(btn)}
            className={`p-4 text-lg rounded-md font-semibold transition active:scale-95
              ${
                btn === "="
                  ? "bg-[#4cc2ff] text-white col-span-1"
                  : btn === "C" || btn === "CE"
                  ? "bg-[#2c3147] text-red-400"
                  : ["+", "-", "*", "/", "√", "x²", "⅟x", "%"].includes(btn)
                  ? "bg-[#2d3245] text-blue-300"
                  : "bg-[#353a50] text-white"
              }
            `}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WindowsStyleCalculator;
