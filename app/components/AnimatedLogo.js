'use client'

import React, { useState, useEffect, useRef } from 'react';

const PrautAnimation = () => {
  const [animationState, setAnimationState] = useState('initial');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [wordDistances, setWordDistances] = useState([]);
  const measureRef = useRef(null);
  
  // Zbytek kódu zůstává stejný...
  const prWords = [
    'process',
    'private',
    'precise',
    'professional',
    'progressive',
    'productive',
    'prime',
    'practical',
    'predictive'
  ];

  useEffect(() => {
    if (measureRef.current) {
      const distances = prWords.map(word => {
        measureRef.current.textContent = word.slice(2);
        return measureRef.current.getBoundingClientRect().width / 16;
      });
      setWordDistances(distances);
    }
  }, []);

  useEffect(() => {
    let timeoutId;
    let isAnimating = true;

    const animationSequence = async () => {
      while (isAnimating) {
        setAnimationState('initial');
        setIsTransitioning(false);
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 2500) });
        
        setIsTransitioning(true);
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 100) });
        
        setAnimationState('splitting');
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 2000) });
        
        setAnimationState('split');
        setIsTransitioning(false);
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 2500) });
        
        setIsTransitioning(true);
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 100) });
        
        setAnimationState('initial');
        await new Promise(resolve => { timeoutId = setTimeout(resolve, 2000) });
        
        setCurrentWordIndex(prev => (prev + 1) % prWords.length);
        setIsTransitioning(false);
      }
    };

    animationSequence();

    return () => {
      isAnimating = false;
      clearTimeout(timeoutId);
    };
  }, [prWords.length]);

  return (
    <div className="w-full bg-gradient-to-b from-white to-purple-50/10">
      <span
        ref={measureRef}
        className="text-8xl font-bold absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />
      
      <div className="h-[400px] w-full flex items-center justify-center">
        <div className="relative flex justify-center items-center w-full max-w-[2000px] mx-auto px-4">
          <div className="flex items-center justify-center w-full">
            <div
              style={{
                transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: animationState !== 'initial' && wordDistances[currentWordIndex]
                  ? `translateX(-${wordDistances[currentWordIndex] + 1}rem)`
                  : 'translateX(0)',
                opacity: isTransitioning ? 0.4 : 1
              }}
              className="relative"
            >
              <span className="text-8xl font-bold text-[#4B6BFB]">
                pr
              </span>
              <span 
                style={{
                  transition: 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: animationState === 'split' ? 1 : 0,
                  position: 'absolute',
                  left: '100%',
                }}
                className="text-8xl font-bold text-[#4B6BFB] whitespace-nowrap"
              >
                {prWords[currentWordIndex].slice(2)}
              </span>
            </div>

            <div
              style={{
                transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: animationState !== 'initial' ? 'translateX(2rem)' : 'translateX(0)',
                opacity: isTransitioning ? 0.4 : 1
              }}
              className="relative"
            >
              <span className="text-8xl font-bold text-[#9C40FF]">
                aut
              </span>
              <span 
                style={{
                  transition: 'opacity 2s cubic-bezier(0.4, 0, 0.2, 1)',
                  opacity: animationState === 'split' ? 1 : 0,
                  position: 'absolute',
                  left: '100%'
                }}
                className="text-8xl font-bold text-[#9C40FF] whitespace-nowrap"
              >
                omatization
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrautAnimation;