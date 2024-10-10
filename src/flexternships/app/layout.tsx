import "@flexternships/styles/tailwind.css"
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from "@flexternships/app/components/theme-provider"

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${montserrat.variable} font-sans`}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
