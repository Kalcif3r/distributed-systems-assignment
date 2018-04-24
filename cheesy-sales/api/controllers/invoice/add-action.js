module.exports = {

  // FIXME: NEED TO ACTUALLY CREATE CONTROLLER

  friendlyName: 'Create this invoice',

  description: 'Creates a invoice and returns to /invoice once it Creates',

  inputs: {

    invoiceItemsArray: {
      type: 'string',
      required: true,
    },


  },

  exits: {

    success: {
      statusCode: '200',
    },

    badRequest: {
      statusCode: '500',
    },

  },


  fn: async function (inputs, exits) {
    // imports
    let unirest = require('unirest')
    let flaverr = require('flaverr')

    // definition of HTTP Request
    function requestToSalesServer( delay ) {
      return new Promise((resolve,reject) => {
        setTimeout(() => {
          unirest.post('http://localhost:1338/Inventory/update-stock-action')
          .headers({'Accept': 'application/json', 'Content-Type': 'application/json', 'authorization': 'CHEESYSTOCK'})
          .send({
            invoiceItems: inputs.invoiceItemsArray
          })
          .end(response => {
            if( response.statusCode === '500') {
              reject(response.statusCode)
            } else {
              resolve(response.statusCode)
            }
          })
        }, delay);
      });
    }

    // definition of Async call that makes execution pause where await is
    async function asyncCall( delay ) {
      // init variables
      let start
      let end

      // get the start time
      start = new Date().getTime()
      sails.log(`
       ---- START of Request ----`)
      sails.log('request start time: ', start )
      var result = await requestToSalesServer( delay );
      sails.log('response status code : ',result);

      // get the end time
      end = new Date().getTime()
      sails.log('request end time: ', end )
      sails.log(`total time: ${end - start}ms` )
      sails.log(`---- END of Request ----

      `)
      return result
    }


    // asyncCall()
    try {
      for( let retriesRemaining = 3, statusCode = 500, delay = 30, result = ''; // initialization
        retriesRemaining >= 0 && statusCode === 500; // condition
        retriesRemaining-- ) { // iterator
        sails.log('RETRIES REMAINING : ', retriesRemaining)
        if( retriesRemaining === 0 ) {
          throw flaverr('E_HTTP_REQUEST_FAILURE', new Error('ERR: the HTTP request has failed thrice'))
        } else if ( retriesRemaining === 3) {
          sails.log(`
      ======== FIRST HTTP REQUEST ========`)
          result = await asyncCall( 0 )
        } else {
          sails.log(`
      ======== ${retriesRemaining === 2 ? 'SECOND' : 'THIRD'} HTTP REQUEST ========`)
          result = await asyncCall( delay )
        }
        statusCode = result
      }
    }catch (err) {
      sails.log(err)
      return exits.badRequest()
    }

    // Begin transaction for Updating the invoiceItems for realsies on this server

    // too tired to think through this. wake me up or give it a go vased on the earlier transaction we made in stock

    } // end of function

    }

    // while trying = true
    // if response != ''  send a request
    //

    return exits.success()

  } // end of the entire FN function



};
