/**
 * Fonctions pour récupérer les configurations Unity Remote Config
 */

export interface RemoteConfigData {
  [key: string]: unknown
}

export interface RemoteConfigResponse {
  configs: {
    [key: string]: {
      type: string
      value: unknown
    }
  }
}

/**
 * Récupère la configuration Unity Remote Config pour un club donné
 * @param accessToken Token d'accès Unity
 * @param configName Nom de la configuration (ex: "MetzHandball_Config", "FcMetz_Config")
 * @returns Les données de configuration
 */
export async function getRemoteConfig(
  accessToken: string,
  configName: string
): Promise<RemoteConfigData> {
  // TODO: Implémenter la récupération du Remote Config
  // Utiliser l'API Unity Remote Config avec le token
  void accessToken
  void configName
  throw new Error("Not implemented")
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
