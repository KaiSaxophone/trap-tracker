import { useMemo } from 'react'

export default function TrapPhotoUploader({ file, onChange, existingPhotoUrl }) {
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file)
    return existingPhotoUrl || null
  }, [file, existingPhotoUrl])

  return (
    <div className="trap-photo-uploader">
      <span className="form-field__label">写真</span>
      {previewUrl && <img src={previewUrl} alt="捕獲機の写真プレビュー" />}
      <input
        type="file"
        className="input"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
    </div>
  )
}
