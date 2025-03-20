// import type React from "react"
// import type { Metadata } from "next"
// import { Inter, Oswald } from "next/font/google"
// import "./globals.css"
// import Navbar from "@/components/navbar"
// import Footer from "@/components/footer"
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// })

// const oswald = Oswald({
//   subsets: ["latin"],
//   variable: "--font-oswald",
// })

// export const metadata: Metadata = {
//   title: "Jeugdhuis De Choke",
//   description: "De coolste jeugdhuis voor de jeugd!",
// }

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   return (
//     <html lang="nl" suppressHydrationWarning>
//       <body className={`${inter.variable} ${oswald.variable} font-sans`}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           <div className="flex min-h-screen flex-col">
//             <Navbar />
//             <main className="flex-1">{children}</main>
//             <Footer />
//           </div>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }

