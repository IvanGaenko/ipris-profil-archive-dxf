// Component Styles
import { alpha } from '@material-ui/core/styles';

const styles = (theme) => ({
  tab: {
    width: '100%',
    minHeight: '100%',
    borderRadius: 0,
    padding: 0,
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
  },
  tabSelected: {
    width: '100%',
    minHeight: '100%',
    borderRadius: 0,
    padding: 0,
    backgroundColor: alpha(theme.palette.common.white, 0.5),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.7),
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  closeButtonContainer: {
    minWidth: '21px',
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },
  tabNameContainer: {
    flex: 1,
    textTransform: 'none',
    color: theme.palette.common.black,
    padding: '0px 30px 0px 30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export default styles;
