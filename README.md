# AniVerse

AniVerse is a comprehensive anime recommendation platform designed to provide users with personalized anime suggestions. The project leverages a microservices-style architecture with distinct components for the frontend, backend user management, and a machine learning-powered recommendation API.

## Project Structure

The AniVerse project is organized into the following main directories:

-   `frontend/`: A React-based client application for the main user interface.
-   `backend/`: A Node.js and Express-based server for handling user authentication, profiles, and ratings.
-   `api/`: A Python and Flask-based API that serves anime recommendations generated from a machine learning model.
-   `model/`: A Jupyter Notebook containing the implementation and training of the recommendation model.

## Features

*   **User Authentication:** Secure user registration and login functionality.
*   **Personalized Recommendations:** Get anime recommendations based on your viewing history and preferences.
*   **Anime Information:** View detailed information about different anime series.
*   **Rating System:** Rate anime to improve your recommendations.
*   **Trending Anime:** Discover what's currently popular in the anime community.

## Tech Stack

### Frontend (`frontend/`)

*   **React** For building modern, fast, and scalable user interfaces.
*   **Tailwind CSS & DaisyUI:** For utility-first styling and pre-built components.
*   **React Router:** For client-side routing within the React application.
*   **Context API:** For state management.

### Backend (`backend/`)

*   **Node.js & Express:** For building the RESTful API for user management.
*   **MongoDB:** As the database for storing user data, profiles, and ratings.
*   **Mongoose:** As the ODM for interacting with MongoDB.
*   **JWT (JSON Web Tokens):** For secure user authentication.

### Recommendation API (`api/`)

*   **Python & Flask:** For creating the recommendation API.
*   **Pandas, NumPy, Scikit-learn:** For data manipulation and building the recommendation model.
*   **Collaborative & Content-Based Filtering:** The core algorithms behind the recommendation engine.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm
*   Python and pip
*   MongoDB

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username/AniVerse.git
    ```
2.  **Install NPM packages for the frontend**
    ```sh
    cd frontend
    npm install
    ```
3.  **Install NPM packages for the backend**
    ```sh
    cd ../backend
    npm install
    ```
4.  **Install Python packages for the API**
    ```sh
    cd ../api
    pip install -r requirements.txt
    ```

### Running the Applications

1.  **Run the React Frontend**
    ```sh
    cd frontend
    npm start
    ```
2.  **Run the Node.js Backend**
    ```sh
    cd ../backend
    npm start
    ```
3.  **Run the Python API**
    ```sh
    cd ../api
    flask run
    ```

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

