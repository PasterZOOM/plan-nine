import { IAuthor } from 'pages/books/interfaces'
import { FC } from 'react'

interface IAuthorProps {
  author: IAuthor
}

export const Author: FC<IAuthorProps> = ({author}) => {
  return (
    <div className={'text-center'}>
      <h4 className={'text-lg'}>{author.name}</h4>
      <span className={'text-gray-400 text-base'}>{author.birth_year} - {author.death_year}</span>
    </div>
  )
}