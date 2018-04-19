module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Update this factory',


  description: 'Update a factory and returns tp /factory once it Updates',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
