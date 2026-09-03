import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const AppDataContext = createContext(null)

export function AppDataProvider({ children }) {
  const [people, setPeople] = useState([])
  const [traps, setTraps] = useState([])
  const [peopleLoaded, setPeopleLoaded] = useState(false)
  const [trapsLoaded, setTrapsLoaded] = useState(false)

  useEffect(() => {
    const unsubPeople = onSnapshot(collection(db, 'people'), (snapshot) => {
      setPeople(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setPeopleLoaded(true)
    })
    const unsubTraps = onSnapshot(collection(db, 'traps'), (snapshot) => {
      setTraps(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      setTrapsLoaded(true)
    })
    return () => {
      unsubPeople()
      unsubTraps()
    }
  }, [])

  const peopleById = useMemo(() => {
    const map = new Map()
    for (const person of people) map.set(person.id, person)
    return map
  }, [people])

  const value = {
    people,
    traps,
    peopleById,
    loading: !peopleLoaded || !trapsLoaded,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  return useContext(AppDataContext)
}
