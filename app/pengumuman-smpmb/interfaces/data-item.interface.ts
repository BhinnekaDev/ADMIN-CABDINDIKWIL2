export interface SpmbMediaImage {
  id?: number;
  image_url: string;
  dibuat_pada?: string;
}

export interface SpmbMediaFile {
  id?: number;
  file_url: string;
  dibuat_pada?: string;
}

export interface DataItemSpmb {
  id: number;
  judul: string;
  link_text: string;
  link_url: string;
  dibuat_pada: string;
  diperbarui_pada: string;
  spmb_media_image: SpmbMediaImage[];
  spmb_media_file: SpmbMediaFile[];
}

export interface DataItemNonIdSpmb {
  id?: number;
  judul: string;
  link_text: string;
  link_url: string;
  spmb_media_image: SpmbMediaImage[];
  spmb_media_file: SpmbMediaFile[];
}
