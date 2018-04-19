module.exports = {


  friendlyName: 'View all Cheese',


  description: 'Display "Cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
