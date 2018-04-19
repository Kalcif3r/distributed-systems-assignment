module.exports = {


  friendlyName: 'View all Factory',


  description: 'Display "Factory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
