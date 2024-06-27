"use client"

import React, { useState, useRef, useCallback } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/navbar";
import Webcam from 'react-webcam';
import GoogleMapDisplay from '@/components/ui/googleMapDisplay';

export default function Games() {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCapture = (imageSrc: string | null) => {
    setCapturedImage(imageSrc);
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot() || null;
    handleCapture(imageSrc);
  }, [webcamRef, handleCapture]);

  const videoConstraints = {
    facingMode: "environment"
  };

  const containerStyle = {
    width: "130px",
    height: "95px",
    borderRadius: "10px",
  };

  return (
    <>
      <main className="relative flex flex-col h-screen items-center justify-center space-y-5 pt-8">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center space-y-5 pt-8">
          <div className="flex flex-row items-center justify-between w-[325px]">
            <div className="w-1/4" />
            <Image src="/images/games.png" alt="Games" width={120} height={50} className="-mt-[800px]"/>
            <div className="w-1/4" />
          </div>

          <div className="flex flex-row items-center justify-center space-x-4">
            <GoogleMapDisplay onLocationSelect={() => {}} containerStyle={containerStyle}/>
            <div className="font-montserrat text-sm flex flex-col justify-center w-[214px] h-[82px] bg-[#E4CEBD] opacity-75 px-2 py-4">Jl. Musyawarah No.50, RW.2, Kb. Jeruk, Kec. Kb. Jeruk, Kota Jakarta Barat</div>
          </div>


          <div className="w-[390px] text-black flex flex-row items-center justify-between bg-background px-4 pt-8 pb-[100px] shadow-custom-inset rounded-t-2xl fixed bottom-0 z-20">
            <div className="w-[135px] flex flex-col items-center bg-cckGreen px-2 py-6 space-y-2 rounded-xl">
              <h1 className="font-montserrat font-bold text-sm text-center">Nama Pemilik</h1>
              <h2 className="font-dmSans rounded-xl w-[124px] border border-cckDarkGreen bg-background px-2 py-3">John Doe</h2>
            </div>

            <Button
              className="flex flex-col items-center justify-center w-[60px] h-[60px] border border-cckDarkGreen bg-cckGreen rounded-xl mt-32 p-[0px]"
              onClick={capture}
            >
              <Image src="/images/whiteCircle.svg" alt="Take a Photo" height={45} width={45} />
            </Button>
            
            <div className="w-[135px] flex flex-col items-center bg-cckGreen px-2 py-6 space-y-2 rounded-xl">
              <h1 className="font-montserrat font-bold text-sm text-center">Nomor Telepon</h1>
              <h2 className="font-dmSans rounded-xl w-[124px] border border-cckDarkGreen bg-background px-2 py-3">08123456789</h2>
            </div>
          </div>
        </div>
      </main>
      <Navbar/>
    </>
  );
}
