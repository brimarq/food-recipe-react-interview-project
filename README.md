# Food Recipe Project

## Features:

- Routing
- Multiple pages
- Context and global state
- API fetching
- Tailwind CSS

## Notes:

This app is ultimately wrapped with a `BrowserRouter` component from [React Router](https://reactrouter.com/en/main) that provides the routing context needed to display multiple pages.

Underneath that, it is also wrapped with a _global state component_ which itself returns a context provider. This component houses several states to be made available in the context: a search parameter, loading state, recipe list, recipe details data, and favorites list. In addition to these (and functions for setting them to be used in children), there are also functions to handle the submission of the search parameter and the adding of items to a favorites list that are passed as values to the provider. These values can be made available to any subsequent component of the component tree through the use of the `useContext` hook. The `handleSubmit` function takes care of the API call that fetches the data, and the `handleAddToFavorites` function facilitates the adding of one of those fetched items to the favorites list.

Within the `App` component lies a `Navbar` component that contains the input form for the search parameter and links to the various pages. As a sibling to that, we have a `Routes` component that contains `Route` components as children, each one linking the pages by passing a `path` prop containing the route path and an `element` prop, the value of which is the page component to which the path is to lead.

The `Home` page is set as the default root route, and will display the resulting items from a search submitted from the `Navbar`. Each item found is displayed with a `RecipeItem` card component with an image and a link to a recipe details page.

The `RecipeItem` component receives a specific item object from the fetched API results as an `item` prop. It then uses the `item.id` property in a `Link` component to create a dynamic link fed to the React Router to create the path for the recipe details page.

The recipe `Details` component creates a details page at the path dynamically created on the `Link` within the `RecipeItem`. It also picks up the `id` parameter using the `useParams` hook from React Router, and uses that to fetch the individual item details from the API as the component loads. It then displays the fetched item details along with a button to add/remove the item from favorites. This button receives its on-click action from the global context as the `handleAddToFavorites` function.

Finally, the `Favorites` component will display the favorites page with a list of all of the items saved to the favorites list, each displayed with a `RecipeItem` card just as is done on the Home page.

Notably, as the `Navbar` is displayed with every page, a search for new items may initiated from any route. Upon submission of the input form, the app will be redirected to the Home page to display the new results using the `useNavigate` React Router hook found in the `GlobalContext` component.

---

## React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
