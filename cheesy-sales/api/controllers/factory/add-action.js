module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Update this Factory',


  description: 'Display "Update Factory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
