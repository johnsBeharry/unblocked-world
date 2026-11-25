import { useEffect } from 'react'

// A new form error scrolls into view: the actions sit at the top on mobile
// (Cancel / Save) or in the footer, while the message is under the form, so
// without this a failed Save looked like nothing happened. `attempt` changes
// with every press, so the same message scrolls back into view again.
export function useErrorInView(ref, error, attempt) {
  useEffect(() => {
    if (error) ref.current?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [ref, error, attempt])
}
