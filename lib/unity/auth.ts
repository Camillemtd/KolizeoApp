/**
 * Fonctions pour l'authentification anonyme Unity
 */

import type { UnityAuthResponse, TokenCache } from "./types"

let tokenCache: TokenCache | null = null

/**
 * Authentifie l'application de manière anonyme avec Unity
 * Utilise un cache en mémoire pour éviter les appels API répétés
 * @returns Le token d'accès Unity (idToken)
 */
export async function authenticateUnity(): Promise<string> {
  const now = Date.now()
  const bufferTime = 5 * 60 * 1000

  if (tokenCache && tokenCache.expiresAt > now + bufferTime) {
    return tokenCache.token
  }

  const projectId = process.env.UNITY_PROJECT_ID

  if (!projectId) {
    throw new Error(
      "UNITY_PROJECT_ID n'est pas défini dans les variables d'environnement"
    )
  }

  const response = await fetch(
    "https://player-auth.services.api.unity.com/v1/authentication/anonymous",
    {
      method: "POST",
      headers: {
        ProjectId: projectId,
      },
    }
  )

  if (!response.ok) {
    const error = await response.text()
    throw new Error(
      `Erreur d'authentification Unity: ${response.status} - ${error}`
    )
  }

  const data = (await response.json()) as UnityAuthResponse

  if (!data.idToken) {
    throw new Error("Impossible de récupérer idToken depuis la réponse Unity")
  }

  const expiresAt = now + data.expiresIn * 1000

  tokenCache = {
    token: data.idToken,
    expiresAt,
  }

  return data.idToken
}
