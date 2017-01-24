function set_foco(element)
{
    $(element).focus();
}

function redireccion(url)
{
    window.location.href = url;
}

function fade(element)
{
    $(element).hide();
    $(element).fadeIn('slow');
}

function slideDown(element)
{
    $(element).hide();
    $(element).slideDown('slow');
}

function fadeOut(element, del)
{
    del = (del) ? del : '';
    $(element).fadeOut('slow', function() 
    {
        if (del !== '')
        {
            $(element).html('');
        }
    });
}

function slideUp(element, del)
{
    del = (del) ? del : '';
    $(element).slideUp('slow', function() 
    {
        if (del !== '')
        {
            $(element).html('');
        }
    });
}

function muestra_mensaje(titulo, contenido, dimmisForms, focusOnHide, redirectOnHide, customFunction, params)
{
    dimmisForms = (dimmisForms) ? dimmisForms : false;
    focusOnHide = (focusOnHide) ? focusOnHide : '';
    redirectOnHide = (redirectOnHide) ? redirectOnHide : '';
    customFunction = (customFunction) ? customFunction : '';
    params = (params) ? params : '';
    
    var texto_html = '<div class="modal fade" id="modalMuestraMensaje" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog modal-dialog-sm">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">' + titulo + '<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    ' + contenido + '\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraMensaje'>"+texto_html+"</div>");
    $('#modalMuestraMensaje').modal();
    $('#modalMuestraMensaje').on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraMensaje').remove();
        if (dimmisForms)  
        {
            $('.modalMuestraFormulario').modal('hide');
        }
        
        if (focusOnHide !== '')
        {
           set_foco(focusOnHide);
        }
        
        if (redirectOnHide !== '')
        {
            if (redirectOnHide === 'reload')
            {
                location.reload();
            }
            else
            {
                redireccion(Routing.generate(redirectOnHide, eval(params)));
            }
        }
        
        if (customFunction !== '')
        {
            eval(customFunction+'('+params+')');
        }
    });
}

function muestra_confirmacion(mensaje, aceptar, cancelar)
{
    aceptar = (aceptar) ? 'onclick="' + aceptar + '"' : '';
    cancelar = (cancelar) ? 'onclick="' + cancelar + '"' : 'data-dismiss="modal"';
    
    var texto_html = '<div class="modal fade" id="modalMuestraConfirmacion" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog modal-dialog-sm">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">Confirmaci&oacute;n<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    <p class="margin-bottom-lg">' + mensaje + '</p>\
                                </div>\
                                <div class="modal-footer">\
                                    <button type="button" class="btn btn-default" ' + cancelar + '>Cancelar</button>\
                                    <button type="button" data-loading-text="Procesando..." id="aceptar_confirm_btn" class="btn btn-primary" ' + aceptar + ' data-dismiss="modal">Aceptar</button>\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraConfirmacion'>"+texto_html+"</div>");
    $('#modalMuestraConfirmacion').modal();
    $('#modalMuestraConfirmacion').on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraConfirmacion').remove();
    });
}

function muestra_confirmacion_dropzone(mensaje, file, element, upload, del, delete_archivos_url)
{
    upload = (upload) ? true : false;
    del = (del) ? true : false;
    delete_archivos_url = (delete_archivos_url) ? delete_archivos_url : 'delete_archivos';
    
    var texto_html = '<div class="modal fade" id="modalMuestraConfirmacion" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog modal-dialog-sm">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">Confirmaci&oacute;n<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    <p class="margin-bottom-lg" style="text-align: justify;">' + mensaje + '</p>\
                                </div>\
                                <div class="modal-footer">\
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancelar</button>\
                                    <button type="button" data-loading-text="Procesando..." id="aceptar_confirm_btn" class="btn btn-primary" data-dismiss="modal">Aceptar</button>\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraConfirmacion'>"+texto_html+"</div>");
    $('#modalMuestraConfirmacion').modal().one('click', '#aceptar_confirm_btn', function(e)
    {
        if (upload === true)
        {
            element.removeFile(file);
        }
        else
        {
            file.previewElement.parentNode.removeChild(file.previewElement);
            postHandler(Routing.generate(delete_archivos_url, {'key': file.id}));
        }
    });
    $('#modalMuestraConfirmacion').on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraConfirmacion').remove();
    });
}

