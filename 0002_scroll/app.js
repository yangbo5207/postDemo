document.addEventListener('scroll', () => {
  console.log(document.documentElement.scrollTop, document.documentElement.scrollHeight);

  if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
    console.log('到底了兄弟.');
  }
}, !1);


console.log('视口高度: ', window.innerHeight, document.documentElement.clientHeight);


function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}

function getScrollHeight() {
  return document.body.scrollHeight || document.documentElement.scrollHeight;
}

function getClientHeight() {
  return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
}