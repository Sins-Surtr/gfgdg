import Image from "next/image";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { Main } from "next/document";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-[85vh]">
        <h1 className="text-2xl">
          hello world
        </h1>

        <div className="flex justify-between">
          <Image src="./next.svg" width={200} height={200} alt="next" />


        </div>


        <p className="bg-red-400 rounded-lg p-5 mt-5 
        border-2 shadow-lg border-red-900">
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Incidunt, dolores.
        </p>
        <p className="bg-red-400 rounded-lg p-5 mt-5 
        border-2 shadow-lg border-red-900">
          Lorem ipsum dolor sit amet
          consectetur adipisicing elit.
          Incidunt, dolores.
        </p>

        <Link href="/cat" className="hover:underline ml-2">CAT</Link>
        <Link href="/dog" className="hover:underline ml-4">DOG</Link>
        <Link href="/cal" className="hover:underline ml-4">Calculator</Link>
      </main>
    </>
  );
}
