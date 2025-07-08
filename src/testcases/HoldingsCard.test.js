import { render, screen } from '@testing-library/react'
import React from 'react'
import HoldingsCard from '../components/HoldingsCard'

describe('Render Holding card', () => {
    test('Should render the holdings card', () => {
    render(<HoldingsCard />)
    })

    test('Should render the title', () => {
        render(<HoldingsCard />)
        expect(screen.getByText('Holdings')).toBeInTheDocument()
    })

    test('SHould render the preview button', () => {
        render(<HoldingsCard />)
        expect(screen.getByText('Preview')).toBeInTheDocument()
    })
})