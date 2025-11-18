/**
 * Fonctions pour récupérer les configurations Unity Remote Config
 */

import type { ClubConfig } from "./types"

/**
 * Récupère la configuration Unity Remote Config pour un club donné
 * @param accessToken Token d'accès Unity (idToken)
 * @param configName Nom de la configuration (ex: "MetzHandball_Config", "FcMetz_Config")
 * @returns Les données de configuration typées
 */
export async function getRemoteConfig(
  accessToken: string,
  configName: string
): Promise<ClubConfig> {
  const projectId = process.env.UNITY_PROJECT_ID

  if (!projectId) {
    throw new Error(
      "UNITY_PROJECT_ID n'est pas défini dans les variables d'environnement"
    )
  }

  const url = new URL("https://config.unity3d.com/api/v1/settings")
  url.searchParams.set("projectId", projectId)
  url.searchParams.set("key", configName)

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Erreur Remote Config: ${response.status} - ${errorText}`)
  }

  const data = await response.json()

  const config = data.configs?.settings?.[configName] as ClubConfig | undefined

  if (!config) {
    throw new Error(`Clé de configuration "${configName}" non trouvée`)
  }

  return config
}

/**
 * Mappe le slug du club vers le nom de configuration Unity
 * @param clubSlug Slug du club (ex: "fcmetz", "metzhandball")
 * @returns Le nom de la configuration Unity
 */
export function mapClubToConfigName(clubSlug: string): string {
  const mapping: Record<string, string> = {
    fcmetz: "FcMetz_Config",
    metzhandball: "MetzHandball_Config",
  }

  const configName = mapping[clubSlug.toLowerCase()]
  if (!configName) {
    throw new Error(`Club non reconnu: ${clubSlug}`)
  }

  return configName
}

/**
 * Valide que le slug du club est autorisé
 * @param clubSlug Slug du club à valider
 * @returns true si le club est valide
 */
export function isValidClub(clubSlug: string): boolean {
  const validClubs = ["fcmetz", "metzhandball"]
  return validClubs.includes(clubSlug.toLowerCase())
}
