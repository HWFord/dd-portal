/*******************************************************************************
---------------------------- INPUT LOCALISATION 
********************************************************************************/

  var $input = $("#interco_select");
        $.get("http://ows.region-bretagne.fr/geoserver/rb/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=rb:unites_administratives&outputFormat=application%2Fjson&propertyName=code_geo,nom_geo&cql_filter=level%3D%27EPCI%27", 
            function(data){            
                var source = [];
                $.each(data.features, function( index, feature ) {
                  source.push({id:feature.properties.code_geo, name: feature.properties.nom_geo});
                });
                
                $input.typeahead({ 
                    source:source, 
                    autoSelect: true 
                });
          },'json');
        
        $input.change(function() {
          var current = $input.typeahead("getActive");
          if (current) {
            // Some item from your model is active!
            if (current.name == $input.val()) {
              // This means the exact match is found. Use toLowerCase() if you want case insensitive match.
              var code_geo = $input.typeahead("getActive").id;
              var label_geo = $input.typeahead("getActive").name;
              change_codegeo(code_geo, label_geo);
              
            } else {
              // This means it is only a partial match, you can either add a new item
              // or take the active if you don't want new items
            }
          } else {
            // Nothing is active so it is a new value (or maybe empty value)
          }
        });

    var change_codegeo = function (codegeo, labelgeo) {
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
                   
            }); 
            $.getJSON( "../ws/index_dd/data_env.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les graphiques présents dans charts_eco
                   $.each(charts_envir, function (name, chart) {
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
                   
            }); 
            $.getJSON( "../ws/index_dd/data_demo.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les graphiques présents dans charts_eco
                   $.each(charts_demo, function (name, chart) {
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
                   
            });
            $.getJSON( "../ws/index_dd/data_soc.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les graphiques présents dans charts_eco
                   $.each(charts_soc, function (name, chart) {
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
                   
            });
            $("#selected_feature").text(labelgeo);           
        };


   

/**************************************************************
--------------- G R A P H I Q U E S ------------
**************************************************************/
/************* ECONOMIE ****************/

//Création d'un objet référençant tous les graphiques liés à l'économie
 var charts_eco = {};

// CHART 0 - Radar
var ctx_eco_0 = document.getElementById("chart_eco_0");
 ctx_eco_0.getContext("2d").canvas.width = 110;
 ctx_eco_0.getContext("2d").canvas.height = 80;
 var chart_eco_0 = new Chart(ctx_eco_0, {
          type: 'radar',
          data: {
              labels: [],
              datasets: [{
                  label: "Région",
                  backgroundColor: "rgba(45, 64, 89, 0)",
                  borderColor: "rgba(45, 64, 89, 1)",
                  pointBackgroundColor: "rgba(45, 64, 89, 1)",
                  pointBorderColor: "rgba(45, 64, 89, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(45, 90, 89, 1)",
                  data: []
              },
              {                  
                  label: "EPCI",
                  backgroundColor: "rgba(255, 212, 96,0.6)",
                  borderColor: "rgba(255, 212, 96, 1)",
                  pointBackgroundColor: "rgba(255, 212, 96, 1)",
                  pointBorderColor: "rgba(255,212,96, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(255,212,96, 1)",
                  data: []
              }]
          },
          options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },
            responsive: true
          }
      });

//Intégration du graphique chart_0 dans l'objet charts_eco
           charts_eco["chart_eco_0"] = chart_eco_0;

// CHART 1 - Donught
          
          var ctx_eco_1 = document.getElementById("chart_eco_1");
    			var chart_eco_1 = new Chart(ctx_eco_1, {
    			type: 'doughnut',
    			data: {
    			labels: [],
    			datasets: [{
    							label: 'Nombre d habitant.e.s',
    							data: [],
    							backgroundColor: [
    								"rgba(255,212,96,0.9)",
    								"rgba(153,153,153,0.9)"
    							],
    							hoverBackgroundColor: [
    								"rgba(255,212,96,1)",
    								"rgba(153,153,153,1)"	
    							],
    							borderWidth: 3
    						}]
    					}    					
    			});
           
//Intégration du graphique chart_1 dans l'objet charts_eco
  charts_eco["chart_eco_1"] = chart_eco_1;
           
              
