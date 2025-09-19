import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
export const metadata = { title: 'ffmlops', description: 'Fantasy ML on Vercel' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<ClerkProvider><html lang="en"><body>{children}</body></html></ClerkProvider>)
}
