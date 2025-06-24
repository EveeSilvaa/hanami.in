import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CoffeeGifOverText } from '../components/CoffeeGifOverText';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/menu');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-4">
      <CoffeeGifOverText />
    </div>
  );
};

export default Home;