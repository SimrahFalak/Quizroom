import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDFFromElement = async (
  element: HTMLElement,
  filename: string
) => {
  try {
    // Create canvas from HTML element
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 297; // A4 landscape width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    // Add image to PDF, creating new pages as needed
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= 210; // A4 landscape height

    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 210;
    }

    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

export const generateTablePDF = (
  title: string,
  headers: string[],
  rows: any[][],
  filename: string,
  metadata?: {
    courseName?: string;
    instructorName?: string;
    quizName?: string;
  }
) => {
  const pdf = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  let startY = 15;

  // Add title
  pdf.setFontSize(16);
  pdf.text(title, 15, startY);
  startY += 8;

  // Add metadata if provided
  if (metadata) {
    pdf.setFontSize(11);
    if (metadata.quizName) {
      pdf.text(`Quiz: ${metadata.quizName}`, 15, startY);
      startY += 6;
    }
    if (metadata.courseName) {
      pdf.text(`Course: ${metadata.courseName}`, 15, startY);
      startY += 6;
    }
    if (metadata.instructorName) {
      pdf.text(`Instructor: ${metadata.instructorName}`, 15, startY);
      startY += 6;
    }
  }

  // Add date
  pdf.setFontSize(10);
  pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 15, startY + 4);

  // Create table
  const tableData = [
    headers,
    ...rows,
  ];

  const col = headers.length;
  const tableStartY = startY + 12;
  const cellWidth = (297 - 30) / col; // A4 landscape width minus margins
  const cellHeight = 8;
  let currentY = tableStartY;

  // Draw headers
  pdf.setFontSize(11);
  pdf.setFillColor(108, 78, 255); // Purple color
  pdf.setTextColor(255, 255, 255); // White text

  headers.forEach((header, i) => {
    pdf.rect(15 + i * cellWidth, currentY, cellWidth, cellHeight, 'F');
    pdf.text(header, 15 + i * cellWidth + 2, currentY + 6, { maxWidth: cellWidth - 4 });
  });

  currentY += cellHeight;

  // Draw rows
  pdf.setFontSize(10);
  pdf.setTextColor(0, 0, 0);

  rows.forEach((row, rowIdx) => {
    // Check if we need a new page
    if (currentY > 250) {
      pdf.addPage();
      currentY = 20;

      // Redraw headers on new page
      pdf.setFontSize(11);
      pdf.setFillColor(108, 78, 255);
      pdf.setTextColor(255, 255, 255);

      headers.forEach((header, i) => {
        pdf.rect(15 + i * cellWidth, currentY, cellWidth, cellHeight, 'F');
        pdf.text(header, 15 + i * cellWidth + 2, currentY + 6, { maxWidth: cellWidth - 4 });
      });

      currentY += cellHeight;
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
    }

    // Add alternating background colors
    if (rowIdx % 2 === 0) {
      pdf.setFillColor(245, 245, 245);
      pdf.rect(15, currentY, (col) * cellWidth, cellHeight, 'F');
    }

    row.forEach((cell, i) => {
      const cellText = String(cell ?? '');
      pdf.text(cellText, 15 + i * cellWidth + 2, currentY + 6, { maxWidth: cellWidth - 4 });
    });

    currentY += cellHeight;
  });

  pdf.save(filename);
};
