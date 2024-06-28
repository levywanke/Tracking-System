# Police and Gun Data Management API

This is a Flask-based API for managing police and gun data. It provides endpoints for registering, updating, and deleting information about police officers and guns, as well as user login and location tracking.

## Installation

1. **Clone the repository:**
    ```sh
    git clone https://github.com/yourusername/yourrepository.git
    cd yourrepository
    ```

2. **Create and activate a virtual environment:**
    ```sh
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On MacOS/Linux
    source venv/bin/activate
    ```

3. **Install dependencies:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Create `feedapi.py`:**
    Ensure you have a `feedapi.py` file that contains the necessary functions (`policedata`, `gundata`, `login`, `logininfo`, `get_location`, `register_gun`, `register_police`, `checkin`, `checkout`, `remove_gun`, `remove_police`, `user_update`, `police_rank_update`).

## Usage

1. **Run the Flask application:**
    ```sh
    python app.py
    ```

2. **Access the API:**
    The API will be available at `http://localhost:80`.

## API Endpoints

- **GET /policedata**: Retrieve police data.
- **GET /gundata**: Retrieve gun data.
- **POST /login**: User login.
- **POST /getlocation**: Get user location.
- **POST /register_gun**: Register a new gun.
- **POST /register_police**: Register a new police officer.
- **POST /register_user**: Register a new user.
- **POST /checkin_gun**: Check in a gun.
- **POST /checkout_gun**: Check out a gun.
- **DELETE /deletegun**: Delete a gun.
- **DELETE /deletepolice**: Delete a police officer.
- **PATCH /users_update**: Update user information.
- **PATCH /police_rank_update**: Update police officer rank.

## License

This project is licensed under the MIT License.
