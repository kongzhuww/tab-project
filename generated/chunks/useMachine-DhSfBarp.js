import { K as n, H as u } from "./vendor-vue-BbmU9NUg.js";
function r(t) {
  const s = n(t.state), e = t.subscribe((o) => {
    s.value = o;
  });
  try {
    u(e);
  } catch {
  }
  return s;
}
export {
  r as u
};
