$(function(){
	recordManager.init(jsViewVars.Records);
});

var recordManager= {
	records : null,
	editIdx : null,
	
	init : function(records){
		this.records = records;

		this.setStateAdd();

		$('#myTable').dataTable({
			'aaSorting'   : [[ 1, 'desc' ]],
			'bStateSave'  : true,
		    'fnStateLoad' : function (oSettings) {
		    	// Disabling the state load permits a saved state
		    	// as a page is redrawn (ajax'd for instance)
		    	// but resets the state each time the page is loaded
		    	return null;
		    }		
		});
		
		this.bind();
	},
	
	setStateAdd : function(){
		$('#inputid').html('{new record}');
		$('#inputSave').val('Add');
		
		this.editIdx = null;
		
		this.resetInputFields();
		
		$("#inputCancel").attr('disabled', true);
	},
	
	resetInputFields : function(){
		$('#inputval').val('');
	},
	
	setStateModify : function(rowNum, data){
		$("#inputCancel").attr('disabled', false);
		
		$.each(data, function(field, val){
			if($('#input' + field).length === 0){
				return true; // skip to next record
			}else if(field === 'id'){
				$('#inputid').html(data['id']);
			}else{
				$('#input' + field).val(data[field]);
			}
		});
		
		$('#inputSave').val('Save');
		
		this.editIdx = rowNum;
	},
	
	bind : function(){
		var $this = this;
		
		$('#inputSave').click(function(){
			if($this.editIdx === null)
				return;
			
			$.ajax({
				'url' : 'index.php?action=save',
				'type' : 'post',
				'dataType' : 'json',
				'data' : $this.records[$this.editIdx],
				'success' : function(data, textStatus, jqXHR){
					// Set the ID from an insert
					$this.records[$this.editIdx]['id'] = data.id;

					$this.setStateAdd();
					
					$this.ajaxRecordListTable();
				}
			});
		});
		
		$('#inputCancel').click(function(){
			$this.cleanupUnsavedNew();
			$this.setStateAdd();
		});
		
		$('.updateStore').change(function(){
			if($this.editIdx === null){
				var newRowNum = $this.records.length;
				
				// IMPORTANT: derive fields
				$this.records.push({
					'rowNum' : newRowNum,
					'id' : null,
					'val': null
				});
				
				$this.editIdx = newRowNum;
			}
			$this.records[$this.editIdx]['val'] = $('#inputval').val();
			$("#inputCancel").attr('disabled', false);
		});
		
		this.bindRows();
	},

	cleanupUnsavedNew : function(){
		// TODO: add a save warning if canceling the edit
		if(this.editIdx !== null){
			if(this.records[this.editIdx]['id'] === null){
				this.records.splice(this.editIdx, 1);
			}
		}
	},
	
	bindRows : function(){
		var $this = this;

		$('#recordListTable .dataTables_filter label').click(function(){
			$('#recordListTable .dataTables_filter input').val('').keyup();
		});
		
		$('#myTable').on('click', '.editRow', function(){
			var idParts = this.parentNode.parentNode.id.split('_');
			var rowNum = idParts[idParts.length - 1];
			
			$this.cleanupUnsavedNew();
			
			$this.setStateModify(rowNum, $this.records[rowNum]);
			
			// TODO: Improve this to bind to specific row, but still delegate?
			return false; // stop propegation...otherwise calls for every row
		});
		
			$('#myTable').on('click', '.deleteRow', function(){
				var idParts = this.parentNode.parentNode.id.split('_');
				var rowNum = idParts[idParts.length - 1];
				
				$.ajax({
					'url' : 'index.php?action=delete',
					'type' : 'post',
					'dataType' : 'json',
					'data' : {id:$this.records[rowNum]['id']},
					'success' : function(data, textStatus, jqXHR){
						$this.cleanupUnsavedNew();
						$this.setStateAdd();
						
						$this.records.splice(rowNum,1);
						
						$this.ajaxRecordListTable();
					}
				});
				// TODO: Improve this to bind to specific row, but still delegate?
				return false; // stop propegation...otherwise calls for every row
			});	
	},
	
	ajaxRecordListTable : function(){
		
		var $this = this;
		
		$('#recordListTable').empty();
		
		$.ajax({
			'url' : 'index.php?action=recordListTable',
			'dataType' : 'text',
			'success' : function(data, textStatus, jqXHR){
				$('#recordListTable').html(data);
				$('table').dataTable({
			        'bStateSave': true
			    });
				$this.bindRows();
			}
		});
	}
};