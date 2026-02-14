import *as XLSX from 'xlsx';
import autoTable from 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export function exportPDF(tableHeader:any,screenName:any,pageHeader:any,rows:any){
    let header=tableHeader
    var img = new Image();
    img.src = 'assets/logo1.png'
    let doc = new jsPDF('p', 'mm', 'A4')
    let col: any = [];
    col = [header];
    doc.setFillColor(255, 128,0);
    doc.rect(5, 24, 200, 8, "F");
    doc.setFontSize(14); 
    doc.text(pageHeader, 86, 30);
    doc.addImage(img, 'gif', 170, 5, 30, 15);
    autoTable(doc, {
      head: col,
      body: rows,
      showHead: "everyPage",
      startY: 35,
      margin: {right:5,left:5},
      tableWidth: 'auto',
      didDrawPage: (dataArg) => {
 
        doc.text('', dataArg.settings.margin.left, 20);
 
      }
    });
    doc.save(screenName + '.pdf');
}

