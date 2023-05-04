export interface FlickrImage {
    sizes: {
      canblog: number;
      canprint: number;
      candownload: number;
      size: {
        label: string;
        width: number;
        height: number;
        source: string;
        url: string;
        media: string;
      }[];
    };
    stat: string;
  }