export default {
  async fetch(request, env, ctx) {

    const CLOSED = true;
    if (!CLOSED) return fetch(request);

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const ua = request.headers.get("User-Agent") || "unknown";

    function detectBrowser(ua) {
      if (ua.includes("Firefox")) return "Firefox";
      if (ua.includes("Edg")) return "Edge";
      if (ua.includes("Chrome")) return "Chrome";
      if (ua.includes("Safari")) return "Safari";
      return "Unknown";
    }

    function detectOS(ua) {
      if (ua.includes("Windows")) return "Windows";
      if (ua.includes("Mac OS")) return "macOS";
      if (ua.includes("Linux")) return "Linux";
      if (ua.includes("Android")) return "Android";
      if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
      return "Unknown";
    }

    const browser = detectBrowser(ua);
    const os = detectOS(ua);
    const time = new Date().toISOString();

    return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=disabled_visible" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">

<title>Site closed</title>
<!-- dein komplettes CSS bleibt unverändert -->
...
</head>
<body>
<!-- dein HTML unverändert -->
</body>
</html>`,{
      status:200,
      headers:{
        "content-type":"text/html;charset=UTF-8",
        "x-robots-tag":"noindex, nofollow"
      }
    });
  }
}
