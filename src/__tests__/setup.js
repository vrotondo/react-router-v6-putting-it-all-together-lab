import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'

// Mock fetch
global.fetch = vi => {
    return Promise.resolve({
        ok: true,
        json: async () => { return {} }
    })
}

// Clean up after each test
afterEach(() => {
    cleanup()
})