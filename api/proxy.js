export default async function handler(req, res) {
  // Extract path from query (Vercel rewrite) or incoming URL
  const urlObj = new URL(req.url, 'http://localhost');
  let targetPath = '';

  if (req.query && req.query.path) {
    const rawPath = req.query.path;
    targetPath = Array.isArray(rawPath) ? rawPath.join('/') : rawPath;
  } else {
    targetPath = urlObj.pathname.replace(/^\/api-proxy\/?/, '').replace(/^\/api\/proxy\/?/, '');
  }

  // Ensure leading slash
  if (!targetPath.startsWith('/')) {
    targetPath = `/${targetPath}`;
  }

  // Preserve query parameters except internal routing params
  const forwardParams = new URLSearchParams();
  urlObj.searchParams.forEach((val, key) => {
    if (key !== 'path') {
      forwardParams.append(key, val);
    }
  });
  const queryString = forwardParams.toString();
  const targetUrl = `https://slipcartbackend.onrender.com${targetPath}${queryString ? `?${queryString}` : ''}`;

  // Handle browser CORS preflight directly at the proxy
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');
    res.setHeader('Access-Control-Max-Age', '86400');
    return res.status(204).end();
  }

  // Build clean request headers to forward to Render
  const headers = {};
  for (const [key, value] of Object.entries(req.headers || {})) {
    const lowerKey = key.toLowerCase();
    // Strip host and hop-by-hop headers
    if (!['host', 'connection', 'content-length', 'transfer-encoding', 'cookie'].includes(lowerKey)) {
      headers[key] = value;
    }
  }

  // Render backend requires an authorized Origin.
  // We verified http://localhost:3000 is whitelisted in their Go CORS config.
  headers['origin'] = 'http://localhost:3000';
  headers['referer'] = 'http://localhost:3000/';

  try {
    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (!['GET', 'HEAD'].includes(req.method)) {
      fetchOptions.body =
        typeof req.body === 'object' && req.body !== null
          ? JSON.stringify(req.body)
          : req.body;
      if (!headers['content-type']) {
        headers['content-type'] = 'application/json';
      }
    }

    const backendRes = await fetch(targetUrl, fetchOptions);
    const responseBody = await backendRes.text();

    res.status(backendRes.status);

    // Forward safe headers from backend response
    backendRes.headers.forEach((val, key) => {
      const lowerKey = key.toLowerCase();
      if (!['content-encoding', 'transfer-encoding', 'connection'].includes(lowerKey)) {
        res.setHeader(key, val);
      }
    });

    // Append permissive CORS headers to allow the frontend to consume it
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization, X-Requested-With');

    return res.send(responseBody);
  } catch (err) {
    return res.status(502).json({
      error: `Proxy error forwarding to backend: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
}
