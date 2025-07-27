import React, { useState } from "react";
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

  const handleKeyDown=()=>{
    const key=exp.key;

    if(!isNaN(key) || "+-*/.".includes(key)){
      SetExp((preview)=>preview+key)
    }
  }

  return <div>WinCalculator</div>;
};

export default WinCalculator;
