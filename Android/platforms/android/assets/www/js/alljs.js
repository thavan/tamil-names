/**
 * All javascript
 */

var JS = JS
		|| {
			check_network : function() {
				var networkState = navigator.connection.type;
				console.log(networkState);
			},
			test : "test",

			assign_events : function() {
				$('ul#atozgirlnamelistpage_ul li').click(function() {
					$.mobile.changePage("#alphapage");
					JS.alpha_search = $(this).text();
					JS.alpha_gender = 'F';
				});
				$('ul#atozboynamelistpage_ul li').click(function() {
					$.mobile.changePage("#alphapage");
					JS.alpha_search = $(this).text();
					JS.alpha_gender = 'M';
				});
			},

			hide_elements : function() {

			},

			bind_elements : function() {
				$('#search-button').click(function() {
					$.mobile.changePage("#searchlistpage");
				});

				$(document).on(
						'pageshow',
						"#allnamelistpage",
						function() {
							Service.call('/api/name/', {},
									'#allnamelistpage_ul', "#allloadmore");
						});

				$('#allloadmore').click(function() {
					Service.loadmore('#allnamelistpage_ul', "#allloadmore");
				});

				$(document).on(
						'pageshow',
						"#girlnamelistpage",
						function() {
							Service.call('/api/femalename/', {},
									'#girlnamelistpage_ul', "#girlloadmore");
						});

				$('#girlloadmore').click(function() {
					Service.loadmore('#girlnamelistpage_ul', "#girlloadmore");
				});

				$(document).on(
						'pageshow',
						"#boynamelistpage",
						function() {
							Service.call('/api/malename/', {},
									'#boynamelistpage_ul', "#boyloadmore");
						});

				$('#boyloadmore').click(function() {
					Service.loadmore('#boynamelistpage_ul', "#boyloadmore");
				});

				$(document).on('pageshow', "#searchlistpage", function() {
					var search_query = $("#search-field").val();
					Service.call('/api/search/', {
						'query' : search_query,
						'contains' : 1
					}, '#searchlistpage_ul', "#searchloadmore");
				});

				$('#searchloadmore').click(function() {
					Service.loadmore('#searchlistpage_ul', "#searchloadmore");
				});

				$(document).on(
						'pageshow',
						"#randomnamelistpage",
						function() {
							Service.call('/api/random/', {"random": Math.random()},
									'#randomlistpage_ul', "#randomloadmore");
						});

				$('#randomloadmore').click(function() {
					Service.loadmore('#randomlistpage_ul', "#randomloadmore");
				});

				$(document).on('pageshow', "#alphapage", function() {
					Service.call('/api/search/', {
						"query" : JS.alpha_search,
						"alpha" : 1,
						"gender" : JS.alpha_gender
					}, '#alphalist_ul', "#alphaloadmore");
				});

				$('#alphaloadmore').click(function() {
					console.log("clicked load more");
					Service.loadmore('#alphalist_ul', "#alphaloadmore");
				});
			},
		}
