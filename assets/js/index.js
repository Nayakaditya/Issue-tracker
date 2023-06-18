const author = document.getElementsByClassName("author_name");

for (let i = 0; i < author.length; i++) {
  const value = author[i].innerText;
  const words = value.split(" ");
  let n = words.length;

  const firstChars = words[0].split("");
  const lastChars = words[n - 1].split("");
  const firstChar = firstChars[0].toUpperCase();
  const lastChar = lastChars[0].toUpperCase();
  
  author[i].innerHTML = firstChar + lastChar;
}