function muestra_formulario(titulo, contenido, ancho, foco)
{
    ancho = (ancho) ? ancho : 'modal-dialog-sm';
    foco = (foco) ? foco : '';
    
    var rnd = Math.floor((Math.random() * 5000) + 1);
    
    var texto_html = '<div class="modal fade modalMuestraFormulario" id="modalMuestraFormulario_'+rnd+'" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog ' + ancho + '">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">' + titulo + '<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    ' + contenido + '\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraFormulario_"+rnd+"'>"+texto_html+"</div>");
    $('#modalMuestraFormulario_'+rnd).modal();
    $('#modalMuestraFormulario_'+rnd).on('shown.bs.modal', function (e) 
    {
        if (foco !== '')  set_foco(foco);
    });
    $('#modalMuestraFormulario_'+rnd).on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraFormulario_'+rnd).remove();
    });
}

function muestra_formulario_grande(titulo, contenido, ancho, foco)
{
    ancho = (ancho) ? ancho : 'modal-dialog-lg';
    foco = (foco) ? foco : '';
    
    var rnd = Math.floor((Math.random() * 5000) + 1);
    
    var texto_html = '<div class="modal fade modalMuestraFormulario" id="modalMuestraFormulario_'+rnd+'" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog ' + ancho + '">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">' + titulo + '<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    ' + contenido + '\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraFormulario_"+rnd+"'>"+texto_html+"</div>");
    $('#modalMuestraFormulario_'+rnd).modal();
    $('#modalMuestraFormulario_'+rnd).on('shown.bs.modal', function (e) 
    {
        if (foco !== '')  set_foco(foco);
    });
    $('#modalMuestraFormulario_'+rnd).on('hidden.bs.modal', function (e) 
    {
        
        $('#showModalMuestraFormulario_'+rnd).remove(); 
        
    });   
}

function muestra_error(titulo, contenido)
{    
    var texto_html = '<div class="modal fade" id="modalMuestraError" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog modal-dialog-exlg">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">' + titulo + '<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    ' + contenido + '\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraError'>"+texto_html+"</div>");
    $('#modalMuestraError').modal();
    $('#modalMuestraError').on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraError').remove();
    });
}

function muestra_pdfs(titulo, archivo)
{
    
    var texto_html = '<div class="modal fade" id="modalMuestraPdfs" tabindex="-1" role="dialog"  aria-hidden="true">\
                        <div class="modal-dialog modal-dialog-exlg">\
                            <div class="modal-content">\
                                <div class="modal-header">\
                                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>\
                                    <h4 class="modal-title text-center">' + titulo + '<span class="loading"></span></h4>\
                                </div>\
                                <div class="modal-body">\
                                    <embed src="' + archivo + '" type="application/pdf" width="1024px" height="300px">\
                                </div>\
                            </div>\
                        </div>\
                      </div>';

    $('body').append("<div id='showModalMuestraPdfs'>"+texto_html+"</div>");
    $('#modalMuestraPdfs').modal();
    $('#modalMuestraPdfs').on('hidden.bs.modal', function (e) 
    {
        $('#showModalMuestraPdfs').remove();
    });
}

function tablas(element)
{
    // Init Datatables with Tabletools Addon	
    $(element).dataTable( {
        "bDestroy": true,
        "bRetrieve": true,
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [ -1 ] }],
        "oLanguage": 
            { 
                "oPaginate": {"sPrevious": "Anterior", "sNext": "Siguiente"}, 
                "sLengthMenu": "Mostrar _MENU_ registros", 
                "sSearch": "Buscar:  ", 
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros", 
                "sInfoEmpty": "Mostrando 0 a 0 de 0 registros", 
                "sInfoFiltered": "(filtrado de _MAX_ registros)", 
                "sEmptyTable": "<p align='center'>No hay datos para mostrar...</p>" ,
                "sZeroRecords": "<p align='center'>No se encontraron registros...</p>"
            },
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "sDom": '<"panel-menu dt-panelmenu"lfr><"clearfix">tip',
    });	
    
    // Add Placeholder text to datatables filter bar
    $('.dataTables_filter input').attr("placeholder", "Ingrese un flitro aquí...");

    // Manually Init Chosen on Datatables Filters
    //$("select[name='dataTables-list_length']").chosen();
}

