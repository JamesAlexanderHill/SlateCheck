//get data from slateCheck API
chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.message === "hi"){
      sendResponse({message: "hi to you"});
    }
  }
);
