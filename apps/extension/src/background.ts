import { redirectActiveTabIfFocusAndNotWhitelisted } from './utils';

async function serviceWorker(): Promise<void> {
  [chrome.tabs.onHighlighted, chrome.tabs.onUpdated].forEach(event =>
    event.addListener(redirectActiveTabIfFocusAndNotWhitelisted),
  );

  const { restarts } = await chrome.storage.local.get('restarts');
  const currentTime = Date.now();
  chrome.storage.local.set({
    restarts:
      restarts === undefined ? [currentTime] : [...restarts, currentTime],
  });

  console.log(`
    Service worker started. Env is: ${process.env.ENV}
    Number of restarts: ${restarts.length}
    Time since last restart: ${displayDateDifference(
      currentTime - restarts[restarts.length - 1],
    )}
  `);
}

function displayDateDifference(timeDifference: number): string {
  const seconds = Math.floor((timeDifference / 1000) % 60);
  const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
  const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

serviceWorker();
