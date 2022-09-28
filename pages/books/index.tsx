import { IBook, IGetBooksResponse } from 'pages/books/interfaces'
import { GetStaticProps, NextPage } from 'next'
import { BookCard } from 'components/BookCard/BookCard'
import React, { useCallback, useEffect, useState } from 'react'

interface IProps {
  books: IBook[],
  next: string
}

const Books: NextPage<IProps> = ({books: serverBooks, next: serverNext}) => {
  const [books, setBooks] = useState(serverBooks)
  const [next, setNext] = useState(serverNext)
  const [fetching, setFetching] = useState(false)

  const scrollHandler = () => {
    if (document.documentElement.scrollHeight - (document.documentElement.scrollTop + window.innerHeight) < 100) {
      setFetching(true)
    }
  }

  const loadBooks = useCallback(async () => {
    const res = await fetch(next)
    const data: IGetBooksResponse = await res.json()
    setBooks([...books, ...data.results])
    setNext(data.next)
    setFetching(false)
  }, [books, next])

  useEffect(() => {
    if (fetching) {
      loadBooks().then(_ => {
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
    <ul className={'flex flex-col justify-between'}>
      {books.map(book => (
        <BookCard key={book.id} book={book}/>
      ))}
    </ul>
  )
}
export default Books

export const getStaticProps: GetStaticProps = async () => {

  const res = await fetch(`${process.env.BASE_URL}/books`)
  const data: IGetBooksResponse = await res.json()

  return {
    props: {
      books: data.results,
      next: data.next
    },
  }
}

