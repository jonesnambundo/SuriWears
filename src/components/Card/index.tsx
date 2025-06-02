import type { JSX } from "react"

type Props = {
    children: JSX.Element
    title: string
}

function Card({children, title}: Props) {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  )
}

export default Card
