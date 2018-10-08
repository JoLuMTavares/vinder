var pokemonGo = function () {

	var species =[]; // To store the items, useful for details and chain evolution.

	return {
		init : function() {

			PokemonGo.actions.loadUsers();	

		
		},
			
		actions : {

			loadUsers : function()
			{
				console.log("loading images...");

				jQuery('#main').empty();

				jQuery('#chain-container').hide();

				for (var pos = 1; pos < 21; pos++) {

					jQuery.ajax({
						url:'https://pokeapi.co/api/v2/pokemon/' + pos + '/',
						type:'GET',
						crossOrigin: true,
						async: true,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						beforeSend: function(jqXHR,settings){
							jQuery('p.status-message-load').html('Processing, Please wait...');
						},
						success: function(data,textStatus,jQXhr)
						{
							console.log(data);
							if(jQXhr.status==200)
							{
								
								jQuery('p.status-message-load').empty();

								var pokemonSet = PokemonGo.createPokemonSet(data);

								jQuery('#main').append(pokemonSet);

								var newItem = {

									id : data.id,
									   name : data.name,
									   sprite : data.sprites.front_default,
									   type : data.types[0].type.name
								};
								species[newItem.id] = newItem;
								
							}
							else
							{
								console.log("There is problem for loading data: status:"+jQXhr.status,",responseText:"+jQXhr.responseText);
								jQuery('p.status-message-load').text("There is problem for loading data...");
							}
						},
						error: function(jQXhr,textStatus,errorThrown)
						{
							console.log("Failed to get users! Message:"+jQXhr.statusText);
							console.log(`error: ${JSON.stringify(jQXhr)}, status: ${textStatus}, errorThrown:${errorThrown}`);
						},
						complete : function(jqXHR,textStatus)
						{
							//you can do anything if you need to do after complete
						}

					});
				}
			},

			loadChainEvo: function (id) {

				jQuery('#main').empty();

				jQuery('#chain-container').show();
		 		jQuery('#evolution-chain-view').empty();
		 		jQuery('#evolution-chain-view').append('<p class="status-message-chain"></p>');

				jQuery.ajax({
					url:'https://pokeapi.co/api/v2/evolution-chain/' + id + '/',
					type:'GET',
					crossOrigin: true,
					async: true,
					dataType: 'json',
					contentType: 'application/json; charset=utf-8',
					beforeSend: function(jqXHR,settings){
						jQuery('p.status-message-load').html('Processing, Please wait...');
					},
					success: function(data,textStatus,jQXhr)
					{
						console.log(data);
						if(jQXhr.status==200)
						{
							
							jQuery('p.status-message-load').empty();

							var pokemonSet = PokemonGo.createEvolutionChain(data);

							jQuery('#evolution-chain-view').append(pokemonSet);

							
						}
						else
						{
							console.log("There is problem for loading data: status:"+jQXhr.status,",responseText:"+jQXhr.responseText);
							jQuery('p.status-message-load').text("There is problem for loading data...");
						}
					},
					error: function(jQXhr,textStatus,errorThrown)
					{
						console.log("Failed to get users! Message:"+jQXhr.statusText);
						console.log(`error: ${JSON.stringify(jQXhr)}, status: ${textStatus}, errorThrown:${errorThrown}`);
					},
					complete : function(jqXHR,textStatus)
					{
						//you can do anything if you need to do after complete
					}

				});
				
			}

		},

		createPokemonSet : function (data) {

			console.log("Creating the pokemon images...");

			var	figure = jQuery("<figure id='"+ data.id +"' class='image-Thumb'>");

			var show_evo = jQuery("<button type='submit' class='show-evo-chain' onclick='PokemonGo.actions.loadChainEvo("+ data.id +");'>Show Evolution Chain</button>");

			figure.append(show_evo);

			var pok_id = jQuery('<figcaption class="pok_id">'+ data.id +'</figcaption>');

			figure.append(pok_id);

			var img = jQuery(`<img class="image" src="${data.sprites.front_default}">`);

			figure.append(img);

			var details = jQuery(`<div class="details" onclick='PokemonGo.loadDetails(${data.id});'>Click to view details</div>`)

			figure.append(details);

			var pok_name = jQuery('<figcaption class="fgcap">'+ data.name +'</figcaption>');

			figure.append(pok_name);
			
			return figure;

		},

		createEvolutionChain : function (data) {
			console.log("Creating the evolultion chain...");

			var	figure;

			var evoChain = [];
			var evoData = data.chain;
			hasChain=false;

				do {

					var evoDetails = evoData['evolution_details'][0];
					var url=evoData.species.url;
					var id = url.split("pokemon-species/");
					id=id[1].replace('/', '');

					if(species[id]!=undefined)
					{
					
						hasChain=true;

						figure = jQuery(`<figure id='${species[id].id}' class='image-Thumb'>`)

						var show_evo = jQuery(`<button type='submit' class='show-evo-chain' onclick='PokemonGo.actions.loadChainEvo(${species[id].id});'>Show Evolution Chain</button>`);

						figure.append(show_evo);

						var pok_id = jQuery(`<figcaption class="pok_id">${species[id].id}</figcaption>`);

						figure.append(pok_id);

						var img = jQuery(`<img class="image" src="${species[id].sprite}">`);

						figure.append(img);

						var pok_name = jQuery(`<figcaption class="fgcap">${species[id].name}</figcaption>`);

						figure.append(pok_name);

						//stored evolution data chain
						evoChain.push({
							"id" : id,
						  "species_name": evoData.species.name,
						  "url" : url,
						  "min_level": !evoDetails ? 1 : evoDetails.min_level,
						  "trigger_name": !evoDetails ? null : evoDetails.trigger.name,
						  "item": !evoDetails ? null : evoDetails.item
						});

						evoData = evoData['evolves_to'][0];

					}
				} while (!!evoData && evoData.hasOwnProperty('evolves_to'));


				//all evoluation chain data
								//console.log(evoChain);

								if(!hasChain)
									jQuery('p.status-message-chain').append('Sorry this species not have evoluation chain!');

			return figure;
		},

		loadDetails: function (id) {

			console.log("showDetails...");

			jQuery('#details-view').show();
			jQuery('#details-view').empty();
			jQuery('#details-view').append('<h3>Pokémon Species Details</h3>');
			jQuery('#details-view').append('<p class="status-message-details"></p>');


			jQuery.ajax({
				url:'https://pokeapi.co/api/v2/pokemon-species/'+id,
				type:'GET',
				async: true,
				dataType: 'json',
				contentType: 'application/json; charset=utf-8',
				beforeSend: function(jqXHR,settings){
					jQuery('p.status-message-details').html('Processing, Please wait...');
				},
				success: function(data,textStatus,jQXhr)
				{
					//console.log(data);
					if(jQXhr.status==200)
					{

							var pok_details = PokemonGo.showDetails(data);
							
							jQuery('#details-view').append(pok_details);
							jQuery('p.status-message-details').empty();
							

					}
					else
					{
						console.log("There is problem for loading data: status:"+jQXhr.status,",responseText:"+jQXhr.responseText);
						jQuery('p.status-message-load').text("There is problem for loading data...");
					}
				},
				error: function(jQXhr,textStatus,errorThrown)
				{
					console.log("Failed to get users! Message:"+jQXhr.statusText);
					console.log(`error: ${JSON.stringify(jQXhr)}, status: ${textStatus}, errorThrown:${errorThrown}`);
				},
				complete :function(jqXHR,textStatus)
				{
					//you can do anything if you need to do after complete
				}

			});

			
		},

		showDetails: function (data) {
			var newHtml=`<div class="details-data" >
						ID: ${data.id} <br>
						Name: ${data.name} <br>
						Capture Rate: ${data.capture_rate} <br>
						Base Happiness: ${data.base_happiness} <br>
						Color: ${data.color.name} <br>
						Shape: ${data.shape.name} <br>	          
					</div>`;

			return newHtml;
		},
	
	}
	
};

PokemonGo = pokemonGo();

jQuery(document).ready(function($) 
{
	PokemonGo.init();
});