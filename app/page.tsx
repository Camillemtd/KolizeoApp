"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #1e3a8a, #1e40af, #7f1d1d)",
      }}
    >
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-2xl">
            Kolizeo
          </h1>
          <p className="text-xl md:text-2xl text-white/90 font-light mb-2">
            Vos clubs sportifs
          </p>
          <div className="w-32 h-1 bg-white mx-auto mt-6 rounded-full shadow-lg" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <Link
            href="/fcmetz"
            className="group relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            style={{
              background: "linear-gradient(to bottom right, #dc2626, #991b1b)",
            }}
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-wider">
                FC METZ
              </h2>
              <p className="text-white/80 text-lg mb-6">Club de football</p>
              <div className="flex items-center text-white/90 font-semibold">
                <span>Accéder aux liens</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </Link>

          <Link
            href="/metzhandball"
            className="group relative overflow-hidden rounded-3xl p-8 md:p-12 text-white shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            style={{
              background: "linear-gradient(to bottom right, #2563eb, #1e40af)",
            }}
          >
            <div
              className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-wider">
                METZ HANDBALL
              </h2>
              <p className="text-white/80 text-lg mb-6">Club de handball</p>
              <div className="flex items-center text-white/90 font-semibold">
                <span>Accéder aux liens</span>
                <svg
                  className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
