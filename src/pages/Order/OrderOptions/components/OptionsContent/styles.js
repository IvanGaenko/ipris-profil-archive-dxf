// Component Styles
const styles = (theme) => ({
  root: {
    height: '100%',
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: '5px',
  },
  optionsContentContainer: {
    height: '100%',
    border: `1px solid ${theme.palette.common.black}`,
    borderRadius: '5px',
    width: '100%',
  },
  switchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    paddingLeft: '5px',
  },
  inputText: {
    overflow: 'hidden',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  listItemContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  optionsChipContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  optionsChipRow: {
    display: 'flex',
  },
  optionsChip: {
    padding: '5px',
  },
  bottomButtonContainer: {
    display: 'flex',
  },
  bottomButton: {
    flex: 1,
  },
});

export default styles;
