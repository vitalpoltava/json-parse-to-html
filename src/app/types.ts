export interface Attrs {
  [key: string]: any;
}

export interface Branch {
  type: string;
  text?: string;
  attrs?: Attrs;
  content?: Content;
}

export type Content = Array<Branch>;
