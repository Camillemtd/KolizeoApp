import { isValidClub, mapClubToConfigName } from "@/lib/unity/config"

describe("isValidClub", () => {
  it("devrait retourner true pour fcmetz", () => {
    expect(isValidClub("fcmetz")).toBe(true)
  })

  it("devrait retourner true pour metzhandball", () => {
    expect(isValidClub("metzhandball")).toBe(true)
  })

  it("devrait être insensible à la casse", () => {
    expect(isValidClub("FCMETZ")).toBe(true)
    expect(isValidClub("MetzHandball")).toBe(true)
    expect(isValidClub("FcMeTz")).toBe(true)
  })

  it("devrait retourner false pour un club invalide", () => {
    expect(isValidClub("invalid")).toBe(false)
    expect(isValidClub("paris")).toBe(false)
    expect(isValidClub("")).toBe(false)
  })
})

describe("mapClubToConfigName", () => {
  it("devrait mapper fcmetz vers FcMetz_Config", () => {
    expect(mapClubToConfigName("fcmetz")).toBe("FcMetz_Config")
  })

  it("devrait mapper metzhandball vers MetzHandball_Config", () => {
    expect(mapClubToConfigName("metzhandball")).toBe("MetzHandball_Config")
  })

  it("devrait être insensible à la casse", () => {
    expect(mapClubToConfigName("FCMETZ")).toBe("FcMetz_Config")
    expect(mapClubToConfigName("MetzHandball")).toBe("MetzHandball_Config")
  })

  it("devrait lancer une erreur pour un club non reconnu", () => {
    expect(() => mapClubToConfigName("invalid")).toThrow(
      "Club non reconnu: invalid"
    )
  })
})
