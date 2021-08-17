// Component Styles
const styles = (theme) => ({
  optionsChipContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  optionsChipRow: {
    display: 'flex',
    flexWrap: 'wrap',
    overflow: 'auto',
  },
  optionsChip: {
    padding: '5px',
    // overflow: 'auto',
  },
  textField: {
    fontSize: theme.typography.fontSize,
  },
});

export default styles;
