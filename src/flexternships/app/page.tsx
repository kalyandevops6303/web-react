// import { Metadata } from "next"

// export const metadata: Metadata = {
//   title: "Flexternships | TruNext",
//   twitter: {
//     card: "summary_large_image",
//   },
//   openGraph: {
//     url: "https://next-enterprise.vercel.app/",
//     images: [
//       {
//         width: 1200,
//         height: 630,
//         url: "https://raw.githubusercontent.com/Blazity/next-enterprise/main/.github/assets/project-logo.png",
//       },
//     ],
//   },
// }

export default function Web() {
  return (
    <>
      <main className="flex h-screen items-center justify-center gap-2">
        <h1>Welcome to TruNext App - Flexternships Demo</h1>
      </main>
    </>
  );
}
