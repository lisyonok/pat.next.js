import { PrismaClient } from "@prisma/client"
import { cookieName } from "../../../lib/auth/constants"
import exclude from "../../../lib/db/exclude"

const prisma = new PrismaClient()

const InvalidReq = (res) => res.status(403).send({ message: "Invalid req" })

const handler = async (req, res) => {
  const token = req.cookies[cookieName]
  if (typeof token !== "string") return InvalidReq(res)

  await prisma.$connect()
  const session = await prisma.session.findFirst({ where: { token }, include: { User: true } })
  if (!session) {
    await prisma.$disconnect()
    return res.status(403).send({ message: "Expired token" })
  }

  res.send({ ...session, user: exclude(session.User, ["pass"]), User: undefined })

  await prisma.session.update({ where: { id: session.id }, data: { lastUsed: new Date() } })
  await prisma.$disconnect()
}

export default handler
