export const tabEnterClickEffect = (e: any) => {
  if (e.keyCode === 13) {
    const auxActiveElement: any = document.activeElement;
    if (auxActiveElement?.click) {
      auxActiveElement.click();
    }
  }
};
