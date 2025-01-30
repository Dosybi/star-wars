import { type FC } from 'react'
import type { Planet } from '@/types/planet'
import TextSkeleton from './TextSkeleton'

interface PersonPlanetProps {
  planet: Planet
  isFetching: boolean
}

const PersonPlanet: FC<PersonPlanetProps> = ({ planet, isFetching }) => {
  const {
    name,
    rotation_period,
    orbital_period,
    diameter,
    climate,
    gravity,
    terrain,
    surface_water,
    population,
  } = planet

  if (isFetching) return <TextSkeleton />

  return (
    <>
      <p className="font-bold">{name}</p>
      <p className="mb-2">Rotation period: {rotation_period}</p>
      <p className="mb-2">Orbital period: {orbital_period}</p>
      <p className="mb-2">Diameter: {diameter}</p>
      <p className="mb-2">Climate: {climate}</p>
      <p className="mb-2">Gravity: {gravity}</p>
      <p className="mb-2">Terrain: {terrain}</p>
      <p className="mb-2">Surface water: {surface_water}</p>
      <p className="mb-2">Population: {population}</p>
    </>
  )
}

export default PersonPlanet
