import { K as n, G as u } from "./vendor-vue-C-_ocEUS.js";
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
