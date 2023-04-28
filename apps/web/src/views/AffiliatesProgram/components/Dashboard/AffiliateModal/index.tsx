import { useEffect, useState } from 'react'
import { ModalV2, Modal, Flex, Text, Checkbox, Button, Link } from '@pancakeswap/uikit'
import { useAccount } from 'wagmi'
import { useAtom } from 'jotai'
import { useTranslation } from '@pancakeswap/localization'
import useAuthAffiliateExist from 'views/AffiliatesProgram/hooks/useAuthAffiliateExist'
import atomWithStorageWithErrorCatch from 'utils/atomWithStorageWithErrorCatch'

const showAffiliateModalAtom = atomWithStorageWithErrorCatch('pcs::showAffiliateModalAtom', true)

const AffiliateModal = () => {
  const { t } = useTranslation()
  const { address } = useAccount()
  const { isAffiliateExist } = useAuthAffiliateExist()
  const [isOpen, setIsOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [showModal, setShowModal] = useAtom(showAffiliateModalAtom)

  useEffect(() => {
    // Close when switch address
    setIsOpen(address && isAffiliateExist && showModal)
  }, [address, isAffiliateExist, showModal])

  const handleCheckbox = () => setIsChecked(!isChecked)

  const handleCloseButton = () => {
    setIsOpen(false)
    setShowModal(false)
  }

  return (
    <ModalV2 isOpen={isOpen}>
      <Modal title={t('Affiliate Program Update')} maxWidth={['100%', '100%', '100%', '480px']} hideCloseButton>
        <Flex flexDirection="column">
          <Text mb="24px">
            <Text as="span">
              {t(
                'Our affiliate program’s terms and conditions have been updated as of May 2nd, 2023, with changes relating to',
              )}
            </Text>
            <Text as="span" bold m="0 4px">
              {t('section 2.1 (b) on slippage during trades.')}
            </Text>
            <Text as="span">{t('Please review the updates to ensure you agree with the revised terms.')}</Text>
          </Text>
          <label htmlFor="checkbox" style={{ display: 'block', cursor: 'pointer', marginBottom: '24px' }}>
            <Flex alignItems="center">
              <div style={{ flex: 'none' }}>
                <Checkbox id="checkbox" scale="sm" checked={isChecked} onChange={handleCheckbox} />
              </div>
              <Text fontSize="14px" ml="8px">
                {t('I have read and agree to the updated')}
                <Text display="inline-block" as="span" ml="4px">
                  <Link external href="https://docs.pancakeswap.finance/affiliate-program/terms-and-conditions">
                    {t('terms and conditions')}
                  </Link>
                </Text>
              </Text>
            </Flex>
          </label>
          <Button width="100%" disabled={!isChecked} onClick={handleCloseButton}>
            {t('Close')}
          </Button>
        </Flex>
      </Modal>
    </ModalV2>
  )
}

export default AffiliateModal
