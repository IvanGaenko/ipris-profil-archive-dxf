// Component Styles
const styles = (theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: '1.7rem',
    minWidth: 'calc(100vw - (100vw - 100%))',
    backgroundColor: theme.palette.primary.main,
    position: 'fixed',
    top: '42px',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default styles;
