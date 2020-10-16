export interface Attrs {
    textCSS: {
        [key: string]: string
    };
}

export interface Branch {
    type: string;
    text?: string;
    attrs: Attrs;
    content: Content;
}

export type Content = Array<Branch>;