function tablasAjax(element, route, srcLoading, params)
{
    var url;
    if (params)
    {
        url = Routing.generate(route, eval(params));
    }
    else
    {
        url = Routing.generate(route);
    }
    
    $(element).dataTable( {
        "bDestroy": true,
        "bRetrieve": true,
        "aoColumnDefs": [{ 'bSortable': false, 'aTargets': [ -1 ] }],
        "oLanguage": 
            { 
                "oPaginate": {"sPrevious": "Anterior", "sNext": "Siguiente"}, 
                "sLengthMenu": "Mostrar _MENU_ registros", 
                "sSearch": "Buscar:  ", 
                "sInfo": "Mostrando _START_ a _END_ de _TOTAL_ registros", 
                "sInfoEmpty": "Mostrando 0 a 0 de 0 registros", 
                "sInfoFiltered": "(filtrado de _MAX_ registros)", 
                "sEmptyTable": "<p align='center'>No hay datos para mostrar...</p>" ,
                "sZeroRecords": "<p align='center'><img src='"+srcLoading+"'/></p>"
            },
        "iDisplayLength": 5,
        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
        "sDom": '<"panel-menu dt-panelmenu"lfr><"clearfix">tip',
        "ajax": 
        {
            "url": url,
            "type": "POST"
        }
    });	
    
    // Add Placeholder text to datatables filter bar
    $('.dataTables_filter input').attr("placeholder", "Ingrese un flitro aquí...");

    // Manually Init Chosen on Datatables Filters
    //$("select[name='dataTables-list_length']").chosen();
}

function reloadTabla(element)
{
    $(element).DataTable().ajax.reload();
}

function chosen(element, full)
{
    full = (full) ? true : false;
    $(element).chosen();
    if (full) $(element+"_chosen").css("width", "100%");
}

function dateRange(nameElement)
{
    $('input[name="'+nameElement+'"]').daterangepicker();
}

function tooltips()
{
    $('.tooltip-show').tooltip({
      selector: "[data-toggle=tooltip]"
    });
}

function switchs(name_element, changeFunctionTrue, parametrosTrue, changeFunctionFalse, parametrosFalse, isAjax, data)
{
    changeFunctionTrue = (changeFunctionTrue) ? changeFunctionTrue : '';
    parametrosTrue = (parametrosTrue) ? parametrosTrue : '';
    changeFunctionFalse = (changeFunctionFalse) ? changeFunctionFalse : '';
    parametrosFalse = (parametrosFalse) ? parametrosFalse : '';
    isAjax = (isAjax===true) ? true : false;
    data = (data) ? data : '';
    
    $.fn.bootstrapSwitch.defaults.onText = 'Si';
    $.fn.bootstrapSwitch.defaults.offText = 'No';
    $("[name='"+name_element+"']").bootstrapSwitch();
    
    if (changeFunctionTrue !== '' && changeFunctionFalse !== '')
    {
        $("[name='"+name_element+"']").on('switchChange.bootstrapSwitch', function(event, state) 
        {
            if (state)
            {
                if (isAjax)
                {
                    data['value'] = state;
                    changeFunctionTrue(parametrosTrue, data);
                }
                else
                    changeFunctionTrue(parametrosTrue);
            }
            else
            {
                if (isAjax)
                {
                    data['value'] = state;
                    changeFunctionFalse(parametrosFalse, data);
                }
                else
                    changeFunctionFalse(parametrosFalse);
            }
        });
    }
}

function soloNumeros()
{
    $(".soloNumeros").keydown(function(event) 
    {
      if(event.shiftKey)
      {
        event.preventDefault();
      }
      
      if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 13 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 9 || event.keyCode == 189) { }
      else 
      {
            if (event.keyCode < 95) {
              if (event.keyCode < 48 || event.keyCode > 57) {
                    event.preventDefault();
              }
            } 
            else {
                  if (event.keyCode < 96 || event.keyCode > 105) {
                      event.preventDefault();
                  }
            }
          }
       });
}

