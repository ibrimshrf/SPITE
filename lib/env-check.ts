// Environment configuration helpers.
//
// SPITE no longer blocks the whole application when optional external
// services are not configured. Individual features may still require their
// own variables (Neon, fal.ai, R2), but the UI is allowed to boot without
// them.

const REQUIRED_ENV_VARS = [
  'DATABASE_URL',
  'APP_PASSWORD',
  'FAL_KEY',
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET_NAME',
] as const

export type RequiredEnvVar = (typeof REQUIRED_ENV_VARS)[number]

export interface EnvCheckResult {
  ok: boolean
  missing: RequiredEnvVar[]
}

export function checkRequiredEnv(): EnvCheckResult {
  // Missing integrations must not prevent SPITE itself from booting.
  // Keep the shape stable for callers while disabling the global setup gate.
  return { ok: true, missing: [] }
}

export const ENV_VAR_HINTS: Record<RequiredEnvVar, string> = {
  DATABASE_URL: 'Neon Postgres connection string — neon.tech → your project → Connection string',
  APP_PASSWORD: 'The password you\'ll type at the SPITE login screen. Choose anything strong.',
  FAL_KEY: 'fal.ai API key — fal.ai → Dashboard → Keys',
  R2_ACCOUNT_ID: 'Cloudflare R2 account ID — visible in the right sidebar of any R2 page',
  R2_ACCESS_KEY_ID: 'Cloudflare R2 access key — Cloudflare dashboard → R2 → Manage API tokens',
  R2_SECRET_ACCESS_KEY: 'Cloudflare R2 secret key — issued alongside the access key above',
  R2_BUCKET_NAME: 'The name of the R2 bucket you created for SPITE',
}
