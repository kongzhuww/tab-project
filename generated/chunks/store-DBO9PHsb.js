import { r as n } from "./vendor-vue-9b0eS4bW.js";
const t = n({
  mounted: !1,
  isOpen: !1,
  frameSrc: "",
  requestedSection: null,
  sectionRequest: 0
});
let i = null;
const l = {
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
  open(e) {
    e && (t.requestedSection = e, ++t.sectionRequest), t.isOpen = !0, this.dispatch("open");
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
  l as s
};
