"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TextBtn, Question, ProductBtn, Footer } from '../../../components';
import TEAM_5_PROUDCT from "@/app/constants/5/productData";
import TEAM_5_PATIENT from "@/app/constants/5/PatientData";
import BackBtn from "@/app/components/case/BackBtn";
import Correct from "@/app/components/case/Correct";
import Wrong from "@/app/components/case/Wrong";
import Patient from "@/app/components/case/Patient";
import productChooseResult1 from "@/app/constants/5/productChooseResult1";
import productChooseResult2 from "@/app/constants/5/productChooseResult2";
import productChooseResult3 from "@/app/constants/5/productChooseResult3";
import productChooseResult4 from "@/app/constants/5/productChooseResult4";
import productChooseResult5 from "@/app/constants/5/productChooseResult5";
import productChooseResult6 from "@/app/constants/5/productChooseResult6";

export default function Case1() {

  const array = new Array(46).fill(false);
  const newArray = [true, ...array];
  const [flags, setFlags] = useState(newArray);

  // Example function to update a specific flag
  const setFlag = (index: number, value: boolean) => {
    setFlags(prevFlags => {
      const newFlags = [...prevFlags];
      newFlags[index] = value;
      return newFlags;
    });
  };

  interface Script {
    question: string;
    answer: string;
  }

  const script: Script[] = [
    {
      question: "Me(pharmacist): Hi, how are you? How can I help you?",
      answer: 
        "Patient: I came to get some cold medicine."
    }
   // {
   //   question: "Me(pharmacist): Okay, who will be taking the medicine?",
   //   answer:"Patient: Me and I am 34 years old."
   // }
   
  ]

  // console.log("length: ",script.length)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFlag(0, false);
      setFlag(1, true);
    }, 2000);

    return () => {
      clearTimeout(timer1);
    };
  }, []);


  {/* 의사와 환자와의 대화 flag idx 1 */}
  const clickHandlers:any = [];
  const idx = script.length;
  for (let i = 1; i <= idx; i++) {
    clickHandlers.push(() => {
      setFlag(i, false);
      setFlag(i + 1, true);
    });
  }

  for (let i = (idx+1); i < (idx+1) + TEAM_5_PROUDCT.length; i++) {
    clickHandlers.push(() => {
      setFlag(3, false);  // 약품 선택 페이지
      setFlag(i+1, true);   // flag idx 18~21
    });
  }
  // Access handler functions by index
  const handleClick = (index: number) => {
    if (index >= 0 && index < clickHandlers.length) {
      clickHandlers[index]();
    }
  };


  const backBtnHandlers:any = [];
  for (let i = 1; i <= clickHandlers.length ; i++) {
    backBtnHandlers.push(() => {
      setFlag(i, false);
      setFlag(i-1, true);
    });
  }
  const handleBackBtn = (index: number) => {
    if (index >= 0 && index < backBtnHandlers.length) {
      backBtnHandlers[index]();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 gap-20 relative">
      <Image
        src="/home-background.png"
        alt="home-background"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        className="-z-10"
      />
      
      <Footer/>



      {flags[0] ? (
        <div className="flex items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 fixed bottom-[15%]">
          <span className="text-xl text-gray-500">(Patient walks in...)</span>
        </div>
      ) : null}



      {/* 의사와 환자와의 대화 flag idx 1*/}
      {script.map((item, index) => (
        flags[index+1] ? (
          <>
            <BackBtn handleClick = {() => handleBackBtn(index)}/>
            <Question text={item.question} />
            <TextBtn
              text={item.answer}
              handleClick={() => handleClick(index)}
            />
          </>
        ) : null
      ))}

    {flags[2] ? (
      <>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 mb-10">
            <span className="text-xl text-gray-500">
              Okay. who will be taking the medicine?
            </span>
          </div>
          <div className="flex flex-col items-center w-full gap-5 justify-between mt-14">
            {TEAM_5_PATIENT.map((text, index) => (
            <div className="shadow-lg opacity-90">
              <BackBtn handleClick = {() => handleBackBtn(1)}/>
              <TextBtn
              text={text.patient}
              handleClick={() => {
                setFlag(2, false);
                setFlag(3, true);
              }}
            
              />

              </div>
            ))}
          </div>
        </div>
      </>
      ) : null}

      {flags[3] ? (
        <Patient 
          handleClick={() => {
            setFlag(3, false);
            setFlag(4, true);  // 약품 선택 페이지
          }}
        />
      ) : null}
      

    {/*  {flags[4] ? (
          <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 mb-10">
            <span className="text-xl text-gray-500">
              Choose the best treatment options.
            </span>
          </div>
          <div className="flex flex-row items-center w-full gap-5 justify-between mt-14">
            {TEAM_5_PROUDCT.map((product, index) => (
            <div className="shadow-lg opacity-90">
   
              <ProductBtn 
                src={product.src}
                alt={product.alt}
                name={product.name}
                ingredient={product.ingredient}
                formulation={product.formulation}
                handleClick={() => handleClick(3+index)}
              />
              </div>
            ))}
     
          </div>
        </div>
      ) : null}
*/}
      {flags[5] ? (
        <Wrong 
          text={productChooseResult1[1]} 
          handleClick={() => {
            setFlag(4, true);  // 약품 선택 페이지
            setFlag(5, false);   
          }}
        />
      ) : null}
      {flags[6] ? (
        <Correct text={productChooseResult1[0]} handleClick={() => handleClick(18)}/>
      ) : null}
      {flags[7] ? (
        <Wrong 
        text={productChooseResult1[2]} 
        handleClick={() => {
          setFlag(4, true);  // 약품 선택 페이지
          setFlag(7, false);   
        }}
      />
      ) : null}
      {flags[8] ? (
        <Wrong 
        text={productChooseResult1[2]} 
        handleClick={() => {
          setFlag(4, true);  // 약품 선택 페이지
          setFlag(8, false);   
        }}
      />
      ) : null}
  
    </div>
  );
}
