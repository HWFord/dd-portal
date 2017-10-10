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
      $("#transparent").hide()
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
                   $("#transparent").show();
                   
            }); 
            $.getJSON( "../ws/index_dd/data_eco_figures.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les figures-soc présentes dans dashboard.html
                   $(".figure-eco").each( function (id, element) {
                        $(element).text(data[element.id]);
                   });
            });                        
            $.getJSON( "../ws/index_dd/data_progressbar.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les figures-soc présentes dans dashboard.html
                   $(".progress-bar").each( function (id, element) {                         
                        $(element).attr("aria-valuenow", data[element.id]).css("width",data[element.id]*100 +"%");                       
                        $(element).find(".tooltip-inner").text(data[element.id]);
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
                   $("#transparent").show();
                   
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
                   $("#transparent").show();
                   
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
                   $("#transparent").show();
                   
            });
             $.getJSON( "../ws/index_dd/data_soc_figures.php?code_geo=" + codegeo, function( data ) {
                    console.log(data);
                   //Boucle sur les figures-soc présentes dans dashboard.html
                   $(".figure-soc").each( function (id, element) {
                        $(element).text(data[element.id]);
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



// CHART 1 - Doughnut - Part des salriées en CDI
          
      var ctx_eco_1 = document.getElementById("chart_eco_1");
      var chart_eco_1 = new Chart(ctx_eco_1, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
                  label: 'Part des salarié.e.s',
                  data: [],
                  backgroundColor: [
                    "rgba(255, 212, 96,0.9)",
                    "rgba(153,153,153,0.9)"
                  ],
                  hoverBackgroundColor: [
                    "rgba(255, 212, 96,1)",
                    "rgba(153,153,153,1)" 
                  ],
                  borderWidth: 3
                }]
        },
        options: {
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return parseInt(data.datasets[0].data[tooltipItem.index]).toLocaleString() + " %";
                }
            }
          }
        }             
      });

//Intégration du graphique chart_2 dans l'objet charts_eco
charts_eco["chart_eco_1"] = chart_eco_1;
            
// CHART 2 - Bar - Evolution de l'emploi entre 2008 et 2013
     var ctx_eco_2 = document.getElementById("chart_eco_2");
     var chart_eco_2 = new Chart(ctx_eco_2, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'EPCI',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 212, 96,0.9)',
                      'rgba(255, 212, 96,0.9)'
                  ],
                  borderColor: [
                      'rgba(255, 212, 96,1)',
                      'rgba(255, 212, 96,1)'
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
              },
              tooltips: {
                  callbacks: {
                      label: function(tooltipItem, data) {
                          return parseFloat(tooltipItem.yLabel.toFixed(0)).toLocaleString() + " emplois";
                      }
                  }
              }
          }
      });
//Intégration du graphique chart_2 dans l'objet charts_soc
  charts_eco["chart_eco_2"] = chart_eco_2;


// // CHART 3 - Bar - Répartition des emplois selon la taille 
     var ctx_eco_3 = document.getElementById("chart_eco_3");
     var chart_eco_3 = new Chart(ctx_eco_3, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'EPCI',
                  data: [],
                  backgroundColor: [
                      'rgba(255, 212, 96,0.9)',
                      'rgba(255, 212, 96,0.9)',
                      'rgba(255, 212, 96,0.9)',
                      'rgba(255, 212, 96,0.9)'
                  ],
                  borderColor: [
                      'rgba(255, 212, 96,1)',
                      'rgba(255, 212, 96,1)',
                      'rgba(255, 212, 96,0.9)',
                      'rgba(255, 212, 96,0.9)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true,
                          max:50
                      }
                  }]
              },
              tooltips: {
                  callbacks: {
                      label: function(tooltipItem, data) {
                          return parseFloat(tooltipItem.yLabel.toFixed(1)).toLocaleString() + " %";
                      }
                  }
              }
          }
      });
