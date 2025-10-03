import '../styles/globals.css'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'

export default function App({ Component, pageProps }){
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      try { history.scrollRestoration = 'manual' } catch(e) { /* ignore */ }
    }
    // ensure we start at top on first client mount
    if (typeof window !== 'undefined') {
      // remove any hash (e.g. #contact) so the browser/Next won't auto-scroll to anchors on refresh
      if (window.location && window.location.hash) {
        try { history.replaceState(null, '', window.location.pathname + window.location.search) } catch (e) { /* ignore */ }
      }
      window.scrollTo(0,0)
    }
  }, [])

  return (
    <AnimatePresence mode="wait">
      <Component {...pageProps} />
    </AnimatePresence>
  )
}
