import DtbAvailability from "../models/Availibility.js";
import DtbProcess from "../models/Dtb_process.js";
import DtbUser from "../models/User.js";
import DtbCategory from "../models/Category.js";
import Keyword from "../models/KeywordMaster.js";
import crypto from "crypto";
import { uploadBase64ImageToS3 } from "../aws.js";
import mongoose from "mongoose";
import Category from "../models/Category.js";
import User from "../models/User.js";

const katakanaToHalfwidthMap = {
  ア: "ｱ",
  イ: "ｲ",
  ウ: "ｳ",
  エ: "ｴ",
  オ: "ｵ",
  カ: "ｶ",
  キ: "ｷ",
  ク: "ｸ",
  ケ: "ｹ",
  コ: "ｺ",
  サ: "ｻ",
  シ: "ｼ",
  ス: "ｽ",
  セ: "ｾ",
  ソ: "ｿ",
  タ: "ﾀ",
  チ: "ﾁ",
  ツ: "ﾂ",
  テ: "ﾃ",
  ト: "ﾄ",
  ナ: "ﾅ",
  ニ: "ﾆ",
  ヌ: "ﾇ",
  ネ: "ﾈ",
  ノ: "ﾉ",
  ハ: "ﾊ",
  ヒ: "ﾋ",
  フ: "ﾌ",
  ヘ: "ﾍ",
  ホ: "ﾎ",
  マ: "ﾏ",
  ミ: "ﾐ",
  ム: "ﾑ",
  メ: "ﾒ",
  モ: "ﾓ",
  ヤ: "ﾔ",
  ユ: "ﾕ",
  ヨ: "ﾖ",
  ラ: "ﾗ",
  リ: "ﾘ",
  ル: "ﾙ",
  レ: "ﾚ",
  ロ: "ﾛ",
  ワ: "ﾜ",
  ヲ: "ｦ",
  ン: "ﾝ",
  ガ: "ｶﾞ",
  ギ: "ｷﾞ",
  グ: "ｸﾞ",
  ゲ: "ｹﾞ",
  ゴ: "ｺﾞ",
  ザ: "ｻﾞ",
  ジ: "ｼﾞ",
  ズ: "ｽﾞ",
  ゼ: "ｾﾞ",
  ゾ: "ｿﾞ",
  ダ: "ﾀﾞ",
  ヂ: "ﾁﾞ",
  ヅ: "ﾂﾞ",
  デ: "ﾃﾞ",
  ド: "ﾄﾞ",
  バ: "ﾊﾞ",
  ビ: "ﾋﾞ",
  ブ: "ﾌﾞ",
  ベ: "ﾍﾞ",
  ボ: "ﾎﾞ",
  パ: "ﾊﾟ",
  ピ: "ﾋﾟ",
  プ: "ﾌﾟ",
  ペ: "ﾍﾟ",
  ポ: "ﾎﾟ",
  ァ: "ｧ",
  ィ: "ｨ",
  ゥ: "ｩ",
  ェ: "ｪ",
  ォ: "ｫ",
  ッ: "ｯ",
  ャ: "ｬ",
  ュ: "ｭ",
  ョ: "ｮ",
  ー: "ｰ",
};

const hiraganaToKatakanaMap = {
  あ: "ア",
  い: "イ",
  う: "ウ",
  え: "エ",
  お: "オ",
  か: "カ",
  き: "キ",
  く: "ク",
  け: "ケ",
  こ: "コ",
  さ: "サ",
  し: "シ",
  す: "ス",
  せ: "セ",
  そ: "ソ",
  た: "タ",
  ち: "チ",
  つ: "ツ",
  て: "テ",
  と: "ト",
  な: "ナ",
  に: "ニ",
  ぬ: "ヌ",
  ね: "ネ",
  の: "ノ",
  は: "ハ",
  ひ: "ヒ",
  ふ: "フ",
  へ: "ヘ",
  ほ: "ホ",
  ま: "マ",
  み: "ミ",
  む: "ム",
  め: "メ",
  も: "モ",
  や: "ヤ",
  ゆ: "ユ",
  よ: "ヨ",
  ら: "ラ",
  り: "リ",
  る: "ル",
  れ: "レ",
  ろ: "ロ",
  わ: "ワ",
  を: "ヲ",
  ん: "ン",
  が: "ガ",
  ぎ: "ギ",
  ぐ: "グ",
  げ: "ゲ",
  ご: "ゴ",
  ざ: "ザ",
  じ: "ジ",
  ず: "ズ",
  ぜ: "ゼ",
  ぞ: "ゾ",
  だ: "ダ",
  ぢ: "ヂ",
  づ: "ヅ",
  で: "デ",
  ど: "ド",
  ば: "バ",
  び: "ビ",
  ぶ: "ブ",
  べ: "ベ",
  ぼ: "ボ",
  ぱ: "パ",
  ぴ: "ピ",
  ぷ: "プ",
  ぺ: "ペ",
  ぽ: "ポ",
  ぁ: "ァ",
  ぃ: "ィ",
  ぅ: "ゥ",
  ぇ: "ェ",
  ぉ: "ォ",
  っ: "ッ",
  ゃ: "ャ",
  ゅ: "ュ",
  ょ: "ョ",
  ゎ: "ヮ",
  ゐ: "ヰ",
  ゑ: "ヱ",
  ゕ: "ヵ",
  ゖ: "ヶ",
  ゔ: "ヴ",
};

const combinedHalfwidthToFullwidthMap = {
  ｶﾞ: "ガ",
  ｷﾞ: "ギ",
  ｸﾞ: "グ",
  ｹﾞ: "ゲ",
  ｺﾞ: "ゴ",
  ｻﾞ: "ザ",
  ｼﾞ: "ジ",
  ｽﾞ: "ズ",
  ｾﾞ: "ゼ",
  ｿﾞ: "ゾ",
  ﾀﾞ: "ダ",
  ﾁﾞ: "ヂ",
  ﾂﾞ: "ヅ",
  ﾃﾞ: "デ",
  ﾄﾞ: "ド",
  ﾊﾞ: "バ",
  ﾋﾞ: "ビ",
  ﾌﾞ: "ブ",
  ﾍﾞ: "ベ",
  ﾎﾞ: "ボ",
  ﾊﾟ: "パ",
  ﾋﾟ: "ピ",
  ﾌﾟ: "プ",
  ﾍﾟ: "ペ",
  ﾎﾟ: "ポ",
};

