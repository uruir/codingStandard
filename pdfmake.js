var fonts = {
  Roboto: {
    normal: './node_modules/pdfmake/src/fonts/msyh.ttf',
    bold: './node_modules/pdfmake/src/fonts/msyh.ttf',
    italics: './node_modules/pdfmake/src/fonts/msyh.ttf',
    bolditalics: './node_modules/pdfmake/src/fonts/msyh.ttf'
  }
};

var PdfPrinter = require('./node_modules/pdfmake/src/printer');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

var docDefinition = {
  content: [
    {text: "离婚协议书模板", style: "header"},
    '买方：涂睿，男，1988 年生，现住深圳，身份证：123',
    '卖方：蜘蛛众筹',
    {text: '这是合同正文。', margin: [28, 0, 0, 0]},
    {
      ol: [
        '条款一',
        '条款二',
        '条款三'
      ]
    },
    {text: '本《离婚协议书》自婚姻登记机关颁发《离婚证》之日起生效。', margin: [28, 0, 0, 0]},
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true,
      margin: [0, 0, 0, 10]
    },
    subheader: {
      fontSize: 16,
      bold: true,
      margin: [0, 10, 0, 5]
    },
    tableExample: {
      margin: [0, 5, 0, 15]
    },
    tableHeader: {
      bold: true,
      fontSize: 13,
      color: 'black'
    }
  },
  defaultStyle: {
    alignment: 'justify'
  }
};

var pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream('./test/tables.pdf'));
pdfDoc.end();
