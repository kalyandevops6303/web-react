declare module '*.html' {
  const rawHtmlFile: string;
  export = rawHtmlFile;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare interface ImportMeta {
  env: {
    VITE_BUGSNAG_API_KEY: string;
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_APP_ID: string;
    VITE_APP_REGION: string;
    GOOGLE_ANALYTICS_TRACKING_ID: string;
    VITE_HOTJAR_TRACKING_ID: number;
    VITE_VAPID: string;
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;
    PUBLIC_URL: string;
  };
}

declare global {
  interface Window {
    dataLayer: any;
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: { credential: string }) => void }) => void;
          renderButton: (
            container: HTMLElement | null,
            options: { type: string; size: string; shape: string; width?: number; logo_alignment: string },
          ) => void;
        };
      };
    };
  }
}
export {};
