import Head from "next/head";
// import { MemoryHandler } from "../Utils/MemoryHandler";
import React, { useState } from "react";
import Button from "../Caculator/Button";
import ButtonGroup from "../Caculator/ButtonGroup";
import CalculatorWrapper from "../Caculator/CalculatorWrapper";
import DisplayScreen from "../Caculator/DisplayScreen";

interface calc {
  sign: string;
  num: any;
  res: any;
}

export default function Calculator() {
  let [calc, setCalc] = useState<calc>({
    sign: "",
    num: 0,
    res: 0,
  });


  const commaClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };
  const signClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    const value = e.currentTarget.value;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "*"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === 0 && calc.sign === "/"
            ? "Can't divide with 0"
            : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,
      });
    }
  };
  const numClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;

    if (value) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : calc.num % 1 === 0
            ? Number(calc.num + value)
            : calc.num + value,
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res  : 0,
      sign: calc.sign ? calc.sign :"",
    });
  };
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let res = calc.res ? parseFloat(calc.res) : 0;
    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  const saveToMemory = (numberToBeSaved: calc) => {
  
    fetch("api/memory", {
      method: "POST",
      body:JSON.stringify({
        numberToBeSaved:  numberToBeSaved.num 
        ? numberToBeSaved.num  
        :numberToBeSaved.res 
      }),
      headers: {
        'Content-Type': 'application/json'
   }
    })
  };

  const getFromMemory = () => {
 
    fetch("api/memory", {
      method: "GET",
    }).then((results) =>
      results.json().then((data) => {
        const numberToBeSet = data.numberFromMemory
    
        if ( numberToBeSet) {
          setCalc({
            ...calc,
            num:
              calc.num === 0 && numberToBeSet === "0"
                ? "0"
                : calc.num % 1 === 0
                ? Number(numberToBeSet)
                : numberToBeSet,
            res: !calc.sign ? 0 : calc.res,
          });
        }
    
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2   ">
      <Head>
        <title>Calculator for Tappointment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CalculatorWrapper>


        <DisplayScreen number={calc.res ? calc.res+calc.sign+(calc.num ? calc.num : "") : calc.num} />
        <ButtonGroup>
          <Button
            value="M+"
            className="w-[150px]  bg-emerald-400 transition hover:bg-emerald-500 focus:border-emerald-400 "
            onClick={() => {
              saveToMemory(calc);
            }}
          />
          <Button
            value="M-"
            className="w-[150px] bg-emerald-400 transition hover:bg-emerald-500 focus:border-emerald-400 "
            onClick={() => {
              getFromMemory()
            }}
          />
          {/* C gomb = restelünk - resetClickHandler */}
          <Button
            value="C"
            className="w-1/5 bg-yellow-400 transition hover:bg-yellow-500 focus:border-yellow-400 "
            onClick={() => {
              resetClickHandler();
            }}
          />
          {/* +- gomb = invertáljuk a számot - invertClickHandler */}
          <Button
            value="+-"
            className="w-1/5  bg-indigo-400 transition hover:bg-indigo-500 focus:border-indigo-400"
            onClick={() => {
              invertClickHandler();
            }}
          />
          {/* % gomb =Százalékot számolunk a számot - percentClickHandler */}
          <Button
            value="%"
            className="w-1/5  bg-indigo-400 transition hover:bg-indigo-500 focus:border-indigo-400"
            onClick={() => {
              percentClickHandler();
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="/"
            className="w-1/5  bg-green-400 transition hover:bg-green-500  focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* Szám gombok - numClickHandler */}
          <Button
            className="w-1/5   transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="7"
            onClick={(e) => numClickHandler(e)}
          />
          <Button
            className="w-1/5      hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="8"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5      hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="9"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="*"
            className="w-1/5   bg-green-400    hover:bg-green-500  focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* Szám gombok - numClickHandler */}
          <Button
            className="w-1/5      hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="4"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5      hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="5"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5      hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="6"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="-"
            className="w-1/5   bg-green-400    hover:bg-green-500 focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/*  Szám gombok - numClickHandler */}
          <Button
            className="w-1/5      hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="1"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5      hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="2"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5      hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="3"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="+"
            className="w-1/5  bg-green-400    hover:bg-green-500 focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* pont - commaClickHandler */}
          <Button
            value="."
            className="w-[25%]   bg-violet-400    hover:bg-violet-500 focus:border-violet-400"
            onClick={(e) => {
              commaClickHandler(e);
            }}
          />
          {/* Szám gomb - numClickHandler */}
          <Button
            className="w-[25%]     hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="0"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* egyenlő gomb - equalsClickHandler */}
          <Button
            value="="
            className="w-[35%]  bg-red-400    hover:bg-red-500 focus:border-red-400"
            onClick={() => {
              equalsClickHandler();
            }}
          />
        </ButtonGroup>
      </CalculatorWrapper>
    </div>
  );
}
