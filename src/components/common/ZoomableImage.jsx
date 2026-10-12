import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const MIN_SCALE = 1
const MAX_SCALE = 4
const SCALE_STEP = 0.5

/**
 * クリックするとモーダルで拡大表示される画像。
 * @param {{ src: string, alt: string, className?: string }} props
 */
export default function ZoomableImage({ src, alt, className }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" className="zoomable-image" onClick={() => setOpen(true)}>
        <img className={className} src={src} alt={alt} />
      </button>
      {open &&
        // テーブルセル内からでも position: fixed が崩れないよう body 直下に描画する
        createPortal(<ImageModal src={src} alt={alt} onClose={() => setOpen(false)} />, document.body)}
    </>
  )
}

/**
 * 画像の拡大表示モーダル。＋／−ボタンで倍率を変更でき、拡大中はスクロールで移動できる。
 * @param {{ src: string, alt: string, onClose: () => void }} props
 */
function ImageModal({ src, alt, onClose }) {
  const [scale, setScale] = useState(MIN_SCALE)
  // 等倍時に画面へ収まった幅。拡大時はこれを基準に幅を指定する
  const [baseWidth, setBaseWidth] = useState(null)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const zoomed = scale > MIN_SCALE && baseWidth

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="image-modal" onClick={(e) => e.stopPropagation()}>
        <div className="image-modal__viewport">
          <img
            className={`image-modal__img${zoomed ? ' image-modal__img--zoomed' : ''}`}
            style={zoomed ? { width: baseWidth * scale } : undefined}
            src={src}
            alt={alt}
            onLoad={(e) => setBaseWidth(e.currentTarget.clientWidth)}
          />
        </div>
        <button type="button" className="image-modal__close" aria-label="閉じる" onClick={onClose}>
          ×
        </button>
        <div className="image-modal__controls">
          <button
            type="button"
            className="image-modal__zoom-btn"
            aria-label="縮小"
            onClick={() => setScale((s) => Math.max(MIN_SCALE, s - SCALE_STEP))}
            disabled={scale <= MIN_SCALE}
          >
            −
          </button>
          <span className="image-modal__scale">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            className="image-modal__zoom-btn"
            aria-label="拡大"
            onClick={() => setScale((s) => Math.min(MAX_SCALE, s + SCALE_STEP))}
            disabled={scale >= MAX_SCALE}
          >
            ＋
          </button>
        </div>
      </div>
    </div>
  )
}
