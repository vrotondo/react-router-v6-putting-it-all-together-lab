import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'

beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/directors')) {
      return Promise.resolve({
        ok: true,
        json: async () => [
          {
            id: 1,
            name: 'Christopher Nolan',
            bio: 'Director of mind-bending films.',
            movies: [{ id: 'm1', title: 'Inception', time: 148, genres: ['Sci-Fi', 'Thriller'] }],
          },
        ],
      })
    }
    return Promise.resolve({
      ok: true,
      json: async () => ({}),
    })
  })
  window.history.pushState({}, '', '/')
})

const renderWithRouter = (ui, { route = '/' } = {}) => {
  return render(
    <MemoryRouter initialEntries={[route]}>
      {ui}
    </MemoryRouter>
  )
}

describe('🎬 Movie Directory App - Vitest Suite', () => {
  it('renders Home component at root ("/")', async () => {
    renderWithRouter(<App />, { route: '/' })
    expect(await screen.findByText(/Welcome to the Movie Directory/i)).toBeInTheDocument()
  })

  it('navigates to About page when clicking About link', async () => {
    renderWithRouter(<App />)
    const navbars = screen.getAllByRole('navigation')
    const navbar = navbars[0]

    const aboutLink = within(navbar).getByRole('link', { name: /^About$/i })
    fireEvent.click(aboutLink)

    await waitFor(() => {
      expect(screen.getByText(/About the Movie Directory/i)).toBeInTheDocument()
    })
  })

  it('displays directors list at "/directors"', async () => {
    renderWithRouter(<App />, { route: '/directors' })
    expect(await screen.findByText(/Christopher Nolan/i)).toBeInTheDocument()
  })

  it('navigates to DirectorForm on "/directors/new"', async () => {
    renderWithRouter(<App />, { route: '/directors/new' })
    expect(await screen.findByText(/Add New Director/i)).toBeInTheDocument()
  })

  it('navigates to a specific DirectorCard page', async () => {
    renderWithRouter(<App />, { route: '/directors/1' })
    expect(await screen.findByText(/Director of mind-bending films/i)).toBeInTheDocument()
    expect(await screen.findByRole('link', { name: /Inception/i })).toBeInTheDocument()
  })

  it('navigates to MovieForm at "/directors/1/movies/new"', async () => {
    renderWithRouter(<App />, { route: '/directors/1/movies/new' })
    // Using a more specific selector to find the form element
    expect(await screen.findByRole('form')).toBeInTheDocument()
    const submitButton = await screen.findByRole('button', { name: /Add Movie/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('renders MovieCard details correctly', async () => {
    renderWithRouter(<App />, { route: '/directors/1/movies/m1' })
    const movieTitle = await screen.findAllByText(/Inception/i)
    expect(movieTitle[0]).toBeInTheDocument() // Changed index to 0 as there might only be one instance
    expect(await screen.findByText(/Duration: 148 minutes/i)).toBeInTheDocument()
    expect(await screen.findByText(/Sci-Fi, Thriller/i)).toBeInTheDocument()
  })

  it('handles invalid director ID gracefully', async () => {
    renderWithRouter(<App />, { route: '/directors/999' })
    expect(await screen.findByText(/Director not found/i)).toBeInTheDocument()
  })

  it('handles invalid movie ID gracefully', async () => {
    renderWithRouter(<App />, { route: '/directors/1/movies/invalid' })
    expect(await screen.findByText(/Movie not found/i)).toBeInTheDocument()
  })
})