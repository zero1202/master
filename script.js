$(document).ready( function() {
	$('#paginas_range').on('input', function(){
		$('#paginas_number').val($(this).val());
	});
	$('#paginas_number').on('change', function(){
		$('#paginas_range').val($(this).val());
	});
	$('#paginas_number').on('keyup', function(){
		$('#paginas_range').val($(this).val());
	});

	$('#temas_range').on('input', function(){
		$('#temas_number').val($(this).val());
	});
	$('#temas_number').on('change', function(){
		$('#temas_range').val($(this).val());
	});
	$('#temas_number').on('keyup', function(){
		$('#temas_range').val($(this).val());
	});

	var complejidad = {
		personal: {
			descripcion: 'personal',
			monto: '1000'
		},
		standard: {
			descripcion: 'standard',
			monto: '1000'
		},
		profesional: {
			descripcion: 'profesional',
			monto: '1000'
		},
		empresarial: {
			descripcion: 'empresarial',
			monto: '1000'
		},
		avanzado: {
			descripcion: 'avanzado',
			monto: '1000'
		},
	};

	$('#complejidad').on('change', function(){		 
		 $('#descripcion').html(complejidad[$(this).val()].descripcion);
	});

	$('form').on('submit', function(event){		 
		event.preventDefault();

		var precio_por_pagina = 5000;
		var monto_paginas = $('#paginas_number').val() * precio_por_pagina;
		var precio_por_tema = 8000;
		var monto_temas = $('#temas_number').val() * precio_por_tema;
		var precio_complejidad = complejidad[$('#complejidad').val()].monto;
		var suma_social = 0;

		$.each($('.social:checked'), function(i, obj){			
			suma_social += social[$(obj).val()];
		});  

		var sub_total = monto_paginas + monto_temas + precio_complejidad + suma_social;
		var iva = $('#iva').prop('checked') ? (sub_total * 0.12) : 0;
		var total = sub_total + iva;

		var fecha_inicio = new Date($('#fecha_inicio').val());
		var fecha_fin = new Date($('#fecha_fin').val());

		var dias = (fecha_fin - fecha_inicio) / 1000 / 60 / 60 / 24;
		var horas = $('#horas').val();

		var honorarios = total / (horas * dias);

		$('#monto_subtotal').html('Bs. ' + sub_total.toFixed(2));
		$('#monto_iva').html('Bs. ' + iva.toFixed(2));
	    $('#monto_total').html('Bs. ' + total.toFixed(2));
	    $('#monto_honorarios').html('Bs. ' + honorarios.toFixed(2) + '/ Hora');
	});
});