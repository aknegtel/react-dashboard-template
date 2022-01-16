const MainPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-6xl font-primary">Welcome to Dumore</h1>
      <a
        className="mt-12 px-4 py-2 border border-slate-600 rounded hover:bg-amber-200 transition-colors duration-200 ease-in-out text-slate-900 hover:text-amber-600 hover:border-amber-600"
        href="/dashboard"
      >
        Go to dashboard
      </a>
    </div>
  );
};

export default MainPage;
