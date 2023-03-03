import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import adapter from "../api/adapter"
import RouterGuardContext from "./routerGuardContext"

export { RouteGuard }

const publicPaths = ["/auth/login", "/_error"]
const isOpenRoute = (url) => publicPaths.includes(url) || url.startsWith("/open")

function RouteGuard({ children }) {
  const router = useRouter()
  const [auth, setAuth] = useState({ openRoute: isOpenRoute(router.route) })

  useEffect(() => {
    isAuthRequired(router.route)

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
    const openRoute = isOpenRoute(path)
    const { session, isAuth } = await authCheck()
    setAuth({ isAuth, session, openRoute})
    if (!isAuth && !openRoute) router.push("/auth/login")
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
