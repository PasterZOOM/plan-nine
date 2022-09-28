export interface GetBooksResponse {
  count: number;
  next: string;
  previous?: any;
  results: Book[];
}

export interface Book {
  id: number;
  title: string;
  authors: Authors[];
  translators: any[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  copyright: boolean;
  media_type: string;
  formats: Formats;
  download_count: number;
}

export interface Authors {
  name: string;
  birth_year: number;
  death_year: number;
}

export interface Formats {
  'application/x-mobipocket-ebook': string;
  'application/epub+zip': string;
  'application/rdf+xml': string;
  'text/html; charset=utf-8': string;
  'text/plain; charset=utf-8': string;
  'image/jpeg': string;
  'text/html': string;
}