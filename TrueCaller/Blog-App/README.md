# The Trucaller Blog App

purpose:

This is a comprehensive blog application designed to showcase various blog posts. Users can effortlessly filter posts by category and view detailed content by clicking on individual posts.

solution:

- Implemented React Redux to update the state after filtering blog posts by category and page number.
- Utilized React Router to navigate to the detailed blog post pages.
- Implemented UI skeletons and loaders to manage loading delays while fetching blog posts or blog article data.

shortcuts:

- As the API data for each blog post did not provide color code/s, I generated random color codes dynamically.
- Since an access token was required to retrieve the total blog post count, I manually determined the total by fetching the posts for each page and then summing them up to arrive at the final count.
- To align with the provided design, I opted to only the primary category from the list of categories for a blog post, given that the API data offers multiple categories.

To install all packages run the folloiwng command - This will install the packages on the root level

```
npm install
```

To start the project in `dev` mode run the following command:

```
npm start
```
