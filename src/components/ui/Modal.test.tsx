import { render, screen, fireEvent } from '@testing-library/react'
import Modal from './Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={() => {}} title="Delete project">
        Body
      </Modal>
    )
    expect(screen.queryByRole('dialog')).toBeNull()
  })

  it('renders an accessible dialog when open', () => {
    render(
      <Modal open onClose={() => {}} title="Delete project" eyebrow="Confirm">
        Are you sure?
      </Modal>
    )
    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveAttribute('aria-modal', 'true')
    // accessible name comes from the title via aria-labelledby
    expect(dialog).toHaveAccessibleName('Delete project')
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  it('closes on Escape', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Delete project">
        Body
      </Modal>
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes on the close button and on scrim click, but not on panel click', () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Delete project">
        Body
      </Modal>
    )
    const dialog = screen.getByRole('dialog')

    // clicking inside the panel must NOT close
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()

    // the scrim (the dialog's parent) closes
    fireEvent.click(dialog.parentElement as HTMLElement)
    expect(onClose).toHaveBeenCalledTimes(1)

    // the X button closes
    fireEvent.click(screen.getByRole('button', { name: /close dialog/i }))
    expect(onClose).toHaveBeenCalledTimes(2)
  })
})
