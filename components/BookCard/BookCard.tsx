import Image from 'next/image'
import { FC, ReactElement } from 'react'
import { Book } from 'types/types'
import { Author } from 'components/Author/Author'

type PropsType = {
  book: Book
  children?: ReactElement
}

export const BookCard: FC<PropsType> = ({book, children}) => {
  return (
    <div className={'hover:bg-gray-100 p-4 rounded-lg border-gray-400 border-2 my-2 w-72' +
      ' flex flex-col items-center visited:opacity-50'}>
      <Image src={book.formats['image/jpeg']}
             alt={`${book.title} cover`}
             width={'100px'}
             height={'150px'}
             className={'opacity-[inherit]'}/>
      <h1 className={'text-center font-bold text-xl m-4'}>{book.title}</h1>
      {book.authors.map((author, index) => (
        <Author key={index} author={author}/>
      ))}
      {children}
    </div>
  )
}