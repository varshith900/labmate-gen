interface FormData {
  studentName: string;
  rollNumber: string;
  department: string;
  subject: string;
  date: string;
  experimentNumber: string;
  aim: string;
  tools: string;
  theory: string;
  code: string;
  output: string;
  conclusion: string;
}

export const exportToWord = (formData: FormData) => {
  const content = `
LABORATORY RECORD

Student Details:
Name: ${formData.studentName}
Roll Number: ${formData.rollNumber}
Department: ${formData.department}
Subject: ${formData.subject}
Date: ${new Date(formData.date).toLocaleDateString()}
Experiment Number: ${formData.experimentNumber}

AIM:
${formData.aim}

${formData.tools ? `TOOLS/SOFTWARE REQUIRED:\n${formData.tools}\n\n` : ""}
${formData.theory ? `THEORY:\n${formData.theory}\n\n` : ""}
${formData.code ? `CODE:\n${formData.code}\n\n` : ""}
${formData.output ? `OUTPUT:\n${formData.output}\n\n` : ""}
${formData.conclusion ? `CONCLUSION:\n${formData.conclusion}` : ""}
  `.trim();

  const blob = new Blob([content], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Lab_Record_${formData.experimentNumber}_${formData.studentName}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportToPDF = (formData: FormData) => {
  const printWindow = window.open("", "_blank");
  if (!printWindow) return;

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Lab Record - ${formData.experimentNumber}</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
      line-height: 1.6;
      color: #1e293b;
    }
    h1 {
      text-align: center;
      color: #2563eb;
      border-bottom: 3px solid #2563eb;
      padding-bottom: 10px;
      margin-bottom: 30px;
    }
    .details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      background: #f1f5f9;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
    }
    .detail-item {
      padding: 8px 0;
    }
    .detail-label {
      font-weight: 600;
      color: #64748b;
      font-size: 14px;
    }
    .detail-value {
      color: #1e293b;
      font-size: 16px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 18px;
      font-weight: 700;
      color: #2563eb;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-bottom: 15px;
    }
    .section-content {
      font-size: 15px;
      white-space: pre-wrap;
      line-height: 1.7;
    }
    .code-block {
      background: #1e293b;
      color: #e2e8f0;
      padding: 20px;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      overflow-x: auto;
      white-space: pre;
    }
    .footer {
      margin-top: 50px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #64748b;
      font-size: 12px;
    }
    @media print {
      body { padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <h1>Laboratory Record</h1>
  
  <div class="details">
    <div class="detail-item">
      <div class="detail-label">Student Name</div>
      <div class="detail-value">${formData.studentName}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Roll Number</div>
      <div class="detail-value">${formData.rollNumber}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Department</div>
      <div class="detail-value">${formData.department}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Subject</div>
      <div class="detail-value">${formData.subject}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Date</div>
      <div class="detail-value">${new Date(formData.date).toLocaleDateString()}</div>
    </div>
    <div class="detail-item">
      <div class="detail-label">Experiment Number</div>
      <div class="detail-value">${formData.experimentNumber}</div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Aim</div>
    <div class="section-content">${formData.aim}</div>
  </div>

  ${formData.tools ? `
  <div class="section">
    <div class="section-title">Tools/Software Required</div>
    <div class="section-content">${formData.tools}</div>
  </div>
  ` : ""}

  ${formData.theory ? `
  <div class="section">
    <div class="section-title">Theory</div>
    <div class="section-content">${formData.theory}</div>
  </div>
  ` : ""}

  ${formData.code ? `
  <div class="section">
    <div class="section-title">Code</div>
    <pre class="code-block">${formData.code}</pre>
  </div>
  ` : ""}

  ${formData.output ? `
  <div class="section">
    <div class="section-title">Output</div>
    <div class="section-content">${formData.output}</div>
  </div>
  ` : ""}

  ${formData.conclusion ? `
  <div class="section">
    <div class="section-title">Conclusion</div>
    <div class="section-content">${formData.conclusion}</div>
  </div>
  ` : ""}

  <div class="footer">
    Generated on ${new Date().toLocaleString()}
  </div>
</body>
</html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.print();
  };
};
