/**
 * Service call.
 */

base_url = "http://bnapi2-skynetdev.rhcloud.com";
username = "android-client";
api_key = "5d304dc25b7105da3933e946bf323c4dad998eb4";

var Service = Service || {
	call: function (sub_url, data, list_name, load_more_tag){
		$.mobile.loading( 'show', {
			text: 'Loading...',
			textVisible: true,
			theme: 'z',
			html: ""
		});
		data.username = username;
		data.api_key = api_key;
		data.format = "json";
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
		    var next_url = names.meta.next;
		    console.log(next_url);
		    if(next_url != null){
		    	$(load_more_tag).attr('next', next_url);
		    	$(load_more_tag).attr('disabled',false)
		    }
		    else{
		    	$(load_more_tag).attr('disabled',true)
		    	$(load_more_tag).text("No more records!")
		    }
		    	
		    var $ul = $(list_name)
		    $ul.html( html );
		    console.log(html);
		    $ul.listview( "refresh" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' );
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	loadmore: function (list_tag, loadmore_tag){
		var request = $.ajax({
			url: base_url + $(loadmore_tag).attr('next'),
			type: "GET",
			data: {}
		});
		request.done(function (names){
			console.log("triggerd");
			var html = "";
		    $.each( names.objects, function ( i, val ) {
		        html += "<li>" + val.english_name + "</li>";
		    });
		    var next_url = names.meta.next;
		    console.log(next_url);
		    
		    if(next_url != null){
		    	$(loadmore_tag).attr('next', next_url);
		    	$(loadmore_tag).attr('disabled',false)
		    }
		    else{
		    	$(loadmore_tag).attr('disabled',true)
		    	$(loadmore_tag).text("No more records!")
		    }
		    var $ul = $(list_tag);
		    $ul.html( html );
		    console.log(html);
		    $ul.listview( "refresh" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' ); 
		    $('body,html').animate({scrollTop:0},800);
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	test : "hello",
}

