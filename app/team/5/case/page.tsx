"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TextBtn, Question, ProductBtn, Footer } from '../../../components';
import TEAM_5_PROUDCT from "@/app/constants/5/productData";
import TEAM_5_PATIENT from "@/app/constants/5/PatientData";
import BackBtn from "@/app/components/case/BackBtn";
import Correct from "@/app/components/case/Correct";
import Wrong from "@/app/components/case/Wrong";
import productChooseResult1 from "@/app/constants/5/productChooseResult1";
import productChooseResult2 from "@/app/constants/5/productChooseResult2";
import productChooseResult3 from "@/app/constants/5/productChooseResult3";
import productChooseResult4 from "@/app/constants/5/productChooseResult4";
import productChooseResult5 from "@/app/constants/5/productChooseResult5";
import productChooseResult6 from "@/app/constants/5/productChooseResult6";

export default function Case1() {
  const [flags, setFlags] = useState(new Array(46).fill(false).fill(true, 0, 1));
  const [selectedPatientIndex, setSelectedPatientIndex] = useState(0);
  const [correctProductIndex, setCorrectProductIndex] = useState(-1);

  const script = [
    {
      question: "Me(pharmacist): Hi, how are you? How can I help you?",
      answer: "Patient: I came to get some cold medicine.",
    },
  ];

  const correctResults = [
    productChooseResult1[0],
    productChooseResult2[2],
    productChooseResult3[1],
    productChooseResult4[4],
    productChooseResult5[5],
    productChooseResult6[3],
  ];

  const wrongResults = [
    productChooseResult1[2],
    productChooseResult2[0],
    productChooseResult3[3],
    productChooseResult4[1],
    productChooseResult5[2],
    productChooseResult6[4],
  ];

  const patientCorrectIndexes = [0, 2, 1, 4, 5, 3];

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlags(prevFlags => prevFlags.map((flag, idx) => (idx === 1 ? true : flag)));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const updateFlags = (hideIndex: number, showIndex: number) => {
    setFlags(prevFlags => prevFlags.map((flag, idx) => (idx === hideIndex ? false : idx === showIndex ? true : flag)));
  };

  const handlePatientSelection = (index: number) => {
    setSelectedPatientIndex(index);
    setCorrectProductIndex(patientCorrectIndexes[index]);
    updateFlags(2, index + 3);
  };

  const handleProductSelection = (index: number) => {
    const baseIndex = selectedPatientIndex + 3;
    const correctFlagIndex = selectedPatientIndex + 9;
    const wrongFlagIndex = selectedPatientIndex + 15;

    if (index === correctProductIndex) {
      updateFlags(baseIndex, correctFlagIndex);
    } else {
      updateFlags(baseIndex, wrongFlagIndex);
    }
  };

  const renderProductSelection = (flagIndex: number) => {
    return (
      flags[flagIndex] && (
        <div className="flex flex-col items-center justify-center">
          <BackBtn handleClick={() => updateFlags(flagIndex, 2)} />
          <div className="flex flex-col items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 mb-10">
            <span className="text-xl text-gray-500">Choose the best treatment option.</span>
          </div>
          <div className="flex flex-row items-center justify-center w-full gap-5 justify-between mt-14">
            {TEAM_5_PROUDCT.map((product, index) => (
              <div key={index} className="shadow-lg opacity-90">
                <ProductBtn
                  src={product.src}
                  alt={product.alt}
                  name={product.name}
                  ingredient={product.ingredient}
                  formulation={product.formulation}
                  handleClick={() => handleProductSelection(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )
    );
  };

  const renderResultPage = (flagIndex: number, resultText: string, nextFlagIndex: number) => {
    return flags[flagIndex] && (
      <Correct
        text={resultText}
        handleClick={() => updateFlags(flagIndex, nextFlagIndex)}
      />
    );
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
      <Footer />

      {flags[0] && (
        <div className="flex items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 fixed bottom-[15%]">
          <span className="text-xl text-gray-500">(Patient walks in...)</span>
        </div>
      )}

      {flags[1] && (
        <>
          <BackBtn handleClick={() => updateFlags(1, 0)} />
          <Question text={script[0].question} />
          <div className="flex flex-col justify-center w-[75%] gap-5 justify-between mt-12">
            <TextBtn text={script[0].answer} handleClick={() => updateFlags(1, 2)} />
          </div>
        </>
      )}

      {flags[2] && (
        <div className="flex flex-col items-center justify-center">
          <BackBtn handleClick={() => updateFlags(2, 1)} />
          <div className="flex flex-col items-center justify-center rounded-md w-3/5 h-14 bg-white opacity-90 mb-2">
            <span className="text-xl text-gray-500">Okay. Who will be taking the medicine?</span>
          </div>
          <div className="flex flex-col justify-center w-full gap-5 justify-between mt-2">
            {TEAM_5_PATIENT.map((text, index) => (
              <div key={index} className="shadow-lg opacity-90">
                <TextBtn
                  text={text.patient}
                  handleClick={() => handlePatientSelection(index)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {[3, 4, 5, 6, 7, 8].map(flagIndex => renderProductSelection(flagIndex))}

      {correctResults.map((resultText, idx) =>
        renderResultPage(idx + 9, resultText, 0)
      )}

      {wrongResults.map((resultText, idx) =>
        flags[idx + 15] && (
          <Wrong
            key={idx}
            text={resultText}
            handleClick={() => updateFlags(idx + 15, 0)}
          />
        )
      )}
    </div>
  );
}
