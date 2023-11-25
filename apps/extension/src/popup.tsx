import React, { useState, useEffect } from 'react';
import './styles/tailwind.css';
import { createRoot } from 'react-dom/client';
import { redirectActiveTabIfFocusAndNotWhitelisted } from './utils';

const Popup: React.FC = () => {
  const [focusMode, setFocusMode] = useState(false);
  useEffect(() => {
    chrome.storage.sync.get('focusMode', function (data) {
      setFocusMode(data.focusMode);
    });
  }, []);

  const toggleFocusMode = async (): Promise<void> => {
    console.log('TOGGLE');
    const { focusMode } = await chrome.storage.sync.get('focusMode');
    console.log('FOCUS MODE BEFORE', focusMode);
    chrome.storage.sync.set({ focusMode: !focusMode });
    setFocusMode(!focusMode);
    await redirectActiveTabIfFocusAndNotWhitelisted();
  };

  return (
    <button onClick={toggleFocusMode}>
      {focusMode ? 'Desactivate Focus Mode' : 'Activate Focus Mode'}
    </button>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
);
