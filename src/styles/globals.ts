import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;

      ::-webkit-scrollbar {
        width: 6px;
      }

      ::-webkit-scrollbar-track {
        background: #444444;
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: #cccccc;
        border-radius: 10px;
      }
    }

    :root {
      --foreground-rgb: 0, 0, 0;
      --background-start-rgb: 214, 219, 220;
      --background-end-rgb: 255, 255, 255;
    }

    @media (prefers-color-scheme: dark) {
      :root {
        --foreground-rgb: 255, 255, 255;
        --background-start-rgb: 0, 0, 0;
        --background-end-rgb: 0, 0, 0;
      }
    }

    body {
      color: rgb(var(--foreground-rgb));
      background: linear-gradient(
          to bottom,
          transparent,
          rgb(var(--background-end-rgb))
        )
        rgb(var(--background-start-rgb));
    }
  `;

export default GlobalStyle;
