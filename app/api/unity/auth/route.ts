import { NextResponse } from "next/server"
import { authenticateUnity } from "@/lib/unity/auth"

/**
 * Route API pour l'authentification anonyme Unity
 * GET /api/unity/auth
 */
export async function GET() {
  try {
    const accessToken = await authenticateUnity()
    return NextResponse.json({ access_token: accessToken })
  } catch (error) {
    console.error("Erreur d'authentification Unity:", error)
    const errorMessage =
      error instanceof Error ? error.message : "Erreur inconnue"
    return NextResponse.json(
      {
        error: "Erreur lors de l'authentification Unity",
        details: errorMessage,
      },
      { status: 500 }
    )
  }
}
