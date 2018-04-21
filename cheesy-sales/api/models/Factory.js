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

    factoryLocation: {
      type: 'string',
      required: true,
      description: 'Full representation of the Cheese name',
      example: 'Tiddy Cheese'
    },

    factoryCountry: {
      type: 'string',
      required: true,
      description: 'The cheese made from Tiddies'
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

    userID: {
      collection: 'user',
      via: 'factoryID',
    }

  },


};
