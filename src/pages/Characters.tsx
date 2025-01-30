import { type FC } from 'react'

import PersonList from '@/components/PersonList'
import MainLayout from '@/components/MainLayout'

const Characters: FC = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-8 w-full text-center">
        Star Wars Characters
      </h1>
      <PersonList />
    </MainLayout>
  )
}

export default Characters
