/**
 * Types et interfaces pour Unity Services
 */

export interface UnityAuthResponse {
  idToken: string
  sessionToken: string
  expiresIn: number
  userId: string
}

export interface TokenCache {
  token: string
  expiresAt: number
}

export interface RemoteConfigData {
  [key: string]: unknown
}

export interface Button {
  active: boolean
  title: string
  url: string
  BGColor: string
}

export interface ClubConfig {
  BGColor: string
  Buttons: Button[]
}

export interface RemoteConfigResponse {
  configs?: {
    [key: string]: RemoteConfigData
  }
}

