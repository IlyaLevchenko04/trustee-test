export const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl text-gray-600">Page not found</p>
        <p className="mt-4">
          <a href="/" className="text-blue-500 hover:underline">
            Go back to the homepage
          </a>
        </p>
      </div>
    </div>
  );
};
