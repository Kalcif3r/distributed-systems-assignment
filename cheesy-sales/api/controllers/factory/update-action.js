module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Update this Factory',


  description: 'Post action for "Update Cheese" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