function cambiaAttr(arrDatos)
{
    arrDatos['delVal'] = (arrDatos['delVal']) ? arrDatos['delVal'] : '';
    
    $(arrDatos['element']).attr(arrDatos['attr'], arrDatos['value']);
    if (arrDatos['delVal'] !== '')
    {
        $(arrDatos['element']).val('');
    }
}

function cambiaProp(arrDatos)
{
    $(arrDatos['element']).prop(arrDatos['prop'], arrDatos['value']);
}

function iniciaDropZone(params)
{
    var sParams = {};
    $.each(params, function(key, value)
    {
        sParams[key] = value;
    });
    Dropzone.options.dropZone =
    {
        maxFilesize: sParams['maxFilesize'],
        parallelUploads: sParams['parallelUploads'],
        dictFileTooBig: "Archivo demasiado grande Max "+sParams['maxFilesize']+"Mb.",
        addRemoveLinks: true,
        dictRemoveFile: "Eliminar",
        dictCancelUpload: "Cancelar...",
        dictCancelUploadConfirmation: "¿Desea cancelar la subida de este archivo?",
        acceptedFiles: sParams['acceptedFiles'],
        dictInvalidFileType: sParams['dictInvalidFileType'],
        removedfile: function(file) 
        {
            thisDropzone = this;
            if(typeof(file.id) !== "undefined")
            {
                muestra_confirmacion_dropzone('¿Está seguro de querer eliminar el archivo <b><i>'+file.name+'</i></b>?', file, thisDropzone, false, true, sParams['delete_archivos_url']);
            }
            else
            {
                file.previewElement.parentNode.removeChild(file.previewElement);
            }
        },
        init: function() 
        {
            alrt("entraaa");
            thisDropzone = this;

            $.post(Routing.generate(sParams['get_archivos_url']), function(response) 
            {
                $.each(response, function(key, value)
                {
                    var mockFile = {name: value.name, size: value.size, id: value.fileId };
                    thisDropzone.emit("addedfile", mockFile);
                    thisDropzone.emit("thumbnail", mockFile, sParams['thumb']);
                    mockFile.previewElement.addEventListener("click", function()
                    {
                        muestra_pdfs('Archivo '+value.name, Routing.generate(sParams['get_archivos_pdf_url'], {key: value.fileId}));
                    });
                });
            });
            
            thisDropzone.on("addedfile", function(file) 
            {
                Dropzone.confirm = function(question, accepted, rejected) 
                {
                    accepted = ''; rejected = '';
                    muestra_confirmacion_dropzone(question, file, thisDropzone, true, false);
                };
            });
            
            thisDropzone.on("success", function(file, response)
            {
                file.id = response.fileId;
                file.previewElement.addEventListener("click", function()
                {
                    muestra_pdfs('Archivo '+file.name, Routing.generate(sParams['get_archivos_pdf_url'], {key: response.fileId}));
                });
                thisDropzone.emit("thumbnail", file, sParams['thumb']);
            });
        }
    };
}

function datePicker()
{
    $('.datepicker').datepicker(
    {
        format: 'yyyy-mm-dd',
    });
}

function xEdit(route, pk)
{
    $.fn.editable.defaults.mode = 'popup';
    $('.x-editable').editable(
    {
        pk: pk,
        url: Routing.generate(route),
        disabled: true,
        success: function(response, newValue)
        {
            if(response.isMessage)
            {
                muestra_mensaje(response.titulo, response.message, response.dimmisForm, response.focusOnHide, response.redirectOnHide);
                if (response.error)
                    return false;
                else
                    return true;
            }
        }
    });
}

function loadSpin(element, hide)
{
    var target = document.getElementById(element);
    hide = (hide) ? hide : false;
    var opts = 
    {
        lines: 13, // The number of lines to draw
        length: 25, // The length of each line
        width: 9, // The line thickness
        radius: 60, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 60, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: '50%', // Top position relative to parent
        left: '50%' // Left position relative to parent
    };
    new Spinner(opts).spin(target);
    
    if (hide === true)
    {
        $('#'+element).html('');
    }
}