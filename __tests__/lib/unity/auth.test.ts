const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>
global.fetch = mockFetch

describe("authenticateUnity", () => {
  beforeEach(() => {
    // Réinitialiser les mocks avant chaque test
    jest.clearAllMocks()
    // Réinitialiser le module pour vider le cache
    jest.resetModules()
    // Réinitialiser process.env
    process.env.UNITY_PROJECT_ID = "test-project-id"
  })

  afterEach(() => {
    delete process.env.UNITY_PROJECT_ID
  })

  it("devrait retourner un token valide", async () => {
    // On doit réimporter le module pour chaque test à cause du cache
    const { authenticateUnity } = await import("@/lib/unity/auth")

    // Mock de la réponse Unity
    const mockResponse = {
      idToken: "test-token-123",
      sessionToken: "test-session-123",
      expiresIn: 3600,
      userId: "test-user-123",
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response)

    const token = await authenticateUnity()

    expect(token).toBe("test-token-123")
    expect(global.fetch).toHaveBeenCalledWith(
      "https://player-auth.services.api.unity.com/v1/authentication/anonymous",
      {
        method: "POST",
        headers: {
          ProjectId: "test-project-id",
        },
      }
    )
  })

  it("devrait utiliser le cache si le token est encore valide", async () => {
    // On doit réimporter le module pour chaque test à cause du cache
    const { authenticateUnity } = await import("@/lib/unity/auth")

    // Premier appel - mock de la réponse
    const mockResponse = {
      idToken: "cached-token-123",
      sessionToken: "test-session",
      expiresIn: 3600, // 1 heure
      userId: "test-user",
    }

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as unknown as Response)

    // Premier appel
    const token1 = await authenticateUnity()
    expect(token1).toBe("cached-token-123")
    expect(global.fetch).toHaveBeenCalledTimes(1)

    // Deuxième appel - devrait utiliser le cache
    const token2 = await authenticateUnity()
    expect(token2).toBe("cached-token-123")
    // Fetch ne devrait pas être appelé une deuxième fois
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })

  it("devrait lancer une erreur si UNITY_PROJECT_ID n'est pas défini", async () => {
    jest.resetModules()
    delete process.env.UNITY_PROJECT_ID
    const { authenticateUnity } = await import("@/lib/unity/auth")

    await expect(authenticateUnity()).rejects.toThrow(
      "UNITY_PROJECT_ID n'est pas défini dans les variables d'environnement"
    )
  })

  it("devrait lancer une erreur si l'API retourne une erreur", async () => {
    jest.resetModules()
    const { authenticateUnity } = await import("@/lib/unity/auth")

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      text: async () => "Internal Server Error",
    } as unknown as Response)

    await expect(authenticateUnity()).rejects.toThrow(
      "Erreur d'authentification Unity: 500 - Internal Server Error"
    )
  })

  it("devrait lancer une erreur si idToken est manquant dans la réponse", async () => {
    jest.resetModules()
    const { authenticateUnity } = await import("@/lib/unity/auth")

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        sessionToken: "test-session",
        expiresIn: 3600,
        userId: "test-user",
      }),
    } as unknown as Response)

    await expect(authenticateUnity()).rejects.toThrow(
      "Impossible de récupérer idToken depuis la réponse Unity"
    )
  })
})
