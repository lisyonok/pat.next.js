const { PrismaClient } = require("@prisma/client")
const crypto = require('crypto')

var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync("test123", salt);

const prisma = new PrismaClient()

async function main() {
  // Connect the client
  await prisma.$connect()
  await prisma.user.create({
    data: {
      name: "Nick",
      email: "nick@mail.ru",
      pass: hash
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
