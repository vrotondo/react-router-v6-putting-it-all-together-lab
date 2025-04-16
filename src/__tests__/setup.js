import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Define memoryHistory as a global object for testing
global.memoryHistory = {}

afterEach(() => {
    cleanup();
})