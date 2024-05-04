// components/PDFGenerator.js

import jsPDF from 'jspdf';

const PDFGenerator = ({ htmlString }) => {
  const generatePDF = () => {
    console.log(htmlString)
    const doc = new jsPDF();
    // const htmlString = "<h1 style='color: black;'>Hello, world!</h1><p style='color: black;'>This is a sample HTML string with black text.</p>";


    // doc.html(htmlString).then(() => doc.save('fileName.pdf'));

    doc.html(htmlString, {
      callback: () => {
          // Save the PDF
          doc.save("converted.pdf");
      }
  });

    // doc.fromHTML('<h1>Hello world!</h1>', 10, 10);
    // doc.save('example.pdf');
  };

  return (
    <div>
      <button className='text-white' onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default PDFGenerator;
