'use strict';

function main(){
	$('.js-analyze').on('click', function(event){
		var data = $('#user-text').val();
		analyze(data);

	});
};

function analyze(data){
	var wordCount = 0;
	var words = [];
	var currentWord = '';
	var sentences = 0;
	var sentencesChars = 0;
	var stops = [" ", ".", "\n", ",", "(", ")", "[", "]"];

	for(var i = 0; i < data.length; ++i){
		if($.inArray(data[i], stops) != -1 && currentWord != ''){
			if(words[currentWord] === undefined)
				words[currentWord] = 1;
			else{
				words[currentWord] += 1;
			}

			if(data[i] === '.')
				sentences++;

			wordCount++;
			currentWord = '';
		}
		else if($.inArray(data[i], stops) === -1){
			currentWord += data[i];
			sentencesChars++;
		}
	}

	if(currentWord != "")
	{
		if(words[currentWord] === undefined)
			words[currentWord] = 1;
		else{
			words[currentWord] += 1;
		}
		wordCount++;
	}

	sentences++;

	var uniqueWords = Object.keys(words).length;
	var avarageWordLength = sentencesChars/wordCount;
	var avarageSentenceLength = sentencesChars/sentences;

	$('.js-wc').text(wordCount);
	$('.js-uwc').text(uniqueWords);
	$('.js-awl').text(avarageWordLength);
	$('.js-asl').text(avarageSentenceLength);

	$('dl').removeClass('hidden');
};

$(main);