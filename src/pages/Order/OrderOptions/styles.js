// Component Styles
const styles = (theme) => ({
  root: {
    position: 'absolute',
    width: '500px',
    minWidth: '400px',
    left: 'calc((100vw - 500px) /2)',
    top: '15vh',
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[15],
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  optionsHeaderLeftContainer: {
    flex: 1,
  },
  optionsHeaderContainer: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: '5px 5px 0 0',
    height: '2rem',
    backgroundColor: theme.palette.primary.main,
    flex: 1,
    width: '100%',
  },
  optionsHeaderCloseContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: '2px',
  },
  optionsBodyContainer: {
    display: 'flex',
    padding: '10px',
    minHeight: '100%',
    width: '100%',
  },
  leftColumnContainer: {
    height: '100%',
  },
  rightColumnContainer: {
    flex: 1,
    width: '300px',
    height: '261px',
  },
  optionsDivider: {
    margin: '0px 5px 0px 5px',
  },
  optionsButtonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    paddingRight: '10px',
    paddingBottom: '10px',
  },
});

export default styles;
