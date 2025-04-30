const nextConfig: import('next').NextConfig = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    // ignoreDuringBuilds: true,
  },
  images: {
    domains: [ 'localhost', 'lh3.googleusercontent.com', 'res.cloudinary.com'],
  },
  async headers() {
    const firbaseAuthDoamian = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || ''; // Use the environment variable
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || ''; // Use the environment variable
    const itemService = process.env.NEXT_PUBLIC_ITEM_URL || ''; // Use the environment variable

    return [
      {
        source: '/(.*)', // Apply CSP to all routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self' ${itemService} ${baseUrl}; connect-src 'self' ${baseUrl} ${itemService} https://video.bunnycdn.com https://firebasestorage.googleapis.com https://identitytoolkit.googleapis.com https://firebase.googleapis.com https://apis.google.com https://www.googleapis.com https://securetoken.googleapis.com https://${firbaseAuthDoamian} https://api-inference.huggingface.co https://api.openai.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://www.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://firebasestorage.googleapis.com https://www.gstatic.com https://res.cloudinary.com https://lh3.googleusercontent.com; font-src 'self' https://fonts.gstatic.com; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; frame-src 'self' https://iframe.mediadelivery.net https://${firbaseAuthDoamian} https://accounts.google.com; media-src 'self' blob:; frame-ancestors 'self' https://accounts.google.com`
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin"
          },
          {
            key: "Permissions-Policy",
            value: "geolocation=(), microphone=(), camera=()"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload"
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // Allows iframes & popups
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "require-corp credentialless", // Ensures proper resource loading
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "cross-origin", // Allows external resources
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN", // ✅ Allow embedding within the same origin
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
