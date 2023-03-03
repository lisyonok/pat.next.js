import { PrismaClient } from "@prisma/client"
import { Descriptions } from "antd"
import { Typography } from "antd"
import Link from "next/link"

const { Title } = Typography

export default function ({ book }) {
  const { title, image, ...rest } = book
  return (
    <>
      <Title level={2}>{title}</Title>
      <Descriptions layout="vertical">
        {Object.keys(rest).map((key, i) => (
          <Descriptions.Item key={i} label={key}>
            {rest[key]}
          </Descriptions.Item>
        ))}
      </Descriptions>
      <Link href="/open/books">Back to all books</Link>
    </>
  )
}

export async function getStaticPaths() {
  const prisma = new PrismaClient()
  await prisma.$connect()
  console.log("Fetching all books paths from db")
  const books = await prisma.book.findMany()
  const paths = books.map(({ isbn }) => ({ params: { book: isbn } }))
  await prisma.$disconnect()

  return { paths, fallback: false }
}

export async function getStaticProps({ params: { book: isbn } }) {
  const prisma = new PrismaClient()
  await prisma.$connect()

  console.log(`Fetching book from db. ISBN: ${isbn}`)

  const book = await prisma.book.findFirst({ where: { isbn } })
  await prisma.$disconnect()

  return { props: { book }, notFound: !book }
}
