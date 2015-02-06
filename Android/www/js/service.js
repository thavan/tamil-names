/**
 * Service call.
 */

base_url = "http://tn.thava.me";
<<<<<<< HEAD
api_version = "/api/v1"
=======
>>>>>>> 998fc6d2fd1db3e9c3ebdfc59f3329215a6b669d
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
			url: base_url + api_version + sub_url,
			type: "GET",
			data: data
		});
		request.done(function (names){
			console.log(names);
			var html = "";
		    $.each( names.objects, function ( i, val ) {
		    	if(val.gender=='F'){
		    		html += "<ul data-role='listview' data-theme='a'>";
		    		html += "<li class='ui-btn'>" + val.english_name + "</li>";
		    		html += "</ul>";
		    	}
		    	else{
		    		html += "<ul data-role='listview' data-theme='b'>";
		    		html += "<li class='ui-btn'>" + val.english_name + "</li>";
		    		html += "</ul>";
		    	}
		    });
		    var next_url = names.meta.next;
		    console.log(next_url);
		    if(next_url != null){
		    	$(load_more_tag).attr('next', next_url);
		    	$(load_more_tag).attr('disabled',false);
		    	$(load_more_tag+"div").show();
		    }
		    else{
		    	$(load_more_tag).attr('disabled',true);
		    	$(load_more_tag).text("No more records!");
		    	$(load_more_tag+"div").hide();
		    }
		    	
		    var $ul = $(list_name);
		    $ul.html( html );
		    console.log(html);
		    $ul.trigger( "create" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' );
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	loadmore: function (list_tag, loadmore_tag){
		$.mobile.loading( 'show', {
			text: 'Loading...',
			textVisible: true,
			theme: 'z',
			html: ""
		});
		var request = $.ajax({
			url: base_url + $(loadmore_tag).attr('next'),
			type: "GET",
			data: {}
		});
		request.done(function (names){
			console.log("triggerd");
			var html = "";
		    $.each( names.objects, function ( i, val ) {
		    	if(val.gender=='F'){
		    		html += "<ul data-role='listview' data-theme='a'>";
		    		html += "<li class='ui-btn'>" + val.english_name + "</li>";
		    		html += "</ul>";
		    	}
		    	else{
		    		html += "<ul data-role='listview' data-theme='b'>";
		    		html += "<li class='ui-btn'>" + val.english_name + "</li>";
		    		html += "</ul>";
		    	}
		    });
		    var next_url = names.meta.next;
		    console.log(next_url);
		    
		    if(next_url != null){
		    	$(loadmore_tag).attr('next', next_url);
		    	$(loadmore_tag + "div").show();
		    }
		    else{
		    	$(loadmore_tag).attr('disabled',true);		    }
		    var $ul = $(list_tag);
		    $ul.html( html );
		    console.log(html);
		    $ul.trigger( "create" );
		    $ul.trigger( "updatelayout");
		    $.mobile.loading( 'hide' ); 
		    $('body,html').animate({scrollTop:0},0);
		});
		request.fail(function (jqXHR, textStatus){
			console.log(textStatus);
		});
	},

	test : "hello",
}

