/**
 * Fonctions pour l'authentification anonyme Unity
 */

export interface UnityAuthResponse {
  idToken: string
  sessionToken: string
  expiresIn: number
  userId: string
}

/**
 * Authentifie l'application de manière anonyme avec Unity
 * @returns Le token d'accès Unity (idToken)
 */
export async function authenticateUnity(): Promise<string> {
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

  return data.idToken
}
