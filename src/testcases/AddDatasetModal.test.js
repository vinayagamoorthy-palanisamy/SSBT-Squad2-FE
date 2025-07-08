import React from 'react'
import AddDatasetModal from '../components/AddDatasetModal'
import { render, screen } from '@testing-library/react'

describe('Render the Add dataset modal', () => {
    test('Should render the dataset modal', () => {
        render(
            <AddDatasetModal />
        )
    })

     test('Should render the input', () => {
            render(
            <AddDatasetModal />
        )
           expect(screen.getByText('Dataset Name')).toBeInTheDocument()
        })
})