import Image from 'next/image'
import { FC } from 'react'
import { IBook } from 'pages/books/interfaces'
import { Author } from 'components/Author/Author'

interface IBookCardProps {
  book: IBook
}

export const BookCard: FC<IBookCardProps> = ({book}) => {
  return (
    <li className={'p-2 rounded-lg border-gray-600 border-2 mx-auto my-2 h-1/4 w-80 flex flex-col' +
      ' items-center'}>
      <Image src={book.formats['image/jpeg']}
             alt={`${book.title} cover`}
             width={'100px'}
             height={'150px'}
             className={''}/>
      <h1 className={'text-center font-bold text-xl'}>{book.title}</h1>
      {book.authors.map((author, index) => (
        <Author key={index} author={author}/>
      ))}

    </li>

  )
}