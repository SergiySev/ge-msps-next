module.exports = {
  apps: [
    {
      name: 'ge-msps-next',
      script: 'npm',
      args: 'start',
      env: {
        PORT: 3030,
        NODE_ENV: 'production',
      },
      watch: false,
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      time: true
    }
  ]
}