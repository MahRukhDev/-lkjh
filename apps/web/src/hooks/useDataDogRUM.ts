import { useEffect } from 'react'
import { datadogRum } from '@datadog/browser-rum'

let initialized = false

export function useDataDogRUM() {
  useEffect(() => {
    if (initialized) {
      return
    }
    const env = process.env.NEXT_PUBLIC_VERCEL_ENV
    const sessionSampleRate = env === 'production' ? 0.01 : 100
    datadogRum.init({
      enableExperimentalFeatures: ['feature_flags'],
      applicationId: process.env.NEXT_PUBLIC_DD_RUM_APP_ID || '',
      clientToken: process.env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN || '',
      site: process.env.NEXT_PUBLIC_DD_RUM_SITE || '',
      service: 'pancakeswap-web',
      env,
      sessionSampleRate,
      sessionReplaySampleRate: 10,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    })
    initialized = true
  }, [])
}
