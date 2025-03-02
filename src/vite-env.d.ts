/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PROJECT_TOKEN: string;
  readonly VITE_DEV_API_URL: string;
  readonly VITE_PROD_API_URL: string;
  readonly VITE_SIGNOUT_CHECK_INTERVAL_MINUTES: string;
  readonly VITE_AVATAR: string;
  readonly VITE_SIDEBAR_IMAGE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
