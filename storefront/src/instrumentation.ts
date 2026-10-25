export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const ObserverKit = await import("@observerkit/js")

    ObserverKit.init({
      apiKey: "ok_proj_b712058121ff46e2d36ca6b5d44aa130",
    })
  }
}

export async function onRequestError(...args: any[]) {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const ObserverKit = await import("@observerkit/js")

    return ObserverKit.captureException(...args)
  }
}
