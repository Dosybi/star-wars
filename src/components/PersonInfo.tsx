import { useEffect, useState, type FC } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn, extractId, getStorageKey } from '@/lib/utils'
import { Label } from './ui/label'
import type { Person } from '@/types/people'

interface PersonInfoProps {
  data: Person
}

const PersonInfo: FC<PersonInfoProps> = ({ data }) => {
  const queryClient = useQueryClient()
  const [isEditing, setIsEditing] = useState(false)
  const [person, setPerson] = useState<Person>(data)

  const personId = extractId(data.url)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    if (personId) {
      localStorage.setItem(getStorageKey(personId), JSON.stringify(person))

      queryClient.setQueryData(['person', personId], person)
      queryClient.setQueryData(['people'], (oldData: { results: Person[] }) => {
        if (!oldData) return oldData

        return {
          ...oldData,
          results: oldData.results.map((p: Person) =>
            extractId(p.url) === personId ? person : p,
          ),
        }
      })
    }
  }

  const handleInputChange = (field: keyof Person, value: string) => {
    setPerson((prev) => ({ ...prev, [field]: value }))
  }

  const handleReset = () => {
    setIsEditing(false)
    setPerson(data)
    localStorage.removeItem(getStorageKey(personId))
  }

  const handleCancel = () => {
    const savedPerson = localStorage.getItem(getStorageKey(personId))
    if (savedPerson) setPerson(JSON.parse(savedPerson))
    setIsEditing(false)
  }

  useEffect(() => {
    if (!personId) return
    const savedPerson = localStorage.getItem(getStorageKey(personId))
    if (savedPerson) setPerson(JSON.parse(savedPerson))
  }, [personId])

  return (
    <div>
      <div className={cn('mb-4', isEditing && 'flex flex-col gap-4')}>
        {isEditing ? (
          <div>
            <Label htmlFor="birth_year">Birth Year</Label>
            <Input
              value={person.birth_year}
              placeholder="Birth Year"
              id="birth_year"
              onChange={(e) => handleInputChange('birth_year', e.target.value)}
            />
          </div>
        ) : (
          <p>Birth Year: {person.birth_year}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="gender">Gender</Label>
            <Input
              value={person.gender}
              placeholder="Gender"
              id="gender"
              onChange={(e) => handleInputChange('gender', e.target.value)}
            />
          </div>
        ) : (
          <p>Gender: {person.gender}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="height">Height</Label>
            <Input
              value={person.height}
              placeholder="Height"
              id="height"
              onChange={(e) => handleInputChange('height', e.target.value)}
            />
          </div>
        ) : (
          <p>Height: {person.height}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="mass">Mass</Label>
            <Input
              value={person.mass}
              placeholder="Mass"
              id="mass"
              onChange={(e) => handleInputChange('mass', e.target.value)}
            />
          </div>
        ) : (
          <p>Mass: {person.mass}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="hair_color">Hair Color</Label>
            <Input
              value={person.hair_color}
              placeholder="Hair Color"
              id="hair_color"
              onChange={(e) => handleInputChange('hair_color', e.target.value)}
            />
          </div>
        ) : (
          <p>Hair Color: {person.hair_color}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="eye_color">Eye Color</Label>
            <Input
              value={person.eye_color}
              placeholder="Eye Color"
              id="eye_color"
              onChange={(e) => handleInputChange('eye_color', e.target.value)}
            />
          </div>
        ) : (
          <p>Eye Color: {person.eye_color}</p>
        )}
        {isEditing ? (
          <div>
            <Label htmlFor="skin_color">Skin Color</Label>
            <Input
              value={person.skin_color}
              placeholder="Skin Color"
              id="skin_color"
              onChange={(e) => handleInputChange('skin_color', e.target.value)}
            />
          </div>
        ) : (
          <p>Skin Color: {person.skin_color}</p>
        )}
      </div>
      <div className="flex gap-4">
        <Button variant="outline" onClick={handleEdit} disabled={isEditing}>
          Edit
        </Button>
        {isEditing && (
          <>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Reset to Default
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </div>
    </div>
  )
}

export default PersonInfo
