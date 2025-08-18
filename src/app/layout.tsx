import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sojourn — Life on Kepler-442b",
  description: "A visionary exploration of sustainable civilization on terraformed Kepler-442b. Experience the journey from early settlement to thriving ecological metropolis through immersive art and cutting-edge design.",
  keywords: ["sojourn", "kepler-442b", "terraforming", "sustainable design", "futurism", "ecology", "interstellar colonization"],
  authors: [{ name: "Sojourn Collective" }],
  openGraph: {
    title: "Sojourn — Life on Kepler-442b",
    description: "Discover the future of human civilization on a distant world through sustainable design and ecological harmony",
    type: "website",
    images: ["/og-sojourn.jpg"],
  },
  metadataBase: new URL('https://sojourn-kepler.vercel.app'),
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