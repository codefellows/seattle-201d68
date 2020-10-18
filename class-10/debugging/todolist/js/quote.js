var quoteArray = ['Only I can change my life. No one can do it for me. ~Carol Burnett', 'With the new day comes new strength and new thoughts. ~Eleanor Roosevelt', 'Life is 10% what happens to you and 90% how you react to it. ~Charles R. Swindoll', 'It always seems impossible until it\'s done. ~Nelson Mandela', 'Set your goals high, and don\'t stop till you get there. ~Bo Jackson', 'It does not matter how slowly you go as long as you do not stop. ~Confucius'];

var randomQuote = Math.floor(Math.random() * quoteArray.length);

var quote = document.getElementById('quote');
var h2 = document.createElement('h2');
var quoteText = document.createTextNode(quoteArray[randomQuote]);
h2.appendChild(quoteText);
quote.appendChild(h2);
