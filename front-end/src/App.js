import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import blogService from './services/blogs';
import Bloglist from './components/Blogs/Bloglist';
import Notification from './components/Notification';
import NewBlogForm from './components/Blogs/NewBlogForm';
import { initializeBlogs } from './reducers/blogReducer';
import UsersView from './components/UsersView/UsersView';
import UserProfile from './components/UserProfile/UserProfile';
import { initializeUsers } from './reducers/usersReducer';
import BlogView from './components/Blogs/BlogView';
import LoginForm from './components/LoginForm';
import NavBar from './components/Nav/NavBar';
import RegisterForm from './components/RegisterForm';
import { alreadyLoggedIn } from './reducers/userReducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // takes user's username ato find current user and log them in
      dispatch(alreadyLoggedIn(user));
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('loggedInAppUser', JSON.stringify(user));
      blogService.setToken(user.token);
    }
  }, [user]);

  const matchUser = useRouteMatch('/users/:id');
  const searchedUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;
  const matchBlog = useRouteMatch('/blogs/:id');
  const searchedBlog = matchBlog
    ? blogs.find((b) => b.id === matchBlog.params.id)
    : null;

  const useStyles = makeStyles((theme) => ({
    marginDiv: {
      marginTop: theme.spacing(12),
    },
  }));
  const classes = useStyles();

  return (
    <div>
      <Notification user="" />
      {user === null ? (
        <div>
          <Switch>
            <Route path="/register">
              <RegisterForm />
            </Route>
            <Route path="/">
              <LoginForm />
            </Route>
          </Switch>
        </div>
      ) : (
        <Container maxWidth="md">
          <NavBar />
          <div className={classes.marginDiv}>
            <Switch>
              <Route path="/blogs/:id">
                <BlogView blog={searchedBlog} />
              </Route>
              <Route path="/users/:id">
                <UserProfile user={searchedUser} />
              </Route>
              <Route path="/users">
                <UsersView />
              </Route>
              <Route path="/create">
                <NewBlogForm user={user} />
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
              <Route path="/">
                <Bloglist />
              </Route>
            </Switch>
          </div>
        </Container>
      )}
    </div>
  );
};

export default App;
