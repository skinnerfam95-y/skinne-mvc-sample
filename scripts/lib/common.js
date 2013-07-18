var common = {
	showDialogJq : function(title, msg){
		
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
		
		$('.jq-dialog-template').dialog({
			width     : 600,
			maxheight : 900,
			modal     : true,
			autoOpen  : false,
			close     : function(e,ui){
				$(this).dialog('destroy');
				$(this).remove();
			}
		});
		
		$('.jq-dialog-template').dialog('open');
	}
};