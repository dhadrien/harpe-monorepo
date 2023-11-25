import { whiteListedDomains, redirectDomain } from '../constants';

export const redirectActiveTabIfFocusAndNotWhitelisted =
  async (): Promise<void> => {
    const { focusMode } = await chrome.storage.sync.get('focusMode');
    focusMode && redirectActiveTabIfNotWhitelisted();
  };

export const redirectActiveTabIfNotWhitelisted = async (): Promise<void> => {
  const currentTab = (
    await chrome.tabs.query({ active: true, currentWindow: true })
  )[0];
  currentTab && redirectNonWhitelistedTab(currentTab, whiteListedDomains, redirectDomain);
};

export async function redirectNonWhitelistedTab(
  tab: chrome.tabs.Tab,
  whiteListedDomains: string[],
  redirectDomain: string,
): Promise<void> {
  // if tab url not whitelisted, then redirect to the targetURL
  ![...whiteListedDomains, redirectDomain].some(allowedUrl =>
    tab.url!.includes(allowedUrl),
  ) && (await chrome.tabs.update(tab.id!, { url: `https://${redirectDomain}` }));
}
