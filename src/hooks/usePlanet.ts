import { useQuery } from '@tanstack/react-query'
import { getPlanet } from '@/services/planet'
import type { Planet } from '@/types/planet'

export function usePlanet(id: number, options?: { enabled: boolean }) {
  return useQuery<Planet>({
    queryKey: ['planet', id],
    queryFn: () => getPlanet(id),
    enabled: options?.enabled && !!id,
  })
}