const singleHalfwidthToFullwidthMap = {
  ｱ: "ア",
  ｲ: "イ",
  ｳ: "ウ",
  ｴ: "エ",
  ｵ: "オ",
  ｶ: "カ",
  ｷ: "キ",
  ｸ: "ク",
  ｹ: "ケ",
  ｺ: "コ",
  ｻ: "サ",
  ｼ: "シ",
  ｽ: "ス",
  ｾ: "セ",
  ｿ: "ソ",
  ﾀ: "タ",
  ﾁ: "チ",
  ﾂ: "ツ",
  ﾃ: "テ",
  ﾄ: "ト",
  ﾅ: "ナ",
  ﾆ: "ニ",
  ﾇ: "ヌ",
  ﾈ: "ネ",
  ﾉ: "ノ",
  ﾊ: "ハ",
  ﾋ: "ヒ",
  ﾌ: "フ",
  ﾍ: "ヘ",
  ﾎ: "ホ",
  ﾏ: "マ",
  ﾐ: "ミ",
  ﾑ: "ム",
  ﾒ: "メ",
  ﾓ: "モ",
  ﾔ: "ヤ",
  ﾕ: "ユ",
  ﾖ: "ヨ",
  ﾗ: "ラ",
  ﾘ: "リ",
  ﾙ: "ル",
  ﾚ: "レ",
  ﾛ: "ロ",
  ﾜ: "ワ",
  ｦ: "ヲ",
  ﾝ: "ン",
  ｧ: "ァ",
  ｨ: "ィ",
  ｩ: "ゥ",
  ｪ: "ェ",
  ｫ: "ォ",
  ｯ: "ッ",
  ｬ: "ャ",
  ｭ: "ュ",
  ｮ: "ョ",
  ｰ: "ー",
};

const katakanaToHiraganaMap = {
  ア: "あ",
  イ: "い",
  ウ: "う",
  エ: "え",
  オ: "お",
  カ: "か",
  キ: "き",
  ク: "く",
  ケ: "け",
  コ: "こ",
  サ: "さ",
  シ: "し",
  ス: "す",
  セ: "せ",
  ソ: "そ",
  タ: "た",
  チ: "ち",
  ツ: "つ",
  テ: "て",
  ト: "と",
  ナ: "な",
  ニ: "に",
  ヌ: "ぬ",
  ネ: "ね",
  ノ: "の",
  ハ: "は",
  ヒ: "ひ",
  フ: "ふ",
  ヘ: "へ",
  ホ: "ほ",
  マ: "ま",
  ミ: "み",
  ム: "む",
  メ: "め",
  モ: "も",
  ヤ: "や",
  ユ: "ゆ",
  ヨ: "よ",
  ラ: "ら",
  リ: "り",
  ル: "る",
  レ: "れ",
  ロ: "ろ",
  ワ: "わ",
  ヲ: "を",
  ン: "ん",
  ガ: "が",
  ギ: "ぎ",
  グ: "ぐ",
  ゲ: "げ",
  ゴ: "ご",
  ザ: "ざ",
  ジ: "じ",
  ズ: "ず",
  ゼ: "ぜ",
  ゾ: "ぞ",
  ダ: "だ",
  ヂ: "ぢ",
  ヅ: "づ",
  デ: "で",
  ド: "ど",
  バ: "ば",
  ビ: "び",
  ブ: "ぶ",
  ベ: "べ",
  ボ: "ぼ",
  パ: "ぱ",
  ピ: "ぴ",
  プ: "ぷ",
  ペ: "ぺ",
  ポ: "ぽ",
  ァ: "ぁ",
  ィ: "ぃ",
  ゥ: "ぅ",
  ェ: "ぇ",
  ォ: "ぉ",
  ッ: "っ",
  ャ: "ゃ",
  ュ: "ゅ",
  ョ: "ょ",
  ヮ: "ゎ",
};

function removeSpecificCharacters(str, charsToRemove) {
  const regex = new RegExp(`[${charsToRemove.join("")}]`, "g");
  return str.replace(regex, "");
}

function katakanaToHalfwidth(str) {
  return str
    .split("")
    .map((char) => katakanaToHalfwidthMap[char] || char)
    .join("");
}

function katakanaToHiragana(str) {
  return str
    .split("")
    .map((char) => katakanaToHiraganaMap[char] || char)
    .join("");
}

function hiraganaToKatakana(str) {
  return str
    .split("")
    .map((char) => hiraganaToKatakanaMap[char] || char)
    .join("");
}

function removeSpecificCharacter(str) {
  return str.replace(/株式会社/g, "");
}

function convertToKatakana(str) {
  let filteredStr = removeSpecificCharacter(str);
  return filteredStr
    .split("")
    .map((char) => hiraganaToKatakanaMap[char] || char)
    .join("");
}

function convertToHiragana(str) {
  let filteredStr = removeSpecificCharacter(str);
  for (let key in combinedHalfwidthToFullwidthMap) {
    filteredStr = filteredStr.replace(
      new RegExp(key, "g"),
      combinedHalfwidthToFullwidthMap[key]
    );
  }
  for (let key in singleHalfwidthToFullwidthMap) {
    filteredStr = filteredStr.replace(
      new RegExp(key, "g"),
      singleHalfwidthToFullwidthMap[key]
    );
  }
  return filteredStr
    .split("")
    .map((char) => katakanaToHiraganaMap[char] || char)
    .join("");
}

function halfwidthToFullwidth(str) {
  for (let key in combinedHalfwidthToFullwidthMap) {
    str = str.replace(
      new RegExp(key, "g"),
      combinedHalfwidthToFullwidthMap[key]
    );
  }
  for (let key in singleHalfwidthToFullwidthMap) {
    str = str.replace(new RegExp(key, "g"), singleHalfwidthToFullwidthMap[key]);
  }
  return str;
}

