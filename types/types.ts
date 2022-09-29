import { NextPageContext } from 'next'

export type GetBooksResponse = {
  count: number;
  next: string | null;
  previous: null;
  results: Book[];
}

export type Book = {
  id: number;
  title: string;
  authors: Person[];
  subjects: string[];
  translators: Person[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean | null;
  media_type: string;
  formats: Format;
  download_count: number;
}

export type Person = {
  name: string;
  birth_year: number | null;
  death_year: number | null;
}

export type Format = {
  'application/x-mobipocket-ebook': string;
  'application/epub+zip': string;
  'application/rdf+xml': string;
  'text/html; charset=utf-8': string;
  'text/plain; charset=utf-8': string;
  'image/jpeg': string;
  'text/html': string;
}
export type BookNextPageContext = NextPageContext & {
  query: {
    id: string
  }
}
export type SearchParamsType = {
  text: string
  languages: string[]
}