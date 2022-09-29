import { useDebounce } from 'hooks/useDebounce'
import React, { FC, KeyboardEvent, useEffect, useState } from 'react'
import { SearchParamsType } from 'types/types'

type PropsType = {
  search: SearchParamsType
  setSearch: (value: SearchParamsType) => void
  pressEnter: () => void
}
export const Search: FC<PropsType> = ({search, setSearch, pressEnter}) => {
  const [value, setValue] = useState<string>(search.text);
  const debouncedValue = useDebounce<string>(value);

  const submit = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') pressEnter()
  }
  useEffect(() => {
    setSearch({...search, text: debouncedValue})
    pressEnter()
  },[debouncedValue])
  return (
    <div>
      <input type="text"
             value={value}
             onChange={(e)=>setValue(e.currentTarget.value.toLowerCase())}
             onKeyDown={submit}
             className={'placeholder:italic placeholder:text-slate-400 block bg-white w-full' +
               ' border border-slate-300 rounded-md p-2 pr-3 shadow-sm focus:outline-none' +
               ' focus:border-gray-600 focus:ring-gray-500 focus:ring-1 sm:text-sm'}
             placeholder={'Search...'}/>
    </div>
  )
}