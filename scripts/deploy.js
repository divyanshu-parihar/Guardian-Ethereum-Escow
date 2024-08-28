async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const HelloWorld = await ethers.getContractFactory("Escrow");
  const contract = await HelloWorld.deploy();
  console.log("Contract deployed at ", contract.target);

  const saySomething = await contract.saySomething();

  console.log("saySomething value:", saySomething);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
