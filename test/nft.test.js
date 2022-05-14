const { expect } = require("chai");
const { ethers } = require("hardhat");


const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

describe("NFTeamWestCoastDapp", async function () {
    let deployer, addr1, addr2, nft, marketplace;
    let feePercent = 1;
    let nftName    = 'NFTeamWestCoast'
    let nftSymbol  = 'NFTWC'
    let nftBaseUri = 'uri_test' 
    beforeEach(
        async () => {
            //Get contract factories
            const NFT         = await ethers.getContractFactory("NFT")
            const Marketplace = await ethers.getContractFactory("Marketplace");

            //Get signers
            [deployer, addr1, addr2] = await ethers.getSigners();
            
            //Deploy contracts 
            nft         = await NFT.deploy(nftName, nftSymbol, nftBaseUri);
            marketplace = await Marketplace.deploy(feePercent);

        }
    )

    describe("Deployment", function() {
        it("Should see correct addresses", async function() {
            expect(`${process.env.PUBLIC_KEY_GANACHE1}`).to.equal(deployer.address)
            console.log(" deployer : " + deployer.address);
            expect(`${process.env.PUBLIC_KEY_GANACHE2}`).to.equal(addr1.address)
            console.log(" address 1 : " + addr1.address);
            expect(`${process.env.PUBLIC_KEY_GANACHE3}`).to.equal(addr2.address)
            console.log(" address 2 : " + addr2.address);
        })
        
        it("Should see correct name and symbol for NFT", async function() {
            expect(await nft.name()).to.equal(nftName)
            expect(await nft.symbol()).to.equal(nftSymbol)
        })
        

    })

    describe("Minting", function() {
        it("Should see correct balance, tokenId and URI for minted NFT", async function() {
            expect(await nft.balanceOf(addr1.address)).to.equal(1)
        })
    })
})
