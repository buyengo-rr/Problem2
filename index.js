// Common words we want to skip
const skipWords = ['the', 'and', 'a', 'of', 'for', 'but', 'have', 'been', 'to', 'in', 'on', 'at', 'with', 'is', 'it'];


// Clean and prepare the text
function cleanText(text) {
  // Make all letters lowercase
  text = text.toLowerCase();
  
  // Remove punctuation (keep letters, numbers, hyphens and spaces)
  text = text.replace(/[^a-z0-9\- ]/g, '');
  
  // Split into words and remove empty entries
  return text.split(' ').filter(word => word.length > 0);
}

// Count word frequencies using if-else
function countFrequency(words) {
  let frequency = {};
  
  for (let word of words) {
    // Skip common words
    if (skipWords.includes(word)) {
      continue;
    }
    
    // Count the word
    if (frequency[word]) {
      frequency[word]++;  // Increment if word exists
    } else {
      frequency[word] = 1;  // Initialize if new word
    }
  }
  
  return frequency;
}

// Analyze the frequency data
function analyzeFrequency(frequency) {
  // Convert to array of [word, count] pairs
  let allWords = [];
  for (let word in frequency) {
    allWords.push([word, frequency[word]]);
  }
  
  // Sort by count (highest first)
  allWords.sort((a, b) => b[1] - a[1]);
  
  // Get top 5 words
  let topWords = allWords.slice(0, 5);
  
  // Find words that appear only once
  let uniqueWords = [];
  for (let [word, count] of allWords) {
    if (count === 1) {
      uniqueWords.push(word);
    }
  }
  
  return { topWords, uniqueWords, allWords };
}

// Display the results
function showResults(results) {
  console.log("\nWord Frequency Count:");
  console.log("---------------------");
  
  // Show all words with counts
  for (let [word, count] of results.allWords) {
    console.log(`${word.padEnd(12)}: ${count}`);
  }
  
  // Show top 5 words
  console.log("\nTop 5 Words:");
  for (let i = 0; i < results.topWords.length; i++) {
    console.log(`${i+1}. ${results.topWords[i][0]} (${results.topWords[i][1]})`);
  }
  
  // Show unique words
  console.log("\nUnique Words (appear once):");
  console.log(results.uniqueWords.join(', '));
}

// Example text
const sampleText = `Dante slashes through demons with his sword Rebellion. 
His twin brother Vergil seeks more power with the Yamato blade. 
Devils never cry, but hunters never stop fighting. 
The demon king Mundus rises again, and only Dante can stop him. 
"Jackpot!" Dante shouts as he unleashes his demon trigger. 
Lady and Trish arrive with new guns to help in the battle. 
The shop Devil May Cry stays open for business, as always.`;



// Actual analysis
const words = cleanText(sampleText);
const frequency = countFrequency(words);
const analysis = analyzeFrequency(frequency);
showResults(analysis);