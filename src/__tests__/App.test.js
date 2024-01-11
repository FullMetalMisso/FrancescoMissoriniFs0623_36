import { fireEvent, render, screen } from '@testing-library/react'
import App from '../App'

describe('test di render di welcome', () => {
  it('reinderizza i componenti di welcome', () => {
    render(<App />)
    const mainHeader = screen.getByRole('heading', {
      name: /welcome in epibooks!/i,
    })
    expect(mainHeader).toBeInTheDocument()
  })

  it('visualizza tutti i libri', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(150)
  })

  it('rendeirizza i componenti di CommentArea ', () => {
    render(<App />)
    const reviewInputField = screen.getByPlaceholderText(
      /inserisci qui il testo/i
    )
    expect(reviewInputField).toBeInTheDocument()
  })
})

describe('test della ricerca', () => {
  it("ricerca una parola 'harry'", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'harry' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(1)
  })

  it("trova 3 risultati per la parola 'lord'", () => {
    render(<App />)
    const filterInputField = screen.getByPlaceholderText(/cerca un libro/i)
    fireEvent.change(filterInputField, { target: { value: 'lord' } })
    const allTheBookCards = screen.getAllByTestId('book-card')
    expect(allTheBookCards).toHaveLength(3)
  })
})

describe('test di singleBook', () => {
  it('controlla che il colore diventi rosso al click', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
  })

  it('reimposta il colore', () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    expect(firstBookCard).toHaveStyle('border: 3px solid red')
    const secondBookCard = allTheBookCards[1]
    fireEvent.click(secondBookCard)
    expect(firstBookCard).not.toHaveStyle('border: 3px solid red')
  })
})

describe('test di commentiList', () => {
  it('renders no book comments on load', () => {
    render(<App />)
    const allTheBookComments = screen.queryAllByTestId('single-comment')
    expect(allTheBookComments).toHaveLength(0)
  })

  it('visualizza i commenti giusti cliccando sul libro', async () => {
    render(<App />)
    const allTheBookCards = screen.getAllByTestId('book-card')
    const firstBookCard = allTheBookCards[0]
    fireEvent.click(firstBookCard)
    const allTheBookComments = await screen.findAllByTestId('single-comment')
    expect(allTheBookComments).not.toHaveLength(0)
  })
})
