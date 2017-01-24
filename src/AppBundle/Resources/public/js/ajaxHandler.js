var ajaxHandler = function(element, data, isForm)
{
    isForm = (isForm) ? true : false;
    var ajaxProcess = $(element).attr('ajax-process');
    var dataContent = ($(element).attr('data-content') === undefined) ? '' : $(element).attr('data-content');
    var dataType = ($(element).attr('data-type') === undefined) ? 'html' : $(element).attr('data-type');
    var method = ($(element).attr('method') === undefined) ? 'POST' : $(element).attr('method');
    var effect = ($(element).attr('effect') === undefined) ? 'fade' : $(element).attr('effect');
    var isModalForm = false;
    var isModalGrande = false;
    
    if (!validarAtributos(ajaxProcess))
    {
        return false;
    }
    
    if (dataContent === 'modal-form')
    {        
        isModalForm = true;
        var modalTitle = ($(element).attr('modal-title') === undefined) ? 'Formulario' : $(element).attr('modal-title');
        var modalSize = ($(element).attr('modal-size') === undefined) ? 'modal-dialog-sm' : $(element).attr('modal-size');
        var modalFocus = ($(element).attr('modal-focus') === undefined) ? '' : $(element).attr('modal-focus');
    }
    else if (dataContent === 'modal-form-lg')
    {        
        isModalGrande = true;
        var modalTitle = ($(element).attr('modal-title') === undefined) ? 'Formulario' : $(element).attr('modal-title');
        var modalSize = ($(element).attr('modal-size') === undefined) ? 'modal-dialog-lg' : $(element).attr('modal-size');
        var modalFocus = ($(element).attr('modal-focus') === undefined) ? '' : $(element).attr('modal-focus');
    }
    else if(dataContent === 'modal-confirm')
    {
        var btn = $('#aceptar_confirm_btn');
        btn.button('loading');
    }
    
    if (isForm)
    {
        $(data).append('<input type="hidden" name="ajaxProcess" value="'+ajaxProcess+'" />');
        var sData = $(data).serialize();
    }
    else
    {
        var sData = {};
        $.each(data, function(key, value)
        {
            sData[key] = value;
        });
        $.extend(sData, {'ajaxProcess': ajaxProcess});
    }
    
    if (!$(element).is("select"))
    {
        $(element).button('loading');
    }
    
    $.ajax
    ({
        url: Routing.generate('ajaxHandler'),
        type: method,
        data: sData,
        dataType: dataType
    })
    .done(function(response) 
    {        
        if (dataType === 'json')
        {
            if (response.isModalConfirm)
            {
                muestra_confirmacion(response.message, response.trueAction);
            }
            else if(response.isMessage)
            {
                muestra_mensaje(response.titulo, response.message, response.dimmisForm, response.focusOnHide, response.redirectOnHide, response.customFunction, response.params);
            }
            else if(response.isRedirect)
            {
                redireccion(response.targetUrl);
            }
            else if(response.isCombo)
            {
                $(response.elementLoad).empty();
                $(response.elementLoad).append('<option value="" selected="selected">'+response.emptyValue+'</option>');
                $(response.elementLoad).trigger('change');
                
                $.each(response, function(key, value)
                {
                    if (key!== 'isCombo' && key !== 'elementLoad' && key !== 'elementLoad' && key !== 'emptyValue')
                    {
                        $(response.elementLoad).append('<option value="'+value.id+'">'+value.nombre+'</option>');
                    }
                });
            }
            else if(response.isCustom)
            {
                eval(response.function+'('+response.params+')');
            }
        }
        else if (dataType === 'html')
        {
            if (isModalForm)
            {
                muestra_formulario(modalTitle, response, modalSize, modalFocus);
            }
            else if(isModalGrande)
            {
                muestra_formulario_grande(modalTitle, response, modalSize, modalFocus);
            }
            else
            {
                $(dataContent).html(response);
                
                if (effect === 'fade')
                {
                    fade(dataContent);
                }
                else if (effect === 'fadeOut')
                {
                    fadeOut(dataContent);
                }
                else if (effect === 'slideDown')
                {
                    slideDown(dataContent);
                }
                else if (effect === 'slideUp')
                {
                    slideUp(dataContent);
                }
            }
        }
    })
    .always(function()
    {
        if (!$(element).is("select"))
        {
            $(element).button('reset');
        }
    });
};

var postHandler = function(url)
{
    $.post(url);
};

function validarAtributos(ajaxProcess)
{
    if (ajaxProcess === undefined)
    {
        muestra_mensaje('Error de Sistema', 'Se produjo un error al definir los atributos, no se puede continuar con el proceso...');
        return false;
    }
    
    return true;
}
