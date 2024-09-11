import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { type ReactNode } from 'react'
import { cookieToInitialState } from 'wagmi'
import {ConnectButton} from '@rainbow-me/rainbowkit'
import "@rainbow-me/rainbowkit/styles.css"

import { getConfig } from '../wagmi'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Morphl2',
  description: 'Build on Morphl2',
  icons:{
    icon: 'https://cdn.galxe.com/tooljet/WechatIMG213.jpg'
  }
}

export default function RootLayout(props: { children: ReactNode }) {
  const initialState = cookieToInitialState(
    getConfig(),
    headers().get('cookie'),
  )
  return (
    <html lang="en">
      <body className='m-3'>
        <Providers initialState={initialState}>
          <div className='absolute right-5 m-5'>
            <ConnectButton/>
          </div>
          {props.children}</Providers>
      </body>
    </html>
  )
}
