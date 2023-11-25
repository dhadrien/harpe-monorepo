import { redirectActiveTabIfFocusAndNotWhitelisted } from './utils';

async function polling(): Promise<void> {
  [chrome.tabs.onHighlighted, chrome.tabs.onUpdated].forEach(event =>
    event.addListener(redirectActiveTabIfFocusAndNotWhitelisted),
  );
  chrome.runtime.onSuspend.addListener(function () {
    console.log('Extension is being suspendedss');
  });
  chrome.runtime.onSuspendCanceled.addListener(function () {
    console.log('Extension is being suspdzdazdazdazendedss');
  });
}

polling();
