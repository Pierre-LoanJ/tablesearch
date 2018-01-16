
function setHtml(data) {
	var s = "<table class='table table-striped'><tbody>";
	var keys = [];
	if (data) {
		var i = 0;
		for (var key in data[0]) {
			keys[i++] = key;
		}
	}
	for (var i = 0; i < data.length; i++) {
		if (i == 0) {
			s += '<tr>';
			s += '<th>' + keys[0] + '</th>';
			s += '<th>' + keys[1]  + '</th>';
			s += '<th>' + keys[2]  + '</th>';
			s += '</tr>';
		}
		s += '<tr>';
		s += '<td>' + data[i][keys[0]] + '</td>';
		s += '<td>' + data[i][keys[1]] + '</td>';
		s += '<td>' + data[i][keys[2]] + '</td>';
		s += '</tr>';
	}
	return s + "</tbody></table>";
}
function algoliaInit() {
	const search = instantsearch({
	  appId: 'CHVVKKXO9L',
	  apiKey: '9bfbf736a7bf0ae75f04c3b3aaae91b4',
	  indexName: 'census',
	  urlSync: true
	});
	// initialize SearchBox
    search.addWidget(
    	instantsearch.widgets.searchBox({
    		container: '#search-box',
    		placeholder: 'Search for words'
    	})
  	);
  	// refinement
  	search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#refinement-list',
      attributeName: 'category'
    })
  );
  // initialize hits widget
  	search.addWidget(
    	instantsearch.widgets.hits({
      	container: '#hits'
    	})
  	);
  	search.addWidget(
    instantsearch.widgets.pagination({
      container: '#pagination',
      maxPages: 20,
      // default is to scroll to 'body', here we disable this behavior
      scrollTo: false
    })
  );

	search.start();
}
$(document).ready(function() {
	$('li').click(function(e) {
	   	e.preventDefault();

	   	var oldLongClass = $('.active')[0].className;
	   	var oldShortClass = oldLongClass.replace('active', '').trim();
	   	var clkClass = $(this).attr('class');

	   	if (oldLongClass != clkClass) {
		   	var lnkCntBloc = clkClass.substring('active').trim() + '-bloc';

		   	//affiche le bloc lié cliqué et cache l'ancien
			$('.' + oldShortClass + '-bloc').css('display', 'none');
			$('.' + lnkCntBloc).css('display', 'block');

			// gère la nav - remove classes from all and add class to the one we clicked
		    $('li').removeClass('active');
		    $(this).addClass('active');
	   	}
    });
	$('.changeProfilePic').click(function(e) {
		e.preventDefault();
		$('#photoUploader').modal('toggle');
		$('#photoUploader').modal('show');
	});

	$('#search-box').click(function(e) {
		$('.dataContent').css('display', 'none');
		$('#hits').css('display', 'block');
	});

	$('#columnParam').on("change", function(e) {
		$('#hits').css('display', 'none');
		$('.dataContent').css('display', 'block');
		e.preventDefault();
		var column = this.value;
		    $.ajax({
				url: '/profile/data/' + column,
		      type: 'GET',
		      data: null,
		      processData: false,
		      contentType: false,
		      success: function(data){
		          //$('.dataContent').text(JSON.stringify(data));
		          $('.dataContent').html(setHtml(data));
		        }
		    });
	});

	algoliaInit();
});