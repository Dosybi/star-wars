import { useQuery } from '@tanstack/react-query'
import { getFilms } from '@/services/films'
import type { Film } from '@/types/film'

export function useFilms(ids: number[], options?: { enabled: boolean }) {
  return useQuery<Film[]>({
    queryKey: ['films', ids],
    queryFn: () => getFilms(ids),
    enabled: options?.enabled && ids.length > 0,
  })
}
