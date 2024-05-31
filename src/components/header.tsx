'use client'

// import * as React from 'react'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ThemeSwitch } from '@/components/theme-switch'
import Icon from '@/components/ui/icons'
import Link from 'next/link'

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl">
          <Link href="/">
            <Avatar className="inline-block align-middle mr-2">
              <AvatarImage src="/icon.png" alt="Spacemesh" />
            </Avatar>
            <span className="relative" style={{ top: '1px' }}>
              smh-client
            </span>
          </Link>
        </h1>
        <ul>
          <li className="inline-block align-middle ml-2">
            <ThemeSwitch />
          </li>
          <li className="inline-block align-middle ml-2">
            <Link
              href="https://github.com/steve-king/smh-client"
              target="_blank"
            >
              <Button variant="ghost" size="icon">
                <Icon.github />
              </Button>
            </Link>
          </li>
          <li className="inline-block align-middle ml-2">
            <Button variant="ghost" size="icon">
              <Icon.bolt />
            </Button>
          </li>
        </ul>
      </div>
      <Separator />
    </header>
  )
}

export { Header }
