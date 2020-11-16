import { makeStyles } from '@material-ui/styles';
import { reusableStyle } from '../../Blogs/BlogListStyles';

export const sortBarStyles = makeStyles((theme) => ({
  sortBarContainer: {
    padding: 4,
    border: reusableStyle.border,
    marginBottom: reusableStyle.marginBottom,
    borderRadius: reusableStyle.borderRadius,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& button': {
      marginLeft: 16,
      marginRight: 16,
      '&:hover, &.Mui-focusVisible': {
        backgroundColor: theme.palette.grey.secondary,
      },
    },
  },
  activeButton: {
    color: theme.palette.secondary.main,
    backgroundColor: theme.palette.grey.secondary,
  },
}));
