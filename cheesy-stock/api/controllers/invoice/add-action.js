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
    async function addInvoiceItem( db, delay, invoiceItem ) {
      return new Promise((resolve,reject) => {
        setTimeout( async () => {
          sails.log(`at the start of individual create`)
          let newItem = await InvoiceItems.create(invoiceItem)
          .usingConnection(db)
          .fetch()

          console.log('newItem.id: ',newItem.id )

          if ( newItem.id ) {
            resolve({id: newItem.id, message: 'created', total: newItem.quantity * newItem.price})
          } else {
            reject('failed')
          }

          sails.log(`at the end of individual create

            `)
        }, delay);
      });
    }

    async function addInvoiceItems( delay, invoiceItems ) {
      return new Promise((resolve,reject) => {
        setTimeout(async () => {

          let start = new Date().getTime()
          sails.log('start of transaction')
          await sails.getDatastore()
          .transaction(async (db, proceed)=> {
            sails.log('inside of transaction')
            let idArray = []
            let result
            let total =0
            sails.log('inside of await')
            for(let i =0; i< invoiceItems.length;i++){
              console.log('index is:',invoiceItems[i])
              result = await addInvoiceItem(db,0,invoiceItems[i])
              console.log('plog --result of await individual invoice Item ',result)
              if(result === 'failed'){
                console.log( flaverr('E_CREATE_FAILURE', new Error('ERR: the create for invoice items failed ')) )
                return reject('failed')
              }
              idArray.push(result.id)
              total += result.total
            }

            let newInvoice = await Invoice.create({
              date: new Date().getTime(),
              total: total
            })
            .usingConnection(db)
            .fetch()

            await Invoice.addToCollection(newInvoice.id,'invoiceItemID')
            .members(idArray)
            .usingConnection(db)

            return proceed()

          })
          let end = new Date().getTime()

          sails.log('end of transaction time:', end-start)
          return resolve('succeeded-all')


        }, delay);
      });
    }

    try {

      let invoiceItems = JSON.parse(inputs.invoiceItemsArray)
      console.log('invoiceItems',invoiceItems)
      console.log('start',new Date().getTime())
      for(let retry = true, delay = 30, result = ''; // initialization
        retry === true; // condition
      ) { // iterator

        console.log('start of major transaction')
        result = await addInvoiceItems( delay, invoiceItems )
        console.log('result: ',result)
        console.log('end of major transaction')

        if( result === 'failed' ) {
          console.log( flaverr('E_SUPER_FAILED', new Error('ERR: the create for invoice items failed thrice')) )
        } else if ( result === 'succeeded-all') {
          console.log('all is done')
          retry = false
        }
      }


      console.log('end',new Date().getTime())
    } catch ( err ) {
      if (err) {
        console.log( err )
      }
    }



    // while trying = true
    // if response != ''  send a request
    //

    return exits.success()

  } // end of the entire FN function



};
