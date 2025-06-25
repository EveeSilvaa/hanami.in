export const CoffeeGifOverText = () => {
  return (
    <div className="relative flex flex-col items-center justify-center mb-8">
      <div className="relative z-1 -mb-9" style={{ width: '180px', height: '180px' }}>
        <img
          src="/images/UEl2-unscreen.gif"
          alt="Copo de café animado"
          className="w-full h-full object-contain drop-shadow-lg"
        />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-amber-800 z-0  px-4 py-12 ">
        Hanami Cafeteria
      </h1>
      <p className="text-lg md:text-xl text-amber-600 top-10 mx-auto px-4 py-12">
        Amor em forma de xícara 😊
      </p>
    </div>
  );
};