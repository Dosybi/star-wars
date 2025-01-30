import { Routes, Route } from 'react-router-dom'

import Characters from '@/components/pages/Characters'
import Person from '@/components/pages/Person'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/people/:id" element={<Person />} />
    </Routes>
  )
}

export default App
