//This file contains address and the abi used to for all the smartcontract to be called

const stakingAddress = "0xe8C31237233745eCa88D397Be7c8A74cB5098Ce1"
const rewardTokenAddress = "0xD6Fc45d424F296F83019Cf2e03F7917d230D6ac4"

const stakingAbi = require("./stakingAbi.json")
const testTokenAbi = require("./testTokenAbi.json")

module.exports = {
    stakingAbi,
    testTokenAbi, 
    stakingAddress,
    rewardTokenAddress
}