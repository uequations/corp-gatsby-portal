if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  console.log("environment: ", process.env.NODE_ENV)
  require("dotenv").config({ path: "./.env.development" })
} else if (process.env.NODE_ENV === "production" && !process.env.NETLIFY) {
  console.log("environment: ", process.env.NODE_ENV)
  require("dotenv").config({ path: "./.env.production" })
} else {
  console.log("environment: ", process.env.NODE_ENV)
  console.log("netlify: ", process.env.NETLIFY)
}

module.exports = {
  siteMetadata: {
    title: `UEQ Employee Portal | Universal Equations`,
    description: `Employee portal.`,
    author: `@uequations`,
    url: "https://corp.uequations.com",
    image: `https://res.cloudinary.com/uequations/image/upload/v1590180350/password-gen-gatsby-site/keys.png`,
    twitterUsername: `@uequations`,
    keywords: `passwords,Generator,options,security,character,create`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {}
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `UEQ EMPLOYEE PORTAL | Universal Equations`,
        short_name: `Employee Portal`,
        start_url: `/`,
        background_color: `#9EA4D3`,
        theme_color: `#380A13`,
        display: `minimal-ui`,
        icon: `src/images/icon.png` // This path is relative to the root of the site.
      }

    },
    {
      resolve: `gatsby-plugin-facebook-pixel`,
      options: {
        pixelId: `131702777640710`
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ]
}
