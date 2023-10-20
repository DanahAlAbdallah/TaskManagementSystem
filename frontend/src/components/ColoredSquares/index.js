import React from 'react';

function ColoredSquaresWithLabels() {
  return (
    <div className="flex justify-end ml-20 mt-24">
      <div className="text-center mr-4">
        <div className="w-12 h-12 bg-red-300 rounded-lg mb-2"></div>
        <div>High</div>
      </div>
      <div className="text-center mr-4">
        <div className="w-12 h-12 bg-blue-300 rounded-lg mb-2"></div>
        <div>Medium</div>
      </div>
      <div className="text-center">
        <div className="w-12 h-12 bg-green-300 rounded-lg mb-2"></div>
        <div>Low</div>
      </div>
    </div>
  );
}

export default ColoredSquaresWithLabels;
