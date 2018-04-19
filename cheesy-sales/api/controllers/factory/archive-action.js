module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Archive this Factory',


  description: 'Return factory once its archived',


  exits: {

    success: {
      viewTemplatePath: 'pages/factory/view-all',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
