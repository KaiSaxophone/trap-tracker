import {
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore'
import { db } from '../firebase'
import { deleteTrapPhoto, uploadTrapPhoto } from './storageService'

const trapsCollection = collection(db, 'traps')

export async function createTrap(
  { type, size, trapNumber, ownerId, storageLocationId, memo },
  photoFile,
) {
  const trapRef = doc(trapsCollection)
  let photoUrl = ''
  let photoStoragePath = ''

  if (photoFile) {
    const uploaded = await uploadTrapPhoto(trapRef.id, photoFile)
    photoUrl = uploaded.photoUrl
    photoStoragePath = uploaded.photoStoragePath
  }

  await setDoc(trapRef, {
    type,
    size,
    trapNumber,
    photoUrl,
    photoStoragePath,
    ownerId,
    storageLocationId,
    memo,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
}

export async function updateTrap(
  trapId,
  { type, size, trapNumber, ownerId, storageLocationId, memo, photoUrl, photoStoragePath },
  photoFile,
) {
  let nextPhotoUrl = photoUrl
  let nextPhotoStoragePath = photoStoragePath

  if (photoFile) {
    if (photoStoragePath) await deleteTrapPhoto(photoStoragePath)
    const uploaded = await uploadTrapPhoto(trapId, photoFile)
    nextPhotoUrl = uploaded.photoUrl
    nextPhotoStoragePath = uploaded.photoStoragePath
  }

  await updateDoc(doc(db, 'traps', trapId), {
    type,
    size,
    trapNumber,
    photoUrl: nextPhotoUrl,
    photoStoragePath: nextPhotoStoragePath,
    ownerId,
    storageLocationId,
    memo,
    updatedAt: serverTimestamp(),
  })
}

export async function moveTraps(trapIds, newPersonId) {
  const batch = writeBatch(db)
  for (const trapId of trapIds) {
    batch.update(doc(db, 'traps', trapId), {
      storageLocationId: newPersonId,
      updatedAt: serverTimestamp(),
    })
  }
  await batch.commit()
}

export async function deleteTrap(trapId, photoStoragePath) {
  if (photoStoragePath) await deleteTrapPhoto(photoStoragePath)
  await deleteDoc(doc(db, 'traps', trapId))
}
