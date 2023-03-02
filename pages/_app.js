import "reset-css"
import { Breadcrumb, Button, Layout, Menu } from "antd"
import { RouteGuard } from "../lib/auth/RouteGuard"
import adapter from "../lib/api/adapter"

const { Header, Content, Footer } = Layout

export default function render({ Component, pageProps }) {
  function logout() {
    adapter({ url: "/auth/logout" }).then(() => (window.location = "/auth/login"))
  }

  return (
    <RouteGuard>
      <Layout>
        <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
          <div
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "rgba(255, 255, 255, 0.2)"
            }}
          />
          <Button
            style={{
              float: "right",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
              background: "rgba(255, 255, 255, 0.2)",
              color: "white"
            }}
            onClick={logout}
          >
            Logout
          </Button>
        </Header>
        <Content className="site-layout" style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <Component {...pageProps} />
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </RouteGuard>
  )
}
