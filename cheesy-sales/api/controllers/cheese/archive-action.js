module.exports = {

  // FIXME: NEED TO UPDATE ADD ACTION LATER

  friendlyName: 'Archive this Cheese',


  description: 'Return cheese once its archived',


  exits: {

    success: {
      viewTemplatePath: 'pages/cheese',
    }

  },


  fn: async function (inputs, exits) {

    return exits.success();

  }


};
