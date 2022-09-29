import { ChangeEvent, memo, useEffect, useState } from 'react'
import { SearchParamsType } from 'types/types'

type PropsType = {
  name: string
  char: string
  value: SearchParamsType
  setValue: (value: SearchParamsType) => void
  changeValue: () => void
}

export const Language = memo<PropsType>(function Language({
                                                            char,
                                                            name,
                                                            value,
                                                            setValue,
                                                            changeValue
                                                          }) {
  const [checked, setChecked] = useState(false)
  const [first, setFirst] = useState(true)
  const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setChecked(e.currentTarget.checked)
    if (!checked) {
      setValue({...value, languages: [...value.languages, char]})
    } else {
      setValue({...value, languages: value.languages.filter(l => l !== char)})
    }
  }
  useEffect(() => {
    if (!first)
      changeValue()
    setFirst(false)
  }, [checked])

  return (
    <>
      <span>{name.toLocaleUpperCase()}</span>
      <input type={'checkbox'} checked={checked} onChange={checkBoxHandler}/>
    </>
  )
})