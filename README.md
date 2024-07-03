
# AniVerse - An anime recommendation website

This web-app displays info about many popular anime which user can search and also get recommendation based on their search.
A hybrid recommendation model is build using collaborative and content based filtering using matrix factorization , cosine similarity etc.
The Model is then Deployed using flask as an api with different routes.
Finally The website is made using Next.js which provides a user-friendly experience and provides functionality such as search , Authentication etc.

## Installation & Run
1. Clone this repository using git clone

Navigate to project directory. After that open the terminal and run the following commands in different terminals. This will install all the modules needed to run this app. 

```bash
  cd api
  pip install -r requirements.txt
```

```bash
  cd website
  npm install
```

To run the app, type the following command in terminal at working directory. it will run both api and website
```bash
  cd website
  npm run start-dev
```


## Libraries

- Flask
- Numpy
- Pandas
- Scikit-Learn
- Next.js
- Tailwind CSS




## Authors

- [Akshat Jain](https://github.com/akshat2635)

