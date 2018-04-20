/**
 * User.js
 *
 * A user who can log in to this application.
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    quantity: {
      type: 'number',
      required: true,
      description: 'The qty of each item in an invoice',
      example: 5
    },

    price: {
      type: 'number',
      required: true,
      description: 'The price of each item in an invoice',
      example: 300
    },

    // subtotal: {
    //   type: 'number',
    //   required: true,
    //   default: 0,
    //   description: 'The subtotal of each item in an invoice(calculated from qty*cheese.price)',
    //   example: 500
    // }

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

    cheeseID: {
      model: 'cheese',
    },

    invoiceID: {
      model: 'invoice',
    },

  },


};
