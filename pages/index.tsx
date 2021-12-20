import Head from "next/head";
// import { MemoryHandler } from "../Utils/MemoryHandler";
import React, { useState } from "react";
import Calculator from "../components/Caculator/Calculator";


interface calc {
  sign: string;
  num: number | any;
  res: number | any;
}

export default function Home() {
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2   ">
      <Head>
        <title>Calculator for Tappointment</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Calculator />
     
    </div>
  );
}
