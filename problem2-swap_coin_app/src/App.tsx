import "./App.css";
import CryptoSwapForm from "./components/CryptoSwapForm";

function App() {
  return (
    <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-lightGray px-4 bg-[url('./assets/background.jpg')] bg-center bg-cover filter">
      <h1 className="text-4xl font-bold text-center text-darkGray mb-4">
        Build your <span className="text-pink-500">Crypto future</span>
        <br /> with a secure, and reliable platform
      </h1>
      <p className="text-center text-gray-500 mb-8">
        Discover the world of cryptocurrency with insights and tools tailored
        for your success.
      </p>
      <CryptoSwapForm />
    </div>
  );
}

export default App;
