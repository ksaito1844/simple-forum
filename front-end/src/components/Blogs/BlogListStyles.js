import { makeStyles } from '@material-ui/styles';

export const reusableStyle = {
  border: '1px solid #BDC3C7',
  '&:hover': {
    border: '1px solid black',
  },
  marginBottom: 16,
  borderRadius: 3,
};

export const blogListStyles = makeStyles((theme) => ({
  listItemContainer: {
    padding: 24,
    border: reusableStyle.border,
    marginBottom: reusableStyle.marginBottom,
    '&:hover': reusableStyle['&:hover'],
    borderRadius: reusableStyle.borderRadius,
  },
  listItem: {
    textDecoration: 'none',
    color: '#000',
  },
  listItemSubtitle: {
    color: theme.palette.grey.main,
  },
  inputContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 8,
    paddingBottom: 8,
    border: reusableStyle.border,
    marginBottom: reusableStyle.marginBottom,
    borderRadius: reusableStyle.borderRadius,
    textAlign: 'center',
  },
  textField: {
    width: '75%',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: theme.palette.grey.secondary,
  },
  input: {
    border: 'none',
  },
}));
