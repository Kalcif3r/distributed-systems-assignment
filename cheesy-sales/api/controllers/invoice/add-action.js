module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Create this invoice',


  description: 'Creates a invoice and returns to /invoice once it Creates',


  exits: {

    success: {
      viewTemplatePath: 'pages/invoice/view-all',
    },
    badRequest: {
      statusCode: '500',
    },
    err: {
      statusCode: '500',
    }

  },


  fn: async function (inputs, exits) {
    // .authorization === 'CHEESYSTOCK'
    let unirest = require('unirest')
    let flaverr = require('flaverr')


    unirest.post('http://localhost:1338/Inventory/update-stock-action')
    .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': 'CHEESYSTOCK'})
    .send({})
    .end(response => {
      console.log('statusCode is: ',response.statusCode);
    });

    return exits.success()

  } // end of the entire FN function



};

/*

var myAccount = await BankAccount.findOne({ owner: this.req.session.userId })
.usingConnection(db);
if (!myAccount) {
return proceed(new Error('Consistency violation: Database is corrupted-- logged in user record has gone missing'));
}


async.waterfall([
  function(callback) {
    callback(null, 'one', 'two');
  },
  function(arg1, arg2, callback) {
    // arg1 now equals 'one' and arg2 now equals 'two'
    callback(null, 'three');
  },
  function(arg1, callback) {
    // arg1 now equals 'three'
    callback(null, 'done');
  }
], (err, result) => {
  if(err){
    //
  }
})


*/
