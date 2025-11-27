
export type DbType = 'postgres' | 'mysql' | 'mongodb' | 'sqlite' | 'firebird';

export interface Tenant {
  id: string; // @default(uuid()) but changed to 7-char alphanumeric
  dbType: DbType;
  dbEnvKey: string;
  createdAt: string; // DateTime @default(now())
  updatedAt: string; // DateTime @updatedAt
}

export interface Empresa {
  id: string; // Manual ID (not auto-generated)
  nome: string | null; // Nullable
  tenantId: string; // FK to Tenant
  createdAt: string; // DateTime @default(now())
  updatedAt: string; // DateTime @updatedAt
}

export const DB_TYPES: DbType[] = ['postgres', 'mysql', 'mongodb', 'sqlite', 'firebird'];
