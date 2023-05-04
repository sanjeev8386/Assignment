export function asyncWrap(promise) {
  return promise.then((result) => [null, result]).catch((err) => [err]);
}

export function getUrl() {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:8000/api';
  }
  return window.location.origin + '/api/';
}
