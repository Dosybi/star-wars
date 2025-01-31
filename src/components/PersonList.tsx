import { useEffect, useMemo, useState, type FC } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import PersonCard from './PersonCard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination'
import { Skeleton } from './ui/skeleton'

import { cn, extractId } from '@/lib/utils'
import type { Person } from '@/types/people'
import { usePeople } from '@/hooks/usePeople'
import { Input } from './ui/input'
import ErrorMessage from './ErrorMessage'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useDebounce } from '@/hooks/useDebounce'
import { useQueryClient } from '@tanstack/react-query'
import { ROUTES } from '@/routes'

const NUMBER_OF_PEOPLE_PER_PAGE = 10

const PersonList: FC = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') || '1', 10)
  const [searchQuery, setSearchQuery] = useState(() => {
    const sp = searchParams.get('search') || ''
    return sp
  })
  const debouncedSearchQuery = useDebounce(searchQuery)
  const { data, isFetching, isError, error } = usePeople(
    pageParam,
    debouncedSearchQuery,
  )
  useScrollToTop(pageParam)

  const numberOfPages = useMemo(
    () => (data?.count ? Math.ceil(data.count / NUMBER_OF_PEOPLE_PER_PAGE) : 0),
    [data],
  )

  const handlePageChange = (page: number) => {
    setSearchParams({ page: String(page) })
  }

  const handleCardClick = (person: Person) => {
    const id = extractId(person.url)
    navigate(ROUTES.PERSON(id))
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value
    setSearchQuery(searchQuery)
    setSearchParams({ page: '1', search: searchQuery })
  }

  useEffect(() => {
    const sp = searchParams.get('search') || ''
    setSearchQuery(sp)
  }, [searchParams])

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['people'] })
  }, [])

  if (isError) {
    return <ErrorMessage message={error?.message || 'Something went wrong'} />
  }

  return (
    <>
      <div className="flex flex-wrap flex-col md:flex-row justify-evenly gap-4 mb-8">
        <div className="w-full flex justify-center mb-10">
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
            className="max-w-96"
            disabled={isFetching}
          />
        </div>
        {!data && isFetching
          ? Array.from(
              { length: NUMBER_OF_PEOPLE_PER_PAGE },
              (_, index) => index + 1,
            ).map((index) => <Skeleton key={index} className="w-80 h-72" />)
          : data?.results.map((person: Person) => (
              <div
                className="w-full h-full md:w-80 cursor-pointer"
                onClick={() => handleCardClick(person)}
                key={person.url}
              >
                <PersonCard person={person} />
              </div>
            ))}
      </div>
      {!!numberOfPages && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={cn({
                  hidden: pageParam === 1,
                })}
                onClick={() => handlePageChange(pageParam - 1)}
              >
                Previous
              </PaginationPrevious>
            </PaginationItem>
            <div className="hidden md:flex">
              {numberOfPages > 1 &&
                Array.from(
                  { length: numberOfPages },
                  (_, index) => index + 1,
                ).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={pageParam === page}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
            </div>
            <PaginationItem>
              <PaginationNext
                className={cn({
                  hidden: pageParam === numberOfPages,
                })}
                onClick={() => handlePageChange(pageParam + 1)}
              >
                Next
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  )
}

export default PersonList
