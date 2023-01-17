import type { RunningScriptOptions } from 'node:vm';

declare namespace config {
  export interface DatabaseConfig {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  }
  export interface ServerSettings {
    host?: string;
    port: number;
  }
  export interface ServerConfig {
    static: ServerSettings;
    http: ServerSettings;
    wd: ServerSettings;
    [apiTransportKey: string]: ServerSettings;
  }
  export type TransportKey = 'http' | 'ws';
  export type LoggerKey = 'native' | 'custom';
  export interface LoggerConfig {
    /** Selected logger service */
    serviceKey: LoggerKey;
    /** Path to the folder to store log files in. Relative path allowed. */
    logPath: string;
  }
  export interface HashingConfig {
    saltLength: number;
    keyLength: number;
  }
}

export const DB: config.DatabaseConfig;
export const SERVERS: config.ServerConfig;
/** Selected network transport for API */
export const transport: config.TransportKey;
export const LOGGER: config.LoggerConfig;
export const HASHING: config.HashingConfig;
export const SANDBOX_RUN_OPTIONS: RunningScriptOptions;
