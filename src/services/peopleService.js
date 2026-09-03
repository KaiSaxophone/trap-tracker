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

export async function addPerson({ name, memo }) {
  await addDoc(peopleCollection, {
    name,
    memo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updatePerson(personId, { name, memo }) {
  await updateDoc(doc(db, 'people', personId), {
    name,
    memo,
    updatedAt: serverTimestamp(),
  })
}

export async function deletePerson(personId) {
  await deleteDoc(doc(db, 'people', personId))
}
