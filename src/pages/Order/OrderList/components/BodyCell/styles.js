// Component Styles
const styles = (theme) => ({
  Num: {
    padding: 0,
    minWidth: '55px',
  },
  Name: {
    maxWidth: '150px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '50%',
    padding: '0px 0px 0px 16px',
  },
  Definion: {
    width: '50%',
    padding: '0px 0px 0px 16px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  Count: {
    padding: '0px 0px 0px 16px',
    minWidth: '100px',
    [theme.breakpoints.down(870)]: {
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
      minWidth: '100px',
      padding: '0px 0px 0px 16px',
      display: 'table-cell',
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
  dataWithTooltipEmpty: {
    display: 'none',
    [theme.breakpoints.down(880)]: {
      minWidth: '100px',
      padding: '0px 0px 0px 16px',
      display: 'table-cell',
    },
  },
  archiveFileName: {
    padding: '0px 0px 0px 16px',
    minWidth: '200px',
    textDecoration: 'underline',
    cursor: 'pointer',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    [theme.breakpoints.down(880)]: {
      display: 'none',
    },
  },
  archiveFileNameEmpty: {
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
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
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
