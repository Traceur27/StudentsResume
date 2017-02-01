// state object
var state = {
	items : []
};

// state modification functionse
var addItem = function(state, item){
	state.items.push(item);
};

var deleteItem = function(state, item){
	var index = state.items.indexOf(item);

	if(index > -1)
		state.items.splice(index, 1);
};

var toggleCheckForItem = function(state, item){
	var index = state.items.indexOf(item);
	state.items[index].checked = !state.items[index].checked;
}

// render functions
var renderList = function(state, element){
	var itemsHTML = state.items.map(function(item){
		return createHtmlForItem(item);
	});
	element.html(itemsHTML);
};

// event listeners
$('#js-shopping-list-form').submit(function(event){
	event.preventDefault();
	addItem(state, 
		{
			name : $('#shopping-list-entry').val(),
			checked: false
		});
	renderList(state, $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-toggle', function(event){
	var itemName = $(this).closest('li').children('.shopping-item').text();
	var item = findItemByName(state, itemName);

	toggleCheckForItem(state, item);
	renderList(state, $('.shopping-list'));
});

$('.shopping-list').on('click', '.shopping-item-delete', function(event){
	var itemName = $(this).closest('li').children('.shopping-item').text();
	var item = findItemByName(state, itemName);

	deleteItem(state, item);
	renderList(state, $('.shopping-list'));
});

// helper functions
var createHtmlForItem = function(item){
	var additionalClass = 'shopping-item__checked';
	if(item.checked === false)
		additionalClass = "";

	var ret =   
	'<li>'+
        '<span class="shopping-item ' + additionalClass + '">' + item.name + '</span>' +
        '<div class="shopping-item-controls">' +
          '<button class="shopping-item-toggle">' +
           ' <span class="button-label">check</span>' +
         ' </button> ' +
         ' <button class="shopping-item-delete">' +
         '   <span class="button-label">delete</span>' +
       '   </button>' +
      '  </div>' +
    '  </li>';
    return ret;
};

var findItemByName = function(state, n){
	for(var i = 0; i < state.items.length; ++i){
		if(state.items[i].name === n){
			return state.items[i];
		}
	}
};