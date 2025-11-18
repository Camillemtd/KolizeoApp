import Link from "next/link"

interface ClubNotFoundProps {
  club: string
}

export default function ClubNotFound({ club }: ClubNotFoundProps) {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(to bottom right, #111827, #1f2937, #111827)",
      }}
    >
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl md:text-8xl font-black text-white mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Club non trouvé
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Le club <span className="font-semibold text-white">{club}</span>{" "}
          n&apos;existe pas ou n&apos;est pas disponible.
        </p>
        <div className="space-y-4">
          <p className="text-gray-400 mb-6">Clubs disponibles :</p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/fcmetz"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
            >
              FC Metz
            </Link>
            <Link
              href="/metzhandball"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Metz Handball
            </Link>
          </div>
          <Link
            href="/"
            className="inline-flex items-center text-white/80 hover:text-white transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  )
}
