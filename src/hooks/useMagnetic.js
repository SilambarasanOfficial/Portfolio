import { useRef, useCallback } from 'react'

/**
 * Magnetic button effect.
 * The element pulls toward the cursor when hovered within its bounds.
 *
 * @param {number} strength  0–1 pull factor relative to element size (default 0.35)
 */
export function useMagnetic(strength = 0.35) {
  const ref = useRef(null)

  const onMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width  - 0.5) * rect.width  * strength
    const y = ((e.clientY - rect.top)  / rect.height - 0.5) * rect.height * strength
    el.style.transition = 'transform 0.12s ease'
    el.style.transform  = `translate(${x}px, ${y}px)`
  }, [strength])

  const onMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform 0.55s cubic-bezier(0.23, 1, 0.32, 1)'
    el.style.transform  = 'translate(0px, 0px)'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
