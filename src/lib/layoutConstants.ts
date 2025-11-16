export const LAYOUT = {
  MAX_CONTENT_WIDTH: '1440px',

  MARGINS: {
    MASTER: {
      DESKTOP: '60px',
      TABLET: '40px',
      MOBILE: '24px'
    },
    OUTER: {
      DESKTOP: '48px',
      TABLET: '32px',
      MOBILE: '20px'
    }
  },

  CARD: {
    BORDER_RADIUS: {
      LARGE: '32px',
      MEDIUM: '24px',
      SMALL: '20px'
    },
    PADDING: {
      DESKTOP: '80px',
      TABLET: '60px',
      MOBILE: '40px'
    },
    SHADOW: '0px 28px 60px rgba(0, 0, 0, 0.08)'
  },

  HEADER: {
    HEIGHT: '70px',
    SHRUNK_HEIGHT: '60px',
    BORDER_RADIUS: '32px',
    MAX_WIDTH: '1200px'
  },

  OVERLAP: {
    DESKTOP: '60px',
    TABLET: '40px',
    MOBILE: '30px'
  }
} as const;
