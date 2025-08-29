
import React from 'react';
import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col text-gray-800">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-white py-20 sm:py-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              혁신적인 솔루션에 오신 것을 환영합니다
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              최신 기술과 전문 지식을 결합하여 비즈니스의 성장을 돕습니다. 우리는 복잡한 문제를 해결하고 새로운 가능성을 창출합니다.
            </p>
            <button className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition duration-300 ease-in-out">
              더 알아보기
            </button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 sm:py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">핵심 기능</h2>
              <p className="text-md sm:text-lg text-gray-600 mt-2">우리가 제공하는 최고의 가치</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="최첨단 기술"
                description="업계 최고의 기술을 활용하여 최고의 성능과 안정성을 보장합니다. 항상 최신 트렌드를 연구하고 적용합니다."
              />
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="사용자 중심 디자인"
                description="직관적이고 아름다운 인터페이스로 최상의 사용자 경험을 제공합니다. 사용자의 입장에서 먼저 생각하고 설계합니다."
              />
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                }
                title="강력한 보안"
                description="고객의 소중한 데이터를 안전하게 보호하는 강력한 보안 시스템을 갖추고 있습니다. 다층 방어 체계로 위협을 차단합니다."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
