
"use client"

import Image from "next/image"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import LogoWhite from "../public/logo-white.png"

export default function Home() {


  return (
    <main className=" max-w-full bg-white scroll-smooth">
   <div
      style={{
        backgroundImage: `url('/hero.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 'rgba(50, 50, 93, 0.25) 600px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset'
      }}
    >
      <h1 style={{ color: 'white' }} className="absolute flex justify-start align-bottom bottom-24 left-24 text-4xl font-bold w-2/6">Investeren in hoogrenderende sectoren met de DDI free community</h1>
    </div>

    
    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-stretch py-24 pl-24 gap-2">
      {/* Left Side (Text) */}

      <div className="flex flex-col gap-10 lg:w-1/2">      
      <div className="">
        <h4 className="text-gray-800 text-2xl font-bold mb-4">Wie is DDI</h4>
        <p className="text-gray-700 leading-relaxed text-md">
        DDI is opgericht door een aantal ervaren Nederlandse ondernemers die naast hun dagelijkse activiteiten op zoek zijn naar hoogrenderende investeringen in onder meer de sectoren vastgoed, leisure, grondstoffen en lending. Na een gedegen onderzoek naar de aangeboden proposities investeert DDI voor eigen rekening en risico in deze kansen. Rendementen (APY) van ca. 20% per jaar zijn daarbij geen uitzonderingen. De investeringen vinden uitsluitend plaats via de blockchain incombinatie met een MetaMask wallet.
        </p>
      </div>
      <div className="">
        <h4 className="text-gray-800 text-2xl font-bold mb-4">Wat wil DDI?</h4>
        <p className="text-gray-700 leading-relaxed text-md">
        "wie niet kan delen, kan ook niet vermenigvuldigen" DDI wil de op gedane kennis en ervaringen graag inzetten voor de leden van de DDI-community. Meer weten over DDI en de mogelijkheden? Zoek contact met ons.
        </p>
      </div></div>


      {/* Divider */}
      <div className=" lg:block w-1 h-full bg-gray-500 mx-8"></div>

      {/* Right Side (Image) */}
      <div className="lg:w-1/2 lg:pl-8 justify-start align-middle items-center">
      <Image
          src="/text-section.png" // replace with your image source
          alt="Your Image"
          width={350} // set your desired width
          height={700} // set your desired height
          objectFit="cover" // adjust based on your image aspect ratio
          className="rounded-lg" // optional: apply rounded corners
        />
         
      </div>
    </div>

    <div className="flex py-10">
      <div className="lg:w-1/2"></div>
      <div className="lg:w-1/2 px-10">
        <Accordion type="single" collapsible className="w-full text-gray-800">
          <AccordionItem value="item-1">
            <AccordionTrigger>Wat is een Metamask?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Wat is Bloacchain?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is een cryptocurrency?</AccordionTrigger>
            <AccordionContent>
              Yes. It's animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        </div>
    </div>

    <div className="container mx-auto flex flex-col lg:flex-row items-center lg:items-stretch py-24 pl-24 gap-2 bg-black">
      {/* Left Side (Text) */}

      <div className="lg:w-1/2 lg:pl-8 justify-start align-middle items-center">
      <Image
          src="/disclaimer.png" // replace with your image source
          alt="Your Image"
          width={350} // set your desired width
          height={700} // set your desired height
          objectFit="cover" // adjust based on your image aspect ratio
          className="rounded-lg" // optional: apply rounded corners
        />
         
      </div>

      {/* Divider */}
      <div className=" lg:block w-1 h-full bg-gray-500 mx-8"></div>

      {/* Right Side (Image) */}
      <div className="flex flex-col gap-10 lg:w-1/2">      
          <div className="">
            <h4 className=" text-2xl font-bold mb-4">Disclaimer</h4>
            <p className=" leading-relaxed text-md italic items-center align-middle justify-center">
            DDI is opgericht door een aantal ervaren Nederlandse ondernemers
            </p>
          </div>

          </div>
     
    </div>

    <div className="flex py-10 bg-black ">
      <div className="lg:w-1/2 ">
        <h2 className=" align-middle items-center text-center pl-24">KOMIN CONTACT</h2>
      </div>
      <div className="lg:w-1/2 ">
     
     <h2 className=" text-4xl pb-10">KOMIN CONTACT</h2>
     <Button className="bg-white uppercase rounded-full">KOMIN Contact</Button>
        </div>
    </div>

    <div className="flex w-full justify-center bg-black px-24">
      <div className=" w-full   h-[2px] rounded-full bg-white"></div>
    </div>



   <div className="flex bg-black justify-between">
    <div className="lg:w-1/2 px-24 py-10">
    <Image src={LogoWhite} alt="Your Image Alt Text" width={140} height={140} />
    </div>
    <div></div>
   </div>
   
    </main>
  )
}
