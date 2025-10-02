"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        if (window.scrollY > 10) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }
      }

      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    } else {
      setScrolled(true)
    }
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = isOpen ? "auto" : "hidden"
  }

  const closeMenu = () => {
    setIsOpen(false)
    document.body.style.overflow = "auto"
  }

  const handleMenuClick = (href: string) => {
    closeMenu()
    setTimeout(() => {
      window.location.href = href
    }, 100)
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/events", label: "Evenementen" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
          scrolled || isOpen ? "bg-[rgb(147,4,4)]/90 backdrop-blur-md shadow-md" : "bg-transparent",
        )}
      >
        <div className={cn(
          "flex justify-between items-center transition-all duration-300",
          scrolled ? "py-2" : "py-5"
        )}>
          <Link href="/" className="relative z-[101]">
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
            className="md:hidden relative z-[101] flex items-center justify-center mr-5 w-10 h-10"
            onClick={toggleMenu}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8 text-white" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 bg-[rgb(147,4,4)] shadow-lg transition-transform duration-300 ease-in-out z-[100]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 p-2 text-white hover:text-white/80 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col h-full pt-20">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-white text-xl font-bold hover:text-white/80 transition-all duration-300 px-6 py-4",
                pathname === link.href && "bg-white/10",
              )}
              onClick={(e) => {
                e.preventDefault()
                handleMenuClick(link.href)
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[99] md:hidden"
          onClick={closeMenu}
        />
      )}
    </>
  )
}

export default Navbar

