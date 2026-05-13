import { useParams, Link, useNavigate } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft, ChevronLeft, ChevronRight, FileText, Database, BookOpen, Lightbulb, Download, PenTool, GraduationCap, Upload } from "lucide-react";
import CodeEditor from "@/components/CodeEditor";
import AIChat from "@/components/AIChat";
import Papa from "papaparse";

const mockCsvData: Record<string, string> = {
  "project1_retail_data.csv": "门店名称,日期,品类,营收,客流量,坪效,毛利率\n北京朝阳店,2024-01-01,食品,15000,300,50,0.35\n北京海淀店,2024-01-01,饮料,12000,250,48,0.32\n上海浦东店,2024-01-01,日用品,18000,350,51,0.38\n广州天河店,2024-01-01,食品,16000,320,50,0.36",
  "project2_ecommerce_orders.csv": "用户ID,订单ID,订单日期,订单金额,商品类别\nU001,ORD001,2024-01-01,299.00,电子产品\nU002,ORD002,2024-01-02,159.00,服装\nU003,ORD003,2024-01-03,89.00,日用品\nU001,ORD004,2024-01-05,459.00,电子产品",
  "project3_fmcg_sales.csv": "日期,SKU,销量,价格,促销活动\n2024-01-01,SKU001,120,15.99,否\n2024-01-02,SKU001,135,15.99,否\n2024-01-03,SKU001,145,14.99,是\n2024-01-04,SKU002,98,25.99,否",
  "project4_marketing_content.csv": "内容ID,平台,内容标题,曝光量,点击量,转化量,内容类型\nC001,抖音,新品上市,15000,3200,450,短视频\nC002,小红书,使用测评,8000,1800,280,图文\nC003,视频号,优惠活动,12000,2500,380,直播",
  "project5_customer_churn.csv": "用户ID,合同类型,支付方式,网龄(月),月费,总费用,是否流失\nC001,月付,支付宝,12,99,1188,0\nC002,年付,微信,24,199,4776,1\nC003,月付,银行卡,6,49,294,0\nC004,月付,支付宝,36,99,4284,0",
  "project6_financial_report.csv": "公司名称,季度,营业收入,净利润,总资产,总负债,经营活动现金流,应收账款,存货\n贵州茅台,2024Q1,3025.89,1170.40,12591.22,2650.34,974.87,187.60,696.97\n五粮液,2024Q1,1332.76,405.03,5731.60,1119.50,451.20,189.53,150.51\n泸州老窖,2024Q1,449.94,143.66,1977.77,345.01,143.39,56.15,66.35",
  "project7_social_media.csv": "发布时间,提及品牌,评论内容,情感倾向\n2024-01-01 10:00,品牌A,产品质量很好,正面\n2024-01-01 11:00,品牌B,价格有点贵,负面\n2024-01-01 12:00,品牌A,物流很快,正面\n2024-01-01 13:00,品牌C,服务态度一般,中性",
  "project8_ab_test.csv": "用户ID,实验分组,是否转化,年龄段,性别,设备类型\nU001,A组(对照组),1,25-34,男,手机\nU002,B组(实验组),1,18-24,女,手机\nU003,A组(对照组),0,35-44,男,电脑\nU004,B组(实验组),1,25-34,女,电脑",
  "project9_pricing_data.csv": "日期,产品ID,当前定价,销量,节假日\n2024-01-01,P001,99.00,150,否\n2024-01-02,P001,99.00,145,否\n2024-01-03,P001,89.00,200,否\n2024-01-01,P002,199.00,80,否",
  "project10_sample_db.csv": "ID,类别,数值1,数值2,日期\n1,A,100,200,2024-01-01\n2,B,150,250,2024-01-02\n3,A,120,220,2024-01-03\n4,C,180,280,2024-01-04"
};

