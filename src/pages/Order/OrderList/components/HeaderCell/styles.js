// Component Styles
const styles = (theme) => ({
  Num: {
    padding: 0,
    minWidth: '55px',
  },
  Name: {
    width: '50%',
    maxWidth: '150px',
    padding: '0px 0px 0px 16px',
  },
  Definion: {
    width: '50%',
    padding: '0px 0px 0px 16px',
  },
  Count: {
    padding: '0px 0px 0px 16px',
    minWidth: '100px',
    [theme.breakpoints.down(880)]: {
      minWidth: '100px',
    },
    [theme.breakpoints.down(600)]: {
      display: 'none',
    },
  },
  data: {
    padding: '0px 0px 0px 16px',
    minWidth: '80px',
    [theme.breakpoints.down(880)]: {
      display: 'none',
    },
  },
  dataWithTooltip: {
    display: 'none',
    [theme.breakpoints.down(880)]: {
      minWidth: '80px',
      padding: '0px 0px 0px 16px',
      display: 'table-cell',
    },
  },
  archiveFileName: {
    padding: '0px 0px 0px 16px',
    minWidth: '200px',
    [theme.breakpoints.down(880)]: {
      display: 'none',
    },
  },
  Prev: {
    padding: '0px 0px 0px 16px',
    minWidth: '120px',
    [theme.breakpoints.down(1180)]: {
      display: 'none',
    },
  },
  Operations: {
    padding: '0px 0px 0px 16px',
    minWidth: '120px',
    [theme.breakpoints.down(1180)]: {
      display: 'none',
    },
  },
  Next: {
    padding: '0px 0px 0px 16px',
    minWidth: '120px',
    [theme.breakpoints.down(1180)]: {
      display: 'none',
    },
  },
});

export default styles;
