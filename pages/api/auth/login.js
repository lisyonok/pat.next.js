import { setResCookie } from "../../../lib/auth/cookies"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import crypto from "crypto"
import { cookieName } from "../../../lib/auth/constants"

const prisma = new PrismaClient()

const InvalidReq = (res) => res.status(400).send({ message: "Invalid req", status: "error" })
const InvalidCred = (res) => res.status(403).send({ message: "Invalid credentials", status: "error" })

const handler = async (req, res) => {
  //if (!req.method !== "POST") return InvalidReq(res)
  const { name, pass } = req.body
  if (typeof name !== "string" || typeof pass !== "string") return InvalidReq(res)

  await prisma.$connect()
  const maybeUser = await prisma.user.findFirst({ where: { name } })
  if (!maybeUser) {
    await prisma.$disconnect()
    return InvalidCred(res)
  }

  const { pass: hash, ...user } = maybeUser
  const rightPassword = bcrypt.compareSync(pass, hash)
  if (!rightPassword) {
    await prisma.$disconnect()
    return InvalidCred(res)
  }
  const token = crypto.randomBytes(128).toString("base64")

  setResCookie(res, cookieName, token)
  res.send({ status: "ok" })

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
