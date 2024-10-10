import { Metadata } from "next"
import { Button } from "@flexternships/app/components/ui/button"

export const metadata: Metadata = {
  title: "Next.js Enterprise Boilerplate",
  twitter: {
    card: "summary_large_image",
  },
  openGraph: {
    url: "https://next-enterprise.vercel.app/",
    images: [
      {
        width: 1200,
        height: 630,
        url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
      },
    ],
  },
}

export default function Web() {
  return (
    <>
      <main className="flex h-screen items-center justify-center gap-2">
        <h1>Hello world</h1>
        <Button>shadcn/ui button</Button>
      </main>
    </>
  )
}
