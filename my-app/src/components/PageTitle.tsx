import { ReactNode } from "react"


export const PageTitle = ({title, descList, children}: {title: string, descList: string[], children?: ReactNode}) => {
  return (
    <div className="sticky z-10 top-0 bg-[var(--background)] flex flex-col w-full gap-4 py-4 md:py-8 ml:py-12">
      <h1 className="w-full text-3xl font-bold">{title}</h1>
      <p className="relative flex flex-col gap-1.25 text-xl">
        {descList.map((desc, index) => (
          <span key={index}>{desc}</span>
        ))}
      </p>
      {children}
    </div>
  )
}