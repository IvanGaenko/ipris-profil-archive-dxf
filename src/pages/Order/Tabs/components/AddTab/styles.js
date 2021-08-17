// Component Styles
import { alpha } from '@material-ui/core/styles';

const styles = (theme) => ({
  headerAddButton: {
    borderRadius: 0,
    padding: 0,
    height: '1.7rem',
    minWidth: '27px',
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.35),
    },
  },
});

export default styles;
