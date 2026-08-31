import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import { Shield, LayoutDashboard, Database, Activity, Settings } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Defense Lab | Mastercard',
  description: 'Autonomous AI Red Teaming Platform for Payment Security',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-mc-darker text-mc-text min-h-screen flex flex-col`}>
        <nav className="glass-panel sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-mc-red to-mc-orange">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <Link href="/" className="text-xl font-bold tracking-tight">
              AI Defense <span className="mc-gradient-text">Lab</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6 text-sm font-medium text-mc-muted">
            <Link href="/dashboard" className="hover:text-white transition-colors flex items-center gap-2">
              <LayoutDashboard size={16} /> Dashboard
            </Link>
            <Link href="/knowledge-graph" className="hover:text-white transition-colors flex items-center gap-2">
              <Database size={16} /> Knowledge Graph
            </Link>
            <Link href="/threat-intel" className="hover:text-white transition-colors flex items-center gap-2">
              <Activity size={16} /> Threat Intel
            </Link>
            <Link href="/ai-arena" className="hover:text-white transition-colors flex items-center gap-2">
              <Shield size={16} /> AI Arena
            </Link>
          </div>
        </nav>
        
        <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-12">
          {children}
        </main>
        
        <footer className="border-t border-mc-border mt-auto py-6 text-center text-sm text-mc-muted">
          &copy; {new Date().getFullYear()} Mastercard Innovation Challenge - Synthetic Red Teaming Platform (Simulation Only)
        </footer>
      </body>
    </html>
  )
}
