chrome.runtime.onInstalled.addListener(() => {
  // default state goes here
  // this runs ONE TIME ONLY (unless the user reinstalls your extension)
});

// URLS to Watch
const watchedURLs = [
  "https://mail.google.com/*",
  "https://mail.google.com/chat",
  "https://mail.google.com/mail/u/0/#inbox"
];



chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {



  // Check the Watched URLs
  for (let i = 0; i < watchedURLs.length; i++) {
    if (tab.url.includes(watchedURLs[i])) {
      console.log("-------------------------------")
      console.log("TAB UPDATED")
      //console.log(changeInfo.TabStatus)
      //console.log(changeInfo.title)
      //console.log(changeInfo.url)
      console.log(tab.status)
      console.log(tab.title)
      console.log(tab.url)
      console.log("Consider Muting this tab: " + tab.url)
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["./foreground.js"]
      })
        .then(() => {
          console.log("INJECTED THE FOREGROUND SCRIPT.");
        })
        .catch(err => console.log(err));
      console.log("-------------------------------")
    }
  }



  /*if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
    console.log("yo!")
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["./foreground.js"]
    })
      .then(() => {
        console.log("INJECTED THE FOREGROUND SCRIPT.");
      })
      .catch(err => console.log(err));
  }*/
});


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