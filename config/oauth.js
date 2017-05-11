module.exports = {
  facebook: {
    loginURL: 'https://www.facebook.com/v2.8/dialog/oauth',
    accessTokenURL: 'https://graph.facebook.com/v2.8/oauth/access_token',
    profileURL: '#',
    clientId: process.env.FB_THE_CHICKEN_COOP_ID,
    clientSecret: process.env.FB_THE_CHICKEN_COOP_SECRET,
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/oauth/facebook' : 'https://salty-plains-99579.herokuapp.com/oauth/facebook',
    scope: 'user:email',
    getLoginURL() {
      return `${this.loginURL}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}`
    }
  }
};
