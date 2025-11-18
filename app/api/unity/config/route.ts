import { NextRequest, NextResponse } from "next/server"
import { getRemoteConfig, mapClubToConfigName } from "@/lib/unity/config"

/**
 * Route API pour récupérer la configuration Unity Remote Config
 * GET /api/unity/config?club=fcmetz&token=...
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const club = searchParams.get("club")
    const token = searchParams.get("token")

    if (!club) {
      return NextResponse.json(
        { error: "Paramètre 'club' manquant" },
        { status: 400 }
      )
    }

    if (!token) {
      return NextResponse.json(
        { error: "Paramètre 'token' manquant" },
        { status: 400 }
      )
    }

    const configName = mapClubToConfigName(club)
    const configData = await getRemoteConfig(token, configName)

    return NextResponse.json(configData)
  } catch (error) {
    console.error("Erreur lors de la récupération du Remote Config:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Erreur inconnue" },
      { status: 500 }
    )
  }
}
