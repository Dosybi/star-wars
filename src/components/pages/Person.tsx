import { type FC, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { usePerson } from '@/hooks/usePerson'
import { useFilms } from '@/hooks/useFilms'
import type { Person } from '@/types/people'
import type { UseQueryResult } from '@tanstack/react-query'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { Skeleton } from '../ui/skeleton'
import type { Film } from '@/types/film'
import { extractId } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { usePlanet } from '@/hooks/usePlanet'
import { Button } from '../ui/button'
import MainLayout from '../MainLayout'
import ErrorMessage from '../ErrorMessage'
import PersonInfo from '../PersonInfo'
import PersonFilms from '../PersonFilms'
import PersonPlanet from '../PersonPlanet'
import type { Planet } from '@/types/planet'

const tabs = ['info', 'films', 'homeworld']

const Person: FC = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState(tabs[0])
  const { data, isFetching, isError, error }: UseQueryResult<Person, Error> =
    usePerson(Number(id))
  const {
    data: films,
    isFetching: isFetchingFilms,
    isError: isErrorFilms,
    error: errorFilms,
  }: UseQueryResult<Film[], Error> = useFilms(
    data?.films.map((film) => extractId(film)) || [],
    { enabled: activeTab === 'films' },
  )
  const {
    data: planet,
    isFetching: isFetchingPlanet,
    isError: isErrorPlanet,
    error: errorPlanet,
  }: UseQueryResult<Planet, Error> = usePlanet(
    extractId(data?.homeworld || ''),
    {
      enabled: activeTab === 'homeworld',
    },
  )

  return (
    <MainLayout>
      <Button className="mb-4" variant="link" onClick={() => navigate(-1)}>
        ← Back
      </Button>
      {isFetching ? (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Skeleton className="w-10 h-10 rounded-full" />
            <Skeleton className="w-24 h-4 pb-1" />
          </CardHeader>
          <CardContent>
            {Array.from({ length: 7 }, (_, index) => (
              <Skeleton key={index} className="w-full h-4 mb-2" />
            ))}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader className="flex flex-row items-center gap-2.5">
            <Avatar>
              <AvatarFallback>{data?.name[0] || '?'}</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm pb-1">{data?.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="films">Films</TabsTrigger>
                <TabsTrigger value="homeworld">Homeworld</TabsTrigger>
              </TabsList>
              <TabsContent className="text-sm" value="info">
                {isError ? (
                  <ErrorMessage message={error.message} />
                ) : (
                  data && <PersonInfo data={data} />
                )}
              </TabsContent>
              <TabsContent className="text-sm" value="films">
                {isErrorFilms ? (
                  <ErrorMessage message={errorFilms.message} />
                ) : (
                  films && (
                    <PersonFilms films={films} isFetching={isFetchingFilms} />
                  )
                )}
              </TabsContent>
              <TabsContent className="text-sm" value="homeworld">
                {isErrorPlanet ? (
                  <ErrorMessage message={errorPlanet.message} />
                ) : (
                  planet && (
                    <PersonPlanet
                      planet={planet}
                      isFetching={isFetchingPlanet}
                    />
                  )
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  )
}

export default Person
