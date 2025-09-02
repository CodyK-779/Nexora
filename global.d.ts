// global.d.ts
export {};

declare global {
  interface Window {
    cloudinary: {
      openUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
          sources?: string[];
          multiple?: boolean;
          folder?: string;
        },
        callback: (
          error: { message: string } | null,
          result: {
            event: string;
            info?: {
              secure_url?: string;
              public_id?: string;
              [key: string]: any;
            };
          }[]
        ) => void
      ) => void;
    };
  }
}
