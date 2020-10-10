import BigNumber from 'bignumber.js'
import React, {useCallback, useMemo, useState} from 'react'
import styled from 'styled-components'
import {useWallet} from 'use-wallet'
import {Contract} from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'

import {useLotteryAllowance} from '../../../hooks/useAllowance'
import {useLotteryApprove} from '../../../hooks/useApprove'
import useTickets, {useWinningNumbers, useTotalClaim} from '../../../hooks/useTickets'
import useModal from '../../../hooks/useModal'
import useStakedBalance from '../../../hooks/useStakedBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake from '../../../hooks/useUnstake'
import {getBalanceNumber, getFullDisplayBalance} from '../../../utils/formatBalance'
import useBuyLottery from '../../../hooks/useBuyLottery'

import WalletProviderModal from '../../../components/WalletProviderModal'
import AccountModal from '../../../components/TopBar/components/AccountModal'
import TokenInput from "../../../components/TokenInput";
import Modal from "../../../components/Modal";
import DepositModal from "../../Stake/components/DepositModal";
import BuyModal from "./BuyModal";
import {contractAddresses} from "../../../sushi/lib/constants";
import IconButton from "../../../components/IconButton";
import {AddIcon} from "../../../components/icons";

const PurchasedTickets: React.FC = () => {
    const [requestedApproval, setRequestedApproval] = useState(false)
    const [requesteBuy, setRequestedBuy] = useState(false)
    const {account} = useWallet()

    // const [val, setVal] = useState('')

    const allowance = useLotteryAllowance()
    const {onApprove} = useLotteryApprove()

    const myTicketNumbers = ['1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234', '1111', '1234']
    const tokenBalance = useTokenBalance(contractAddresses.lottery["97"])
    // const stakedBalance = useStakedBalance(pid)


    // const {onStake} = useStake(pid)
    // const {onUnstake} = useUnstake(pid)

    // TODO:
    // const [onPresentBuy] = useModal(
    // )

    // TEMP example
    const {onBuy} = useBuyLottery()
    const tickets = useTickets()
    const winNumbers = useWinningNumbers()
    const claimAmount = useTotalClaim()

    const listItems = myTicketNumbers.map((number) =>
        <p>{number}</p>
    );

    console.log(claimAmount)

    const [onPresentDeposit] = useModal(
        <BuyModal
            max={tokenBalance}
            onConfirm={onBuy}
            tokenName={'CAKE'}
        />,
    )

    const handleApprove = useCallback(async () => {
        try {
            setRequestedApproval(true)
            const txHash = await onApprove()
            // user rejected tx or didn't go thru
            if (!txHash) {
                setRequestedApproval(false)
            }
        } catch (e) {
            console.log(e)
        }
    }, [onApprove, setRequestedApproval])

    const handleBuy = useCallback(async () => {
        try {
            setRequestedBuy(true)
            const txHash = await onBuy('5', [3, 5, 1, 4])
            // user rejected tx or didn't go thru
            if (txHash) {
                setRequestedBuy(false)
            }
        } catch (e) {
            console.log(e)
        }
    }, [onBuy, setRequestedBuy])

    const [onPresentAccountModal] = useModal(<AccountModal/>)
    const [onPresentWalletProviderModal] = useModal(
        <WalletProviderModal/>,
        'provider',
    )
    const handleUnlockClick = useCallback(() => {
        onPresentWalletProviderModal()
    }, [onPresentWalletProviderModal])

    return (
        <TicketsList>
            <h2>{listItems}</h2>
        </TicketsList>
    )
}

const TicketsList = styled.div`
  margin-top: 2em;
  padding-left: 5em;
  padding-right: 5em;
  overflow-y: auto;
  max-height: 400px;
  color: ${props => props.theme.colors.primary};
`

export default PurchasedTickets