const downloadCsv = (fileName: string) => {
  const csvContent = mockCsvData[fileName] || "无可用数据";
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const projectId = parseInt(id || "1");
  const project = projects.find((p) => p.id === projectId);

  const handlePrev = () => {
    if (projectId > 1) {
      navigate(`/projects/${projectId - 1}`);
    }
  };

  const handleNext = () => {
    if (projectId < projects.length) {
      navigate(`/projects/${projectId + 1}`);
    }
  };

  const renderContent = (content: string) => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];
    let inCodeBlock = false;
    let codeContent = "";
    let codeLanguage = "";
    let codeKey = 0;

    lines.forEach((line, index) => {
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
          codeContent = "";
        } else {
          inCodeBlock = false;
          elements.push(
            <div key={`code-${codeKey++}`} className="my-3 sm:my-4 rounded-xl sm:rounded-2xl overflow-hidden border border-cream-200">
              <div className="bg-stone-800 px-3 sm:px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-xs text-stone-400">{codeLanguage || "code"}</span>
              </div>
              <pre className="bg-stone-900 p-3 sm:p-4 overflow-x-auto">
                <code className="text-green-400 font-mono text-xs sm:text-sm whitespace-pre">{codeContent}</code>
              </pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? "\n" : "") + line;
        return;
      }

      if (line.startsWith("# ")) {
        const title = line.replace("# ", "");
        if (title.includes("核心知识点拆解")) {
          elements.push(
            <h1 key={index} className="text-base sm:text-lg font-bold text-softpink-700 mb-2 sm:mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
              {title}
            </h1>
          );
        } else if (title.includes("课堂例题与课后练习")) {
          elements.push(
            <h1 key={index} className="text-xl sm:text-2xl font-bold text-softcyan-700 mt-6 sm:mt-8 mb-4 sm:mb-6 flex flex-wrap items-center gap-2 border-b border-cream-200 pb-3 sm:pb-4">
              <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />
              {title}
              <label className="ml-auto flex items-center gap-1.5 px-2.5 py-1 bg-softpink-50 hover:bg-softpink-100 text-softpink-700 rounded-lg text-xs font-medium cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                上传数据
                <input
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      Papa.parse(file, {
                        header: true,
                        skipEmptyLines: true,
                        complete: (results) => {
                          console.log("CSV数据已加载:", results.data);
                          alert(`✅ ${file.name} 已加载，共 ${results.data.length} 行`);
                        }
                      });
                    }
                  }}
                />
              </label>
            </h1>
          );
        } else {
          elements.push(
            <h1 key={index} className="text-2xl sm:text-3xl font-bold text-stone-800 mt-6 sm:mt-8 mb-3 sm:mb-4 first:mt-0">
              {title}
            </h1>
          );
        }
      } else if (line.startsWith("## ")) {
        const title = line.replace("## ", "");
        let Icon = FileText;
        let iconColor = "text-softcyan-700";
        let isKnowledgePoint = false;
        if (title.includes("配套数据")) Icon = Database;
        else if (title.includes("课堂例题")) Icon = BookOpen;
        else if (title.includes("课后练习") || title.includes("练习题")) Icon = Lightbulb;
        else if (title.includes("技术知识点")) {
          Icon = Database;
          iconColor = "text-blue-600";
          isKnowledgePoint = true;
        }
        else if (title.includes("商务分析知识点")) {
          Icon = Lightbulb;
          iconColor = "text-amber-600";
          isKnowledgePoint = true;
        }
        else if (title.includes("AI融合知识点") || title.includes("AI 融合知识点")) {
          Icon = BookOpen;
          iconColor = "text-purple-600";
          isKnowledgePoint = true;
        }
        else if (title.includes("基础练习")) {
          Icon = GraduationCap;
          iconColor = "text-green-600";
        }
        else if (title.includes("进阶练习")) {
          Icon = Lightbulb;
          iconColor = "text-orange-600";
        }
        else if (title.includes("AI 融合练习")) {
          Icon = BookOpen;
          iconColor = "text-purple-600";
        }

        elements.push(
          <h2 key={index} className={`${isKnowledgePoint ? 'text-sm sm:text-base font-bold text-stone-700 mt-3 sm:mt-4 mb-1.5 sm:mb-2 flex items-center gap-2' : 'text-lg sm:text-xl font-bold text-stone-800 mt-5 sm:mt-6 mb-2 sm:mb-3 flex items-center gap-2'}`}>
            {isKnowledgePoint ? (
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-softpink-400 rounded-full"></span>
            ) : (
              <Icon className={`w-4 h-4 sm:w-5 sm:h-5 ${iconColor}`} />
            )}
            {title}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        elements.push(
          <h3 key={index} className="text-sm sm:text-base font-bold text-stone-700 mt-3 sm:mt-4 mb-1.5 sm:mb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-softpink-400 rounded-full"></span>
            {line.replace("### ", "")}
          </h3>
        );
      } else if (line.trim() === "") {
        elements.push(<div key={index} className="h-2 sm:h-3" />);
      } else if (line.startsWith("- ")) {
        elements.push(
          <li key={index} className="text-stone-700 mb-2 sm:mb-3 ml-4 sm:ml-6 list-disc leading-relaxed pl-1 sm:pl-2 text-sm sm:text-base">
            {renderInlineCode(line.replace("- ", ""))}
          </li>
        );
      } else if (line.match(/^\d+\. /)) {
        elements.push(
          <li key={index} className="text-stone-700 mb-1.5 sm:mb-2 ml-4 sm:ml-6 list-decimal leading-relaxed text-sm sm:text-base">
            {renderInlineCode(line.replace(/^\d+\. /, ""))}
          </li>
        );
      } else {
        elements.push(
          <p key={index} className="text-stone-700 mb-1.5 sm:mb-2 leading-relaxed text-sm sm:text-base">
            {renderInlineCode(line)}
          </p>
        );
      }
    });

    return elements;
  };

  const renderInlineCode = (text: string) => {
    const parts = text.split(/(`[^`]+`)/g);
    return parts.map((part, i) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="bg-cream-100 text-softpink-700 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-cream-50 flex items-center justify-center py-8 sm:py-12 px-4">
        <div className="text-center">
          <h2 className="text-lg sm:text-xl font-bold text-stone-800 mb-4">项目不存在</h2>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-softpink-100 hover:bg-softpink-200 text-softpink-800 font-medium rounded-xl sm:rounded-2xl transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4" />
            返回项目列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 py-6 sm:py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-stone-600 hover:text-softpink-700 transition-colors text-sm sm:text-base order-2 sm:order-1"
            >
              <ArrowLeft className="w-4 h-4" />
              返回项目列表
            </Link>
            <div className="flex items-center gap-2 order-1 sm:order-2">
              <button
                onClick={handlePrev}
                disabled={projectId === 1}
                className="p-2 bg-white rounded-xl border border-cream-200 hover:bg-cream-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4 text-stone-600" />
              </button>
              <button
                onClick={handleNext}
                disabled={projectId === projects.length}
                className="p-2 bg-white rounded-xl border border-cream-200 hover:bg-cream-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-5 sm:p-8 lg:p-10 shadow-sm border border-cream-200">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
              <div className="bg-softpink-100 text-softpink-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium">
                项目 {project.id}
              </div>
              <button
                onClick={() => downloadCsv(project.dataFile)}
                className="bg-softcyan-100 hover:bg-softcyan-200 text-softcyan-700 px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors cursor-pointer w-fit"
              >
                <Database className="w-3 h-3" />
                {project.dataFile}
                <Download className="w-3 h-3" />
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-stone-800 mb-2 leading-tight">
              {project.name}
            </h1>
            <p className="text-stone-600 text-base sm:text-lg mb-5 sm:mb-6">{project.summary}</p>

            <div className="border-t border-cream-200 pt-5 sm:pt-6 space-y-5 sm:space-y-6">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-softpink-700 mb-2 sm:mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                  项目概述
                </h2>
                <div className="text-stone-700 leading-relaxed text-sm sm:text-base">
                  {renderInlineCode(project.overview)}
                </div>
              </div>

              <div className="border-t border-cream-200 pt-5 sm:pt-6">
                {renderContent(project.content)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl lg:rounded-4xl p-4 sm:p-6 shadow-sm border border-cream-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="min-h-[800px] sm:min-h-[900px] max-h-[900px] sm:max-h-[1000px] overflow-y-auto scroll-smooth pr-2 
                [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-thumb]:bg-cream-300 
                [&::-webkit-scrollbar-thumb]:rounded-full 
                [&::-webkit-scrollbar-thumb]:hover:bg-cream-400
                [&::-webkit-scrollbar-track]:bg-cream-100">
                {renderContent(project.exercises)}
              </div>
              <div className="min-h-[800px] sm:min-h-[900px] max-h-[900px] sm:max-h-[1000px] overflow-y-auto scroll-smooth">
                <CodeEditor />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <AIChat />
          </div>
        </div>
      </div>
    </div>
  );
}
