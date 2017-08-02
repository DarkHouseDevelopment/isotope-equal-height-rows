jQuery(function($){
	$(window).load(function(){
		// Init Product Category Isotope
		var $grid = $('#iso_products .products').isotope({
			itemSelector: '.loop-item',
			layoutMode: 'fitRows',
			getSortData: {
				name: '.product-name',
				pricelow: function( itemElem ) {
					return parseFloat( $(itemElem).data('price') );
				},
				pricehigh: function( itemElem ) {
					return parseFloat( $(itemElem).data('price') );
				}
			},
			sortAscending: {
				name: true,
				pricelow: true,
				pricehigh: false
			}
		});
		
		// call equalHeights script on arrangeComplete
		$grid.on( 'arrangeComplete', function( event, filteredItems ) {			
			isotopeEqualHeights('#iso_products .products', '.loop-item');
		});

		// bind filter button click
		$('#product_filters').on( 'click', '.filter', function() {
			$("#product_filters .filter").removeClass("active");
			$(this).addClass("active");
			var filterValue = $( this ).data('filter');
			$productsgrid.isotope({ filter: filterValue });
		});

		// bind sort button click
		$('.product-sort').on( 'change', '.product-sort-select', function() {
			var sortByValue = $(this).find(":selected").val();
			console.log(sortByValue);
			$productsgrid.isotope({ sortBy: sortByValue });
		});
	});
	
	
	
	// find isotope rows and run equal heights
	function isotopeEqualHeights(container,items){
		var row = 1;
		var top = 0;
		$(container).find(items).each(function(){
			$(this).removeClass(function(index, className){
				return (className.match(/(^|\s)row-\S+/g) || []).join(' ');
			});
			var itemTop = parseInt($(this).css('top'), 10);
			if($(this).is(':visible')){
				if(itemTop == top){
					$(this).addClass('row-'+row);
				} else {
					top = itemTop;
					row++;
					$(this).addClass('row-'+row);
				}
			}
		});
		for(i = 1; i <= row; i++){
			listingHeight('.products','.loop-item.row-'+i+' .type-product, .loop-item.row-'+i+' .type-product_variation', '.purchase-info');
		}
	}
	
	
	// Be sure to add the container around the row that you would like to resize, the class of each item and the class of any absolutely positioned element in the items
	function listingHeight(container, item, absContent) {
		$(container).each(function() {
			var selectedContainer = $(this);
			var height = 0;
			// Reset all the heights so the reading is correct
			selectedContainer.find(item).css('min-height', height);

			// Fugure out which item is the tallest
			selectedContainer.find(item).each( function() {
				var item = $(this);
				if (absContent == null) {
					var itemHeight = item.innerHeight();
				} else {
					var itemHeight = item.innerHeight() + item.find(absContent).innerHeight();
				}

				if (itemHeight > height) {
					height = itemHeight;
				}
			});

			// Set min height on all of the items
			selectedContainer.find(item).css('min-height', height);
		});

	}
});