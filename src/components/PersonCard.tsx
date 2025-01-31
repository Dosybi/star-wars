import { type FC } from 'react'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Avatar, AvatarFallback } from './ui/avatar'

import type { Person } from '@/types/people'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { extractId } from '@/lib/utils'
import { ROUTES } from '@/routes'

interface PersonCardProps {
  person: Person
}

const PersonCard: FC<PersonCardProps> = ({ person }) => {
  const navigate = useNavigate()
  const id = extractId(person.url)

  return (
    <Card className="hover:bg-gray-100/75 transition-colors duration-500 group border-none">
      <CardHeader className="flex flex-row items-center gap-2.5">
        <Avatar>
          <AvatarFallback>{person.name[0] || '?'}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-sm pb-1">{person.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <p>Birth Year: {person.birth_year}</p>
        <p>Gender: {person.gender}</p>
        <p>Height: {person.height}</p>
        <p>Mass: {person.mass}</p>
        <p>Hair Color: {person.hair_color}</p>
        <p>Eye Color: {person.eye_color}</p>
        <p>Skin Color: {person.skin_color}</p>
        <Button
          className="block md:hidden my-4"
          variant="outline"
          onClick={() => navigate(ROUTES.PERSON(id))}
        >
          More
        </Button>
      </CardContent>
    </Card>
  )
}

export default PersonCard
