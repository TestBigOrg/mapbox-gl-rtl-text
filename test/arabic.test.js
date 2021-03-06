'use strict'

var tap = require('tap');
var icu = require('../index');

/* The arabic text in results may appear to be backwards
   This is because whatever you're viewing the text with is
   applying the bidirectional algorithm a second time. */

/* Although they may look the same as input in your viewer, the
   characters in the test results are "presentation forms" of
   the characters. */

// Numbers and letters
tap.equal(
    icu.applyArabicShaping("سلام۳۹"),
    "ﺳﻼﻡ۳۹"
);

// Mixed numbers (left-to-right) with letters (right-to-left)
tap.same(
    icu.processBidirectionalText(
        icu.applyArabicShaping("سلام۳۹"), []),
    ["۳۹ﻡﻼﺳ"]
);

tap.equal(
    icu.applyArabicShaping("مكتبة الإسكندرية‎‎ Maktabat al-Iskandarīyah"),
    "ﻣﻜﺘﺒﺔ ﺍﻹﺳﻜﻨﺪﺭﻳﺔ‎‎ Maktabat al-Iskandarīyah"
);

tap.same(
    icu.processBidirectionalText(
        icu.applyArabicShaping("مكتبة الإسكندرية‎‎ Maktabat al-Iskandarīyah"),
        []),
    [" Maktabat al-Iskandarīyahﺔﻳﺭﺪﻨﻜﺳﻹﺍ ﺔﺒﺘﻜﻣ"]
);

// Line breaking with bidirectional text
tap.same(
    icu.processBidirectionalText(
        icu.applyArabicShaping("مكتبة الإسكندرية‎‎ Maktabat al-Iskandarīyah"),
        [18, 30]),
    [" ﺔﻳﺭﺪﻨﻜﺳﻹﺍ ﺔﺒﺘﻜﻣ", "Maktabat al-", "Iskandarīyah"]
);

// "Tashkeel" functionality
tap.equal(
    icu.applyArabicShaping("اليَمَن‎‎"),
    "ﺍﻟﻴﹷﻤﹷﻦ‎‎"
);
