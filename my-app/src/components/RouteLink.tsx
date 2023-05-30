import Link from "next/link";

const RouteLink = ({label, link, className = ''}: {label: string, link: string, className?: string}) => {
    return (
        <Link
            className={`w-fit h-fit p-4 font-bold text-xl
                        cursor-pointer select-none 
                        rounded-5 border border-solid border-[var(--border-rgb)] 
                        ${className}`}
            href={link}
        >
            {label}
        </Link>
    )
}

export default RouteLink