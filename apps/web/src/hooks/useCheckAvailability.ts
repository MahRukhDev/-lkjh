import { useEffect, useState } from 'react'

/** @ref https://dashboard.moonpay.com/api_reference/client_side_api#ip_addresses */
interface MoonpayIPAddressesResponse {
  alpha3?: string
  isAllowed?: boolean
  isBuyAllowed?: boolean
  isSellAllowed?: boolean
}
const REACT_APP_MOONPAY_API = 'https://api.moonpay.com'
const REACT_APP_MOONPAY_PUBLISHABLE_KEY = 'pk_test_1Ibe44lMglFVL8COOYO7SEKnIBrzrp54'

async function getMoonpayAvailability(): Promise<boolean> {
  const moonpayPublishableKey = REACT_APP_MOONPAY_PUBLISHABLE_KEY
  if (!moonpayPublishableKey) {
    throw new Error('Must provide a publishable key for moonpay.')
  }
  const moonpayApiURI = REACT_APP_MOONPAY_API
  if (!moonpayApiURI) {
    throw new Error('Must provide an api endpoint for moonpay.')
  }
  const res = await fetch(`${moonpayApiURI}/v4/ip_address?apiKey=${moonpayPublishableKey}`)
  const data = await (res.json() as Promise<MoonpayIPAddressesResponse>)
  return data.isBuyAllowed ?? false
}

export function useFiatOnrampAvailability(shouldCheck: boolean, callback?: () => void) {
  const [fiatOnarampAvailability, setFiatOnrampAvailability] = useState<boolean>(false)
  const [availabilityChecked, setAvailabilityChecked] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function checkAvailability() {
      setError(null)
      setLoading(true)
      try {
        const result = await getMoonpayAvailability()
        if (stale) return
        setFiatOnrampAvailability(result)
        if (result && callback) {
          callback()
        }
      } catch (e) {
        console.error('Error checking onramp availability', e.toString())
        if (stale) return
        setError('Error, try again later.')
        setFiatOnrampAvailability(false)
      } finally {
        if (!stale) setLoading(false)
      }
    }

    if (shouldCheck) {
      checkAvailability()
      setAvailabilityChecked(true)
    }

    let stale = false
    return () => {
      stale = true
    }
  }, [callback, shouldCheck, availabilityChecked])

  return { fiatOnarampAvailability, availabilityChecked, loading, error }
}
