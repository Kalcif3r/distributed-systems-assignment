module.exports.keys = {
  accessToken: {
    self: process.env.ACCESS_TOKEN,
    orders: process.env.ORDERS_ACCESS_TOKEN,
    payments: process.env.PAYMENTS_ACCESS_TOKEN,
    products: process.env.PRODUCTS_ACCESS_TOKEN,
  },
  ripple: {
    user: process.env.RIPPLE_USER,
    pass: process.env.RIPPLE_PASS,
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
}
