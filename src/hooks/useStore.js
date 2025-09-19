// This hook will take a store and a selector as arguments. It will return the state
//  from the store, but it will ensure the initial render on the client matches the
// server render by returning undefined until the client has hydrated.
"use client"

import { useState, useEffect } from 'react'

const useStore = (store, callback) => {
  const result = store(callback)
  const [data, setData] = useState()

  useEffect(() => {
    setData(result)
  }, [result])

  return data
}

export default useStore

// Why does this work?

// Server-Side Render: On the server, useEffect does not run.
// The data state remains undefined. Your component renders with undefined state.
// Client-Side Initial Render: React renders the component on the client to compare
// it with the server's HTML. At this point, useEffect has not run yet, so data is
// still undefined. This matches the server render, and hydration succeeds without errors.
// Client-Side Effect Run: After hydration, useEffect runs. It calls
// setData(result), which updates the data state with the actual value from
// the Zustand store. This triggers a re-render, and your component now shows the correct state.
