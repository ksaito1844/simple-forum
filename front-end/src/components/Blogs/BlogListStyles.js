import { makeStyles } from '@material-ui/styles';

export const reUsableStyle = {
  border: '1px solid #BDC3C7',
  '&:hover': {
    border: '1px solid black',
  },
  marginBottom: 16,
  borderRadius: 6,
};

export const blogListStyles = makeStyles(() => ({
  listItemContainer: {
    padding: 24,
    border: reUsableStyle.border,
    marginBottom: reUsableStyle.marginBottom,
    '&:hover': reUsableStyle['&:hover'],
    borderRadius: reUsableStyle.borderRadius,
  },
  listItem: {
    textDecoration: 'none',
    color: '#000',
  },
  listItemSubtitle: {
    color: '#BDC3C7',
  },
  inputContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    border: reUsableStyle.border,
    marginBottom: reUsableStyle.marginBottom,
    borderRadius: reUsableStyle.borderRadius,
    textAlign: 'center',
  },
  textField: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'rgb(246,247,248)',
  },
  input: {
    border: 'none',
  },
}));
