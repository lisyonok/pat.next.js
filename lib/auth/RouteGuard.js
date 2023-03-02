import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adapter from "../api/adapter"
import RouterGuardContext from "./routerGuardContext"

export { RouteGuard }

const publicPaths = ["/auth/login"]

function RouteGuard({ children }) {
  const router = useRouter()
  const [auth, setAuth] = useState({ openRoute: publicPaths.includes(router.asPath) })

  useEffect(() => {
    isAuthRequired(router.asPath)
    const hideContent = () => setAuth({})

    router.events.on("routeChangeStart", hideContent)
    router.events.on("routeChangeComplete", isAuthRequired)
    return () => {
      router.events.off("routeChangeStart", hideContent)
      router.events.off("routeChangeComplete", isAuthRequired)
    }
  }, [])

  async function isAuthRequired(url) {
    const path = url.split("?")[0]
    const { session, isAuth } = await authCheck()
    setAuth({ isAuth, session, openRoute: publicPaths.includes(path) })
    if (!isAuth) router.push("/auth/login")
  }

  return (
    <RouterGuardContext.Provider value={auth}>
      {(auth.isAuth || auth.openRoute) && children}
    </RouterGuardContext.Provider>
  )
}

async function authCheck() {
  const { status, data } = await adapter({ url: "/auth/getauth", validateStatus: () => true })
  return { session: data.session, isAuth: status === 200 }
}