function halfwidthToFullwidthkatakana(str) {
  let filteredStr = removeSpecificCharacter(str);
  for (let key in combinedHalfwidthToFullwidthMap) {
    filteredStr = filteredStr.replace(
      new RegExp(key, "g"),
      combinedHalfwidthToFullwidthMap[key]
    );
  }
  for (let key in singleHalfwidthToFullwidthMap) {
    filteredStr = filteredStr.replace(
      new RegExp(key, "g"),
      singleHalfwidthToFullwidthMap[key]
    );
  }
  return filteredStr;
}

function convertToScripts(text) {
  const scripts = [];
  const charsToRemove = ["複", "合"]; // Characters to be removed

  // Remove specific characters
  const cleanText = removeSpecificCharacters(text, charsToRemove);

  // Convert to different scripts
  const halfwidthKatakana = katakanaToHalfwidth(cleanText);
  const fullwidthKatakana = halfwidthToFullwidth(halfwidthKatakana);
  const hiragana = katakanaToHiragana(cleanText);

  // Generate different combinations with specific spaces
  scripts.push({
    script: "halfwidth Katakana + halfwidth Space + AnotherKeyword",
    text: `${halfwidthKatakana}`,
  });
  scripts.push({
    script: "fullwidth Katakana + halfwidth Space + AnotherKeyword",
    text: `${cleanText}`,
  });
  scripts.push({
    script: "Hiragana + halfwidth Space + AnotherKeyword",
    text: `${hiragana}`,
  });
  scripts.push({
    script: "halfwidth Katakana + fullwidth Space + AnotherKeyword",
    text: `${halfwidthKatakana}`,
  });
  scripts.push({
    script: "fullwidth Katakana + fullwidth Space + AnotherKeyword",
    text: `${cleanText}`,
  });
  scripts.push({
    script: "Hiragana + fullwidth Space + AnotherKeyword",
    text: `${hiragana}`,
  });

  return scripts;
}
function processForCaseSens(input) {
  // Convert full-width characters to half-width
  input = input.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) =>
    String.fromCharCode(c.charCodeAt(0) - 0xfee0)
  );
  // Remove all spaces and convert to lowercase
  return input.replace(/\s+/g, "").toLowerCase();
}

