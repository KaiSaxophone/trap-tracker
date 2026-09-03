import { useMemo } from 'react'

export default function TrapPhotoUploader({ file, onChange, existingPhotoUrl }) {
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file)
    return existingPhotoUrl || null
  }, [file, existingPhotoUrl])

  return (
    <div className="trap-photo-uploader">
      {previewUrl && <img src={previewUrl} alt="罠の写真プレビュー" />}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}
