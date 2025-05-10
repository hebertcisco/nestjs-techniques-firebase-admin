module.exports = {
    apps: [
        {
            name: "nestjs-techniques-firebase-admin",
            script: "./dist/main.js",
            instances: 2,
            autorestart: true,
            watch: false,
            max_memory_restart: "256M",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};