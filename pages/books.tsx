import { Book, GetBooksResponse } from 'types/types'
import { GetStaticProps, NextPage } from 'next'
import { BookCard } from 'components/BookCard/BookCard'
import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'

type PropsType = {
  books: Book[],
  next: string | null
}

const Books: NextPage<PropsType> = ({books: serverBooks, next: serverNext}) => {
  const [books, setBooks] = useState(serverBooks)
  const [next, setNext] = useState<string | null>(serverNext)
  const [fetching, setFetching] = useState(false)

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

  useEffect(() => {
    if (fetching) {
      loadBooks().then(() => {
        setFetching(false)
      })
    }
  }, [fetching, loadBooks, next])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler)
    return () => {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className={"flex justify-center"}>
      <ul className={'flex flex-wrap justify-around max-w-screen-xl gap-5'}>
        {books.map(book => (
          <li key={book.id}>
            <Link href={`/book/${encodeURIComponent(book.id)}`}>
              <a><BookCard book={book}/></a>
            </Link>
          </li>
        ))}
      </ul>
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