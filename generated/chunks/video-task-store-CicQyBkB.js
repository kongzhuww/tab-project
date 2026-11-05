import { r as l } from "./vendor-vue-D8gPZiit.js";
const e = l({
  isOpen: !1,
  video: null
}), s = {
  open(i) {
    e.video = {
      ...i,
      url: i.url || (i.bvid ? `https://www.bilibili.com/video/${i.bvid}` : "")
    }, e.isOpen = !0;
  },
  close() {
    e.isOpen = !1;
  }
};
export {
  s as biliVideoTaskController,
  e as biliVideoTaskState
};
