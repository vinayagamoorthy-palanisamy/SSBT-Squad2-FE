import React from 'react'
import ToastNotification from '../components/toastify'
import { render, screen } from '@testing-library/react'

describe('Toast notification test cases', () => {
    test('Should render toast notification', () => {
        render(
        <ToastNotification 
        open ={true} 
        type = 'success'
        message = {'Columns addedd successfully'}
        onClose = {jest.fn()}
        />
    )
    })

    test('Should render the message', () => {
        render(
        <ToastNotification 
        open ={true} 
        type = 'success'
        message = {'Columns addedd successfully'}
        onClose = {jest.fn()}
        />)
        expect(screen.getByText('Columns addedd successfully')).toBeInTheDocument()
    })
})