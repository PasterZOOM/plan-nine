import { IBook, IGetBooksResponse } from 'pages/books/interfaces'
import { NextPage } from 'next'
import { BookCard } from 'components/BookCard/BookCard'

interface IProps {
  books: IBook[]
}

const Index: NextPage<IProps> = ({books}) => {
  return (
    <ul className={"flex flex-col justify-between"}>
      {books.map(book => (
        <BookCard key={book.id} book={book}/>
      ))}
    </ul>
  )
}
export default Index

export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL}/books`)
  const data: IGetBooksResponse = await res.json()

  return {
    props: {
      books: data.results,
    },
  }
}

