import { Routes, Route } from 'react-router-dom'

import Characters from '@/pages/Characters'
import Person from '@/pages/Person'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Characters />} />
      <Route path="/people/:id" element={<Person />} />
    </Routes>
  )
}

export default App
