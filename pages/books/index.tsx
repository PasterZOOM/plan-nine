import { Book, GetBooksResponse } from 'pages/books/interfaces'

interface PropsType {
  books: Book[]
}

const Books = ({books}: PropsType) => {
  return (
    <ul>
      {books.map((book: any) => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  )
}
export default Books

export async function getStaticProps() {

  const res = await fetch(`${process.env.BASE_URL}/books`)
  const data: GetBooksResponse = await res.json()

  return {
    props: {
      books: data.results,
    },
  }
}

