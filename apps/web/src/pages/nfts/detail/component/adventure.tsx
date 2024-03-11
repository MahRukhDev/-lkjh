import Image from 'next/image'
import { useState } from 'react'
import { ellipseAddress } from 'utils/address'
import avatarPng from '../../../../../public/images/nfts2/avatar.png'
import Button from '../../../../components/Button'
import Modal from '../../../../components/Modal2'
import PriceInput from '../../../../components/PriceInput'

import infoWarn from '../../../../../public/images/nfts2/info-warn.svg'
import TokenSelect from '../../../../components/TokenSelect'
import { Wrapper } from './adventure.style'

export default function Adventure({ nft }: { nft: any }) {
  const [showListModal, setShowListModal] = useState(false)
  const [showMakeOfferModal, setShowMakeOfferModal] = useState(false)
  const [showListConfirmModal, setShowListConfirmModal] = useState(false)
  const [showCancelListModal, setShowCancelListModal] = useState(false)
  const dataList = [
    {
      label: 'Current Price',
      value: `${nft?.price} ACE`,
    },
    {
      label: 'Last sale',
      value: `${nft?.last_sale_price} ACE`,
    },
    {
      label: 'Top Bid',
      value: `${nft?.top_bid} ACE`,
    },
    {
      label: 'Collection  Floor',
      value: '12.26 ACE',
    },
  ]
  return (
    <Wrapper>
      <div className="sgt-adventure__wrapper">
        <div className="sgt-adventure__user">
          <img src={nft?.collection_avatar} alt="avatar" className="sgt-adventure__user-avatar" />
          <div className="sgt-adventure__user-name">{nft?.collection_name}</div>
        </div>
        <div className="sgt-adventure__title">{nft?.nft_name}</div>
        <div className="sgt-adventure__owner">Owner - {ellipseAddress(nft?.owner)}</div>
        <div className="sgt-adventure__list">
          {dataList.map((item, index) => {
            return (
              <div className="sgt-adventure__list-item" key={item.label}>
                <div className="sgt-adventure__list-item-label">{item.label}</div>
                <div
                  className="sgt-adventure__list-item-value"
                  style={{
                    color: index === 0 ? 'rgba(249, 143, 18, 1)' : '#fff',
                  }}
                >
                  {item.value}
                </div>
              </div>
            )
          })}
        </div>
        <div className="sgt-adventure__bottom">
          <Button
            type="gray"
            style={{
              marginRight: '8px',
              width: '260px',
            }}
            onClick={() => setShowMakeOfferModal(true)}
          >
            Make offer
          </Button>
          <Button
            style={{
              width: '260px',
            }}
          >
            List
          </Button>
        </div>

        {/* item不属于用户 */}
        {showMakeOfferModal && (
          <Modal title="Make offer" onClose={() => {}}>
            <>
              <PriceInput label="Offer Price" balance="12.00" onInput={() => {}} errorMsg="" suffix={<TokenSelect />} />
            </>
          </Modal>
        )}
        {/* item不属于用户-已上架 */}
        {showListConfirmModal && (
          <Modal title="🎉 You did it! " onClose={() => {}} confirmText="Share">
            You have successfully purchased item!{' '}
          </Modal>
        )}
        {/* item属于用户-未来上架 */}
        {showListModal && (
          <Modal title="List" onClose={() => {}}>
            <>
              <PriceInput
                label="Listing Price"
                balance="12.00"
                onInput={() => {}}
                errorMsg=""
                suffix={<TokenSelect />}
              />
              <div className="sgt-adventure__modal-fee-line">
                <div>Service Fee</div>
                <div>5%</div>
              </div>
              <div className="sgt-adventure__modal-total-box">
                <div className="sgt-adventure__modal-total-label">Total received</div>
                <div className="sgt-adventure__modal-total-value">0.95 ACE</div>
              </div>
            </>
          </Modal>
        )}
        {/* item属于用户-已上架 */}
        {showCancelListModal && (
          <Modal
            titleElement={
              <div
                style={{
                  display: 'flex',
                  fontSize: '16px',
                  lineHeight: '32px',
                  height: '32px',
                  fontWeight: 500,
                  alignItems: 'center',
                }}
              >
                <Image src={infoWarn} alt="warn icon" style={{ width: '16px', marginRight: '10px' }} />
                Cancel listing
              </div>
            }
            onClose={() => {}}
            showCancel
            onCancel={() => {}}
            onConfirm={() => {}}
          >
            Are you sure you want to cancel the listing?
          </Modal>
        )}
      </div>
    </Wrapper>
  )
}
