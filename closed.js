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

    return new Response(`

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=disabled_visible" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">

<title>Site closed</title>

<style>
html,body{
  margin:0;
  background:#fff;
  color:#1d1d1f;
  font-family:Inter,-apple-system,BlinkMacSystemFont,"SF Pro Text",system-ui,sans-serif;
}

.container{
  max-width:640px;
  margin:18vh auto;
  padding:0 28px;
}

.icon{
  font-family:'Material Symbols Outlined';
  font-size:28px;
  margin-bottom:18px;
  color:#6e6e73;
}

h1{
  font-size:1.7rem;
  font-weight:500;
  letter-spacing:-0.01em;
  margin:0 0 12px;
}

p{
  color:#6e6e73;
  line-height:1.6;
  margin:0 0 34px;
  max-width:480px;
}

a{
  color:#06c;
  text-decoration:none;
}

a:hover{
  text-decoration:underline;
}

.debug{
  font-size:.85rem;
  color:#6e6e73;
}

.footer{
  margin-top:40px;
  font-size:.8rem;
  color:#8e8e93;
}
</style>
</head>

<body>

<div class="container">

  <div class="icon">disabled_visible</div>

  <h1>This site is currently closed.</h1>

  <p>
    The service at <strong>fynnlabs.ch</strong> is not publicly available at the moment.  
    It is operated as part of the <a href="https://fynnhofmann.com">fynnhofmann.com</a> services.
  </p>

  <div class="debug">
    <div>IP: ${ip}</div>
    <div>Browser: ${browser}</div>
    <div>OS: ${os}</div>
    <div>Time: ${time}</div>
  </div>

  <div class="footer">
    Request served via Cloudflare edge network for fynnhofmann.com
  </div>

</div>

</body>
</html>

    `,{
      status:503,
      headers:{ "content-type":"text/html;charset=UTF-8" }
    });
  }
}
