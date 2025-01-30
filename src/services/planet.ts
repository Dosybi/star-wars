import api from './axiosConfig'
import type { Planet } from '@/types/planet'

export const getPlanet = async (id: number): Promise<Planet> => {
  const response = await api.get<Planet>(`/planets/${id}`)
  return response.data
}
