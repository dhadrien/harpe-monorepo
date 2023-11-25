import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css';

const Options: React.FC = () => {
  const [color, setColor] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    // Restores select box and checkbox state using the preferences
    // stored in chrome.storage.
    chrome.storage.sync.get(
      {
        favoriteColor: 'red',
        likesColor: true,
      },
      items => {
        setColor(items.favoriteColor);
        setLike(items.likesColor);
      },
    );
  }, []);

  const saveOptions = (): void => {
    // Saves options to chrome.storage.sync.
    chrome.storage.sync.set(
      {
        favoriteColor: color,
        likesColor: like,
      },
      () => {
        // Update status to let user know options were saved.
        setStatus('Options saved.');
        const id = setTimeout(() => {
          setStatus('');
        }, 1000);
        return () => clearTimeout(id);
      },
    );
  };

  return (
    <>
      <div className="p-4 text-yellow-200">
        <div className="mb-2 text-yellow-100">
          Favorite coffdfsfdlor:
          <select
            className="ml-2 border border-gray-300 p-2 rounded"
            value={color}
            onChange={event => setColor(event.target.value)}
          >
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="yellow">yellow</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={like}
              onChange={event => setLike(event.target.checked)}
            />
            I like colors.
          </label>
        </div>
        <div className="mb-2">{status}</div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={saveOptions}
        >
          Save
        </button>
      </div>
    </>
  );
};

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <Options />
  </React.StrictMode>,
);
