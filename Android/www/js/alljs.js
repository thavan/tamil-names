/**
 * All javascript
 */

var JS = {
		process_home : function(){
			data = {}
			data.format = "json"
			var response = Service.call("/name/", data)
			console.log(response);
		},
		test: "test",
}