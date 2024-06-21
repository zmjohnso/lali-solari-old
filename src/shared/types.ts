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
}

export interface GalleryItem {
  title: string;
  photo: Photo;
  gallery: Gallery;
}
