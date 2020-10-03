var queueData = [];

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[Background] New message", message);

    switch (message.type) {
      case "setData":
        queueData.push(message.data);
        break;
      case "getData":
        sendResponse(queueData);
        break;
      default:
        console.error("Unrecognised message: ", message);
    }
  });
});
