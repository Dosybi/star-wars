import api from './axiosConfig'

import type { PeopleResponse, Person } from '@/types/people'

export const getPeople = async (
  page: number = 1,
  searchQuery: string = '',
): Promise<PeopleResponse> => {
  if (searchQuery) {
    return searchPeople(searchQuery, page)
  }
  const response = await api.get<PeopleResponse>(`/people?page=${page}`)
  return response.data
}

export const searchPeople = async (
  query: string,
  page?: number,
): Promise<PeopleResponse> => {
  const response = await api.get<PeopleResponse>(
    `/people/?search=${query}&page=${page ?? 1}`,
  )
  return response.data
}

export const getPerson = async (id: number): Promise<Person> => {
  const response = await api.get<Person>(`/people/${id}`)
  return response.data
}
