// MEMO: run_at=document_end + DOMContentLoadedだとタイミングがズレるのかDOMContentLoadedが発火しないのでMutationObserverで要素を監視している

const observerRoomContainer = new MutationObserver(() => {
  const roomsContainer = document.querySelector('.room__rooms-container');
  if (roomsContainer) {
    observerRoomContainer.disconnect();
    const observer = new MutationObserver(observerCallback);
    observer.observe(roomsContainer, {
      childList: true,
      subtree: true,
    });
    roomsContainer.querySelectorAll('img').forEach(addSpanForImage);
  }
});

observerRoomContainer.observe(document.body, { childList: true, subtree: true });

const addSpanForImage = (img) => {
  if (!img.nextElementSibling || img.nextElementSibling.tagName !== 'SPAN') {
    const span = document.createElement('span');
    span.textContent = img.alt;
    img.insertAdjacentElement('afterend', span);
  }
};

const observerCallback = (mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === 'childList') {
      mutation.addedNodes.forEach((node) => {
        // Aタグとして要素が追加されるので子要素のimgをわたす
        if (node.tagName === 'A') {
          const img = node.querySelector('img')
          addSpanForImage(img);
        }
      });
    }
  });
};
