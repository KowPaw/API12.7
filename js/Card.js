// KLASA KANBAN CARD
function Card(id, name, columnId) {
	var self = this;

	this.id = id;
	this.name = name || 'No name given';
	this.columnId = columnId;
	this.element = createCard();

	function createCard() {
		var card = $('<li class="card" data-id="' + self.id + '" data-name="' + self.name +'""></li>');
		var cardDeleteBtn = $('<button class="btn-delete">x</button>');
		var cardDescription = $('<p class="card-description"></p>');
		var cardChangeName = $('<button class="card-change-name">Zmień opis</button>');

		cardDeleteBtn.click(function(){
			self.removeCard();
		});
		
		cardChangeName.click(function() {
			self.renameCard();
		});

		card.append(cardDeleteBtn);
		cardDescription.text(self.name);
		card.append(cardDescription);
		card.append(cardChangeName);
		return card;
	}
}

Card.prototype = {
	removeCard: function() {
    	var self = this;
    	$.ajax({
      		url: baseUrl + '/card/' + self.id,
      		method: 'DELETE',
      		success: function(){
        		self.element.remove();
      		}
    	});
	},
	renameCard: function() {
		var self = this;
		var cardName = prompt('Wpisz nowy opis');
		$.ajax({
			url: baseUrl + '/card/' + self.id,
			method: 'PUT',
			data: {
            	name: cardName,
            	bootcamp_kanban_column_id: self.columnId
        	},
			success: function(response){
				self.element.children('p')[0].innerText = cardName;
			}	
		});
	}
}