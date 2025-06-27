import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import AnimatedRoute from './components/AnimatedRoute';
import AboutPage from './pages/AboutPage';
import { CartProvider } from './contexts/CartContext';



const App = () => {
  return (
  <CartProvider>
    <Router>
      <div className="flex flex-col min-h-screen bg-amber-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={
              <AnimatedRoute>
                <Home />
              </AnimatedRoute>
            } />
            <Route path="/menu" element={
              <AnimatedRoute>
                <Menu />
              </AnimatedRoute>
            } />
            <Route path="/sobre" element={
              <AnimatedRoute>
                <AboutPage />
              </AnimatedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </CartProvider >
  );
};

export default App;