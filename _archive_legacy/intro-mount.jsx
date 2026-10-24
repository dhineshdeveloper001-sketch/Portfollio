import React from 'react';
import { createRoot } from 'react-dom/client';
import IntroScreen from './IntroScreen.jsx';

const container = document.getElementById('intro-root');
if (container) {
  const root = createRoot(container);
  root.render(<IntroScreen />);
}