export const addProcess = async (req, res) => {
  try {
    const { img1, img2, img3, availability, tags, ...otherProcessData } =
      req.body;
    const parsedTags = JSON.parse(req.body.tags);
    const bucketName = process.env.AWS_BUCKET_NAME;
    const imgUrls = await Promise.all([
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `process-img1-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `process-img2-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `process-img3-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
    ]);

    const nameScripts = convertToScripts(otherProcessData.name);
    const makerNameScripts = convertToScripts(otherProcessData.maker_name);
    const processExplanationScripts = convertToScripts(
      otherProcessData.process_explanation
    );

    const hiraganas = convertToHiragana(otherProcessData.name);
    const katakanas = convertToKatakana(otherProcessData.name);
    const fullwidthKatakana = halfwidthToFullwidthkatakana(
      otherProcessData.name
    );

    const scripts_convert = [
      { script: "Hiragana", text: hiraganas },
      { script: "Katakana", text: katakanas },
      { script: "Fullwidth Katakana", text: fullwidthKatakana },
    ];

    // Process the input for case-sens field
    console.log("Original Name:", otherProcessData.name); // Log original name
    const caseSens = processForCaseSens(otherProcessData.name);
    const casesens_maker_name = processForCaseSens(otherProcessData.maker_name);
    const casesens_process_explanation = processForCaseSens(
      otherProcessData.process_explanation
    );

    console.log("Processed case-sens:", caseSens);

    const newProcess = new DtbProcess({
      ...otherProcessData,
      tags: parsedTags,
      img1: imgUrls[0] || "",
      img2: imgUrls[1] || "",
      img3: imgUrls[2] || "",
      user: req.user._id,
      hiragana: hiraganas,
      katakana: katakanas,
      hiragana: hiraganas,
      katakana: katakanas,
      scripts_convert,
      name_scripts: nameScripts,
      maker_name_scripts: makerNameScripts,
      process_explanation_scripts: processExplanationScripts,
    });

    const savedProcess = await newProcess.save();

    if (availability) {
      const parsedAvailability = JSON.parse(availability);
      const availabilityData = parsedAvailability.map((avail) => ({
        selectedStatus: avail.selectedStatus,
        date: avail.date,
      }));

      await new DtbAvailability({
        process_id: savedProcess._id,
        availability: availabilityData,
      }).save();
    }

    return res.status(201).json({
      success: true,
      message: "Process added successfully",
      process: savedProcess,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const addProcessAdmin = async (req, res) => {
  try {
    const {
      img1,
      img2,
      img3,
      availability,
      tags,
      user_id,
      ...otherProcessData
    } = req.body;
    const user = await User.findById(user_id);
    const parsedTags = JSON.parse(req.body.tags);
    const bucketName = process.env.AWS_BUCKET_NAME;
    const imgUrls = await Promise.all([
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `process-img1-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `process-img2-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `process-img3-${crypto.randomBytes(8).toString("hex")}.jpeg`
        ),
    ]);

    const nameScripts = convertToScripts(otherProcessData.name);
    const makerNameScripts = convertToScripts(otherProcessData.maker_name);
    const processExplanationScripts = convertToScripts(
      otherProcessData.process_explanation
    );

    const hiraganas = convertToHiragana(otherProcessData.name);
    const katakanas = convertToKatakana(otherProcessData.name);
    const fullwidthKatakana = halfwidthToFullwidthkatakana(
      otherProcessData.name
    );

    const scripts_convert = [
      { script: "Hiragana", text: hiraganas },
      { script: "Katakana", text: katakanas },
      { script: "Fullwidth Katakana", text: fullwidthKatakana },
    ];

    //Process the input for case-sens field
    console.log("Original Name:", otherProcessData.name); // Log original name
    const caseSens = processForCaseSens(otherProcessData.name);
    const casesens_maker_name = processForCaseSens(otherProcessData.maker_name);
    const casesens_process_explanation = processForCaseSens(
      otherProcessData.process_explanation
    );

    console.log("Processed case-sens:", caseSens);

    const newProcess = new DtbProcess({
      ...otherProcessData,
      tags: parsedTags,
      img1: imgUrls[0] || "",
      img2: imgUrls[1] || "",
      img3: imgUrls[2] || "",
      user: user._id,
      hiragana: hiraganas,
      katakana: katakanas,
      hiragana: hiraganas,
      katakana: katakanas,
      scripts_convert,
      name_scripts: nameScripts,
      maker_name_scripts: makerNameScripts,
      process_explanation_scripts: processExplanationScripts,
    });

    const savedProcess = await newProcess.save();

    if (availability) {
      const parsedAvailability = JSON.parse(availability);
      const availabilityData = parsedAvailability.map((avail) => ({
        selectedStatus: avail.selectedStatus,
        date: avail.date,
      }));

      await new DtbAvailability({
        process_id: savedProcess._id,
        availability: availabilityData,
      }).save();
    }

    return res.status(201).json({
      success: true,
      message: "Process added successfully",
      process: savedProcess,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getByIdProcess = async (req, res) => {
  try {
    const processId = req.params.id;
    const processWithAvailability = await DtbProcess.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(processId) },
      },
      {
        $lookup: {
          from: "dtbavailabilities",
          localField: "_id",
          foreignField: "process_id",
          as: "availability",
        },
      },
      {
        $addFields: {
          availability: {
            $ifNull: [{ $arrayElemAt: ["$availability.availability", 0] }, []],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $addFields: {
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
    ]);
    if (!processWithAvailability.length) {
      return res
        .status(404)
        .json({ success: false, error: "Process not found" });
    }
    res.status(200).json({
      success: true,
      processData: processWithAvailability[0],
    });
  } catch (error) {
    res.status(500).send("Error fetching process: " + error.message);
  }
};

export const updateProcess = async (req, res) => {
  try {
    const {
      img1,
      img2,
      img3,
      availability,
      tags,
      child_category,
      ...updatedData
    } = req.body;
    console.log("req", req);
    const parsedTags = tags && JSON.parse(req.body.tags);
    const bucketName = process.env.AWS_BUCKET_NAME;

    const imgUrls = await Promise.all([
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `process-img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `process-img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `process-img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    const processToUpdate = await DtbProcess.findById(req.params.id);

    if (!processToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Process not found",
      });
    }

    processToUpdate.set({
      ...updatedData,
      child_category,
      tags: parsedTags,
      img1: imgUrls[0] || processToUpdate.img1,
      img2: imgUrls[1] || processToUpdate.img2,
      img3: imgUrls[2] || processToUpdate.img3,
    });

    const updatedProcess = await processToUpdate.save();

    if (availability) {
      const parsedAvailability = JSON.parse(availability);
      const availabilityData = parsedAvailability.map((avail) => ({
        selectedStatus: avail.selectedStatus,
        date: avail.date,
      }));

      await DtbAvailability.findOneAndUpdate(
        { process_id: updatedProcess._id },
        { availability: availabilityData },
        { upsert: true, new: true }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Process updated successfully",
      process: updatedProcess,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProcessesByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    /*  Get the page parameter from the URL, default to 1 if not provided */
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 5; /*  Set the desired number of items per page   */

    /* Find processes for the user with pagination */
    const skip = (page - 1) * pageSize;
    const processes = await DtbProcess.find({ user: userId })
      .skip(skip)
      .limit(pageSize);

    /* Count the total number of processes for the user */
    const totalProcesses = await DtbProcess.countDocuments({ user: userId });

    /* Get processIds for availability query */
    const processIds = processes.map((process) => process._id);

    /* Find availability for the processes */
    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    /* Combine processes and availability based on process_id */
    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    res.status(200).json({
      success: true,
      data: processesWithAvailability,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProcesses / pageSize),
        totalItems: totalProcesses,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send("Error fetching processes and availability: " + error.message);
  }
};

export const getProcessesByUserWithReleaseStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    /*  Get the page parameter from the URL, default to 1 if not provided */
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 5; /*  Set the desired number of items per page   */

    /* Find processes for the user with pagination */
    const skip = (page - 1) * pageSize;
    const processes = await DtbProcess.find({ user: userId, status: "release" })
      .skip(skip)
      .limit(pageSize);

    /* Count the total number of processes for the user */
    const totalProcesses = await DtbProcess.countDocuments({
      user: userId,
      status: "release",
    });

    /* Get processIds for availability query */
    const processIds = processes.map((process) => process._id);

    /* Find availability for the processes */
    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    /* Combine processes and availability based on process_id */
    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    res.status(200).json({
      success: true,
      data: processesWithAvailability,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProcesses / pageSize),
        totalItems: totalProcesses,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send("Error fetching processes and availability: " + error.message);
  }
};

export const getProcessesByUserWithPrivateStatus = async (req, res) => {
  try {
    const userId = req.user._id;

    /*  Get the page parameter from the URL, default to 1 if not provided */
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 5; /*  Set the desired number of items per page   */

    console.log(page, pageSize);

    /* Find processes for the user with pagination */
    const skip = (page - 1) * pageSize;
    const processes = await DtbProcess.find({ user: userId, status: "private" })
      .skip(skip)
      .limit(pageSize);

    /* Count the total number of processes for the user */
    const totalProcesses = await DtbProcess.countDocuments({
      user: userId,
      status: "private",
    });

    /* Get processIds for availability query */
    const processIds = processes.map((process) => process._id);

    /* Find availability for the processes */
    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    /* Combine processes and availability based on process_id */
    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    res.status(200).json({
      success: true,
      data: processesWithAvailability,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProcesses / pageSize),
        totalItems: totalProcesses,
      },
    });
  } catch (error) {
    res
      .status(500)
      .send("Error fetching processes and availability: " + error.message);
  }
};

