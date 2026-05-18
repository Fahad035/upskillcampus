import { useState, useEffect } from 'react';

const StatsCounter = ({ value, label, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {count}{suffix}
      </div>
      <div className="text-gray-600 mt-2">{label}</div>
    </div>
  );
};

export default StatsCounter;