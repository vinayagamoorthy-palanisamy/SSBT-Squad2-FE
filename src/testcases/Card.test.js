import { render } from '@testing-library/react'
import React from 'react'
import ExtractCard from '../components/card'

describe('Should render the cards', () => {
    test('Should render the card component', () => {
        render(
            <ExtractCard 
            title = 'Loreal products table'
            description={'Check the loreal products table columns details here'}
            selected={''}
            onClick={jest.fn()}
            />
        )
    })
})