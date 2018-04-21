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

    date: {
      type: 'string',
      columnType: 'date',
      required: true,
      description: 'The date of the invoice',
      example: 2018-02-03
    },

    total: {
      type: 'number',
      required: true,
      description: 'The grand total of the invoice',
      example: 500
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Signifies if this record deleted by the user',
      extendedDescription: 'This is useful since we can\'t actually delete records on user\'s \'delete\' command. If a record that acts as a foreign key gets deleted, It\'ll throw an error in the other side of the connection.',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

    invoiceItemID: {
      collection: 'invoiceItems',
      via: 'invoiceID',
    },

  },


};
