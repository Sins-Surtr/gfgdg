export type APIBook = {
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      publisher?: string;
      imageLinks?: {
        thumbnail?: string;
      };
    };
  };
  