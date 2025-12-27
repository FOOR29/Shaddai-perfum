import PerfumeList from "../components/PerfumList"
import GenderFilter from "../components/perfum/GenderFilter"
import Header from "../components/layouts/Header"
import { Gender } from "@prisma/client"

type HomeProps = {
  searchParams: Promise<{ gender?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams
  const genderParam = params.gender

  const validGender =
    genderParam === "MASCULINO" ||
      genderParam === "FEMENINO" ||
      genderParam === "UNISEX"
      ? (genderParam as Gender)
      : null

  return (
    <div className="min-h-screen">
      <Header />

      {/* Componente de filtrado */}
      <GenderFilter />

      {/* Lista de perfumes */}
      <main>
        <PerfumeList genderFilter={validGender} />
      </main>
    </div>
  )
}

export default Home
