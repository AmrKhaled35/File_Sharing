import React from 'react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-yellow-400 via-green-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
  
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg rotate-45 opacity-20 animate-spin-slow"></div>
      <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-cyan-500 rounded-full opacity-25 animate-bounce-slow"></div>
      <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 transform rotate-12 opacity-30 animate-pulse"></div>
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-white rounded-full opacity-40 animate-float-${i % 3}`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`
          }}
        />
      ))}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
}