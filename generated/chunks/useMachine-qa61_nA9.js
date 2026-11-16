import { M as n, C as u } from "./vendor-vue-C09jaOfK.js";
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
