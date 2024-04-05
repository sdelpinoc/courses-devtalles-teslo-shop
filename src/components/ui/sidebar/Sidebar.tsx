'use client'

import { IoCloseOutline, IoIdCardOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoTicketOutline } from "react-icons/io5"
import clsx from "clsx"

import { SidebarLink } from "./SidebarLink"
import { useUIStore } from "@/store/ui/ui-store"

export const Sidebar = () => {
  const isMenuOpen = useUIStore(state => state.isSideMenuOpen)
  const closeMenu = useUIStore(state => state.closeSideMenu)

  return (
    <div>
      {/* Background */}
      {
        isMenuOpen && (
          <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
          />
        )
      }

      {/* Blur */}
      {
        isMenuOpen && (
          <div
            onClick={closeMenu}
            className="fade-in fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        )
      }

      {/* Sidemenu */}
      <nav className={
        clsx("fixed p-5 right-0 top-0 w-[400px] h-screen bg-white z-20 shadow-xl transform transition-all duration-300",
          {
            "translate-x-full": !isMenuOpen
          })
      }>
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => { closeMenu() }}
        />
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-golden-yugioh"
          />
        </div>
        {/* Menu */}
        <SidebarLink text="Profile" href="/" icon={<IoPersonOutline size={30} />} />
        <SidebarLink text="Orders" href="/" icon={<IoTicketOutline size={30} />} />
        <SidebarLink text="Login" href="/" icon={<IoLogInOutline size={30} />} />
        <SidebarLink text="Logout" href="/" icon={<IoLogOutOutline size={30} />} />
        {/* Line separator */}
        <div className="w-full h-px bg-gray-200 my-10" />
        <SidebarLink text="Cards" href="/" icon={<IoIdCardOutline size={30} />} />
        <SidebarLink text="Orders" href="/" icon={<IoTicketOutline size={30} />} />
        <SidebarLink text="Users" href="/" icon={<IoPeopleOutline size={30} />} />
      </nav>
    </div>
  )
}