// When adding new env variables to the codebase, update this array
export const ENV_VARIABLES = [
  {
    name: 'DATABASE_URL',
    description: 'Database connection string for Prisma ORM',
    instructions: `Set to your database connection string.

For SQLite: "file:./dev.db"
For PostgreSQL: "postgresql://user:password@localhost:5432/dbname"

See [Prisma docs](https://www.prisma.io/docs/concepts/database-connectors) for more details.`,
  },
] as const

export interface EnvVariable {
  name: string
  description: string
  instructions: string
}

export function checkMissingEnvVars(): string[] {
  return ENV_VARIABLES.filter(envVar => !process.env[envVar.name]).map(envVar => envVar.name)
}