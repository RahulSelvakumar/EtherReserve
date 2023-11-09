const hre = require("hardhat")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether')
}

async function main() {
  // Setup accounts & variables
  const [deployer] = await ethers.getSigners()
  const NAME = "TokenMaster"
  const SYMBOL = "TM"

  // Deploy contract
  const TokenMaster = await ethers.getContractFactory("TokenMaster")
  const tokenMaster = await TokenMaster.deploy(NAME, SYMBOL)
  await tokenMaster.deployed()

  console.log(`Deployed EtherReserve Contract at: ${tokenMaster.address}\n`)

  // List 6 events
  const occasions = [
    {
      name: "India vs Pakistan",
      cost: tokens(2),
      tickets: 0,
      date: "Oct 20",
      time: "6:00PM IST",
      location: "Eden Gardens- Kolkata"
    },
    {
      name: "newzealand vs Pakistan",
      cost: tokens(1),
      tickets: 125,
      date: "Nov 20",
      time: "2:00PM IST",
      location: "Chepauk- chennai"
    },
    {
      name: "ATK vs CFC",
      cost: tokens(0.25),
      tickets: 200,
      date: "SEP 10",
      time: "7:00PM IST",
      location: "Marina Arina, Chennai"
    },
    {
      name: "MCFC vs OFC",
      cost: tokens(5),
      tickets: 0,
      date: "SEP 11",
      time: "2:30PM IST",
      location: "DY patil, Mumbai"
    },
    {
      name: "Tamil Thalaivas vs Bengal Warriors",
      cost: tokens(1.5),
      tickets: 125,
      date: "NOV 23",
      time: "8:00PM IST",
      location: "Bangalore"
    }
  ]

  for (var i = 0; i < 5; i++) {
    const transaction = await tokenMaster.connect(deployer).list(
      occasions[i].name,
      occasions[i].cost,
      occasions[i].tickets,
      occasions[i].date,
      occasions[i].time,
      occasions[i].location,
    )

    await transaction.wait()

    console.log(`Listed Event ${i + 1}: ${occasions[i].name}`)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});