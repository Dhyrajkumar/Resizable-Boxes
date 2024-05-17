# Resizable Boxes with Text and Image Preview

This project is a React application that allows users to add text and images, which are then displayed within resizable boxes. The text data is sent to a backend server and stored in a database.

## Features

- **Add and update text data.**
- **Preview selected images.**
- **Display text and images in resizable boxes.**
- **Fetch and display count of additions and updates.**

## Technologies Used

- **React**
- **Axios**
- **CSS (with Tailwind for styling)**
- **Backend server**

## Installation

1. Install the dependencies:
    ```bash
    npm install
    ```
2. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. **Adding Text and Image:**
   - Enter text in the input fields for each window.
   - Select an image file to preview.
   - Click the **Add** button to add the text and image.

2. **Updating Text:**
   - Modify the text in the input fields.
   - Click the **Update** button to update the text.

3. **Resizing Boxes:**
   - Click and drag the edges or corners of the boxes to resize them.

## Components

- **App**: The main component that contains all other components.
- **Input fields**: To enter text for each window.
- **Image preview**: To preview the selected image.
- **Resizable boxes**: To display the text and image, and allow resizing from all sides.

## Backend API

This project interacts with a backend API to fetch and update counts, and to add or update text data. The backend API endpoints are assumed to be:

- `GET /api/count` - Fetch the count of additions and updates.
- `POST /api/add` - Add new text data.
- `POST /api/update` - Update existing text data.

Ensure that your backend server is running and accessible at `http://localhost:5000`.

## Customization

- Modify the CSS styles in `App.css` to customize the appearance.
- Update the API endpoints in the Axios requests if your backend has different routes.

## Contributing

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Create a pull request.


## Acknowledgements

- Thanks to all the contributors of the open-source libraries used in this project.
