import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import QRCodeModal from './components/QRCodeModal';
import AnimatedRoute from './components/AnimatedRoute';

const App = () => {
  return (
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
          </Routes>
        </main>
        <Footer />
        <QRCodeModal />
      </div>
    </Router>
  );
};

export default App;