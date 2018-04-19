module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Archive this factory',


  description: 'Archive a factory and returns tp /factory once it Archives',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
