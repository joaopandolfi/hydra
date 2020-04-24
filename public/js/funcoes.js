	// EXIBINDO MENU FLUTUANTE
	$(window).scroll(function(){ // função para pegar o movimento do scroll (barra de rolagem)
		var top = $(window).scrollTop(); // aqui vc pega a posição da página
		if(top > 150){ 
			$("#menu_flutuante").stop().fadeIn("slow");
			$("#menu_flutuante").stop().animate({ opacity: 1.0 }, 200); 	
		}
		else{ 
			$("#menu_flutuante").stop().fadeOut("slow");
		}		
	});
	
	
	// EXIBE UMA MENSAGEM - EX: msg.confirmatemp('#');
	// -----------------------------------------------------------------------------------------------
	var msg = {
		ok: function(){
			botao_ok = "<button id='ok' class='btn btn-primary btn-sm mr4' onclick=msg.off();>OK</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>SUCESSO!</b>');
			$('#msg-body').html('<p>A Operação foi realizada.</p>');
			$('#msg-footer').html(botao_ok);
		},
		load: function(){
			botao_ok = "<button id='ok' class='btn btn-primary btn-sm mr4' onclick=msg.off();window.location.reload();>OK</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>SUCESSO!</b>');
			$('#msg-body').html('<p>A Operação foi realizada.</p>');
			$('#msg-footer').html(botao_ok);
		},		
		confirma: function(val){
			botao_ok = "<button class='btn btn-primary btn-sm mr4' onclick=window.location.href='"+val+"';>Sim</button>";
			cancel = "<button class='btn btn-default btn-sm mr4' onclick=msg.off();>Não</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>VOCÊ TEM CERTEZA?</b>');
			$('#msg-body').html('<p>Esta ação não poderá ser desfeita.</p>');
			$('#msg-footer').html(botao_ok+cancel);			
		},	
		sucesso: function(val){
			botao_ok = "<button class='btn btn-primary btn-sm mr4' onclick=window.location.href='"+val+"';>Ok</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>SUCESSO!</b>');
			$('#msg-body').html('<p>A Operação foi realizada.</p>');
			$('#msg-footer').html(botao_ok);
		},		
		erro: function(val){
			botao_ok = "<button class='btn btn-primary btn-sm mr4' onclick=msg.off()>Ok</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>OPERAÇÃO NÃO REALIZADA!</b>');
			$('#msg-body').html('<p>Não foi possível concluir a operação.</p>');
			$('#msg-footer').html(botao_ok);
		},
		erropage: function(val){
			botao_ok = "<button class='btn btn-primary btn-sm mr4' onclick=window.location.href='"+val+"';>Ok</button>";
			show.on("box-preto-msg");
			$("#msg").show();
			$('#msg-title').html('<b>OPERAÇÃO NÃO REALIZADA!</b>');
			$('#msg-body').html('<p>Não foi possível concluir a operação.</p>');
			$('#msg-footer').html(botao_ok);
		},	
		off: function(){
			show.off("box-preto-msg");
			$("#msg").hide();
		}
	}	
	
	
	// UTILIZANDO O CHART.JS
	var grafico = function(nome,tipo,cor,lab,tit,val){
		var ctx= document.getElementsByClassName(nome);
		var lab = lab.split('|');
		var val = val.split('|');
		var chartGraph = new Chart(ctx, {
			type: tipo,
			data: {
				labels: lab,
				datasets:[{
					label: tit,
					data: val,
					borderWidth: '2',
					backgroundColor: cor,
					borderColor: 'white'				
				}]			
			},
			options: {
				layout: {
					padding: {
						left: 	10,
						right: 	0,
						top: 	0,
						bottom: 0
					}
				},				
				animation: {
					duration: 2000
				},
				hover: {
					animationDuration: 2000
				},
				responsiveAnimationDuration: 2000,
				legend:{
					display: false
				},
				tooltips:{
					enabled: true
				}			
			}			
		});		
	}
	
	// UTILIZANDO O ECHART.JS
	var graficobar = function(id,cor,lab,titulo,val){
        var myChart = echarts.init(document.getElementById(id));
		var lab = lab.split('|');
		var val = val.split('|');
		
		option = {
			color: [cor],
			tooltip: {
				trigger: 'axis',
				axisPointer: { 
					type: 'shadow'
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					data: lab,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis: [
				{
					type: 'value'
				}
			],
			series: [
				{
					name: '',
					type: 'bar',
					barWidth: '60%',
					data: val
				}
			]
		}
		// aplico as alterações de layout no chart
        myChart.setOption(option);
	}
	
	// UTILIZANDO O ECHART.JS
	var graficobarH = function(id,cor,lab,titulo,val){
        var myChart = echarts.init(document.getElementById(id));
		var lab = lab.split('|');
		var val = val.split('|');
		
		option = {
			dataset: {
				source: [
					['amount', 'product'],
					[70, 'Ambulância'],
					[30, 'Hospital Itaim Paulista'],
		
				]
			},
			grid: {containLabel: true},
			xAxis: {name: ''},
			yAxis: {type: 'category'},
			visualMap: {
				orient: 'horizontal',
				left: 'center',
				min: 10,
				max: 100,
				text: ['Alto', 'Baixo'],
				dimension: 0,
				inRange: {
					color: ['#D7DA8B', '#E15457']
				}
			},
			series: [
				{
					type: 'bar',
					encode: {
						x: 'amount',
						y: 'product'
					}
				}
			]
		};
		// aplico as alterações de layout no chart
        myChart.setOption(option);
	}	
	
	// UTILIZANDO O ECHART.JS
	var graficopie = function(id,nome){
        var myChart = echarts.init(document.getElementById(id));

        var option = {
			title: {
				display: false,
				text: '',
				subtext: '',
				left: 'center'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} - {d}%'
			},
			legend: {
				width: '100px',
				left: 'left',
				top: 'top',
			},
			toolbox: {
				show: true,
				feature: {
					mark: {show: true},
					dataView: {show: show, readOnly: true},
					magicType: {
						show: true,
						type: ['pie', 'funnel']
					},
					restore: {show: false},
					saveAsImage: {show: true}
				}
			},
			series: [
				{
					name: '',
					type: 'pie',
					radius: [20, 100],
					center: ['60%', '40%'],
					roseType: 'area',
					data: nome,
				}
			]

        };
		// aplico as alterações de layout no chart
        myChart.setOption(option);
	}

	// UTILIZANDO O ECHART.JS
	var graficotempo = function(id,tipo){
        var myChart = echarts.init(document.getElementById(id));

		option = {
			tooltip: {
				formatter: '{a} <br/>{b} {c} Min'
			},
			toolbox: {
				feature: {
					restore: {},
					saveAsImage: {}
				}
			},
			series: [
				{
					name: 'Tempo',
					type: 'gauge',
					detail: {formatter: '{value}'},
					data: tempo
				}
			]
		}
		// aplico as alterações de layout no chart
        myChart.setOption(option);
	}


	// ATRIBUTOS PARA EXIBIÇÃO/OCULTAÇÃO DE OBJETO
	// -----------------------------------------------------------------------------------------------	
	var show = {
			table  : 	function(id){ // revela um objeto
				$("#"+id).addClass('table');			
				$("#"+id).removeClass('none'); 
			}, 		
			on  : 	function(id){ // revela um objeto
				$("#"+id).addClass('block');			
				$("#"+id).removeClass('none'); 
			}, 
			off : 	function(id){ // oculta um objeto
				$("#"+id).addClass('none');
				$("#"+id).removeClass('block'); 
				$("#"+id).removeClass('table'); 
			},
			alt :	function(id){// alterna
				$("#"+id).toggle();
			},
			box :	function(nome,valor){
				$("#"+nome).change(function(){
					if($("#"+nome).val() == valor) {
						$("#"+valor).fadeIn('slow');
					} else {
						show.off(valor); 
					} 
				});			
			}
	}

	// CHAMA UMA URL - EX:  link.mesma('id1'); 
	var botao = {
		atual: function(url) { // abre um link na mesma página
			var tratado = removeacento( url.replace(' ', '_') );
			window.location.href=tratado;  
		},	
		nova:  function(url) { // abre um link em uma nova aba
			window.open(url,'_blank');
		}		
	}	

	// MUDA O SRC DE UMA IMAGEM JÁ EXIBIDA
	var img = {
		muda : function(id,nova){
			$("#"+id).attr("src", nova);
		}
	}	
	
	
	// ATRIBUTOS DE TRATAMENTO CLASSES - EX: classe.alterna('id','classe');
	var classe = {
		add  	: function(id,nome){		$('#'+id+'').addClass(''+nome+'');		},	 	// adiciona uma classe
		alterna	: function(id,nome){		$('#'+id+'').toggleClass(''+nome+'');	}, 		// alterna a classe
		del  	: function(id,nome){		$('#'+id+'').removeClass(''+nome+'');	}		// remove uma class
	}



	// MUDA ESTILO DE TEXTO - EX: font.id.cor('id1','red'); / font.form.cor('form1','nome','red');
	var font = {
		id: {
			cor:    function(id,cor)   { document.getElementById(id).style.color=cor;	 	 },
			bold:   function(id,valor) { document.getElementById(id).style.fontWeight=valor; },
			size:   function(id,valor) { document.getElementById(id).style.fontSize=valor;   }
		},
		form: {
			cor:    function(formNome,nome,cor)   { document.forms[formNome].elements[nome].style.color=cor;	 	},
			bold:   function(formNome,nome,valor) { document.forms[formNome].elements[nome].style.fontWeight=valor; },
			size:   function(formNome,nome,valor) { document.forms[formNome].elements[nome].style.fontSize=valor;   }
		}		
	}

	
	// CRIA UMA ANIMAÇÃO AO EXIBIR OU ESCONDER UM OBJETO
	var fade = {
		in : {
			time : function(id,segundos){	$('#'+id).fadeIn(segundos);		},	// revela um objeto em um determinado tempo
			slow : function(id){			$('#'+id).fadeIn('slow');		}	// revela um objeto com lentidão
		},
		out : {
			time : function(id,segundos){	$('#'+id).fadeOut(segundos);	},	// esconde um objeto em um determinado tempo
			slow : function(id){			$('#'+id).fadeOut('slow');		}	// esconde um objeto com lentidão			
		},
		alterna : {
			time : function(id,segundos){	$('#'+id).fadeToggle(segundos);	},	// alterna a exibição de um objeto em determinado tempo
			slow : function(id){			$('#'+id).fadeToggle('slow');	}	// revela um objeto com lentidão				
		},
		css : function(id,nome){
			$('.'+id+'').toggleClass(''+nome+'');
		}
	}
	
	
