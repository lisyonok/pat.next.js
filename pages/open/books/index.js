import { PrismaClient } from "@prisma/client"
import { Table } from "antd"
import { Typography } from "antd"
import { useRouter } from "next/router"
const columns = [
  {
    title: "id",
    dataIndex: "id"
  },
  {
    title: "title",
    dataIndex: "title"
  },
  {
    title: "author",
    dataIndex: "author"
  },
  {
    title: "genre",
    dataIndex: "genre"
  },
  {
    title: "description",
    dataIndex: "description"
  },
  {
    title: "isbn",
    dataIndex: "isbn"
  },
  {
    title: "image",
    dataIndex: "image"
  },
  {
    title: "published",
    dataIndex: "published"
  },
  {
    title: "publisher",
    dataIndex: "publisher"
  }
]

export default function ({ books }) {
  const router = useRouter()
  return (
    <>
      <Typography.Title>Books</Typography.Title>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={books}
        onRow={(book) => ({ onClick: () => router.push(`/open/books/${book.isbn}`) })}
      />
    </>
  )
}

export async function getServerSideProps(context) {
  const prisma = new PrismaClient()
  await prisma.$connect()
  console.log("Fetching all books from db")
  const books = await prisma.book.findMany({ take: 25 })
  await prisma.$disconnect()

  return {
    props: {
      books
    }
  }
}
