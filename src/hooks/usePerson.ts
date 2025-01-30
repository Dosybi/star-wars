import { useQuery } from '@tanstack/react-query'
import { getPerson } from '@/services/people'
import type { Person } from '@/types/people'

export function usePerson(id: number) {
  return useQuery<Person>({
    queryKey: ['person', id],
    queryFn: () => getPerson(id),
    enabled: !!id,
  })
}
