chrome?.contextMenus?.onClicked.addListener(function (info) {
  chrome.tts.speak(info.selectionText);
});
// Create one test item for each context type.
let contexts = ['selection'];
for (let i = 0; i < contexts.length; i++) {
  let context = contexts[i];
  let title = `Speak selected text`;
  chrome.contextMenus.create({
    title: title,
    contexts: [context],
    id: context,
  });
}

// Intentionally create an invalid item, to show off error checking in the
// create callback.
chrome.contextMenus.create(
  { title: 'Oops', parentId: 999, id: 'errorItem' },
  function () {
    if (chrome.runtime.lastError) {
      console.log('Got expected error: ' + chrome.runtime.lastError.message);
    }
  }
);
