import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-br from-gray-50 to-gray-200 px-4">

      <h1 className="text-8xl font-extrabold text-blue-600 tracking-wider drop-shadow-sm">
        404
      </h1>

      <p className="text-gray-700 mt-4 text-xl max-w-md">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow"
      >
        Back to Home
      </Link>
    </div>
  );
}
