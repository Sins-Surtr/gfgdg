import DeleteButton from "@/component/DeleteButton";
import STYLE from "@/constants/style";
import prisma from "@/utils/db";
import { revalidatePath } from "next/cache";


export default async function GuitarDB() {
  const guitars = await prisma.giutar.findMany();

  async function addGuitar(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;
    const priece = parseFloat(formData.get("price") as string);

    if (!name || !brand || isNaN(priece)) {
      console.error("Invalid input");
      return;
    }

    await prisma.giutar.create({
      data: { name, brand, priece },
    });
    revalidatePath("/guitars");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Guitar Collection</h1>
      <ul>
        {guitars.map((guitar) => (
          <li key={guitar.id} className="border p-4 rounded-lg mb-2 flex justify-between">
            <span>
              {guitar.name} ({guitar.brand}) - ${guitar.priece.toFixed(2)}
            </span>
            <DeleteButton id={guitar.id} />
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Add Guitar</h2>
        <form action={addGuitar} className="space-y-3">
          <input className={STYLE} type="text" name="name" placeholder="Name" required />
          <input className={STYLE} type="text" name="brand" placeholder="Brand" required />
          <input className={STYLE} type="number" name="price" placeholder="Price" required step="0.01" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
