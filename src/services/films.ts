import api from './axiosConfig'

import type { Film } from '@/types/film'

export const getFilms = async (ids: number[]): Promise<Film[]> => {
  const responses = await Promise.all(
    ids.map((id) => api.get<Film>(`/films/${id}`).then((res) => res.data)),
  )
  return responses
}
