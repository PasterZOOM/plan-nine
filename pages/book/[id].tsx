import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { NextPage } from 'next'
import { Book, BookNextPageContext } from 'types/types'
import { BookCard } from 'components/BookCard/BookCard'

type PropsType = {
  book?: Book | null
}

const Book: NextPage<PropsType> = ({book: serverBook}) => {
  const [book, setBook] = useState(serverBook)
  const router = useRouter()

  useEffect(() => {
    async function load() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/books/${router.query.id}/`)
      return await response.json()
    }

    if (!serverBook) {
      load().then(res => {
        setBook(res)
      })
    }
  }, [router.query.id, serverBook])

  if (!book) {
    return <p>Loading ...</p>
  }

  return (
    <div className={"flex justify-center"}>
      <BookCard book={book}>
        {book.subjects && (<div className={'mt-4'}>
          {book.subjects.map((subject, index) => (
          <p key={index} className={'text-center italic'}>
            {subject}
          </p>
        ))}</div>)}
      </BookCard>
    </div>
  )
}

Book.getInitialProps = async ({query, req}: BookNextPageContext) => {
  if (!req) {
    return {book: null}
  }

  const response = await fetch(`${process.env.API_URL}/books/${query.id}/`)
  const book: Book = await response.json()

  return {
    book
  }
}

export default Book