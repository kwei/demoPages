import { ReactNode } from "react"


export const Header = ({title, descList, children}: {title: string, descList: string[], children?: ReactNode}) => {
  return (
    <header className="sticky z-10 top-0 bg-[var(--background)] flex flex-col w-full gap-4 p-4 md:p-8 ml:p-12">
      <h1 className="w-full text-2xl font-bold">{title}</h1>
      <p className="relative flex flex-col gap-1.25 text-sm">
        {descList.map((desc, index) => (
          <span key={index}>{desc}</span>
        ))}
      </p>
      {children}
    </header>
  )
}