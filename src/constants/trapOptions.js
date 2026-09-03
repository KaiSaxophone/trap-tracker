export const TRAP_TYPES = [
  { value: 'hawk', label: 'トマホーク型' },
  { value: 'animal_catcher', label: 'アニマルキャッチャー型' },
  { value: 'folding', label: '折り畳み型' },
]

export const TRAP_SIZES = [
  { value: 'normal', label: '普通' },
  { value: 'medium', label: '中型' },
  { value: 'large', label: '大型' },
]

export function getTrapTypeLabel(value) {
  return TRAP_TYPES.find((t) => t.value === value)?.label ?? value
}

export function getTrapSizeLabel(value) {
  return TRAP_SIZES.find((s) => s.value === value)?.label ?? value
}
