define(function(){

	
	var MODEL = {
		name: undefined,
		types: ['object'],
		attrs: [
			{
				name: 'status',
				types: ['string']
			},
			{
				name: 'message',
				types: ['string']
			},
			{
				name: 'tables',
				types: ['object'],
				attrs: [
					{
						name: undefined,
						types: ['object'],
						attrs: [
							{
								name: 'columns',
								types: ['object'],
								attrs: [
									{
										name: undefined,
										types: ['object'],
										attrs: [
											{
												name: 'id',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'name',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'field',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'type',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'width',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'sortable',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'show',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'order',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'users',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'mask',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'maxChar',
												types: ['string', 'number', 'boolean']
											},
											{
												name: 'sendServer',
												types: ['string', 'boolean']
											},
											{
												name: 'editablecolumn',
												types: ['string', 'number', 'boolean']
											}
										]
									}
								]
							},
							{
								name: 'primary-keys',
								types: ['array'],
								attrs: [
									{
										name: undefined,
										types: ['string']
									}
								]
							},
							{
								name: 'multi-select',
								types: ['boolean']
							},
							{
								name: 'send',
								types: ['string', 'boolean']
							}	
						]
					}					
				]
			},
			{
				name: 'preferences',
				types: ['array']
			},
			{
				name: 'mods',
				types: ['object'],
				attrs: [
					{
						name: undefined,
						types: ['object'],
						attrs: [
							{
								name: 'create',
								types: ['array'],
								attrs: [
									{
										name: undefined,
										types: ['object'],
										attrs: [
											{
												name: 'fields',
												types: ['object'],
												attrs: [
													{
														name: undefined,
														types: ['string', 'number', 'boolean']
													}
												]
											}
										]
									}
								]
							},
							{
								name: 'update',
								types: ['array'],
								attrs: [
									{
										name: undefined,
										types: ['object'],
										attrs: [
											{
												name: 'identifier',
												types: ['object'],
												attrs: [
													{
														name: undefined,
														types: ['number', 'boolean', 'string']
													}
												]
											},
											{
												name: 'fields',
												types: ['object'],
												attrs: [
													{
														name: undefined,
														types: ['string', 'number', 'boolean']
													}
												]
											}
										]
									}
								]
							},
							{
								name: 'delete',
								types: ['array'],
								contains: [
									{
										name: undefined,
										types: ['object'],
										attrs: [
											{
												name: 'identifier',
												types: ['object'],
												attrs: [
													{
														name: undefined,
														types: ['number', 'boolean', 'string']
													}
												]
											}
										]
									}
								]
							}
						]
					}
				]
			},
			{
				name: 'generic-data',
				types: ['object', 'string', 'number', 'boolean', 'array']
			}
		]
	}
	
	function isNewFormat(resp){

		var resp,
			result = true,
			tests = [
				
				//	is JSON
				isJSON,

				//	verify each node
				nodes,

				//	custom test
				function customTest(){
					return true;
				}
			];
		
		//	loop through tests
		for(var i = 0; i < tests.length && result; i++){
			console.log(' - testing ' + tests[i].name);
			result = tests[i](resp);

			//	convert to object
			if(tests[i] === isJSON){
				resp = JSON.parse(resp);
			};
		};

		//	report result
		if(!result){
			console.log('failed [' + tests[--i].name + ']');
		};
		return result;
	};

	//=================================================================
	//	validation tools
	//=================================================================
	

	function getTopLevelAttrs(){
		var attrs = [];

		for(var i in MODEL){
			attrs.push(i);
		};

		return attrs;
	};

	//=================================================================
	//	tests
	//=================================================================
	function isJSON(resp){
		try {
			resp = JSON.parse(resp);
			return true;
		} catch (err){
			return false;
		};
	};

	function nodes(resp){

		var nodeDepth = 0;
		
		//	check each attribute
		for(var nodeName in resp){
			if( !validateNode(nodeName, resp[nodeName], MODEL.attrs) ){
				return false;
			};
		};

		return true;

		function validateNode(nodeName, node, modelAttrs){

			nodeDepth++;

			var nodeInModel;

			console.log(indent() + nodeName);

			//	find node defintion in model
			nodeInModel = pluckNode(nodeName, modelAttrs);

			if(!nodeInModel){
				console.error('node named "' + nodeName + '" should be one of these: ' + getAvailableNames(modelAttrs).join(', ') );
				return false;
			};

			//	make sure it is of the right type
			// console.log(nodeName, node, typeof node, nodeInModel.types);
			if(!isCorrectType(node, nodeInModel)){
				console.error('node named "' + nodeName + '" should be one of these types: ' + nodeInModel.types.join(', '));
				return false;
			};

			//	go deeper
			if(node && typeof node === 'object'){
				for(var i in node){
					validateNode(i, node[i], nodeInModel.attrs);
				};
			};

			nodeDepth--;

			return true;

			function indent(){
				for(var i = 0, str = ''; i < nodeDepth; i++){
					str += '+';
				};
				return str + ' ';
			};

			function getAvailableNames(modelAttrs){
				var names = [];

				for(var i in modelAttrs){
					names.push(modelAttrs[i].name.toString());
				};

				return names;
			};

			function pluckNode(nodeName, modelAttrs){
				if(!modelAttrs){
					return;
				};

				for(var i = 0; i < modelAttrs.length; i++){
					if( modelAttrs[i].name === nodeName){
						return modelAttrs[i];
					};
				};

				//	check for unnamed (wildcard) node in model
				for(var i = 0; i < modelAttrs.length; i++){
					if(modelAttrs[i].name === undefined){
						return modelAttrs[i];
					};
				};

				return;
			};

			function isInAttrs(name, attrs){
				for(var i in attrs){
					if( attrs[i].name === name){
						return true;
					};
				};
				return false;
			};

			function getUnnamedNode(attrs){
				for(var i in attrs){
					if(attrs.name === undefined){
						return 
					}
				}
			};

			function isCorrectType(node, nodeInModel){
				var type;

				if(node === null || node === undefined){
					return true;
				};

				type = typeof node;

				if( type === 'object' && $.isArray(node) ){
					type = 'array';
				};

				return nodeInModel.types.indexOf( type ) !== -1;
			};
		};
	};


	function areTopLevelAttrsCorrectType(resp){
		var type;

		for(var i in resp){
			if(resp[i] === undefined || resp[i] === null){
				continue;
			};

			type = typeof resp[i];
			if(type === 'object' && $.isArray(resp[i])){
				type = 'array';
			};
			
			if( MODEL[i].types.indexOf( type ) === -1){
				console.error(resp[i] + ' must be one of these types: ' + MODEL[i].types.join(', '));
				return false;
			};
		};

		return true;
	};





	return {
		isNewFormat: isNewFormat
	};
});