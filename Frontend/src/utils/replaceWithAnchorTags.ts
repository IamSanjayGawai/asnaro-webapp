// const urlRegex =
//   /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

// export const replaceWithAnchorTags = (text) => {
//   return text.replace(urlRegex, (url) => {
//     const anchorStyle = "text-decoration: underline;";
//     return `<a href="${url}" target="_blank" rel="noopener noreferrer" style="${anchorStyle}">${url}</a>`;
//   });
// };

export const replaceWithAnchorTags=(text)=> {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
  let newText = text.replace(urlRegex, function(url) {
    // URLs with http(s), ftp, file, etc., will remain unchanged
    return `<a href="${url}" target="_blank">${url}</a>`;
  });

  const pseudoUrlRegex = /(\bwww\.[\S]+(\b|$))/ig;
  newText = newText.replace(pseudoUrlRegex, function(url) {
    // Prepend http:// to www-based URLs if not already included
    return `<a href="http://${url}" target="_blank">${url}</a>`;
  });

  return newText;
}
