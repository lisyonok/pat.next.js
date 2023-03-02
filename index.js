const { PrismaClient } = require("@prisma/client")
const crypto = require("crypto")

var bcrypt = require("bcrypt")
var salt = bcrypt.genSaltSync(10)
var hash = bcrypt.hashSync("test123", salt)

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  await prisma.session.create({
    data: {
      token: "123",
      createdAt: new Date(),
      lastUsed: new Date(),
      User: {
        connect: { id: "6400b0984732c498db0c8dba" }
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
