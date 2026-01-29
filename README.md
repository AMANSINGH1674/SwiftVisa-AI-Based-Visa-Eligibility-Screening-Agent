# SwiftVisa Frontend

This repository contains the frontend application for SwiftVisa, a platform designed to streamline the visa application process.

## Project Structure

The project is a Next.js application, utilizing React for the UI and various components for different sections of the application. It includes a backend component (`SwiftVisa-Backend`) for API services and data processing.

### Key Directories:

-   `app/`: Contains the main application pages and API routes.
    -   `app/api/`: API routes for backend communication.
    -   `app/auth/`: Authentication related pages (login, sign-up).
    -   `app/countries/`: Pages related to country-specific information.
    -   `app/dashboard/`: User dashboard.
    -   `app/upload/`: Document upload functionality.
-   `components/`: Reusable React components used throughout the application.
    -   `components/ui/`: UI primitives and design system components.
-   `public/`: Static assets like images and icons.
-   `lib/`: Utility functions and Supabase client configurations.
-   `SwiftVisa-Backend/`: Contains the Python-based backend services, likely for AI/ML processing, data handling, and eligibility checks.

## Getting Started

### Prerequisites

-   Node.js (LTS version recommended)
-   npm or pnpm (pnpm is used in `pnpm-lock.yaml`)
-   Python 3.x (for the backend)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Mahenoor0192/SwiftVisa.git
    cd SwiftVisa
    ```

2.  **Install Frontend Dependencies:**
    ```bash
    pnpm install
    # or npm install
    ```

3.  **Install Backend Dependencies:**
    Navigate to the `SwiftVisa-Backend` directory and install Python dependencies. (Specific instructions for backend dependencies might be in a separate `README` within that directory or a `requirements.txt` file).
    ```bash
    cd SwiftVisa-Backend
    # Assuming a requirements.txt exists
    pip install -r requirements.txt
    ```
    *(Note: You might need to set up a virtual environment for Python.)*

### Configuration

-   **Environment Variables:** Create a `.env.local` file in the root of the frontend project and a `.env` file in the `SwiftVisa-Backend` directory. Refer to `.env.example` files (if they exist) or project documentation for required variables (e.g., Supabase API keys, backend API endpoints).

## Running the Application

### Frontend

To run the Next.js development server:

```bash
pnpm dev
# or npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Backend

To run the backend services, navigate to the `SwiftVisa-Backend` directory and execute the main application script (e.g., `streamlit_app.py` or `app.py`).

```bash
cd SwiftVisa-Backend/src
streamlit run streamlit_app.py
# or python app.py (depending on the main entry point)
```

## Contributing

Please follow the existing code style and conventions.

## License

[Specify your license here, e.g., MIT, Apache 2.0]
