import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SolarPunk City — Life on Mars",
  description: "A visionary exploration of sustainable civilization on terraformed Mars. Experience the journey from early settlement to thriving ecological metropolis through immersive art and cutting-edge design.",
  keywords: ["solarpunk", "mars", "terraforming", "sustainable design", "futurism", "ecology", "space colonization"],
  authors: [{ name: "SolarPunk Collective" }],
  openGraph: {
    title: "SolarPunk City — Life on Mars",
    description: "Discover the future of human civilization on Mars through sustainable design and ecological harmony",
    type: "website",
    images: ["/og-solarpunk.jpg"],
  },
  metadataBase: new URL('https://solarpunk-mars.vercel.app'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">

      <body className="font-body antialiased">
        {/* Background Elements */}
        <div className="fixed inset-0 mesh-gradient -z-50" />
        <div className="fixed inset-0 pattern-dots opacity-30 -z-40" />
        
        {/* Main Content */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Floating Elements */}
        <div className="fixed top-20 right-20 w-2 h-2 bg-sage-400/40 rounded-full floating -z-30" style={{ animationDelay: '0s' }} />
        <div className="fixed top-1/3 left-10 w-1 h-1 bg-mars-400/40 rounded-full floating -z-30" style={{ animationDelay: '2s' }} />
        <div className="fixed bottom-1/4 right-1/3 w-1.5 h-1.5 bg-azure-400/40 rounded-full floating -z-30" style={{ animationDelay: '4s' }} />
      </body>
    </html>
  );
}