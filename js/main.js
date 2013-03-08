$(function(){

	$('button').click(function(){
	
		require([
			'data-tester',
			'tests'
		], function(
			dataTester,
			tests
		){

			var currentTest;
			
			while(tests.hasNext()){
				
				currentTest = tests.next();
				console.log('=============================\n' + currentTest.test);

				//	fetch data
				$.ajax({
					async: false,
					dataType: 'text',
					url: 'data/' + currentTest.url,
					type: 'POST',
					error: function(){
						console.error('ajax call failed');
					},
					success: function(resp){
						console.log( '\n' + ( dataTester.isNewFormat(resp) ? 'PASSED' : 'FAILED' ) + '\n' );
					}
				});
			};

			tests.rewind();
		});	
	});

	$('button').trigger('click');
});