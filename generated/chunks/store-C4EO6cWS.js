import { r } from "./vendor-vue-CjOHdfe5.js";
const t = r({
  mounted: !1,
  isOpen: !1,
  frameSrc: "",
  requestedSection: null,
  requestedStorageTarget: null,
  sectionRequest: 0
});
let i = null;
const o = {
  state: t,
  setMounted(e) {
    t.mounted = e;
  },
  onAction(e) {
    i = e;
  },
  dispatch(e, s) {
    if (i)
      return i(e, s);
  },
  open(e, s) {
    if (e) {
      const n = e === "bili-cache" || e === "stickers";
      t.requestedSection = n ? "storage" : e, t.requestedStorageTarget = n ? e : e === "storage" ? s ?? null : null, ++t.sectionRequest;
    }
    t.isOpen = !0, this.dispatch("open");
  },
  minimize() {
    t.isOpen = !1, this.dispatch("minimize");
  },
  close() {
    t.isOpen = !1, this.dispatch("close");
  },
  toggle() {
    t.isOpen ? this.minimize() : this.open();
  }
};
export {
  o as s
};
