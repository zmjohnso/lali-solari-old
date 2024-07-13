export interface Photo {
  fields: {
    description: string;
    file: {
      contentType: string;
      details: {
        image: {
          width: number;
          height: number;
        };
        size: number;
      };
      fileName: string;
      url: string;
    };
    title: string;
  };
}

export interface Gallery {
  fields: {
    name: string;
    description: string;
  };
  sys: {
    id: string;
  };
}

export interface GalleryItem {
  title: string;
  photo: Photo;
  thumbnail: Photo;
  gallery: Gallery;
  paintingData: PaintingData;
}

export interface MinimumHomePage {
  title: string;
  gallery: Gallery;
  thumbnail: Photo;
}

export interface PaintingData {
  fields: {
    size: string;
    technique: string;
  };
}

export interface Manifesto {
  title: string;
  description: string;
  media: Photo[];
}

export interface About {
  title: string;
  description: string;
  media: Photo[];
}

export type Locale = "en-US" | "es";
