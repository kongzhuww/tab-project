/** Safe local categories shared by transport and coordinators; never attach bodies/credentials. */
export class HttpError extends Error {
  constructor(public readonly status: number) { super(`服务器响应 ${status}`); this.name = "PrivateChatHttpError"; }
}
export class ChatCapabilityError extends Error { readonly name = "ChatCapabilityError"; }
