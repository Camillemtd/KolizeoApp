import { isValidClub, mapClubToConfigName } from "@/lib/unity/config"
import { authenticateUnity } from "@/lib/unity/auth"
import { getRemoteConfig } from "@/lib/unity/config"
import { notFound } from "next/navigation"

interface ClubPageProps {
  params: Promise<{
    club: string
  }>
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { club } = await params

  // Valider que le club est autorisé
  if (!isValidClub(club)) {
    notFound()
  }

  // Récupérer le token Unity
  const token = await authenticateUnity()

  // Récupérer la configuration Remote Config
  const configName = mapClubToConfigName(club)
  const config = await getRemoteConfig(token, configName)

  const clubName = club.toUpperCase().replace(/([A-Z])([A-Z]+)/g, "$1$2")

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: config.BGColor }}
    >
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, ${config.BGColor} 0%, ${config.BGColor}dd 100%)`,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-16 pt-8">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-wider uppercase mb-2 drop-shadow-lg">
            {clubName}
          </h1>
          <div className="w-24 h-1 bg-white mx-auto my-4 rounded-sm shadow-[0_2px_10px_rgba(255,255,255,0.5)]" />
          <p className="text-white/90 text-lg font-light tracking-wide mt-4">
            Liens officiels
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-6 mt-8">
          {config.Buttons.map((button, index) =>
            button.active ? (
              <a
                key={index}
                href={button.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-2xl flex items-center justify-center w-full sm:w-auto sm:min-w-[280px] sm:max-w-sm min-h-[120px] px-6 py-8 text-lg font-bold text-gray-900 border-2 border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)] hover:border-white/30 active:translate-y-0 active:scale-100 cursor-pointer"
                style={{ backgroundColor: button.BGColor }}
              >
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
                <span className="relative z-10 tracking-wide">
                  {button.title}
                </span>
              </a>
            ) : (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl flex items-center justify-center w-full sm:w-auto sm:min-w-[280px] sm:max-w-sm min-h-[120px] px-6 py-8 text-lg font-bold text-gray-900 border-2 border-transparent shadow-[0_8px_24px_rgba(0,0,0,0.15),0_2px_8px_rgba(0,0,0,0.1)] opacity-50 cursor-not-allowed pointer-events-none"
                style={{ backgroundColor: button.BGColor }}
              >
                <span className="relative z-10 tracking-wide">
                  {button.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
