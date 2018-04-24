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

    stock: {
      type: 'number',
      required: true,
      description: 'Remaining stock of a certain cheese type',
      example: 100
    },

    isDeleted: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Signifies if this record deleted by the user',
      extendedDescription: 'This is useful since we can\'t actually delete records on user\'s \'delete\' command. If a record that acts as a foreign key gets deleted, It\'ll throw an error in the other side of the connection.',
    },

    isBeingUpdated: {
      type: 'boolean',
      defaultsTo: false,
      description: 'Signifies if this record is currently being updated or not',
    },


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝
    // n/a


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    // n/a

    factoryID: {
      model: 'factory',
    },

    cheeseID: {
      model: 'cheese',
    },

  },


};
