var common = {
	showDialogJq : function(title, msg, options){
		
		options = options || {};
		
		var defaultDialogOptions = {
			width     : 600,
			maxheight : 900,
			modal     : true,
			autoOpen  : false,
			close     : function(e,ui){
				$(this).dialog('destroy');
				$(this).remove();
			}
		};
		
		if($('.jq-dialog-template').length > 0 ){
			$('.jq-dialog-template').
				attr('title', title).
				html(msg);
			
		}else{
			var dialog = $('<div>').
				attr('class', 'jq-dialog-template').
				attr('title', title).
				html(msg);
			
			$('body').append(dialog);
		}
		
		$('.jq-dialog-template').dialog(
			$.extend(
				{},
				defaultDialogOptions,
				options)
		);
		
		$('.jq-dialog-template').dialog('open');
	},
	
	showConfirmJq : function(title, msg, fn_ok, fn_open, options){
		options = options || {};
		
		var defaultDialogOptions = {
			buttons : {
				Ok : function(){
					if(fn_ok) fn_ok();
					
					// TODO: Not sure which is preferred close or destroy/remove
					//$(this).dialog('close');
					$(this).dialog('destroy');
					$(this).remove();
				},
				Cancel : function(){
					$(this).dialog('destroy');
					$(this).remove();
				}
			},
			open : function(e,ui){
				if(fn_open) fn_open();
			}
		};
		
		this.showDialogJq(title, msg,
			$.extend(
				{},
				defaultDialogOptions,
				options)
		);
	}
};