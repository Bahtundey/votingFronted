export default function exportCSV(data, filename = "export.csv") {
    if (!Array.isArray(data) || data.length === 0) {
      console.warn("exportCSV: No data provided");
      return;
    }
  
    const headers = Object.keys(data[0]);
  
    const csvRows = [
      headers.join(","), 
      ...data.map((row) =>
        headers
          .map((key) => {
            let value = row[key] ?? "";
  
            
            if (typeof value === "string" && /^[=+\-@]/.test(value)) {
              value = `'${value}`;
            }
  
            return `"${String(value).replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];
  
    const blob = new Blob([csvRows.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
  
    const url = window.URL.createObjectURL(blob);
  
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
  
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
  