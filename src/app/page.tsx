import MainLayout from '@/components/layout/MainLayout';

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Welcome to Startup Simulator</h1>
        <p className="text-gray-600 mb-4">
          Start your journey as a startup CEO. Create your company, build your team, and navigate the challenges of startup life.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Start New Game
        </button>
      </div>
    </MainLayout>
  );
}
