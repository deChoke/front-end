"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Events" },
    { href: "/photos", label: "Foto's" },
  ]

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || isOpen ? "bg-[rgb(147,4,4)]/90 backdrop-blur-md shadow-md" : "bg-transparent",
      )}
    >
      <div className={cn(
        "flex justify-between items-center transition-all duration-300",
        scrolled ? "py-2" : "py-5"
      )}>
        <Link href="/" className="relative z-50">
          <Image 
            src="/images/logo wit.png" 
            alt="Jeugdhuis De Choke" 
            width={600} 
            height={315} 
            className={cn(
              "w-auto transition-all duration-300 ml-5",
              scrolled ? "h-10 mt-0" : "h-14 mt-5"
            )} 
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 pr-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium text-lg transition-colors relative group",
                pathname === "/" 
                  ? "text-white hover:text-white/80" 
                  : scrolled || isOpen 
                    ? "text-white hover:text-white/80" 
                    : "text-gray-800 hover:text-primary",
                pathname === link.href && "font-bold",
              )}
            >
              {link.label}
              <span className={cn(
                "absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 ease-out -translate-x-1/2",
                pathname === "/" || scrolled || isOpen
                  ? "bg-white group-hover:w-full"
                  : "bg-primary group-hover:w-full"
              )} />
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-50 flex flex-col justify-center items-center w-10 h-10"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <div className={cn("hamburger-menu relative w-20 h-8 mr-16", isOpen && "open")}>
            <span className={cn(
              "absolute w-8 h-1 bg-white transition-all duration-300",
              isOpen ? "rotate-45 top-4" : "top-0"
            )} />
            <span className={cn(
              "absolute w-8 h-1 bg-white top-3 transition-all duration-300",
              isOpen ? "opacity-0" : "opacity-100"
            )} />
            <span className={cn(
              "absolute w-8 h-1 bg-white transition-all duration-300",
              isOpen ? "-rotate-45 top-4" : "top-6"
            )} />
          </div>
        </button>

        {/* Mobile Menu */}
        <div
          className={cn(
            "fixed inset-0 bg-[rgb(147,4,4)] flex flex-col justify-center items-center transition-all duration-500 ease-in-out",
            isOpen ? "opacity-100 visible" : "opacity-0 invisible",
          )}
        >
          <div className="flex flex-col items-center space-y-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-white text-5xl font-bold hover:text-white/80 transition-all duration-300 transform hover:scale-110",
                  pathname === link.href && "text-white/80",
                )}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

