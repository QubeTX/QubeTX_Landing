import { createBrandScrollbar } from '../brandScrollbar'
import { prefersReducedMotion } from '../useMotionPreference'

// anime.js + matchMedia are auto-mocked in src/test/setup.ts; control the
// reduced-motion getter directly so we can exercise both paths.
vi.mock('../useMotionPreference', () => ({
  prefersReducedMotion: vi.fn(() => false),
}))

const reducedMock = prefersReducedMotion as unknown as ReturnType<typeof vi.fn>

/** Build a host (positioned parent) + scroll element with bs sections. */
function mountScrollEl(): HTMLDivElement {
  const host = document.createElement('div')
  const scroll = document.createElement('div')
  for (let i = 1; i <= 3; i++) {
    const sec = document.createElement('section')
    sec.setAttribute('data-bs-section', `Sec ${i}`)
    sec.setAttribute('data-bs-num', String(i).padStart(2, '0'))
    scroll.appendChild(sec)
  }
  host.appendChild(scroll)
  document.body.appendChild(host)
  return scroll
}

afterEach(() => {
  reducedMock.mockReturnValue(false)
  document.body.innerHTML = ''
})

describe('createBrandScrollbar', () => {
  it('injects the rail, hides the native bar, and reads ticks from sections', () => {
    const scroll = mountScrollEl()
    const sb = createBrandScrollbar(scroll, { ticks: true, readout: true, autoHide: false })
    const host = scroll.parentElement!

    expect(scroll.classList.contains('bs-scroll')).toBe(true)
    expect(host.querySelector('.bs-rail')).not.toBeNull()
    expect(host.querySelector('.bs-thumb')).not.toBeNull()
    expect(host.querySelector('.bs-readout')).not.toBeNull()
    expect(host.querySelectorAll('.bs-tick')).toHaveLength(3)

    sb.destroy()
  })

  it('omits the readout when not requested', () => {
    const scroll = mountScrollEl()
    const sb = createBrandScrollbar(scroll, { ticks: false, readout: false })
    expect(scroll.parentElement!.querySelector('.bs-readout')).toBeNull()
    expect(scroll.parentElement!.querySelectorAll('.bs-tick')).toHaveLength(0)
    sb.destroy()
  })

  it('destroy removes the rail and restores the native (branded) bar', () => {
    const scroll = mountScrollEl()
    const sb = createBrandScrollbar(scroll, { autoHide: false })
    const host = scroll.parentElement!
    expect(host.querySelector('.bs-rail')).not.toBeNull()

    sb.destroy()

    expect(host.querySelector('.bs-rail')).toBeNull()
    expect(scroll.classList.contains('bs-scroll')).toBe(false)
    expect(sb.rail).toBeNull()
  })

  it('reduced motion renders the rail at its final static state', () => {
    reducedMock.mockReturnValue(true)
    const scroll = mountScrollEl()
    const sb = createBrandScrollbar(scroll, { autoHide: false })
    const rail = scroll.parentElement!.querySelector<HTMLElement>('.bs-rail')!
    // non-auto-hide + reduced = fully visible immediately (no entrance tween)
    expect(rail.style.opacity).toBe('1')
    sb.destroy()
  })
})
