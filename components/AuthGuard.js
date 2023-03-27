import { useAuth } from 'components/AuthProvider'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export function AuthGuard({ children }) {
  const {user, initializing, setRedirect} = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        setRedirect(router.route)
        router.push('/signin')
      }
    }
  }, [initializing, router, user, setRedirect])

  if (initializing) {
    return <h1>Application Loading</h1>
  }

  if (!initializing && user) {
    return <>{children}</>
  }

  return null
}