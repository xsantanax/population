import { render, screen } from '@testing-library/react'
import App from '@/app/page'
import geometrias from '@/lib/geometrias_bairros.json'
import populationData from '@/lib/populacao_bairros.json'

describe('Data', () => {
  it('receives geometry data in the correct format', () => {
    expect(Array.isArray(geometrias.features[0].geometry.coordinates)).toBe(
      true
    )
  })

  it('receives population data in the correct format', () => {
    expect(Array.isArray(populationData)).toBe(true)
    expect(populationData[0]).toHaveProperty('id_geometria')
    expect(populationData[0]).toHaveProperty('ano')
    expect(populationData[0]).toHaveProperty('populacao')
  })
})

describe('Rendering', () => {
  it('renders an app intro with "This is" text and "intro" class', () => {
    render(<App />)
    const intro = screen.getByText(/This is/)
    expect(intro).toBeInTheDocument()
    expect(intro).toHaveClass('intro')
  })

  it('renders a map component', () => {
    render(<App />)
    const map = screen.getByTestId('map')
    expect(map).toBeInTheDocument()
  })

  it('renders a chart component', () => {
    render(<App />)
    const map = screen.getByTestId('chart')
    expect(map).toBeInTheDocument()
  })
})
