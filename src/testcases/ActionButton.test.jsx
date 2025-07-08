import React from 'react'
import ActionButtons from '../components/ActionButtons'
import { queryByText, render, screen } from '@testing-library/react'

describe("Render action button", () => {
    const onCancel = jest.fn()
    const onSave = jest.fn()
    const onBack = jest.fn()
    const onNext = jest.fn()
    const onSubmit = jest.fn()

    test('render the action button component', () => {
        render(
        <ActionButtons
            currentStep ={'1'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
         />)
    })

    test('Check the butons presence', () => {
        render(
        <ActionButtons
            currentStep ={'1'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />)
        expect(screen.getByText('Save')).toBeInTheDocument()
        expect(screen.getByText('Next')).toBeInTheDocument()
        expect(screen.getByText('Back')).toBeInTheDocument()
        expect(screen.getByText('Cancel')).toBeInTheDocument()

    })

    test('Back button not to render when currentsteop is 0', () => {
        render(
            <ActionButtons
            currentStep ={'0'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />)
        expect(screen.queryByText(/back/i)).not.toBeInTheDocument()
    })

    test('Should back button render when current step greater than 0', () => {
        render(
            <ActionButtons
            currentStep ={'1'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />
        )
        expect(screen.getByTestId('back-button')).toBeInTheDocument()
    })

    test('Should render next button when currentstep < laststep', () => {
        render(
            <ActionButtons
            currentStep ={'1'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />
        )
        expect(screen.getByTestId('next-button')).toBeInTheDocument()
    })
    test('Should not render next button when currentstep  !< laststep', () => {
        render(
            <ActionButtons
            currentStep ={'2'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />
        )
        expect(screen.queryByText(/next/i)).not.toBeInTheDocument()
    })

    test('Should render the submit button', () => {
        render(
            <ActionButtons
            currentStep ={'2'}
            lastStep ={'2'}
            onCancel = {onCancel}
            onSave = {onSave}
            onBack = {onBack}
            onNext = {onNext}
            onSubmit = {onSubmit}
        />
        )
        expect(screen.getByText('Submit')).toBeInTheDocument()
    })

})