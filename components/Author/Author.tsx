import { Person } from 'types/types'
import { FC } from 'react'

type PropsType = {
  author: Person
}

export const Author: FC<PropsType> = ({author}) => {
  return (
    <div className={'text-center'}>
      <h4 className={'text-lg'}>{author.name}</h4>
      <span className={'text-gray-400 text-base'}>{author.birth_year} - {author.death_year}</span>
    </div>
  )
}