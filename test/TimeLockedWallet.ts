import { ethers } from "hardhat";
import { expect } from "chai";

describe("TimeLockedWallet", function () {
    it("Should deploy with unlock time set", async function () {
        const [owner] = await ethers.getSigners();
        const unlockTime = (await ethers.provider.getBlock("latest")).timestamp + 60;

        const TimeLockedWallet = await ethers.getContractFactory("TimeLockedWallet");
        const wallet = await TimeLockedWallet.deploy(unlockTime, { value: ethers.utils.parseEther("1") });

        expect(await wallet.unlockTime()).to.equal(unlockTime);
        expect(await ethers.provider.getBalance(wallet.address)).to.equal(ethers.utils.parseEther("1"));
    });
});
