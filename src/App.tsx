import { Routes, Route } from 'react-router-dom'

import Characters from '@/pages/Characters'
import Person from '@/pages/Person'
import { ROUTES } from './routes'

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Characters />} />
      <Route path={ROUTES.PERSON(':id')} element={<Person />} />
    </Routes>
  )
}

export default App
