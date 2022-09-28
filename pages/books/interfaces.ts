export interface IGetBooksResponse {
  count: number;
  next: string;
  previous: null;
  results: IBook[];
}

export interface IBook {
  id: number;
  title: string;
  authors: IAuthor[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: IFormats;
  download_count: number;
}

export interface IAuthor {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface IFormats {
  'application/x-mobipocket-ebook': string;
  'application/epub+zip': string;
  'application/rdf+xml': string;
  'text/html; charset=utf-8': string;
  'text/plain; charset=utf-8': string;
  'image/jpeg': string;
  'text/html': string;
}