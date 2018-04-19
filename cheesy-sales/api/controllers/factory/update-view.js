module.exports = {


  friendlyName: 'Update this Factory',


  description: 'Display "Update Factory" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/update-view',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
