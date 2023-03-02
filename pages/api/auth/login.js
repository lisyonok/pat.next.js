import { setResCookie } from "../../../lib/auth/cookies"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { cookieName } from "../../../lib/auth/constants"

const prisma = new PrismaClient()

const InvalidReq = (res) => res.status(403).send({ message: "Invalid req" })

const handler = async (req, res) => {
  //if (!req.method !== "POST") return InvalidReq(res)
  const { name, pass } = req.query
  if (typeof name !== "string" || typeof pass !== "string") return InvalidReq(res)

  await prisma.$connect()
  const { pass: hash, ...user } = await prisma.user.findFirst({ where: { name } })

  const rightPassword = bcrypt.compareSync(pass, hash)
  if (!rightPassword) return InvalidReq(res)
  const token = crypto.randomBytes(128).toString("base64")

  setResCookie(res, cookieName, token)
  res.send(user)

  await prisma.session.create({
    data: {
      token,
      createdAt: new Date(),
      lastUsed: new Date(),
      User: {
        connect: { id: user.id }
      }
    }
  })
  await prisma.$disconnect()
}

export default handler
