/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REACT_APP_API_HOST: process.env.REACT_APP_API_HOST,
      },
};

export default nextConfig;
