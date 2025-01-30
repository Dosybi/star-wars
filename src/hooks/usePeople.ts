import { useQuery } from '@tanstack/react-query'
import { getPeople } from '@/services/people'
import type { PeopleResponse } from '@/types/people'
import { extractId, getStorageKey } from '@/lib/utils'

const STALE_TIME_IN_MINUTES = 2

export function usePeople(page = 1, search = '') {
  return useQuery<PeopleResponse>({
    queryKey: ['people', page, search],
    queryFn: async () => {
      const data = await getPeople(page, search)

      const updatedResults = data.results.map((person) => {
        const personId = extractId(person.url)
        const savedPerson = localStorage.getItem(getStorageKey(personId))
        return savedPerson ? JSON.parse(savedPerson) : person
      })

      return { ...data, results: updatedResults }
    },
    staleTime: STALE_TIME_IN_MINUTES * 60 * 1000,
  })
}
