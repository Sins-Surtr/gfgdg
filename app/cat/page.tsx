import Header from "@/component/Header";
import Footer from "@/component/Footer";
import Link from "next/link";

export default function Home() {
    return(
        <>
         <h1 className="text-5xl">cat!!</h1>
         <Link href="/" className="hover:underline">Back</Link>
        </>
    )
}
