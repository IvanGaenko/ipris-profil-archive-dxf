// Component Styles
const styles = (theme) => ({
  inputText: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  listContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  listContent: {
    overflow: 'auto',
  },
  listItemContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  textField: {
    fontSize: theme.typography.fontSize,
  },
});

export default styles;
