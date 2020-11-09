import moment from 'moment';

export const sortItemsDefault = (itemsToSort) =>
  [...itemsToSort].sort((a, b) =>
    moment(b.createdAt, 'YYYY-MM-DD HH:mm:ss').diff(
      a.createdAt,
      'YYYY-MM-DD HH:mm:ss'
    )
  );

export const sortItemsByLikes = (itemsToSort) => {
  [...itemsToSort].sort((a, b) => b.likes - a.likes);
};
