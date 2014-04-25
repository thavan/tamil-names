/**
 * Service call.
 */

base_url = "http://bnapi2-skynetdev.rhcloud.com/api";
username = "android-client";
api_key = "5d304dc25b7105da3933e946bf323c4dad998eb4";

var Service = Service || {
	call: function (sub_url, data){
		data.username = username;
		data.api_key = api_key;
		var request = $.ajax({
			url: base_url + sub_url,
			type: "GET",
			data: data
		});
		request.done(function (names){
			console.log(names);
			var html = "";
		    $.each( names.objects, function ( i, val ) {
		        html += "<li>" + val.english_name + "</li>";
		    });
		    this.next = names.meta.next;
		    var $ul = $("#namelistpage_ul")
		    $ul.html( html );
		    console.log(html);
		    console.log($ul);
		    $ul.listview( "refresh" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' );
		    
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	loadmore: function (){
		var request = $.ajax({
			url: this.next,
			type: "GET",
			data: {}
		});
		request.done(function (names){
			console.log(names);
			var html = "";
		    $.each( names.objects, function ( i, val ) {
		        html += "<li>" + val.english_name + "</li>";
		    });
		    html += "<input id='loadmore' type='button' value='Load More'>";
		    this.next = names.meta.next;
		    var $ul = $("#namelistpage_ul")
		    $ul.html( html );
		    console.log(html);
		    console.log($ul);
		    $ul.listview( "refresh" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' );
		    
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	test : "hello",
}

