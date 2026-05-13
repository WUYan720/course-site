import { useState, useRef } from "react";
import { Upload, Table, Download } from "lucide-react";
import Papa from "papaparse";

interface ParsedData {
  [key: string]: string;
}

export default function CsvUploader() {
  const [data, setData] = useState<ParsedData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const parsedData = results.data as ParsedData[];
        setData(parsedData);
        if (parsedData.length > 0) {
          setHeaders(Object.keys(parsedData[0]));
        }
      },
    });
  };

  const handleDownload = () => {
    if (data.length === 0) return;
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl shadow-sm border border-cream-200 overflow-hidden">
      <div className="bg-gradient-to-r from-softpink-50 to-cream-50 px-4 sm:px-6 py-3 sm:py-4 border-b border-cream-200">
        <h3 className="text-base sm:text-lg font-bold text-stone-800 flex items-center gap-2">
          <Upload className="w-4 h-4 sm:w-5 sm:h-5 text-softpink-600" />
          CSV 文件上传
        </h3>
      </div>

      <div className="p-3 sm:p-6">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          ref={fileInputRef}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-6 sm:py-8 border-2 border-dashed border-cream-300 rounded-xl sm:rounded-2xl hover:border-softpink-300 hover:bg-softpink-50 transition-colors flex flex-col items-center justify-center gap-2"
        >
          <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-stone-400" />
          <span className="text-stone-500 text-sm sm:text-base">点击上传 CSV 文件</span>
        </button>

        {fileName && (
          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-stone-600 text-center">
            已上传: {fileName}
          </p>
        )}

        {data.length > 0 && (
          <div className="mt-4 sm:mt-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2 sm:mb-3">
              <h4 className="text-xs sm:text-sm font-medium text-stone-700 flex items-center gap-2">
                <Table className="w-3 h-3 sm:w-4 sm:h-4" />
                数据预览 ({data.length} 行)
              </h4>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-softcyan-100 hover:bg-softcyan-200 text-softcyan-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium transition-colors"
              >
                <Download className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                下载
              </button>
            </div>
            <div className="overflow-x-auto border border-cream-200 rounded-xl sm:rounded-2xl">
              <table className="w-full text-xs sm:text-sm">
                <thead className="bg-cream-50">
                  <tr>
                    {headers.map((header, index) => (
                      <th
                        key={index}
                        className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-stone-700 border-b border-cream-200 whitespace-nowrap"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 5).map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-cream-50">
                      {headers.map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="px-2 sm:px-4 py-1.5 sm:py-2 text-stone-600 border-b border-cream-100 whitespace-nowrap"
                        >
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {data.length > 5 && (
              <p className="mt-1.5 sm:mt-2 text-xs text-stone-500 text-center">
                显示前 5 行，共 {data.length} 行
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