//Chart 2 - Bar         
           var ctx_eco_2 = document.getElementById("chart_eco_2");
           var chart_eco_2 = new Chart(ctx_eco_2, {
                type: 'bar',
                data: {
                    labels: [],
                    datasets: [{
                        label: '# of Votes',
                        data: [],
                        backgroundColor: [
                            'rgba(255,212,96, 0.9)',
                            'rgba(255,212,96, 0.9)',
                            'rgba(255,212,96, 0.9)',
                            'rgba(255,212,96, 0.9)',
                            'rgba(255,212,96, 0.9)',
                            'rgba(255,212,96, 0.9)'
                        ],
                        borderColor: [
                            'rgba(255,212,96,1)',
                            'rgba(255,212,96, 1)',
                            'rgba(255,212,96, 1)',
                            'rgba(255,212,96, 1)',
                            'rgba(255,212,96, 1)',
                            'rgba(255,212,96, 1)'
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
  
//Intégration du graphique chart_2 dans l'objet charts_eco            
  charts_eco["chart_eco_2"] = chart_eco_2;
            
         

/************* ENVIRONNEMENT ****************/   

//Création d'un objet référençant tous les graphiques liés à l'environnement
 var charts_envir = {};

//Chart 0 - Radar     
 var ctx_env_0 = document.getElementById("chart_env_0");
 ctx_env_0.getContext("2d").canvas.width = 110;
 ctx_env_0.getContext("2d").canvas.height = 80;
 var chart_env_0 = new Chart(ctx_env_0, {
          type: 'radar',
          data: {
              labels: [],
              datasets: [{
                  label: "Région",
                  backgroundColor: "rgba(45, 64, 89, 0)",
                  borderColor: "rgba(45, 64, 89, 1)",
                  pointBackgroundColor: "rgba(45, 64, 89, 1)",
                  pointBorderColor: "rgba(45, 64, 89, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(45, 90, 89, 1)",
                  data: []
              },
              {                  
                  label: "EPCI",
                  backgroundColor: "rgba(161, 184, 112, 0.6)",
                  borderColor: "rgba(161, 184, 112, 1)",
                  pointBackgroundColor: "rgba(161, 184, 112, 1)",
                  pointBorderColor: "rgba(161, 184, 112, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(161, 184, 112, 1)",
                  data: []
              }]
          },
          options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },
            responsive: true
          }
      });

    
//Intégration du graphique chart_0 dans l'objet charts_env
charts_envir["chart_env_0"] = chart_env_0;


/************* DEMOCRATIE ****************/   

//Création d'un objet référençant tous les graphiques liés à la démocratie
 var charts_demo = {};

// Chart 0 - Radar 
 var ctx_demo_0 = document.getElementById("chart_demo_0");
 ctx_demo_0.getContext("2d").canvas.width = 110;
 ctx_demo_0.getContext("2d").canvas.height = 80;
 var chart_demo_0 = new Chart(ctx_demo_0, {
          type: 'radar',
          data: {
              labels: [],
              datasets: [{
                  label: "Région",
                  backgroundColor: "rgba(45, 64, 89, 0)",
                  borderColor: "rgba(45, 64, 89, 1)",
                  pointBackgroundColor: "rgba(45, 64, 89, 1)",
                  pointBorderColor: "rgba(45, 64, 89, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(45, 90, 89, 1)",
                  data: []
              },
              {                  
                  label: "EPCI",
                  backgroundColor: "rgba(236,96,95, 0.6)",
                  borderColor: "rgba(236,96,95, 1)",
                  pointBackgroundColor: "rgba(236,96,95, 1)",
                  pointBorderColor: "rgba(236,96,95, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(236,96,95, 1)",
                  data: []
              }]
          },
          options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },
            responsive: true
          }
      });

    
//Intégration du graphique chart_0 dans l'objet charts_demo
    charts_demo["chart_demo_0"] = chart_demo_0;


/************* SOCIAL ****************/   

//Création d'un objet référençant tous les graphiques liés au social
 var charts_soc = {};

// Chart 0 - Radar 
 var ctx_soc_0 = document.getElementById("chart_soc_0");
 ctx_soc_0.getContext("2d").canvas.width = 110;
 ctx_soc_0.getContext("2d").canvas.height = 80;
 var chart_soc_0 = new Chart(ctx_soc_0, {
          type: 'radar',
          data: {
              labels: [],
              datasets: [{
                  label: "Région",
                  backgroundColor: "rgba(45, 64, 89, 0)",
                  borderColor: "rgba(45, 64, 89, 1)",
                  pointBackgroundColor: "rgba(45, 64, 89, 1)",
                  pointBorderColor: "rgba(45, 64, 89, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(45, 90, 89, 1)",
                  data: []
              },
              {                  
                  label: "EPCI",
                  backgroundColor: "rgba(61,179,158, 0.6)",
                  borderColor: "rgba(61,179,158, 1)",
                  pointBackgroundColor: "rgba(61,179,158, 1)",
                  pointBorderColor: "rgba(61,179,158, 1)",
                  pointHoverBackgroundColor: "#fff",
                  pointHoverBorderColor: "rgba(61,179,158, 1)",
                  data: []
              }]
          },
          options: {
            scale: {
                ticks: {
                    beginAtZero: true
                }
            },
            responsive: true
          }
      });


//Intégration du graphique chart_0 dans l'objet charts_soc
    charts_soc["chart_soc_0"] = chart_soc_0;
