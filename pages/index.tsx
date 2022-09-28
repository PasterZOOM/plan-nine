import type { NextPage } from 'next'
import { useEffect } from 'react'
import { saveToLocalStorage } from 'src/utils/utils'

const Home: NextPage = () => {

  useEffect(() => {
    saveToLocalStorage('VERSION', process.env.NEXT_PUBLIC_VERSION)
  }, [])

  return (
    <main>
      <h1>Hello</h1>
    </main>
  )
}

export default Home
