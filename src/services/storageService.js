import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../firebase'

export async function uploadTrapPhoto(trapId, file) {
  const path = `trapPhotos/${trapId}/${Date.now()}_${file.name}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  const url = await getDownloadURL(storageRef)
  return { photoUrl: url, photoStoragePath: path }
}

export async function deleteTrapPhoto(photoStoragePath) {
  if (!photoStoragePath) return
  await deleteObject(ref(storage, photoStoragePath))
}
