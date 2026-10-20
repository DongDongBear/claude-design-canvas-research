/* 本机回放适配器。该文件为本次研究新增，不属于 Claude 发布物。 */
(() => {
  'use strict';
  const origin = location.origin;
  const rawFetch = window.fetch.bind(window);
  const allowed = (value) => {
    try {
      const url = new URL(value instanceof Request ? value.url : value, location.href);
      return url.origin === origin || url.protocol === 'blob:' || url.protocol === 'data:';
    } catch { return false; }
  };
  window.fetch = (input, init) => allowed(input)
    ? rawFetch(input, init)
    : Promise.reject(new TypeError('本机回放拒绝外部网络请求'));
  for (const key of ['WebSocket', 'EventSource', 'WebTransport', 'RTCPeerConnection', 'webkitRTCPeerConnection']) {
    try { Object.defineProperty(window, key, { value: undefined, configurable: false }); } catch {}
  }
  const rawOpen = window.open.bind(window);
  window.open = (url, ...args) => !url || allowed(url) ? rawOpen(url, ...args) : null;
  document.addEventListener('click', (event) => {
    const link = event.target?.closest?.('a[href]');
    if (link && !allowed(link.href)) { event.preventDefault(); event.stopImmediatePropagation(); }
  }, true);
  document.addEventListener('submit', (event) => {
    if (!allowed(event.target?.action ?? location.href)) event.preventDefault();
  }, true);
  const bytesOf = async (value) => {
    if (typeof value === 'string') return new TextEncoder().encode(value);
    if (value instanceof Blob) return new Uint8Array(await value.arrayBuffer());
    if (value instanceof ArrayBuffer) return new Uint8Array(value);
    if (ArrayBuffer.isView(value)) return new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    throw new TypeError('本机适配器只接受字符串、Blob 或字节内容');
  };
  const base64Of = (bytes) => {
    let encoded = '';
    for (let i = 0; i < bytes.length; i += 32768) encoded += String.fromCharCode(...bytes.subarray(i, i + 32768));
    return btoa(encoded);
  };
  const artifact = Object.freeze({
    async publish(files) {
      if (!files || typeof files !== 'object' || Array.isArray(files)) throw new TypeError('files 必须为映射');
      const entries = {};
      for (const [path, value] of Object.entries(files)) {
        if (!path.startsWith('project/')) throw { code: 'read_only_path', message: '本机适配器只写 replay/state/project/' };
        if (value === null || value?.delete === true) entries[path] = value;
        else {
          const content = value && typeof value === 'object' && 'content' in value ? value.content : value;
          const bytes = await bytesOf(content);
          entries[path] = {
            base64: base64Of(bytes),
            contentType: typeof value?.contentType === 'string' ? value.contentType : 'text/plain',
            ...(typeof value?.ifMatch === 'string' || value?.ifMatch === null ? { ifMatch: value.ifMatch } : {}),
          };
        }
      }
      const result = await rawFetch('/__replay/publish', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ files: entries }),
      });
      const body = await result.json();
      if (!result.ok) throw body;
      return body;
    },
  });
  const user = Object.freeze({
    id: async () => 'replay-viewer',
    canEdit: async () => true,
    can: async (scope) => scope === 'data.write' || scope === 'files.write',
    me: async () => ({ id: 'replay-viewer', name: '本机回放', color: '#526a85' }),
    profiles: async () => ({}),
  });
  const capabilities = Object.freeze({ artifact, self: artifact, user });
  Object.defineProperty(window, 'claude', {
    value: Object.freeze({ ...capabilities, use: async (name) => capabilities[name] ?? null }),
    configurable: false,
  });
  window.__replayInfo = Object.freeze({
    offline: true, capabilities: Object.keys(capabilities),
    storage: 'replay/state/project/', upstream: false,
    unavailable: ['sample', 'db', 'room', 'comments', 'assets', 'downloads', 'paste', 'mcp'],
  });
})();
