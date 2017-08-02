I created this function because I had a client with a Woocommerce store that had isotope on their product gallery, but were annoyed that the equal heights script they were running had to apply to all items, instead of just the individual rows. 

This function will loop through your isotope grid and, based on the CSS top position of each isotope item, it will assign a row class, which then gives you elements you can easily target with an equal heights script.

This script can then be called on $grid.on( 'arrangeComplete', function( event, filteredItems ){ }) to be re-run every time the grid is filtered or sorted.