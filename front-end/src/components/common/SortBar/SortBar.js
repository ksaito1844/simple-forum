import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { IconButton } from '@material-ui/core';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import FavoriteIcon from '@material-ui/icons/Favorite';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { useDispatch } from 'react-redux';
import { sortBarStyles } from './SortBarStyles';
import { sortPostsByLikes } from '../../../reducers/postsSlice';

export const SortBar = ({ setState }) => {
  const [activeButton, setActiveButton] = useState('recent');
  const classes = sortBarStyles();
  const dispatch = useDispatch();

  const sortItems = (operation) => {
    if (operation === 'sortItemsByComments') {
      setState('comments');
      setActiveButton('comments');
    } else if (operation === 'sortItemsByLikes') {
      setState('likes');
      setActiveButton('likes');
    } else {
      setState('recent');
      setActiveButton('recent');
    }
  };

  return (
    <Box className={classes.sortBarContainer}>
      <IconButton
        aria-label="sort-recent"
        onClick={() => sortItems('default')}
        className={activeButton === 'recent' ? classes.activeButton : ''}
      >
        <NewReleasesIcon fontSize="large" />
      </IconButton>
      <IconButton
        aria-label="sort-likes"
        onClick={() => sortItems('sortItemsByLikes')}
        className={activeButton === 'likes' ? classes.activeButton : ''}
      >
        <FavoriteIcon fontSize="large" />
      </IconButton>
      <IconButton
        aria-label="sort-comments"
        onClick={() => sortItems('sortItemsByComments')}
        className={activeButton === 'comments' ? classes.activeButton : ''}
      >
        <WhatshotIcon fontSize="large" />
      </IconButton>
    </Box>
  );
};

export default SortBar;
