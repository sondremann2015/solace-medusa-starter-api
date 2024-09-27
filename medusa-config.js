const { loadEnv, defineConfig } = require("@medusajs/utils");

loadEnv(process.env.NODE_ENV, process.cwd());

const { Modules } = require("@medusajs/utils");

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    database_extra: { ssl: { rejectUnauthorized: false } },
    database_driver_options: {
      connection: { ssl: { rejectUnauthorized: false } },
    },
    http: {
      storeCors: process.env.STORE_CORS,
      adminCors: process.env.ADMIN_CORS,
      authCors: process.env.AUTH_CORS,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    [Modules.FILE]: {
      resolve: "@medusajs/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3",
            id: "s3",
            options: {
              file_url: process.env.DO_SPACE_URL,
              access_key_id: process.env.DO_SPACE_ACCESS_KEY,
              secret_access_key: process.env.DO_SPACE_SECRET_KEY,
              region: process.env.DO_SPACE_REGION,
              bucket: process.env.DO_SPACE_BUCKET,
              endpoint: process.env.DO_SPACE_ENDPOINT,
            },
          },
        ],
      },
    },
  },
});
