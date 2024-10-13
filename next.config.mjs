/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                
            },
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                
            },
            {
                protocol: "https",
                hostname: "kszcekvxlqrhdtxoyubd.supabase.co",
                port: "",
                
            },
        ]
    }
};

export default nextConfig;
