import { PrismaClient } from "@prisma/client"
import { cookieName } from "../../../lib/auth/constants"
import { setResCookie } from "../../../lib/auth/cookies"

const prisma = new PrismaClient()

const handler = async (req, res) => {
  const token = req.cookies[cookieName]
  if (typeof token !== "string") {
    setResCookie(res, cookieName, "loggedout")
    return res.send({ status: "ok" })
  }
  await prisma.$connect()
  await prisma.session.delete({ where: { token } })
  setResCookie(res, cookieName, "loggedout")
  res.send({ status: "ok" })
  await prisma.$disconnect()
}

export default handler
