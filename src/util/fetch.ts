import fetch from 'unfetch';

// interface T extends Response {
//   parsedBody?: T;
// }
export async function http<T>(
  request: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(request, init);
  return res.json();
}

export async function get<T>(
  path: string,
  headers?: HeadersInit,
  args: RequestInit = { method: 'get', headers: headers }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function post<T>(
  path: string,
  body: any,
  headers?: HeadersInit,
  args: RequestInit = {
    method: 'post',
    headers: headers,
    body: JSON.stringify(body)
  }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function put<T>(
  path: string,
  body: any,
  headers?: HeadersInit,
  args: RequestInit = {
    method: 'put',
    headers: headers,
    body: JSON.stringify(body)
  }
): Promise<T> {
  return await http<T>(new Request(path, args));
}

export async function remove<T>(
  path: string,
  headers?: HeadersInit,
  args: RequestInit = { method: 'delete', headers: headers }
): Promise<T> {
  return await http<T>(new Request(path, args));
}
