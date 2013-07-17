$(function(){
	$('#inputEdit').hide();
	recordManager.init(jsViewVars.Records);
	recordManager.bind();
	
	$("table").dataTable({
		"bStateSave": true,
	    "fnStateLoad": function (oSettings) {
	    	// Disabling the state load permits a saved state
	    	// as a page is redrawn (ajax'd for instance)
	    	// but resets the state each time the page is loaded
	    	return null;
	    }		
	});
});

var recordManager= {
	records : null,
	editIdx : null,
	
	init : function(records){
		this.records = records;
	},
	
	bind : function(){
		var $this = this;
		
		$('#inputAdd').click(function(){
			$('#inputAdd').hide();
			$('#inputEdit').show();
			
			$this.records.push({
				'id' : null,
				'val': null
			});
			$this.editIdx = $this.records.length - 1;
		});
		
		$.each(this.records, function(idx, record){
			$('#row_' + idx).click(function(){
				$('#inputAdd').hide();
				$('#inputEdit').show();
				$('#inputId').html(record['id']);
				$('#inputVal').val(record['val']);
			});
		});
		
		$('#inputSave').click(function(){
			$.ajax({
				'url' : 'index.php?action=save',
				'type' : 'post',
				'dataType' : 'json',
				'data' : $this.records[$this.editIdx],
				'success' : function(data, textStatus, jqXHR){
					$this.editIdx = null;
					$('#inputAdd').show();
					$('#inputEdit').hide();

					$this.ajaxRecordListTable();
				}
			});
		});
		
		$('.updateStore').change(function(){
			$this.records[$this.editIdx]['val'] = $('#inputVal').val();
		});
	},
	
	ajaxRecordListTable : function(){
		$('#recordListTable').empty();
		
		$.ajax({
			'url' : 'index.php?action=recordListTable',
			'dataType' : 'text',
			'success' : function(data, textStatus, jqXHR){
				$('#recordListTable').html(data);
				$("table").dataTable({
			        "bStateSave": true
			    });
			}
		});
	}
};