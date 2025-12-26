import Link from "next/link"
import PerfumeList from "../components/PerfumList"
import GenderFilter from "../components/perfum/GenderFilter"
import { Gender } from "@prisma/client"

type HomeProps = {
  searchParams: Promise<{ gender?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  // Obtener el parámetro de género de la URL
  const params = await searchParams
  const genderParam = params.gender

  // Validar que sea un género válido o null
  const validGender =
    genderParam === "MASCULINO" ||
      genderParam === "FEMENINO" ||
      genderParam === "UNISEX"
      ? (genderParam as Gender)
      : null

  return (
    <div className="min-h-screen">
      <h1>Home</h1>
      <Link href="/login">admin</Link>

      {/* Componente de filtrado */}
      <GenderFilter />

      <main>
        <PerfumeList genderFilter={validGender} />
      </main>
    </div>
  )
}

export default Home
