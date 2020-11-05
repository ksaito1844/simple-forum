import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlogForm from './NewBlogForm'
import userEvent from '@testing-library/user-event'

it('<NewBlogForm /> calls correct function with correct data', () => {
  const addBlog = jest.fn();

  const user = 'RickyBobby666';

  render(
    <NewBlogForm createBlog={addBlog} user={user} />
  );

  userEvent.type(screen.getByPlaceholderText('Title'), 'This is a blog post');
  userEvent.type(screen.getByPlaceholderText('Url'), 'https://www.google.com');

  userEvent.click(screen.getByRole('button'));

  expect(addBlog).toHaveBeenCalledTimes(1);
  expect(addBlog).toBeCalledWith({title: 'This is a blog post', url: 'https://www.google.com', author: 'RickyBobby666'});
});