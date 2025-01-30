import { type FC } from 'react'
import type { Film } from '@/types/film'
import { Skeleton } from './ui/skeleton'

interface PersonFilmsProps {
  films: Film[]
  isFetching: boolean
}

const PersonFilms: FC<PersonFilmsProps> = ({ films, isFetching }) => {
  if (isFetching) {
    return (
      <>
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
        <Skeleton className="w-full h-4 mb-2" />
      </>
    )
  }

  return films?.map((film) => (
    <div className="mb-4" key={film.title}>
      <p className="font-bold">{film.title}</p>
      <p className="mb-2">{film.opening_crawl}</p>
      <p>Director: {film.director}</p>
      <p>Producer: {film.producer}</p>
      <p>Release Date: {film.release_date}</p>
    </div>
  ))
}

export default PersonFilms
