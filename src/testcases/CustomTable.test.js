import { render, screen } from '@testing-library/react'
import React from 'react'
import CustomTable from '../components/CustomTable'

describe('Chek render the custom table', () => {
    test('Should render the custom table', () => {
        render(
            <CustomTable customStyles={{}} />
        )
    })
    
    test('Should render the table values', () => {
        render(
            <CustomTable customStyles={{}} />
        )
        expect(screen.getByText('P_IN_CLIENT_ID_VALUE')).toBeInTheDocument()
        expect(screen.getByText('1918976543')).toBeInTheDocument()

    })
})