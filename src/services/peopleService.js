import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase'

const peopleCollection = collection(db, 'people')

export async function addPerson({ name }) {
  await addDoc(peopleCollection, {
    name,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updatePerson(personId, { name }) {
  await updateDoc(doc(db, 'people', personId), {
    name,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePerson(personId) {
  await deleteDoc(doc(db, 'people', personId))
}