export const changeProcessStatus = async (req, res) => {
  try {
    const { processId, status } = req.body;
    console.log(processId, status);
    const process = await DtbProcess.findById(processId, { status });
    if (!process) {
      return res.status(404).json({
        success: false,
        message: "Process not found",
      });
    }
    if (process.status === "release") {
      process.status = "private";
      await process.save();
    } else if (process.status === "private") {
      process.status = "release";
      await process.save();
    }
    return res.status(200).json({
      success: true,
      message: "Process status updated successfully",
      process,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const totalProcessCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const AllProcessesCount = await DtbProcess.countDocuments({ user: userId });
    const ReleaseProcessesCount = await DtbProcess.countDocuments({
      user: userId,
      status: "release",
    });
    const PrivateProcessesCount = await DtbProcess.countDocuments({
      user: userId,
      status: "private",
    });
    return res.status(200).json({
      success: true,
      processCount: {
        totalProcesses: AllProcessesCount,
        releaseProcesses: ReleaseProcessesCount,
        privateProcesses: PrivateProcessesCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addProcessWithTransactions = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { img1, img2, img3, availability, tags, ...otherProcessData } =
      req.body;
    const bucketName = process.env.AWS_BUCKET_NAME;
    const userId = req.user._id;

    const imgUrls = await Promise.all([
      img1 &&
        uploadBase64ImageToS3(
          img1,
          bucketName,
          `process-img1-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img2 &&
        uploadBase64ImageToS3(
          img2,
          bucketName,
          `process-img2-${crypto.randomBytes(8).toString("hex")}.png`
        ),
      img3 &&
        uploadBase64ImageToS3(
          img3,
          bucketName,
          `process-img3-${crypto.randomBytes(8).toString("hex")}.png`
        ),
    ]);

    // Create a new process
    const newProcess = new DtbProcess({
      ...otherProcessData,
      img1: imgUrls[0] || "",
      img2: imgUrls[1] || "",
      img3: imgUrls[2] || "",
      user: userId,
    });

    const savedProcess = await newProcess.save({ session });

    if (availability && Array.isArray(availability)) {
      await Promise.all(
        availability.map((avail) => {
          return new DtbAvailability({
            process_id: savedProcess._id,
            status: avail.status,
            availability_date: avail.date,
          }).save({ session });
        })
      );
    }

    if (tags && Array.isArray(tags)) {
      await Promise.all(
        tags.map(async (tagName) => {
          let tag = await DtbTagword.findOne({ tagword_name: tagName }, null, {
            session,
          });
          if (!tag) {
            tag = await new DtbTagword({ tagword_name: tagName }).save({
              session,
            });
          }
          return new DtbTagwordConfig({
            process_id: savedProcess._id,
            tagword_id: tag._id,
            tagword_use_flg: 1,
          }).save({ session });
        })
      );
    }

    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Process added successfully",
      process: savedProcess,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProcessesAndAvailability = async (req, res) => {
  try {
    const userId = req.user._id;

    // Find user information
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    /* Find processes for the user */
    const processes = await DtbProcess.find({ user: userId });

    /* Get processIds for availability query */
    const processIds = processes.map((process) => process._id);

    /* Find availability for the processes */
    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    /* Combine processes and availability based on process_id */
    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    res.status(200).json({
      success: true,
      data: {
        user: user.toObject(),
        processesWithAvailability,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message:
        "Error fetching user information, processes, and availability: " +
        error.message,
    });
  }
};

export const getAllDataWithPagination = async (req, res) => {
  try {
    /* Get the page parameter from the URL, default to 1 if not provided */
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 12; /* Set the desired number of items per page */

    console.log(page, pageSize);

    // Find all processes with pagination
    const skip = (page - 1) * pageSize;
    const processes = await DtbProcess.find({ status: "release" })
      .skip(skip)
      .limit(pageSize);

    // Count the total number of processes
    const totalProcesses = await DtbProcess.countDocuments();

    // Get processIds for availability query
    const processIds = processes.map((process) => process._id);

    // Find availability for the processes
    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    // Combine processes and availability based on process_id
    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    res.status(200).json({
      success: true,
      data: processesWithAvailability,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProcesses / pageSize),
        totalItems: totalProcesses,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching data: " + error.message,
    });
  }
};

export const getUserAndProcessData = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await DtbUser.findById(userId, { password: 0 }).exec();
    console.log(user);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;

    const skip = (page - 1) * pageSize;
    const processes = await DtbProcess.find({ user }).populate("user").exec();

    const totalProcesses = processes?.length;

    const processIds = processes.map((process) => process._id);

    const availability = await DtbAvailability.find({
      process_id: { $in: processIds },
    });

    const processesWithAvailability = processes.map((process) => {
      const processAvailability = availability.find(
        (item) => item.process_id.toString() === process._id.toString()
      );
      return {
        ...process.toObject(),
        availability: processAvailability
          ? processAvailability.availability
          : [],
      };
    });

    const paginatedProcesses = processesWithAvailability.slice(
      skip,
      skip + pageSize
    );

    res.status(200).json({
      success: true,
      user,
      processes: paginatedProcesses,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalProcesses / pageSize),
        totalItems: totalProcesses,
      },
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getRecommendedProcesses = async (req, res) => {
  try {
    /* Aggregate to get top 5 processes with availability */
    const top6RecommendedProcesses = await DtbProcess.aggregate([
      {
        $lookup: {
          from: "dtbavailabilities",
          localField: "_id",
          foreignField: "process_id",
          as: "availability",
        },
      },
      {
        $match: {
          "availability.availability.selectedStatus": "Vacancies",
        },
      },
      {
        $limit: 12,
      },
    ]);

    const processCounts = await DtbProcess.aggregate([
      {
        $lookup: {
          from: "dtbavailabilities",
          localField: "_id",
          foreignField: "process_id",
          as: "availability",
        },
      },
      {
        $project: {
          _id: 1,
          count: {
            $cond: {
              if: { $isArray: "$availability" },
              then: { $size: "$availability.availability" },
              else: 0,
            },
          },
        },
      },
    ]);

    res.json({
      data: top6RecommendedProcesses,
      counts: processCounts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Utility function to convert Chinese numerals
function convertChineseNumerals(keyword) {
  const numeralMapping = {
    一: "1",
    二: "2",
    三: "3",
    四: "4",
    五: "5",
    六: "6",
    七: "7",
    八: "8",
    九: "9",
    十: "10",
    十一: "11",
    十二: "12",
    十三: "13",
    十四: "14",
    十五: "15",
    十六: "16",
    十七: "17",
    十八: "18",
    十九: "19",
    二十: "20",
    三十: "30",
    四十: "40",
    五十: "50",
    六十: "60",
    七十: "70",
    八十: "80",
    九十: "90",
  };

  return keyword
    .split("")
    .map((char) => numeralMapping[char] || char)
    .join("");
}

function normalizeSearchTerm(term) {
  // Convert fullwidth numbers to halfwidth
  term = term.replace(/[\uFF10-\uFF19]/g, (char) => {
    return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
  });

  // Convert half-width Katakana to full-width Katakana
  term = term.replace(/[\uFF61-\uFF9F]/g, (char) => {
    const fullWidth = String.fromCharCode(char.charCodeAt(0) - 0xff61 + 0x30a1);
    return fullWidth;
  });

  // Convert full-width Katakana to half-width Katakana
  term = term.replace(/[\u30A1-\u30F6]/g, (char) => {
    const halfWidth = String.fromCharCode(char.charCodeAt(0) - 0x30a1 + 0xff61);
    return halfWidth;
  });

  // Normalize spaces to a single type (preferably standard spaces)
  term = term.replace(/[\u3000]/g, " "); // Convert full-width spaces to standard spaces

  return term;
}

export const searchProcessesTest = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      keyword,
      cat,
      subCat,
      pref,
      mun,
      page,
      pageSize,
    } = req.body;

    console.log("body", req.body);

    const currentPage = page ? parseInt(page) : 1;
    const itemsPerPage = pageSize ? parseInt(pageSize) : 12;

    const skip = (currentPage - 1) * itemsPerPage;

    const query = {};

    let availabilityStartDate;
    let availabilityEndDate;

    if (startDate && endDate) {
      availabilityStartDate = new Date(startDate);
      availabilityEndDate = new Date(endDate);
    } else if (startDate && !endDate) {
      availabilityStartDate = new Date(startDate);
    } else if (endDate && !startDate) {
      availabilityEndDate = new Date(endDate);
    } else {
      const ninetyDaysAgo = new Date();
      ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
      availabilityStartDate = ninetyDaysAgo;
      availabilityEndDate = new Date();
    }

    if (startDate && endDate) {
      const availabilityRecords = await DtbAvailability.find({
        "availability.date": {
          $gte: availabilityStartDate,
          $lte: availabilityEndDate,
        },
      });

      const processIds = availabilityRecords.map((record) => record.process_id);

      query._id = { $in: processIds };
    }

    if (startDate && !endDate) {
      const availabilityRecords = await DtbAvailability.find({
        "availability.date": {
          $gte: availabilityStartDate,
        },
      });

      const processIds = availabilityRecords.map((record) => record.process_id);

      query._id = { $in: processIds };
    }

    if (!startDate && endDate) {
      const availabilityRecords = await DtbAvailability.find({
        "availability.date": {
          $lte: availabilityEndDate,
        },
      });

      const processIds = availabilityRecords.map((record) => record.process_id);

      query._id = { $in: processIds };
    }

    function normalizeSearchTerm(term) {
      // Convert fullwidth numbers to halfwidth
      term = term.replace(/[\uFF10-\uFF19]/g, (char) => {
        return String.fromCharCode(char.charCodeAt(0) - 0xfee0);
      });

      // Convert half-width Katakana to full-width Katakana
      term = term.replace(/[\uFF61-\uFF9F]/g, (char) => {
        const fullWidth = String.fromCharCode(
          char.charCodeAt(0) - 0xff61 + 0x30a1
        );
        return fullWidth;
      });

      // Convert full-width Katakana to half-width Katakana
      term = term.replace(/[\u30A1-\u30F6]/g, (char) => {
        const halfWidth = String.fromCharCode(
          char.charCodeAt(0) - 0x30a1 + 0xff61
        );
        return halfWidth;
      });

      // Normalize spaces to a single type (preferably standard spaces)
      term = term.replace(/[\u3000]/g, " "); // Convert full-width spaces to standard spaces

      return term;
    }

    if (keyword) {
      const convertedKeyword = convertChineseNumerals(keyword);
      const normalizedKeyword = normalizeSearchTerm(convertedKeyword);
      //const searchRegexs = new RegExp(normalizedKeywordss, 'i');
      // Create a case-insensitive regex for the normalized keyword
      const searchRegex = new RegExp(normalizedKeyword, "i");
      const halfWidthKeyword = normalizeSearchTerm(keyword); // Converts to half-width for thorough searching
      const halfWidthRegex = new RegExp(halfWidthKeyword, "i");
      const regexPattern = new RegExp("^" + keyword + "$", "i");

      const users = await DtbUser.find({ $text: { $search: keyword } });
      const userIds = users.map((user) => user._id);

      query.$or = [
        { name: { $regex: new RegExp(keyword.replace(/\s+/g, ""), "i") } },
        { name: { $regex: `${keyword}`, $options: "i" } },
        { maker_name: { $regex: `${keyword}`, $options: "i" } },
        {
          "scripts_convert.text": {
            $regex: new RegExp(
              ".*" + keyword.replace(/\s+/g, "").toLowerCase() + ".*",
              "i"
            ),
          },
        },
        { status: { $regex: keyword } },
        {
          "name_scripts.text": {
            $regex: new RegExp(
              ".*" + keyword.replace(/\s+/g, "").toLowerCase() + ".*",
              "i"
            ),
          },
        },
        { scripts_convert: { $elemMatch: { text: { $regex: keyword } } } },
        { "maker_name_scripts.text": { $regex: searchRegex } },
        { "process_explanation_scripts.text": { $regex: searchRegex } },
        { process_explanation: { $regex: `${keyword}`, $options: "i" } },
        { tags: { $regex: `${keyword}`, $options: "i" } },
        { user: { $in: userIds } },
      ];

      const foundKeyword = await Keyword.findOneAndUpdate(
        { tagword_name: keyword },
        { $inc: { count: 1 } },
        { upsert: true }
      );
      if (!foundKeyword) {
        await Keyword.create({ tagword_name: keyword, count: 1 });
      }
    }

    if (cat) {
      if (cat.includes(",")) {
        const catArr = cat.split(",");
        query.parent_category = { $in: catArr };
      } else {
        if (cat.length > 0) query.parent_category = cat;
      }
    }

    if (subCat) {
      if (subCat.includes(",")) {
        const subCatArr = subCat.split(",");
        query.child_category = { $in: subCatArr };
      } else {
        if (subCat.length > 0) query.child_category = subCat;
      }
    }

    if (pref) {
      if (pref.includes(",")) {
        const prefArr = pref.split(",");
        query.pref = { $in: prefArr };
      } else {
        if (pref.length > 0) query.pref = pref;
      }
    }

    if (mun) {
      if (mun.includes(",")) {
        const munArr = mun.split(",");
        query.mun = { $in: munArr };
      } else {
        if (mun.length > 0) query.mun = mun;
      }
    }

    query.status = "release";

    const totalItems = await DtbProcess.countDocuments(query);

    console.log("query", query);

    const searchResult = await DtbProcess.find(query)
      .skip(skip)
      .limit(itemsPerPage)
      .populate("user");

    const responseData = await Promise.all(
      searchResult.map(async (process) => {
        const singleAvailability = await DtbAvailability.findOne({
          process_id: process._id,
        });

        const availabilityRecords = await DtbAvailability.find({
          process_id: process._id,
        });

        const totalPoints = availabilityRecords.reduce((acc, record) => {
          if (record.availability && record.availability.length > 0) {
            acc += record.availability.reduce((points, avail) => {
              const availabilityDate = new Date(avail.date);
              if (
                availabilityDate >= availabilityStartDate &&
                availabilityDate <= availabilityEndDate
              ) {
                if (avail.selectedStatus === "Vacancies") {
                  return points + 4;
                } else if (avail.selectedStatus === "Consultation Required") {
                  return points + 2;
                } else if (avail.selectedStatus === "Adjustable") {
                  return points + 1;
                } else {
                  return points;
                }
              } else {
                return points;
              }
            }, 0);
          }
          return acc;
        }, 0);

        return {
          availability: singleAvailability.availability,
          process,
          totalPoints,
        };
      })
    );

    responseData.sort((a, b) => b.totalPoints - a.totalPoints);

    res.status(200).json({
      success: true,
      data: responseData,
      pagination: {
        currentPage: currentPage,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        totalItems: totalItems,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProcessesAdmin = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  try {
    const processes = await DtbProcess.find()
      .skip(skip)
      .limit(limit)
      .populate("user");

    const totalCount = await DtbProcess.countDocuments({});

    const processesWithCategories = await Promise.all(
      processes.map(async (process) => {
        const parent_category = await Category.findOne({
          category_id: process.parent_category,
        });
        const child_category = await Category.findOne({
          category_id: process.child_category,
        });
        return {
          ...process._doc,
          parent_category: parent_category?.category_name,
          child_category: child_category?.category_name,
        };
      })
    );

    console.log("processesWithCategories", processesWithCategories);

    return res.status(200).json({
      success: true,
      data: processesWithCategories,
      pagination: {
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        totalProcesses: totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const AdvanceSearchProcesses = async (req, res) => {
  try {
    const { keyword, cat, subCat, startDate, endDate, page, pageSize } =
      req.query;
    const currentPage = page ? parseInt(page) : 1;
    const itemsPerPage = pageSize ? parseInt(pageSize) : 12;

    const matchConditions = {};

    if (keyword) {
      matchConditions.$or = [
        { "process.name": { $regex: new RegExp(keyword, "i") } },
        { "process.maker_name": { $regex: new RegExp(keyword, "i") } },
        { "process.process_explanation": { $regex: new RegExp(keyword, "i") } },
        { "process.tags": { $regex: new RegExp(keyword, "i") } },
      ];
    }

    if (cat) {
      matchConditions["process.parent_category"] = {
        $regex: new RegExp(cat, "i"),
      };
    }

    if (subCat) {
      matchConditions["process.child_category"] = {
        $regex: new RegExp(subCat, "i"),
      };
    }

    if (startDate && endDate) {
      matchConditions["availability.date"] = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const pipeline = [
      {
        $lookup: {
          from: "dtb_processes",
          localField: "process_id",
          foreignField: "_id",
          as: "process",
        },
      },
      { $unwind: "$process" },
      { $match: matchConditions },
      {
        $group: {
          _id: null,
          totalCount: { $sum: 1 },
          data: {
            $push: {
              process: {
                _id: "$process._id",
                name: "$process.name",
                maker_name: "$process.maker_name",
                parent_category: "$process.parent_category",
                sub_category: "$process.child_category", // Include sub_category in the result
              },
              availability: "$availability",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalCount: 1,
          data: {
            $slice: ["$data", (currentPage - 1) * itemsPerPage, itemsPerPage],
          },
        },
      },
    ];

    const result = await DtbAvailability.aggregate(pipeline);

    // Log input parameters

    // Log search result

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: {
          currentPage: currentPage,
          totalPages: 0,
          itemsPerPage: itemsPerPage,
        },
      });
    }

    const { totalCount, data } = result[0];
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.status(200).json({
      success: true,
      data: data,
      pagination: {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const searchProcesses = async (req, res) => {
  try {
    const {
      startDate,
      endDate,
      keyword,
      page,
      pageSize,
      cat,
      subCat,
      pref,
      mun,
    } = req.query;

    /* Set default values for page and pageSize if not provided */
    const currentPage = page ? parseInt(page) : 1;
    const itemsPerPage = pageSize ? parseInt(pageSize) : 12; // Adjusted to 12 per page

    const matchConditions = {};

    if (
      keyword ||
      (mun && Array.isArray(mun) && mun.length > 0) ||
      (pref && Array.isArray(pref) && pref.length > 0)
    ) {
      matchConditions.$or = [];

      if (keyword) {
        matchConditions.$or.push(
          { "process.name": { $regex: new RegExp(keyword, "i") } },
          { "process.maker_name": { $regex: new RegExp(keyword, "i") } },
          {
            "process.process_explanation": { $regex: new RegExp(keyword, "i") },
          },
          { "process.tags": { $regex: new RegExp(keyword, "i") } }
        );
      }

      if (mun && Array.isArray(mun) && mun.length > 0) {
        matchConditions.$or.push(
          ...mun.map((municipality) => ({
            "process.mun": { $regex: new RegExp(municipality, "i") },
          }))
        );
      }
    }

    if (startDate && endDate) {
      const formattedStartDate = new Date(startDate); // Convert startDate to Date object
      const formattedEndDate = new Date(endDate); // Convert endDate to Date object
      console.log(formattedStartDate, "**");
      matchConditions.availability = {
        $elemMatch: {
          date: {
            $gte: formattedStartDate,
            $lte: formattedEndDate,
          },
          selectedStatus: { $nin: ["", "No Vacancies"] },
        },
      };
    }

    // if (cat) {
    //   matchConditions["process.parent_category"] = {
    //     $regex: new RegExp(`^${cat}$`, "i"),
    //   };
    // }

    if (subCat) {
      matchConditions["process.child_category"] = {
        $regex: new RegExp(`^${subCat}$`, "i"),
      };
    }

    if (pref && Array.isArray(pref) && pref.length > 0) {
      matchConditions.$or.push(
        ...pref.map((prefecture) => ({
          "process.pref": { $regex: new RegExp(prefecture, "i") },
        }))
      );
    }

    if (cat) {
      const categoriesArray = Array.isArray(cat) ? cat : [cat]; // Ensure categories is always an array
      console.log("Constructing category regex queries...");
      matchConditions["process.parent_category"] = { $in: categoriesArray };
    }

    // Add the $match stage to filter by process status
    matchConditions["process.status"] = "release";

    const result = await DtbAvailability.aggregate(
      [
        {
          $lookup: {
            from: "dtb_processes",
            localField: "process_id",
            foreignField: "_id",
            as: "process",
          },
        },
        { $unwind: "$process" },
        {
          $lookup: {
            from: "users",
            localField: "process.user",
            foreignField: "_id",
            as: "process.user",
          },
        },
        { $unwind: "$process.user" },
        { $match: matchConditions },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            data: {
              $push: {
                process: {
                  _id: "$process._id",
                  img1: "$process.img1",
                  img2: "$process.img2",
                  img3: "$process.img3",
                  name: "$process.name",
                  maker_name: "$process.maker_name",
                  tags: "$process.tags",
                  process_explanation: "$process.process_explanation",
                  capacity: "$process.capacity",
                  pref: "$process.pref",
                  delivery_date: "$process.delivery_date",
                  status: "$process.status",
                  user: "$process.user",
                },
                availability: "$availability",
                totalPoints: {
                  $add: [
                    {
                      $multiply: [
                        {
                          $size: {
                            $filter: {
                              input: "$availability",
                              as: "availabilityItem",
                              cond: {
                                $eq: [
                                  "$$availabilityItem.selectedStatus",
                                  "Vacancies",
                                ],
                              },
                            },
                          },
                        },
                        4,
                      ],
                    },
                    {
                      $multiply: [
                        {
                          $size: {
                            $filter: {
                              input: "$availability",
                              as: "availabilityItem",
                              cond: {
                                $eq: [
                                  "$$availabilityItem.selectedStatus",
                                  "Adjustable",
                                ],
                              },
                            },
                          },
                        },
                        1,
                      ],
                    },
                    {
                      $multiply: [
                        {
                          $size: {
                            $filter: {
                              input: "$availability",
                              as: "availabilityItem",
                              cond: {
                                $eq: [
                                  "$$availabilityItem.selectedStatus",
                                  "Consultation Required",
                                ],
                              },
                            },
                          },
                        },
                        2,
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          $unwind: "$data",
        },
        {
          $sort: {
            "data.totalPoints": -1, // Sort in descending order based on totalPoints
          },
        },
        {
          $group: {
            _id: null,
            totalCount: { $first: "$totalCount" },
            data: { $push: "$data" },
          },
        },
        {
          $project: {
            _id: 0,
            totalCount: 1,
            data: {
              $slice: ["$data", (currentPage - 1) * itemsPerPage, itemsPerPage],
            },
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );

    if (result.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: {
          currentPage: currentPage,
          totalPages: 0,
          itemsPerPage: itemsPerPage,
        },
      });
    }

    if (keyword) {
      let existingKeyword = await KeyWord.findOne({ tagword_name: keyword });

      if (existingKeyword) {
        existingKeyword.count++;
        await existingKeyword.save();
      } else {
        const newKeyword = new KeyWord({
          tagword_name: keyword,
          count: 1,
          del_flg: 0,
        });
        await newKeyword.save();
      }
    }

    const { totalCount, data } = result[0];
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    res.status(200).json({
      success: true,
      data: data,
      pagination: {
        currentPage: currentPage,
        totalPages: totalPages,
        totalItems: totalCount,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getTopKeywordsLast30Days = async (req, res) => {
  try {
    // Calculate the date 30 days ago from today
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Aggregate query to find top 7 non-empty keywords based on count in the last 30 days
    const topKeywordsResult = await Keyword.aggregate([
      {
        $match: {
          $and: [
            { updatedAt: { $gte: thirtyDaysAgo } }, // Updated within last 30 days
            { updatedAt: { $lte: new Date() } }, // Updated before or equal to today's date
          ],
        },
      },
      {
        $group: {
          _id: "$tagword_name",
          count: { $sum: "$count" },
        },
      },
      {
        $match: {
          $and: [
            { count: { $gt: 0 } }, // Exclude documents with count of 0 (empty keywords)
            { _id: { $ne: " " } }, // Exclude documents with empty tagword_name (spaces only)
          ],
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 7,
      },
    ]);

    res.status(200).json({
      success: true,
      data: topKeywordsResult,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
