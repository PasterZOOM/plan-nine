import { SearchParamsType } from 'types/types'

export const getQuery = (params: SearchParamsType) => {
  if (!params.text && params.languages.length === 0) return ''
  const languages = params.languages.join()
  return `?${params.text && `search=${params.text}${languages && `&`}`}${languages && `languages=${languages}`}`
}