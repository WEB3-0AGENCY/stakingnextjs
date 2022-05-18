/* eslint-disable react-hooks/exhaustive-deps */
//Amount of token in wallet
//Amount of token staked
//Amount of token earned

import { useMoralis, useWeb3Contract} from "react-moralis"
import { stakingAddress, stakingAbi, rewardTokenAddress, testTokenAbi } from "../constants"

/**
    this is use to keep track of the state of different states in our website.
    @useState is a way to check a value/state and rerender the frontEnd whenever its updated
 */
import { useState } from "react" 

/**
 uesEffect takes in two parameters one is a function to call when something changes and the other is an array of dependices 
 whenever an item in the array of dependencies changes, we run the function
 */ 
import { useEffect } from "react"
import {ethers} from "ethers"


export default function StakeDetails(){
    /**
    This returns the wallet address/account conneected to the dapp.
    @rtBalance returns the balance of the reward token
    @setRtBalance sets the rtBalance. when this gets set we rerender thefronEnd
    @isWeb3Enabled checks if the user has connected their wallet
    */
    const {account, isWeb3Enabled} = useMoralis()  
    const [rtBalance, setRtBalance] = useState("0")
    
    
    /**
     this allows us to call any function in the smart contract.
     @grtRewardTokenBalance makeas an api call to the blockchain Node and returns the amount of token the account holds
     */
    const { runContractFunction: getRewardTokenBalance } = useWeb3Contract({
        abi: testTokenAbi, 
        contractAddress: rewardTokenAddress,
        functionName: "balanceOf",
        params: {
            account: account,
        }
    })
    
    useEffect(() => {

        if (isWeb3Enabled && account){
            updateUiValues()
        } 
    }, [account, isWeb3Enabled])

    async function updateUiValues() {
        const rtBalanceFromContract = ( 
            await getRewardTokenBalance({onError: (error) => console.log(error)}) 
        ).toString()
        
        const formattedRtBallanceFromContract = ethers.utils.formatUnits(
            rtBalanceFromContract, "ethers"
        ).toString()
        
        setRtBalance(formattedRtBallanceFromContract)

    }

    return(
        <div>
            <div>
                Reward Token Balance: {rtBalance} 
            </div>
        </div>
    )
}