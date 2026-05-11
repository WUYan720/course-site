import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Bot, User } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "你好！我是你的 AI 学习助手。有什么问题可以随时问我，我会尽力帮助你学习 Python 数据分析。",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const responses = [
        "这是一个很好的问题！在 Python 中，pandas 是处理数据最常用的库。你可以使用 `pd.read_csv()` 来读取 CSV 文件。",
        "对于数据分析，建议先了解数据的基本情况，可以使用 `df.head()` 和 `df.describe()` 方法。",
        "数据清洗是分析的重要步骤。常见的处理包括处理缺失值、去除重复数据、转换数据类型等。",
        "可视化是数据分析的关键环节。matplotlib 和 seaborn 是 Python 中常用的可视化库。",
        "如果你想进行更复杂的数据分析，可以考虑学习机器学习相关的库，如 scikit-learn。",
      ];

      const botMessage: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "bot",
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="bg-white rounded-4xl shadow-sm border border-cream-200 overflow-hidden h-[600px] flex flex-col">
      <div className="bg-gradient-to-r from-softpink-50 to-softcyan-50 px-6 py-4 border-b border-cream-200 flex-shrink-0">
        <h3 className="text-lg font-bold text-stone-800 flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-softpink-600" />
          AI 学习助手
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start gap-3 ${
              message.sender === "user" ? "flex-row-reverse" : ""
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.sender === "bot"
                  ? "bg-softpink-100"
                  : "bg-softcyan-100"
              }`}
            >
              {message.sender === "bot" ? (
                <Bot className="w-4 h-4 text-softpink-600" />
              ) : (
                <User className="w-4 h-4 text-softcyan-600" />
              )}
            </div>
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                message.sender === "bot"
                  ? "bg-cream-100 text-stone-700"
                  : "bg-softcyan-100 text-stone-800"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-cream-200 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="输入你的问题..."
            className="flex-1 px-4 py-2 bg-cream-50 border border-cream-200 rounded-2xl text-sm focus:outline-none focus:border-softpink-300"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-softpink-100 hover:bg-softpink-200 text-softpink-700 rounded-2xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
