// export async function getInitialProps({ Component, router, ctx }) {
//   let pageProps = {}
//   const user = process.browser ? await clientAuth() : await serverAuth(ctx.req) // I explain down below

//   //this will be sent to all the components
//   const auth = { user, isAuthenticated: !!user }
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx)
//   }

//   return { pageProps, auth }
// }

export default function render({ Component, pageProps /* , auth */ }) {
  return <Component {...pageProps} /*  auth={auth} */ />
}


// async function serverAuth(req) {
//   console.log(req.headers.cookie)
//   if (req.headers.cookie) {
//     const token = getCookieFromReq(req, "auth");
//     const verifiedToken = await this.verifyToken(token);
//     return verifiedToken;
//   }
//   return undefined;
// }
