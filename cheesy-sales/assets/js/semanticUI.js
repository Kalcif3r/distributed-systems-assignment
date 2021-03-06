function retrieveCheese(factoryID) {
  console.log('plog -- inside retrieveCheese')
  $.ajax({
    url: `http://localhost:1337/Invoice/find-all-cheese-for-factory/${factoryID}`,
    type: 'GET',
    complete: result => {
      console.log('result of request',result.responseJSON)
      let inventoryItems = result.responseJSON
      if( inventoryItems ) {
        $( '#cheese-dropdown' ).empty();
        inventoryItems.forEach( inventoryItem => {
          $('#cheese-dropdown').append(`
            <div id="cheeseID-${inventoryItem.cheeseID.id}"name = "${inventoryItem.cheeseID.cheeseName}"class="item" value="${inventoryItem.cheeseID.id}" data-value="${inventoryItem.cheeseID.id}">
              ${inventoryItem.cheeseID.cheeseName}
            </div>
            `)
        })
      }

    }// end of complete
  })
}

function addInvoiceItem () {
  let errors = false;
  let itemDetails = [
    $('#invoice-view-factoryID'),
    $('#invoice-view-cheeseID'),
    $('#invoice-view-quantity'),
    $('#invoice-view-price'),
  ]

  // check for errors
  itemDetails.forEach( itemDetail => {
    let value = itemDetail.val()
    let errorID = `#${itemDetail.attr('id')}-error`
    if( value === undefined || value === null || value === '' ) {
      $(errorID).removeClass('hidden')
      console.log('fired hidden',errorID)
      errors = true;
    } else {
      $(errorID).addClass('hidden')
    }
  })

  // if no errors
  if(!errors) {
    // add a new object to the input
    let oldValue = JSON.parse($('#invoice-view-invoiceItemsArray').val())
    console.log("The Old value that's parsed is:", oldValue)
    let newValue = {
      factoryID: $('#invoice-view-factoryID').attr('value'),
      cheeseID: $('#invoice-view-cheeseID').attr('value'),
      quantity: $('#invoice-view-quantity').val(),
      price: $('#invoice-view-price').val(),
    }
    console.log("The New value that's created is:", newValue)
    oldValue.push(newValue)
    console.log("The New+Old that's created is:", oldValue)
    $('#invoice-view-invoiceItemsArray').val(JSON.stringify(oldValue))

    console.log("The New+Old that's a var is:",JSON.parse($('#invoice-view-invoiceItemsArray').val()))
    // let newValue = oldValue.push({
    //   factoryID: $('#invoice-view-factoryID').val(),
    //   cheeseID: $('#invoice-view-cheeseID').val(),
    //   quantity: $('#invoice-view-quantity').val(),
    //   price: $('#invoice-view-price').val(),
    // })
    // console.log('invoiceItemArrays value new is : '  , newValue)
    // console.log('invoiceItemArrays value new parsed is : '  , newValue)
    $('#addItemTable-body').append(`
    <tr>
      <td>x</td>
      <td>${$(`#cheeseID-${newValue.cheeseID}`).attr('name')}</td>
      <td>${$('#invoice-view-quantity').val()}</td>
      <td>${$('#invoice-view-price').val()}</td>
      <td>${$('#invoice-view-price').val() * $('#invoice-view-quantity').val()}</td>
    </tr>
    `)

    // update total
    let sum = 0
    oldValue.forEach( item => {
      sum += item.price*item.quantity
    })
    $('#total-control').html(`<strong> Rs.${sum} </strong>`)
  }
}


function createProject () {
  $('#create-project')
  .modal('show')
}
function createTask() {
  $('#create-task')
  .modal('show')
}
// makes dropdowns work
  jQuery('.ui.search.dropdown')
  .dropdown({
    fullTextSearch: true
  });


  /*
  	A simple, lightweight jQuery plugin for creating sortable tables.
  	https://github.com/kylefox/jquery-tablesort
  	Version 0.0.11
  */

  (function($) {
  	$.tablesort = function ($table, settings) {
  		var self = this;
  		this.$table = $table;
  		this.$thead = this.$table.find('thead');
  		this.settings = $.extend({}, $.tablesort.defaults, settings);
  		this.$sortCells = this.$thead.length > 0 ? this.$thead.find('th:not(.no-sort)') : this.$table.find('th:not(.no-sort)');
  		this.$sortCells.on('click.tablesort', function() {
  			self.sort($(this));
  		});
  		this.index = null;
  		this.$th = null;
  		this.direction = null;
  	};

  	$.tablesort.prototype = {

  		sort: function(th, direction) {
  			var start = new Date(),
  				self = this,
  				table = this.$table,
  				rowsContainer = table.find('tbody').length > 0 ? table.find('tbody') : table,
  				rows = rowsContainer.find('tr').has('td, th'),
  				cells = rows.find(':nth-child(' + (th.index() + 1) + ')').filter('td, th'),
  				sortBy = th.data().sortBy,
  				sortedMap = [];

  			var unsortedValues = cells.map(function(idx, cell) {
  				if (sortBy)
  					return (typeof sortBy === 'function') ? sortBy($(th), $(cell), self) : sortBy;
  				return ($(this).data().sortValue != null ? $(this).data().sortValue : $(this).text());
  			});
  			if (unsortedValues.length === 0) return;

  			//click on a different column
  			if (this.index !== th.index()) {
  				this.direction = 'asc';
  				this.index = th.index();
  			}
  			else if (direction !== 'asc' && direction !== 'desc')
  				this.direction = this.direction === 'asc' ? 'desc' : 'asc';
  			else
  				this.direction = direction;

  			direction = this.direction == 'asc' ? 1 : -1;

  			self.$table.trigger('tablesort:start', [self]);
  			self.log("Sorting by " + this.index + ' ' + this.direction);

  			// Try to force a browser redraw
  			self.$table.css("display");
  			// Run sorting asynchronously on a timeout to force browser redraw after
  			// `tablesort:start` callback. Also avoids locking up the browser too much.
  			setTimeout(function() {
  				self.$sortCells.removeClass(self.settings.asc + ' ' + self.settings.desc);
  				for (var i = 0, length = unsortedValues.length; i < length; i++)
  				{
  					sortedMap.push({
  						index: i,
  						cell: cells[i],
  						row: rows[i],
  						value: unsortedValues[i]
  					});
  				}

  				sortedMap.sort(function(a, b) {
  					return self.settings.compare(a.value, b.value) * direction;
  				});

  				$.each(sortedMap, function(i, entry) {
  					rowsContainer.append(entry.row);
  				});

  				th.addClass(self.settings[self.direction]);

  				self.log('Sort finished in ' + ((new Date()).getTime() - start.getTime()) + 'ms');
  				self.$table.trigger('tablesort:complete', [self]);
  				//Try to force a browser redraw
  				self.$table.css("display");
  			}, unsortedValues.length > 2000 ? 200 : 10);
  		},

  		log: function(msg) {
  			if(($.tablesort.DEBUG || this.settings.debug) && console && console.log) {
  				console.log('[tablesort] ' + msg);
  			}
  		},

  		destroy: function() {
  			this.$sortCells.off('click.tablesort');
  			this.$table.data('tablesort', null);
  			return null;
  		}

  	};

  	$.tablesort.DEBUG = false;

  	$.tablesort.defaults = {
  		debug: $.tablesort.DEBUG,
  		asc: 'sorted ascending',
  		desc: 'sorted descending',
  		compare: function(a, b) {
  			if (a > b) {
  				return 1;
  			} else if (a < b) {
  				return -1;
  			} else {
  				return 0;
  			}
  		}
  	};

  	$.fn.tablesort = function(settings) {
  		var table, sortable, previous;
  		return this.each(function() {
  			table = $(this);
  			previous = table.data('tablesort');
  			if(previous) {
  				previous.destroy();
  			}
  			table.data('tablesort', new $.tablesort(table, settings));
  		});
  	};

  })(window.Zepto || window.jQuery);

  $('table').tablesort()
