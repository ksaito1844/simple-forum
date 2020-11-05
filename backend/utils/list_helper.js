const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogPosts) => {
    return blogPosts.length === 0
        ? 0
        : blogPosts.reduce((acc, cur) => {
            return acc += cur.likes
        }, 0)
}

const favoriteBlog = (blogPosts) => {
    const favorite = blogPosts.sort((a,b) => b.likes-a.likes);
    return favorite[0].likes
}

//Find author of the most blogs
//Sort through blog posts array and group by author. Return group with most items.

const mostBlogs = (blogPosts) => {
    let result = _(blogPosts)
        .groupBy(x => x.author)
        .map((value, key) => ({author: key, blogs: value.length}))
        .value();
    const sortedAuthors = result.sort((a, b) => b.blogs - a.blogs);
    return sortedAuthors[0].author
}
//Find and return the author whose blog posts have the largest amount of likes
//Returned value also contains the total number of likes.




module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}