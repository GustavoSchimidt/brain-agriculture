import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: env.get('DB_CONNECTION', 'postgres'),

  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },

    sqlite: {
      client: 'sqlite3',
      connection: {
        filename: env.get('DB_CONNECTIONS_SQLITE_FILENAME', 'database/database.sqlite'),
      },
      pool: {
        min: 2,
        max: 6,
        createTimeoutMillis: 3000,
        acquireTimeoutMillis: 30000,
        idleTimeoutMillis: 30000,
        reapIntervalMillis: 1000,
        createRetryIntervalMillis: 100,
        propagateCreateError: false,
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
      useNullAsDefault: true,
    },
  },
})

export default dbConfig
