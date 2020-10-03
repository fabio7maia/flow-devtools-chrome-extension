window.addEventListener("__FLOW_DEVTOOLS_EXTENSION__", (event) => {
  console.log("[Content Script] Arrived new event", event);

  chrome.runtime.sendMessage({ type: "setData", data: event.detail });
});
