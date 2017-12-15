var preTop = 0;
var curTop = 0;
var timer = null;

document.addEventListener('scroll', throttle(() => {
  clearTimeout(timer);
  curTop = getScrollTop();
  console.log(document.documentElement.scrollTop, document.documentElement.scrollHeight);

  if (getScrollTop() + getClientHeight() >= getScrollHeight()) {
    console.log('到底了兄弟.');
  }

  if (curTop > preTop) {
    console.log('向下滚动');
  } 

  if (curTop < preTop) {
    console.log('向上滚动');
  }

  timer = setTimeout(() => {
    preTop = curTop;
  }, 10);
}, 300), !1);


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

function log() {
  console.log('xxx');
}

function throttle(fn, delay) {
  let timer = null;
  let isFrist = true;  // 第一次直接执行

  return function() {
    const args = [].slice.call(arguments);
    const self = this;

    if (timer) {
      return false;
    }

    if (isFrist) {
      fn.apply(self, args);
      isFrist = false;
    }

    timer = setTimeout(() => {
      clearTimeout(timer);
      timer = null;
      fn.apply(self, args);
    }, delay || 500)
  }
}


// 函数防抖。
// 当事件持续触发时，操作不执行，事件在delay时间内不再触发时，操作才执行一次。

// immediate = true 立即执行函数
_.debounce = function (func, wait, immediate) {
  var timeout, args, context, timeStamp, result;
  // 延迟函数
  var later = function () {
    var last = _.now() - timeStamp;
    // last < wait 继续触发 later 函数，延迟执行
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;

      // immediate = true 也会进入这个循环，但已经执行过函数了，所以这里不能重复执行
      if (!immediate) {
        result = func.apply(context, args);

        if (!timeout) {
          context = args = null;
        }
      }
    }
  }

  return function () {
    timeStamp = _.now();
    context = this;
    args = arguments;

    var callNow = immediate && !timeout;

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }

    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }
  }
  return result;
};