class DialogBoxController {
  constructor(onClose, setActiveIndex) {
    this.onClose = onClose;
    this.setActiveIndex = setActiveIndex;
  }

  nextMessage(activeIndex, messageCount) {
    if (activeIndex >= messageCount - 1) {
      this.onClose();
      return;
    }
    this.setActiveIndex((idx) => idx + 1);
  }

  previousMessage() {
    this.setActiveIndex((idx) => Math.max(idx - 1, 0));
  }
}

export { DialogBoxController };
