import React from 'react'
import { Svg, SvgProps } from '@pancakeswap-libs/uikit'

const RibbonUpSide: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 32 64" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5013 0C4.65815 0 -0.670819 5.93959 0.0686475 12.7427C0.423944 16.0114 2.12624 18.8364 4.58664 20.6892C5.51702 21.3899 6.24525 22.3678 6.40046 23.5221C6.56956 24.7797 6.02972 26.0056 5.19007 26.957C3.15098 29.2675 2.04171 32.3907 2.38086 35.7068C2.97882 41.5536 7.90322 46 13.7805 46H18.4336V0H11.5013Z"
        fill="#3B2070"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5013 2C4.65815 2 -0.670819 7.93959 0.0686475 14.7427C0.423944 18.0114 2.12624 20.8364 4.58664 22.6892C5.51702 23.3899 6.24525 24.3678 6.40046 25.5221C6.56956 26.7797 6.02972 28.0056 5.19007 28.957C3.15098 31.2675 2.04171 34.3907 2.38086 37.7068C2.97882 43.5536 7.90322 48 13.7805 48H18.4336V2H11.5013Z"
        fill="#5E38AA"
      />
      <path d="M18 48H28V5C28 2.23857 25.7614 0 23 0H18V48Z" fill="#5E38AA" />
      <path d="M16.0151 46.2002C14.9409 55.689 22.4506 64 32 64V18L20 11L16.0151 46.2002Z" fill="#7645D9" />
      <path
        d="M20 13C20 15.7614 22.2386 18 25 18H28C28 18 30 14.5 30 8H25C22.2386 8 20 10.2386 20 13Z"
        fill="#4E2F8C"
      />
      <path fillRule="evenodd" clipRule="evenodd" d="M26 8H30V4C30 6.20914 28.2091 8 26 8Z" fill="#4E2F8C" />
      <path fillRule="evenodd" clipRule="evenodd" d="M27 18H20V11C20 14.866 23.134 18 27 18Z" fill="#7645D9" />
      <path d="M27 17C23.6863 17 21 14.3137 21 11" stroke="#3B2070" strokeWidth="2" />
      <path d="M27 7C28.1046 7 29 6.10457 29 5" stroke="#3B2070" strokeWidth="2" />
      <path d="M25 7C22.7909 7 21 8.79086 21 11" stroke="#3B2070" strokeWidth="2" />
      <path d="M29 5C29 2.79086 27.2091 1 25 1L18 1" stroke="#3B2070" strokeWidth="2" />
      <rect width="5" height="2" transform="matrix(1 0 0 -1 27 18)" fill="#3B2070" />
      <rect width="2" height="2" transform="matrix(1 0 0 -1 25 8)" fill="#3B2070" />
      <path d="M20 52C20 58.6274 25.3726 64 32 64L32 52L20 52Z" fill="#7645D9" />
    </Svg>
  )
}

export default RibbonUpSide
