 //Création d'un objet référençant tous les graphiques liés à l'économie
            var charts_eco = {};
            //Création d'un premier graphique
            var ctx_0 = document.getElementById("chart_0");
			var chart_0 = new Chart(ctx_0, {
			type: 'doughnut',
			data: {
			labels: [],
			datasets: [{
							label: 'Nombre d habitant.e.s',
							data: [],
							backgroundColor: [
								"rgba(45,171,173,0.9)",
								"rgba(72,53,95,0.9)"
							],
							hoverBackgroundColor: [
								"rgba(45,171,173,1)",
								"rgba(72,53,95,1)"	
							],
							borderWidth: 3
						}]
					},	
			options:{
				legend:{
					display: true, 
					labels:{
						fontFamily:'Open Sans',
						fontSize:11,
						boxWidth:15,
						padding:5,
					}
				},
				tooltips: {
					titleFontFamily:"roboto_bold",
		        	titleFontSize:13,
		        	bodyFontFamily:"roboto_regular",
		        	backgroundColor:"rgba(36, 36, 36, 0.85)",
		            callbacks: {
		                label: function(tooltipItem, data) {
		                    return parseInt(data.datasets[0].data[tooltipItem.index]).toLocaleString() + " habitant.e.s";
		                }
		            }
		        }
			}			
			});
           //Intégration du graphique chart_0 dans l'objet charts_eco
           charts_eco["chart_0"] = chart_0;
           
           
           
           //Chart 2
           
           var ctx_1 = document.getElementById("chart_1");
           var chart_1 = new Chart(ctx_1, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: '# of Votes',
                        data: [],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
            
            charts_eco["chart_1"] = chart_1;
            
         /*******************************************************************************/
         var change_codegeo = function (item) {
            //Get data
            var codegeo = $(item).val();             
            var labelgeo = item.options[item.selectedIndex].label;
            $.getJSON( "../ws/index_dd/data_eco.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les graphiques présents dans charts_eco
                   $.each(charts_eco, function (name, chart) {
                        //Boucle sur tous les datasets de chaque graphique de charts_eco
                        for (var i=0;i< chart.data.datasets.length;i++) {
                            if (data[name] && data[name].data && data[name].data.datasets) {
                                chart.data.datasets[i].data = data[name].data.datasets[i];
                            } else {
                                alert("Configuration manquante ou erronée dans le script php pour " + name );
                            }
                        }
                        if (data[name] && data[name].labels) {
                            chart.data.labels = data[name].labels;
                        }
                        chart.update();
                        
                   });
                   $("#selected_feature").text(labelgeo);
            });
        };