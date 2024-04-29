import Link from "next/link"

interface Props {
  text: string
  href: string
  icon: JSX.Element,
  onClickHandled?: (e: React.MouseEvent<HTMLElement>) => void
}

export const SidebarLink = ({ text, href, icon, onClickHandled }: Props) => {
  return (
    <Link
      onClick={onClickHandled}
      href={href}
      className="flex items-center mt-10 p-2 hover:bg-grey-100 rounded transition-all hover:bg-gray-100"
    >
      {icon}
      <span className="ml-3 text-xl">{text}</span>
    </Link>
  )
}