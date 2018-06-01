module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [

    // First application
    {
      name      : 'pickabook-api',
      script    : 'dist/index.bundle.js',
      env: {
        COMMON_VARIABLE: 'true'
      },
      env_production : {
        NODE_ENV: 'production'
      }
    },

    // Second application
    {
      name      : 'WEB',
      script    : 'web.js'
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy : {
    production : {
      user : 'node',
      host : '202.182.124.93',
      ref  : 'origin/master',
      repo : 'git@github.com:labirin/pickabook-restful-api-master.git',
      path : '/home/labirin/server',
      'post-deploy' : ' mkdir -p logs && touch logs/all-logs.log &&npm install && pm2 startOrRestart ecosystem.config.js --env production',
      'pre-deploy-local':"echo `Deploying to alicloud server`"
    },
    dev : {
      user : 'node',
      host : '202.182.124.93',
      ref  : 'origin/master',
      repo : 'git@github.com:labirin/pickabook-restful-api-master.git',
      path : '/home/labirin/server',
      'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.config.js --env dev',
      env  : {
        NODE_ENV: 'dev'
      }
    }
  }
};
