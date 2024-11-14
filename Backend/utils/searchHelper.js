import wanakana from 'wanakana';



/**
 * Converts full-width characters to half-width and lowercases all text.
 * @param {string} str - The string to normalize.
 * @return {string} - The normalized string.
//  */
// export function normalizeText(str) {
//     // Convert full-width characters to half-width
//     const fullWidthToHalfWidth = str.replace(/[\uFF01-\uFF5E]/g, function(ch) {
//         return String.fromCharCode(ch.charCodeAt(0) - 0xFEE0);
//     }).replace(/\u3000/g, ' ');

//     // Convert to lowercase to ensure case insensitivity
//     return fullWidthToHalfWidth.toLowerCase();
// }

function halfWidthToFullWidthKatakana(input) {
    const kanaMap = {
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    // Convert each character in the string
    return input.split('').map(char => kanaMap[char] || char).join('');
}


export function normalizeText(input) {
    console.log("Original Input:", input);

    // Convert half-width Katakana to full-width Katakana
    let text = halfWidthToFullWidthKatakana(input);
    console.log("After converting half-width Katakana to full-width:", text);

    // Convert any Katakana (now full-width) to Hiragana
    text = wanakana.toHiragana(text);
    console.log("After converting to Hiragana::::", text);
    text = wanakana.toKatakana(text) 
    console.log("After converting to kathakana::::", text);
   

    

    // Normalize full-width characters to half-width
    text = text.replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
    console.log("After normalizing full-width characters to half-width:", text);

    // Replace full-width spaces with a single half-width space
    text = text.replace(/\u3000/g, ' ');
    console.log("After replacing full-width spaces:", text);

    // Normalize spaces, ensuring there's only one space between words
    text = text.replace(/\s+/g, ' ').trim();
    console.log("Final normalized text:", text);

    return text;
}

export function normalizeTextkatakana(input) {
    console.log("Original Input:", input);

    // Convert half-width Katakana to full-width Katakana
    let text = halfWidthToFullWidthKatakana(input);
    console.log("After converting half-width Katakana to full-width:", text);

    text = wanakana.toKatakana(text) 
    console.log("After converting to kathakana::::", text);
   

    // Normalize full-width characters to half-width
    text = text.replace(/[\uFF01-\uFF5E]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xFEE0));
    console.log("After normalizing full-width characters to half-width:", text);

    // Replace full-width spaces with a single half-width space
    text = text.replace(/\u3000/g, ' ');
    console.log("After replacing full-width spaces:", text);

    // Normalize spaces, ensuring there's only one space between words
    text = text.replace(/\s+/g, ' ').trim();
    console.log("Final normalized text:", text);

    return text;
}