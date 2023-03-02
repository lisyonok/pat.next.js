import { Breadcrumb, Layout, Menu } from "antd"

import { RouteGuard } from "../lib/auth/RouteGuard"

const { Header, Content, Footer } = Layout

export default function render({ Component, pageProps /* , auth */ }) {
  //console.log(pageProps)
  return (
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
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(3).fill(null).map((_, index) => ({
            key: String(index + 1),
            label: `nav ${index + 1}`
          }))}
        />
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <RouteGuard>
          <Component {...pageProps} /*  auth={auth} */ />
        </RouteGuard>
      </Content>
      <Footer style={{ textAlign: "center" }}></Footer>
    </Layout>
  )
}
