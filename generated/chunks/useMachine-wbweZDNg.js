import { M as n, K as u } from "./vendor-vue-9b0eS4bW.js";
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
