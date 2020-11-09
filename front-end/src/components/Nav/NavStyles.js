import { makeStyles } from '@material-ui/core/styles';

export const navStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  navItem: {
    marginRight: theme.spacing(2),
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    color: theme.palette.getContrastText(theme.palette.secondary.main),
    backgroundColor: theme.palette.secondary.main,
  },
  backgroundColor: 'transparent',
  logoutButton: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}));
