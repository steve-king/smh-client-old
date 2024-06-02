import { useEffect, useState } from 'react'
interface Props {
  secs?: number
  len?: number
  char?: string
}

export const Loader = ({ secs = 1, len = 3, char = '.' }: Props) => {
  const [text, setText] = useState('')

  useEffect(() => {
    let charCount = 0

    const interval = setInterval(() => {
      setText(char.repeat(charCount))
      charCount = (charCount + 1) % (len + 1)
    }, secs * 1000)

    return () => clearInterval(interval)
  }, [secs, len, char])

  return (
    <div
      className="text-left inline-block relative"
      style={{
        minWidth: len + 'ch',
      }}
    >
      {text}
    </div>
  )
}

export default Loader
