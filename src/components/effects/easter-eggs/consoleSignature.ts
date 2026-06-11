let printed = false

/** Dev-console signature + the only written hints for the eggs. */
export function consoleSignature(): void {
  if (printed || typeof console === 'undefined') return
  printed = true

  const cube = [
    '        ┌─────────┐',
    '       ╱         ╱│',
    '      ┌─────────┐ │',
    '      │         │ │',
    '      │ QUBETX  │ │',
    '      │         │╱',
    '      └─────────┘',
  ].join('\n')

  console.log('%c' + cube, 'color:#0066FF;font-family:monospace;')
  console.log(
    '%cQUBETX // SYSTEMS NOMINAL',
    'color:#7c3aed;font-weight:bold;font-size:14px;font-family:monospace;'
  )
  console.log(
    '%cWe build this kind of thing for clients too → https://qubetx.com/#contact',
    'color:#94a3b8;font-family:monospace;'
  )
  console.log(
    '%c> hint: the old codes still work. ↑↑↓↓←→←→BA',
    'color:#64748b;font-family:monospace;'
  )
  console.log('%c> hint: try typing "qubetx" anywhere.', 'color:#64748b;font-family:monospace;')
  console.log(
    '%c> hint: the cube can take a beating. five clicks, quickly.',
    'color:#64748b;font-family:monospace;'
  )
}
