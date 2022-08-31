# Solution

- Used create-react-app to generate the boilerplate for the app.
- Created two types of cards GithubCard for repositories and GithubUserCard for users.
- Created SearchInput component to handle search and handled debounce using lodash.
- Loaded data using fetch api and saved the retrieved data in state and used loader component to show while loading data.
- Handled infinite pagination using useRef and getting scrollTop, scrollHeight, clientHeight and check if i reached the bottom of the list then fetch the next page.
