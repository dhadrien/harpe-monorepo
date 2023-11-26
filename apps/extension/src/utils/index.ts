import { WHITELISTED_DOMAINS, HARPE_APP_URL } from '../constants';

export const redirectActiveTabIfFocusAndNotWhitelisted =
  async (): Promise<void> => {
    const { focusMode } = await chrome.storage.sync.get('focusMode');
    focusMode && redirectActiveTabIfNotWhitelisted();
  };

export const redirectActiveTabIfNotWhitelisted = async (): Promise<void> => {
  const currentTab = (
    await chrome.tabs.query({ active: true, currentWindow: true })
  )[0];
  currentTab && redirectNonWhitelistedTab(currentTab, WHITELISTED_DOMAINS, HARPE_APP_URL);
};

export async function redirectNonWhitelistedTab(
  tab: chrome.tabs.Tab,
  whiteListedDomains: string[],
  redirectUrl: string,
): Promise<void> {
  // if tab url not whitelisted, then redirect to the targetURL
  ![...whiteListedDomains, extractDomainFromUrl(redirectUrl)].some(allowedDomain =>
    tab.url!.includes(allowedDomain),
  ) && (await chrome.tabs.update(tab.id!, { url: redirectUrl }));
}


export const extractDomainFromUrl = (url: string): string => {
  const urlObj = new URL(url);
  return urlObj.hostname;
};
