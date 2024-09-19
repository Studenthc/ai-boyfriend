export {};

declare global {
  interface Window {
    gtag?: (command: string, id: string, config?: object) => void;
  }
}