import { isValidClub } from "@/lib/unity/config"
import { notFound } from "next/navigation"

interface ClubPageProps {
  params: Promise<{
    club: string
  }>
}

/**
 * Page dynamique pour les clubs
 * Routes: /fcmetz, /metzhandball
 */
export default async function ClubPage({ params }: ClubPageProps) {
  const { club } = await params

  // Valider que le club est autorisé
  if (!isValidClub(club)) {
    notFound()
  }

  // TODO: Récupérer le token Unity
  // TODO: Récupérer la configuration Remote Config
  // TODO: Afficher les liens avec les couleurs et titres

  return (
    <div>
      <h1>Club: {club}</h1>
      <p>Page en construction...</p>
    </div>
  )
}
