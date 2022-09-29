import { Book, GetBooksResponse, SearchParamsType } from 'types/types'
import { GetStaticProps, NextPage } from 'next'
import { BookCard } from 'components/BookCard/BookCard'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Search } from 'components/Search/Search'
import { Language } from 'components/Language/Language'
import { getQuery } from 'utils/getQuery'
import { saveToLocalStorage } from 'utils/localStorageUtils'

type PropsType = {
  books: Book[],
  next: string | null
}

const Books: NextPage<PropsType> = ({books: serverBooks, next: serverNext}) => {
  const [books, setBooks] = useState(serverBooks)
  const [next, setNext] = useState<string | null>(serverNext)
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState<SearchParamsType>({text: '', languages: []})

  const scrollHandler = () => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }
  const loadBooks = useCallback(async () => {
    if (next) {
      const res = await fetch(next)
      const data: GetBooksResponse = await res.json()
      setBooks([...books, ...data.results])
      setNext(data.next)
    }
  }, [books, next])
  const loadSearch = useCallback(async () => {
    const query = getQuery(search)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/books/${query}`)
    const data: GetBooksResponse = await res.json()
    setBooks(data.results)
    setNext(data.next)
  }, [search])

  useEffect(() => {
    if (fetching) {
      loadBooks().then(() => {
        setFetching(false)
      })
    }
  }, [fetching, loadBooks, next])
  useEffect(() => {
    saveToLocalStorage('VERSION', process.env.NEXT_PUBLIC_VERSION)
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className={'flex flex-col justify-center items-center'}>
      <div className={'m-4'}>
        <Search search={search}
                setSearch={setSearch}
                pressEnter={loadSearch}/>
        <div className={'flex justify-between'}>
          <Language value={search}
                    setValue={setSearch}
                    char={'en'}
                    name={'English'}
                    changeValue={loadSearch}/>
          <Language value={search}
                    setValue={setSearch}
                    char={'fr'}
                    name={'France'}
                    changeValue={loadSearch}/>
        </div>
      </div>
      <ul className={'flex flex-wrap justify-around max-w-screen-xl gap-5'}>
        {books.map(book => (
          <li key={book.id}>
            <Link href={`/book/${encodeURIComponent(book.id)}`} >
              <a className={'visited:text-gray-300 visited:opacity-50'}><BookCard book={book}/></a>
            </Link>
          </li>
        ))}
      </ul>
      {books.length === 0 && <span className={"p-40 text-4xl"}>book list is empty</span>}
    </div>

  )
}

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch(`${process.env.BASE_URL}/books`)
  const data: GetBooksResponse = await res.json()

  return {
    props: {
      books: data.results,
      next: data.next
    },
  }
}

export default Books