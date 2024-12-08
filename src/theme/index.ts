
import { background, extendTheme, ThemeConfig } from '@chakra-ui/react';

export enum Mode {
  light = 'light',
  dark = 'dark'
};

const config: ThemeConfig = {
  initialColorMode: Mode.dark,
  useSystemColorMode: false,
};

const colors = {
  brand: {
    pink: '#ff007f',
    green: '#00ff99',
    purple: '#bb86fc',
    yellow: '#f7e327',
    blue: '#564fcc'
  },
  background: {
    dark: {
      main: 'linear-gradient(180deg, #2b1d3b, #1a0c22);',
      card: '#1a1a1a',
      accent: '#564fcc',
    },
    light: {
      main: 'linear-gradient(180deg, #fff9f3, #f3e8e0)',
      card: '#f5f5f5',
      accent: '#564fcc',
    }
  },
  text: {
    secondary: '#b0b0b0',
    neon: '#ff007f',
  },
  gradients: {
    button: 'linear-gradient(90deg, #ff007f, #00e0ff)',
    guidingLine: 'linear(to-b, #ff007f, #bb86fc)',
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === Mode.light ? 'background.light.main' : 'background.dark.main',
      color: props.colorMode === Mode.light ? '#000000' : '#ffffff',
      fontFamily: `'Poppins', sans-serif`,
    },
    h1: {
      color: 'brand.pink',
      fontSize: '8xl'
    },
    h2: {
      color: 'brand.blue',
    },
    a: {
      color: 'brand.purple',
      _hover: {
        color: 'brand.blue',
        textDecoration: 'underline',
      },
    },
    button: {
      bgGradient: 'gradients.button',
      _hover: {
        // bgGradient: 'linear(to-r, #00ff99, #ff007f)',
      },
      _active: {
        bg: props.colorMode === Mode.light ? '#000000' : '#ffffff',
        color: props.colorMode === Mode.light ? '#ffffff' : '#000'
      },
      // _focus: {
      //   background: props.colorMode === Mode.light ? '#000000' : '#ffffff',
      //   color: props.colorMode === Mode.light ? '#ffffff' : '#000'
      // }
    },
  }),
};

const theme = extendTheme({
  config,
  colors,
  styles,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});

export default theme;
