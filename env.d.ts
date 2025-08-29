/// <reference types="vite/client" />

declare namespace chrome {
  var runtime: {
    getURL(path: string): string
  }
}