//Intégration du graphique chart_2 dans l'objet charts_soc
  charts_eco["chart_eco_3"] = chart_eco_3;


// CHART 4 - Doughnut - Répartition des emplois selon les secteurs
          
      var ctx_eco_4 = document.getElementById("chart_eco_4");
      var chart_eco_4 = new Chart(ctx_eco_4, {
        type: 'pie',
        data: {
          labels: [],
          datasets: [{
                  label: 'Part des emplois',
                  data: [],
                  backgroundColor: [
                    "rgba(100,100,100,0.9)",                    
                    "rgba(255,228,156,0.9)",
                    "rgba(153,153,153,0.9)",
                    "rgba(255, 212, 96,0.9)"
                  ],
                  hoverBackgroundColor: [
                    "rgba(100,100,100,1)",                    
                    "rgba(255,228,156,1)",
                    "rgba(153,153,153,1)",
                    "rgba(255, 212, 96,1)" 
                  ],
                  borderWidth: 3
                }]
        },
        options: {
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return parseFloat(data.datasets[0].data[tooltipItem.index]).toFixed(0).toLocaleString() + " %";
                }
            }
          }
        }             
      });  

//Intégration du graphique chart_2 dans l'objet charts_soc
  charts_eco["chart_eco_4"] = chart_eco_4;


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

// CHART 1 - Donught - Part des 15-50ans non scolarisé sans diplôme
          
      var ctx_soc_1 = document.getElementById("chart_soc_1");
      var chart_soc_1 = new Chart(ctx_soc_1, {
        type: 'doughnut',
        data: {
          labels: [],
          datasets: [{
                  label: 'Population de 15-50 ans (non scolarisée)',
                  data: [],
                  backgroundColor: [
                    "rgba(61,179,158,0.9)",
                    "rgba(153,153,153,0.9)"
                  ],
                  hoverBackgroundColor: [
                    "rgba(61,179,158,1)",
                    "rgba(153,153,153,1)" 
                  ],
                  borderWidth: 3
                }]
        },
        options: {
          tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    return parseInt(data.datasets[0].data[tooltipItem.index]).toLocaleString() + " %";
                }
            }
          }
        }             
      });
           
//Intégration du graphique chart_1 dans l'objet charts_soc
  charts_soc["chart_soc_1"] = chart_soc_1;


// CHART 2 - Bar - Niveau de formation
     var ctx_soc_2 = document.getElementById("chart_soc_2");
     var chart_soc_2 = new Chart(ctx_soc_2, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'EPCI',
                  data: [],
                  backgroundColor: [
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)'
                  ],
                  borderColor: [
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true,
                          max:50
                      }
                  }]
              },
              tooltips: {
                  callbacks: {
                      label: function(tooltipItem, data) {
                          return parseFloat(tooltipItem.yLabel.toFixed(1)).toLocaleString() + " %";
                      }
                  }
              }
          }
      });
//Intégration du graphique chart_2 dans l'objet charts_soc
  charts_soc["chart_soc_2"] = chart_soc_2;

// CHART 3 - Bar - Composition des ménages
     var ctx_soc_3 = document.getElementById("chart_soc_3");
     var chart_soc_3 = new Chart(ctx_soc_3, {
          type: 'bar',
          data: {
              labels: [],
              datasets: [{
                  label: 'EPCI',
                  data: [],
                  backgroundColor: [
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)',
                      'rgba(61,179,158,0.9)'
                  ],
                  borderColor: [
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)',
                      'rgba(61,179,158,1)'
                  ],
                  borderWidth: 1
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero:true,
                          max:50
                      }
                  }]
              },
              tooltips: {
                  callbacks: {
                      label: function(tooltipItem, data) {
                          return parseFloat(tooltipItem.yLabel.toFixed(1)).toLocaleString() + " %";
                      }
                  }
              }
          }
      });
//Intégration du graphique chart_2 dans l'objet charts_soc
  charts_soc["chart_soc_3"] = chart_soc_3;