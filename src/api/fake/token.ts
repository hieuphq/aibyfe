const DefaultFakeToken = 'FakeToken';
const DefaultPrefixToken = 'Bearer ';

export function generateToken(userId: string): string {
  return DefaultFakeToken + '|' + userId;
}

export function decodeToken(headers?: HeadersInit): string {
  if (headers == null) {
    return '';
  }

  const hds: Headers = headers as Headers;
  const token: string = hds.get('Authorization') || '';

  if (token === '') {
    return '';
  }

  return token.replace(DefaultPrefixToken + DefaultFakeToken + '|', '');
}
