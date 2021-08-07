/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-nested-ternary */
import { useModal, BaseLayout } from '@rug-zombie-libs/uikit';
import styled from 'styled-components'
import tokens from 'config/constants/tokens';
import { ethers } from 'ethers';
import { useTranslation } from 'contexts/Localization'
import { useIfoAllowance } from 'hooks/useAllowance';
import useTokenBalance from 'hooks/useTokenBalance';
import useToast from 'hooks/useToast'
import { getFullDisplayBalance } from 'utils/formatBalance'
import React, { useEffect, useState, useRef } from 'react';
import BigNumber from 'bignumber.js'
import { getAddress, getDrFrankensteinAddress } from 'utils/addressHelpers';
import { Token } from 'config/constants/types';
import { useDrFrankenstein, useERC20 } from '../../../../hooks/useContract';
import StakeModal from '../StakeModal';
import StakeZombieModal from '../StakeZombieModal';
import WithdrawZombieModal from '../WithdrawZombieModal';
import * as get from '../../../../redux/get'
import * as fetch from '../../../../redux/fetch'


const DisplayFlex = styled(BaseLayout)`
  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  grid-gap: 0px;
}`

interface StartFarmingProps {
  pid: number,
  isAllowance: boolean,
  updateAllowance: any,
  updateResult: any,
  zombieUsdPrice: number,
}

const StartFarming: React.FC<StartFarmingProps> = ({ pid, zombieUsdPrice, updateAllowance, updateResult }) => {
  const [isAllowanceForRugToken, setIsAllowanceForRugToken] = useState(false);
  const [isZombieAllowance, setZombieAllowance] = useState(!get.zombieAllowance().isZero());
  const [zombieBalance, setZombieBalance] = useState(get.zombieAllowance());
  const { toastSuccess } = useToast()
  const { t } = useTranslation()
  const [grave, setGrave] = useState(get.grave(pid))
  const { rug, userInfo, isClosed } = grave

  const onUpdate = () => {
    fetch.grave(pid, data => {
      setGrave(data)

    })
  }

  const [onPresentStake] = useModal(
    <StakeModal
      pid={pid}
      updateResult={onUpdate}
      updateAllowance={updateAllowance}
    />,
  );


  const [onPresentZombieStake] = useModal(
    <StakeZombieModal
      pid={pid}
      zombieBalance={zombieBalance}
      zombieUsdPrice={zombieUsdPrice}
      updateResult={onUpdate}
    />,
  )

  const [onPresentWithdrawStake] = useModal(
    <WithdrawZombieModal
      pid={pid}
      zombieBalance={zombieBalance}
      zombieUsdPrice={zombieUsdPrice}
      updateResult={onUpdate}
    />
  )


  const zmbeContract = useERC20(getAddress(tokens.zmbe.address));
  const drFrankenstein = useDrFrankenstein();

  let allowance;
  let rugContract;

  if (pid !== 0) {
    rugContract = useERC20(getAddress(rug.address));
    allowance = useIfoAllowance(rugContract, getDrFrankensteinAddress());
  }

  const zmbeBalance = useTokenBalance(getAddress(tokens.zmbe.address))

  useEffect(() => {
    if (pid !== 0) {
      if (parseInt(allowance.toString()) !== 0) {
        setIsAllowanceForRugToken(true);
      }
    }
    setZombieBalance(zmbeBalance);
  }, [allowance, drFrankenstein.methods, pid, rug.address, zmbeBalance])

  const handleUnlock = () => {
    drFrankenstein.methods.unlockFeeInBnb(pid).call().then((res) => {
      drFrankenstein.methods.unlock(pid)
        .send({ from: get.account(), value: res }).then(() => {
          toastSuccess(t('Grave unlocked'))
          onUpdate();
        })
    });
  }

  const handleApprove = () => {
    // if(account) {
      zmbeContract.methods.approve(getDrFrankensteinAddress(), ethers.constants.MaxUint256)
        .send({ from: get.account() }).then(() => {
          console.log("approved zmbe")
          toastSuccess(t('Approved ZMBE'))
          setZombieAllowance(true)
      })
    // }
  }

  const handleApproveRug = (token:Token) => {
    rugContract.methods.approve(getDrFrankensteinAddress(), ethers.constants.MaxUint256)
      .send({ from: get.account() }).then((res) => {
        if (parseInt(res.toString()) !== 0) {
          toastSuccess(t(`Approved ${token.symbol}`))
          setIsAllowanceForRugToken(true);
        } else {
          setIsAllowanceForRugToken(false);
        }
      })
  }

  const renderButtonsForGrave = () => {
    return <div className="space-between">
      {get.account() ?
        !userInfo.paidUnlockFee ?
          isZombieAllowance ?
          <button onClick={handleUnlock} className="btn btn-disabled w-100" type="button">Unlock Grave</button> :
          <button onClick={handleApprove} className="btn btn-disabled w-100" type="button">Approve ZMBE</button>
        :
        <div>
          <DisplayFlex>
            <span style={{ paddingRight: '50px' }} className="total-earned text-shadow">{getFullDisplayBalance(new BigNumber(userInfo.amount), tokens.zmbe.decimals, 4)}</span>
            <button onClick={onPresentWithdrawStake} style={{ marginRight: '10px' }} className="btn w-100" type="button">-</button>
            <button onClick={onPresentZombieStake} disabled={isClosed} className={`btn w-100 ${isClosed ? "btn-disabled" : ""}`} type="button">+</button>
          </DisplayFlex>
        </div>
        :  <span className="total-earned text-shadow">Connect Wallet</span>}
    </div>
  }

  const renderButtonsForTraditionalGraves = () => {
    return <div className="space-between">
      {get.account() ?
        isAllowanceForRugToken ?
        userInfo.rugDeposited.toString() === '0' ?
          <button onClick={onPresentStake} className="btn btn-disabled w-100" type="button">Deposit {rug.symbol}</button> :
          renderButtonsForGrave()
        : <button onClick={() => {handleApproveRug(rug)}} className="btn btn-disabled w-100" type="button">Approve {rug.symbol}</button>
      :  <span className="total-earned text-shadow">Connect Wallet</span>}</div>
  }

  return (
    <div className="frank-card">
      <div className="small-text">
        <span className="white-color">STAKING</span>
      </div>
      {pid === 0 ? renderButtonsForGrave() : renderButtonsForTraditionalGraves()}
    </div>
  )
}

export default StartFarming