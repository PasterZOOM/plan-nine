import React, { FC, KeyboardEvent } from 'react'

type PropsType = {
  value: string
  setValue: (value: string) => void
  pressEnter: () => void
}
export const Search: FC<PropsType> = ({value, setValue, pressEnter}) => {
  const submit = (e:KeyboardEvent<HTMLInputElement>) =>{
    if (e.key === 'Enter') pressEnter()
  }
  return (
    <><input type="text"
             value={value}
             onChange={(e) => {
               setValue(e.currentTarget.value)
             }}
             onKeyDown={submit}
             className={"placeholder:italic placeholder:text-slate-400 block bg-white w-full" +
               " border border-slate-300 rounded-md p-2 pr-3 shadow-sm focus:outline-none" +
               " focus:border-gray-600 focus:ring-gray-500 focus:ring-1 sm:text-sm"}
             placeholder={'Search...'}/></>
  )
}