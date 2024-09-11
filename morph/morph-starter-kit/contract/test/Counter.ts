import { expect } from "chai";
import { ethers } from "hardhat";
import { Counter } from "../typechain-types/Contract.sol/Counter";

describe("Counter Contract", function () {
  let counter: Counter; // Declare the Counter contract instance type
  let owner: any; // Signer

  beforeEach(async function () {
    // Get the contract factory and signers here
    const Counter = await ethers.getContractFactory("Counter");
    [owner] = await ethers.getSigners();

    // Deploy the contract
    counter = (await Counter.deploy()) as Counter;
  });

  it("Should initialize the count to 0", async function () {
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should increment the count", async function () {
    await counter.increment();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Should decrement the count", async function () {
    await counter.increment(); // Increment first to avoid negative count
    await counter.decrement();
    expect(await counter.getCount()).to.equal(0);
  });

  it("Should handle multiple increments and decrements", async function () {
    await counter.increment();
    await counter.increment();
    await counter.increment();
    expect(await counter.getCount()).to.equal(3);

    await counter.decrement();
    await counter.decrement();
    expect(await counter.getCount()).to.equal(1);
  });

  it("Should allow negative counts after multiple decrements", async function () {
    await counter.decrement();
    await counter.decrement();
    expect(await counter.getCount()).to.equal(-2);
  });
});
