// No-op gsap for server-side rendering checks: animations do not change the markup.
const chain = () => {
  const api = new Proxy(function () {}, { get: (_t, prop) => (prop === 'then' ? undefined : api), apply: () => api });
  return api;
};
const gsap = new Proxy({}, { get: (_t, prop) => (prop === 'then' ? undefined : chain()) });
export default gsap;
export { gsap };
