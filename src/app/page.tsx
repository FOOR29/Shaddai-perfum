import Link from "next/link"
import PerfumeList from "../components/PermunList"

const Home = () => {
  return (
    <div className="min-h-screen">
      <h1>Home</h1>
      <Link href="/login">admin</Link>
      <main>
        <PerfumeList />
      </main>
    </div>
  )
}

export default Home