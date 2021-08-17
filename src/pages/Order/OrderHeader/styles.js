import { alpha } from '@material-ui/core/styles';

// Component Styles
const styles = (theme) => ({
  root: {
    height: '42px',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
  },
  regular: {
    paddingLeft: 0,
    paddingRight: 0,
    display: 'flex',
    minHeight: '100%',
    minWidth: '100%',
  },
  headerContainer: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100%',
  },
  headerAddButton: {
    borderRadius: 0,
    padding: 0,
    minWidth: '100%',
    height: '27px',
  },
  addFile: {
    padding: '3px 10px 3px 10px',
    textTransform: 'none',
    marginLeft: '2vw',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  addFileContainer: {
    textAlign: 'start',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  headerAddContainer: {
    display: 'flex',
    minHeight: '100%',
    justifyContent: 'flex-end',
    flex: 1,
  },
  addButtonContainer: {
    width: '27px',
    display: 'flex',
    alignItems: 'flex-end',
  },
  searchContainer: {
    display: 'flex',
    alignSelf: 'center',
    marginRight: '2vw',
    height: '32px',
    width: '20vw',
    minWidth: '130px',
    padding: '3px 3px 3px 3px',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.common.black}`,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
  errorSearchContainer: {
    display: 'flex',
    alignSelf: 'center',
    marginRight: '2vw',
    height: '32px',
    width: '20vw',
    minWidth: '130px',
    padding: '3px 3px 3px 3px',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.common.black}`,
    backgroundColor: alpha(theme.palette.error.main, 0.25),
    '&:hover': {
      backgroundColor: alpha(theme.palette.error.main, 0.5),
    },
  },
});

export default styles;
