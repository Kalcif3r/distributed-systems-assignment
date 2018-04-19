module.exports = {


  friendlyName: 'Update this Cheese',


  description: 'Display "Update Cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
