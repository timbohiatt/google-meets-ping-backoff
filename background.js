chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
});

// URLS to Watch
const watchedURLs = [
  "https://mail.google.com",
];



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Check the Watched URLs
  for (let i = 0; i < watchedURLs.length; i++) {
    if (tab.url.includes(watchedURLs[i])) {
      chrome.notifications.getAll((items) => {
        console.log(typeof items);
        console.log(Object.getPrototypeOf(items))
        Object.getPrototypeOf(items)
        console.log(items.toString())
        /*if (items) {
          console.log("Items:")
          console.log(items)
          console.log(typeof items);
          for (let key in items) {
            console.log("Key:" + key)
            console.log(typeof key);
          }
        }*/
      });
    }
  }
})



function loadSpammers() {
  // getting state
  chrome.storage.local.get("spammers");
}


function updateSpammers() {
  // setting state
  chrome.storage.local.set({
    spammers: ["Jack"]
  })
}


async function toggleMuteState(tabId) {
  const tab = await chrome.tabs.get(tabId);
  const muted = !tab.mutedInfo.muted;
  await chrome.tabs.update(tabId, { muted });
  console.log(`Tab ${tab.id} is ${muted ? 'muted' : 'unmuted'}`);
}