import Head from "next/head";
// import { MemoryHandler } from "../Utils/MemoryHandler";
import React, { useState } from "react";
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import CalculatorWrapper from "../components/CalculatorWrapper";
import DisplayScreen from "../components/DisplayScreen";
interface calc {
  sign: string;
  num: number | any;
  res: number | any;
}

export default function Home() {
  let [calc, setCalc] = useState<calc>({
    sign: "",
    num: 0,
    res: 0,
  });
  // let [calc, setCalc] = useState({
  //   sign: "",
  //   num: 0,
  //   res: 0,
  // });

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
          : sign === "X"
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
  
    if (calc.num.toString().length < 11) {
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
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
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

    fetch("/api/memory", {
      method: "POST",
      body:JSON.stringify({
        numberToBeSaved: numberToBeSaved.num,
      }),
      headers: {
        'Content-Type': 'application/json'
   }
    }).then((results) =>
      results.json().then((data) => {
        console.log("memory in"+data.numberToBeSaved);
      })
    );
  };

  const getFromMemory = () => {
    console.log(calc)
    fetch("/api/memory", {
      method: "GET",
    }).then((results) =>
      results.json().then((data) => {
        const numberToBeSet = data.numberFromMemory
       
        if (numberToBeSet.toString().length < 11) {
          setCalc({
            ...calc,
            num:
              calc.num === 0 && numberToBeSet === "0"
                ? "0"
                : calc.num % 1 === 0
                ? Number(calc.num + numberToBeSet)
                : calc.num + numberToBeSet,
            res: !calc.sign ? 0 : calc.res,
          });
        }
        console.log(calc)
      })
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Calculator for Tappointment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CalculatorWrapper>
        <DisplayScreen number={calc.num ? calc.num : calc.res} />
        <ButtonGroup>
          <Button
            value="Mem in"
            className="w-[150px] h-12 mx-2 font-semibold  text-white rounded-lg border-white border-2 bg-emerald-400 transition hover:bg-emerald-500 focus:border-emerald-400 "
            onClick={() => {
              saveToMemory(calc);
            }}
          />
          <Button
            value="Mem out"
            className="w-[150px] h-12 mx-2 font-semibold  text-white rounded-lg border-white border-2 bg-emerald-400 transition hover:bg-emerald-500 focus:border-emerald-400 "
            onClick={() => {
              getFromMemory()
            }}
          />
          {/* C gomb = restelünk - resetClickHandler */}
          <Button
            value="C"
            className="w-1/5 h-12 mx-2 font-semibold  text-white rounded-lg border-white border-2 bg-yellow-400 transition hover:bg-yellow-500 focus:border-yellow-400 "
            onClick={() => {
              resetClickHandler();
            }}
          />
          {/* +- gomb = invertáljuk a számot - invertClickHandler */}
          <Button
            value="+-"
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-indigo-400 transition hover:bg-indigo-500 focus:border-indigo-400"
            onClick={() => {
              invertClickHandler();
            }}
          />
          {/* % gomb =Százalékot számolunk a számot - percentClickHandler */}
          <Button
            value="%"
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-indigo-400 transition hover:bg-indigo-500 focus:border-indigo-400"
            onClick={() => {
              percentClickHandler();
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="/"
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-green-400 transition hover:bg-green-500  focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* Szám gombok - numClickHandler */}
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="7"
            onClick={(e) => numClickHandler(e)}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="8"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="9"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="X"
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-green-400 transition hover:bg-green-500  focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* Szám gombok - numClickHandler */}
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="4"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="5"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500  focus:bg-blue-500 focus:border-blue-500"
            value="6"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="-"
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-green-400 transition hover:bg-green-500 focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/*  Szám gombok - numClickHandler */}
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="1"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="2"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          <Button
            className="w-1/5 h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="3"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* Alap müvelet -signClickHandler */}
          <Button
            value="+"
            className="w-1/5 h-12 mx-2  font-semibold  text-white rounded-lg border-white border-2 bg-green-400 transition hover:bg-green-500 focus:border-green-400"
            onClick={(e) => {
              signClickHandler(e);
            }}
          />
          {/* pont - commaClickHandler */}
          <Button
            value="."
            className="w-[25%] h-12 mx-2 font-semibold   text-white rounded-lg border-white border-2 bg-violet-400 transition hover:bg-violet-500 focus:border-violet-400"
            onClick={(e) => {
              commaClickHandler(e);
            }}
          />
          {/* Szám gomb - numClickHandler */}
          <Button
            className="w-[25%] h-12 mx-2  font-semibold  text-white rounded-lg border-white border-2 transition hover:bg-blue-500 focus:bg-blue-500 focus:border-blue-500"
            value="0"
            onClick={(e) => {
              numClickHandler(e);
            }}
          />
          {/* egyenlő gomb - equalsClickHandler */}
          <Button
            value="="
            className="w-[35%] h-12 mx-2  font-semibold  text-white rounded-lg border-white border-2 bg-red-400 transition hover:bg-red-500 focus:border-red-400"
            onClick={() => {
              equalsClickHandler();
            }}
          />
        </ButtonGroup>
      </CalculatorWrapper>
    </div>
  );
}