import type { NextPage } from 'next'
import { useEffect } from 'react'
import { saveToLocalStorage } from 'utils/localStorageUtils'

const Home: NextPage = () => {

  useEffect(() => {
    saveToLocalStorage('VERSION', process.env.NEXT_PUBLIC_VERSION)
  }, [])

  return (
    <h1 className="text-red-800">Hello</h1>
  )
}

export default Home
