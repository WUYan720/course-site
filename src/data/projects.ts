export interface Project {
  id: number;
  name: string;
  summary: string;
  overview: string;
  dataFile: string;
  content: string;
  exercises: string;
}

export const projects: Project[] = [
  {
    id: 1,
    name: "零售门店经营数据Python全流程清洗与AI辅助基础洞察",
    summary: "课程入门项目，完成Excel/SQL到Python的能力迁移，入门AI商务分析应用",
    overview: "本项目是课程**入门奠基项目**，1:1 还原线下连锁零售（超市、便利店、服饰门店）真实经营分析场景。你将拿到包含门店信息、品类销售、营收、成本、客流、成交的多表混合原始杂乱数据，先用 Python 完成企业级全流程数据清洗（读取、缺失值填充、异常值剔除、口径统一、多表合并），将脏数据转为标准分析数据；再用 Python 计算营收、客单价、坪效、毛利率、门店排名、品类销售占比等核心经营指标，绘制商务可视化图表；最后调用大模型 API，让 AI 自动识别经营异常门店、诊断指标波动根因、生成标准化经营分析报告。项目完成 Excel/SQL 到 Python 自动化分析的能力迁移，解决零售数据清洗慢、人工分析漏、报告撰写耗时的痛点。",
    dataFile: "project1_retail_data.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- Python 核心库：pandas 数据读取 / 缺失值 / 异常值处理 / 分组聚合 / 透视表 / 多表拼接；numpy 基础数值计算；matplotlib/seaborn 绘制柱状图 / 折线图 / 饼图 / 箱线图

- Excel：原始数据导入、一致性 / 完整性校验

- 大模型 API：基础调用、响应解析与格式化

## 2. 商务分析知识点

- 商务数据规范：清洗标准、字段口径统一、异常值判定逻辑

- 零售核心指标：营收、客单价、坪效、毛利率计算逻辑

- 分析逻辑：门店经营排名、品类销售结构、异常门店定位

## 3. AI 融合知识点

- Prompt 工程基础：商务分析场景 Prompt 设计原则

- AI 异常诊断：经营数据根因分析、自动生成分析摘要`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：数据加载与缺失值处理

\`\`\`python
import pandas as pd
import numpy as np

# 1. 加载数据
df = pd.read_csv('project1_retail_data.csv')
print("原始数据形状:", df.shape)

# 2. 检查缺失值
print("\\n缺失值统计:")
print(df.isnull().sum())

# 3. 处理缺失值：按门店和品类的均值填充
df['营收'] = df.groupby(['门店名称', '品类'])['营收'].transform(
    lambda x: x.fillna(x.mean())
)
df['客流量'] = df.groupby(['门店名称', '品类'])['客流量'].transform(
    lambda x: x.fillna(x.mean())
)

print("\\n处理后缺失值统计:")
print(df.isnull().sum())
\`\`\`

### 例题 2：异常值检测与处理

\`\`\`python
# 使用箱线图法检测营收异常值
Q1 = df['营收'].quantile(0.25)
Q3 = df['营收'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 标记异常值
df['is_outlier'] = (df['营收'] < lower_bound) | (df['营收'] > upper_bound)
print(f"异常值数量: {df['is_outlier'].sum()}")

# 对异常值进行截断处理
df.loc[df['营收'] > upper_bound, '营收'] = upper_bound
\`\`\`

### 例题 3：核心经营指标计算

\`\`\`python
# 按月度聚合计算门店指标
monthly_data = df.groupby(['门店名称', pd.Grouper(key='日期', freq='M')]).agg({
    '营收': 'sum',
    '客流量': 'sum',
    '坪效': 'mean',
    '毛利率': 'mean'
}).reset_index()

# 计算客单价
monthly_data['客单价'] = monthly_data['营收'] / monthly_data['客流量']

print(monthly_data.head())
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 计算所有门店的月度营收排名，找出 Top3 和 Bottom3 的门店

- 分析不同品类的销售占比，绘制饼图展示品类结构

### 2. 进阶练习

- 计算各门店的坪效排名，分析坪效与营收的相关性

- 识别经营异常的门店：哪些门店的毛利率显著低于平均水平？

### 3. AI 融合练习

- 将分析结果整理成 JSON 格式，调用大模型 API 生成门店经营洞察报告

- 针对表现最差的门店，让 AI 生成具体的优化建议`
  },
  {
    id: 2,
    name: "电商用户订单数据RFM用户分层与AI个性化运营标签生成",
    summary: "基础进阶项目，掌握商务分析核心的用户分层方法论，深化Python标签化处理能力",
    overview: "本项目是**用户分析核心进阶项目**，聚焦电商私域运营真实痛点。你将拿到海量电商用户历史订单数据（用户 ID、下单时间、消费金额、频次、类目等），先用 Python 计算 RFM 三大指标（最近消费、消费频次、累计金额），按行业标准将用户分为 8 大层级（重要价值、重要挽留、重要发展等），明确运营优先级；突破传统 RFM 「只分层不落地」局限，通过大模型 API 基于用户分层、消费偏好、行为数据，自动生成个性化用户标签、一对一触达话术、差异化运营策略（高价值用户权益、流失用户召回方案）。项目实现「用户数据→分层建模→AI 运营→落地执行」全闭环，解决用户运营无针对性、转化率低的问题。",
    dataFile: "project2_ecommerce_orders.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- pandas 进阶：用户维度聚合、自定义函数、分箱操作、标签化处理

- 可视化：matplotlib/plotly 绘制用户分层图、漏斗图、桑基图

- SQL：订单数据多表关联提取

- 大模型 API：批量文本生成、结构化结果存储

## 2. 商务分析知识点

- RFM 模型：三项指标计算、8 类用户分层规则

- 用户运营：生命周期管理、私域运营逻辑、运营优先级划定

## 3. AI 融合知识点

- 个性化标签 Prompt：用户分层标签、触达话术生成

- AI 运营策略：差异化运营方案、分层用户精准触达逻辑`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：RFM 指标计算

\`\`\`python
from datetime import datetime

# 定义分析截止日期
snapshot_date = datetime(2024, 1, 1)

# 计算RFM指标
rfm = df.groupby('用户ID').agg({
    '订单日期': lambda x: (snapshot_date - x.max()).days,  # R: 最近购买时间
    '订单ID': 'count',  # F: 购买频率
    '订单金额': 'sum'   # M: 购买总金额
}).reset_index()

rfm.columns = ['用户ID', 'R', 'F', 'M']
print(rfm.describe())
\`\`\`

### 例题 2：RFM 打分与分层

\`\`\`python
# 对RFM指标进行分箱打分 (1-5分)
rfm['R_score'] = pd.qcut(rfm['R'], 5, labels=[5,4,3,2,1])
rfm['F_score'] = pd.qcut(rfm['F'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['M_score'] = pd.qcut(rfm['M'], 5, labels=[1,2,3,4,5])

# 合并RFM分段
rfm['RFM_Segment'] = rfm['R_score'].astype(str) + rfm['F_score'].astype(str) + rfm['M_score'].astype(str)
rfm['RFM_Score'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)

# 用户分层
def rfm_segment(row):
    if row['R_score'] >= 4 and row['F_score'] >= 4 and row['M_score'] >= 4:
        return '重要价值用户'
    elif row['R_score'] <= 2 and row['F_score'] >= 4 and row['M_score'] >= 4:
        return '重要挽留用户'
    elif row['R_score'] >= 4 and row['F_score'] <= 2 and row['M_score'] >= 4:
        return '重要发展用户'
    elif row['R_score'] >= 4 and row['F_score'] >= 4 and row['M_score'] <= 2:
        return '重要保持用户'
    else:
        return '一般用户'

rfm['用户分层'] = rfm.apply(rfm_segment, axis=1)
print(rfm['用户分层'].value_counts())
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 完成完整的 8 类用户分层逻辑

- 绘制用户分层的可视化图表，展示各分层用户的占比

### 2. 进阶练习

- 分析不同分层用户的平均客单价和复购率差异

- 计算各分层用户的生命周期价值（CLV）

### 3. AI 融合练习

- 针对「重要挽留用户」，调用大模型生成个性化的挽留话术

- 为不同分层用户生成差异化的运营策略和触达方案`
  },
  {
    id: 3,
    name: "快消品销售时序预测与AI智能库存预警",
    summary: "专项进阶项目，掌握商务分析核心的时序预测能力，贴合零售/快消行业供应链核心需求",
    overview: "本项目是**供应链与销售预测专项项目**，贴合快消品（饮料、零食、日化）行业核心需求。你将拿到单品牌多 SKU 历史日销、库存、节假日与促销数据，先用 Python 做时间序列拆解（趋势、季节、随机波动），识别销量周期规律；再用 Prophet 模型构建未来 3 个月分 SKU 销量预测模型，精准预判走势；结合库存数据计算安全库存、周转率、缺货率并设定预警阈值；最后通过大模型 AI 诊断销量突增 / 突降根因（促销、节假日、竞品、季节），自动生成分 SKU 补货周期、补货量、库存风险预警。项目解决预测不准导致积压 / 断货、人工经验补货、成本浪费的痛点。",
    dataFile: "project3_fmcg_sales.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 时序分析：pandas 时间索引 / 重采样 / 滚动计算 / 时序分解；Prophet 模型拟合与预测；statsmodels 基础时序方法

- Excel：库存指标校验

- PowerBI：销量预测监控看板搭建

- 大模型 API：时序异常根因诊断、批量生成补货建议

## 2. 商务分析知识点

- 供应链管理：采购 - 仓储 - 配送逻辑、库存核心指标（周转率、缺货率、安全库存）

- 销量影响：节假日 / 促销量化影响、分 SKU 销售特征

- 库存策略：安全库存阈值、补货周期 / 补货量制定

## 3. AI 融合知识点

- 销量异常诊断：波动原因分析 Prompt

- 预测业务化解读：将数值预测转为业务结论

- AI 库存建议：自动生成补货方案与风险预警`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：时序数据预处理

\`\`\`python
from prophet import Prophet

# 准备Prophet格式数据
sku_data = df[df['SKU'] == 'SKU1'][['日期', '销量']].copy()
sku_data.columns = ['ds', 'y']  # Prophet要求的列名

# 转换日期格式
sku_data['ds'] = pd.to_datetime(sku_data['ds'])
print(sku_data.head())
\`\`\`

### 例题 2：构建预测模型

\`\`\`python
# 初始化模型
model = Prophet(seasonality_mode='multiplicative', yearly_seasonality=True, weekly_seasonality=True)
model.fit(sku_data)

# 创建未来3个月的日期
future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)

# 查看预测结果
fig1 = model.plot(forecast)
fig2 = model.plot_components(forecast)
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 为所有 20 个 SKU 批量构建预测模型

- 提取未来 3 个月的销量预测结果

### 2. 进阶练习

- 基于预测销量计算安全库存：安全库存 = 预测日均销量 × 补货周期 × 1.5

- 识别库存不足的 SKU，生成补货建议

### 3. AI 融合练习

- 分析销量异常波动的日期，让 AI 诊断可能的原因（促销？节假日？）

- 生成分 SKU 的库存预警报告`
  },
  {
    id: 4,
    name: "AIGC营销内容效果归因分析与AI卖点优化建议生成",
    summary: "专项进阶项目，贴合AI营销时代的核心需求，掌握营销分析与文本挖掘能力",
    overview: "本项目是**AI 营销时代必备营销分析项目**，针对品牌抖音 / 小红书 / 视频号 AIGC 内容（短视频、图文、直播话术）。你将拿到内容文本 + 曝光 / 点击 / 转化 / 涨粉 / GMV 效果数据，先用 Python 做文本挖掘（分词、关键词提取、情感分析、内容聚类），结合多触点 / 漏斗归因模型，拆解标题、卖点、话术、风格对转化的真实影响；再用大模型 AI 自动给内容打标签、提取卖点、识别用户痛点、评估内容质量；最后针对低转化内容，AI 生成可直接修改的优化建议与高转化文案模板。项目解决内容质量无法量化、低转化无方向、AIGC 内容迭代慢的痛点。",
    dataFile: "project4_marketing_content.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 文本分析：jieba 分词、TF-IDF/TextRank 关键词提取、文本向量化、情感分析

- 机器学习：sklearn K-Means 聚类、文本数据预处理

- 可视化：wordcloud 词云生成

- SQL：营销效果数据提取

## 2. 商务分析知识点

- 营销归因：多触点、漏斗归因模型

- 内容指标：曝光、点击率、转化率、ROI

- AIGC 营销：内容核心要素、高转化内容特征

## 3. AI 融合知识点

- 内容标签提取：卖点 / 痛点 / 风格标签生成 Prompt

- 内容质量评估：结合效果数据的内容评分 Prompt

- 卖点优化：低转化内容迭代、文案优化建议`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：营销效果指标计算

\`\`\`python
# 计算点击率、转化率
df['点击率'] = df['点击量'] / df['曝光量']
df['转化率'] = df['转化量'] / df['点击量']

# 按平台分析效果
platform_perf = df.groupby('平台').agg({
    '曝光量': 'sum',
    '点击量': 'sum',
    '转化量': 'sum'
}).reset_index()

platform_perf['整体点击率'] = platform_perf['点击量'] / platform_perf['曝光量']
platform_perf['整体转化率'] = platform_perf['转化量'] / platform_perf['点击量']
print(platform_perf)
\`\`\`

### 例题 2：文本关键词提取

\`\`\`python
import jieba
from collections import Counter

# 对高转化内容进行分词
high_convert = df[df['转化率'] > df['转化率'].quantile(0.8)]
all_words = []
for title in high_convert['内容标题']:
    words = jieba.lcut(title)
    all_words.extend(words)

# 统计高频词
word_freq = Counter(all_words)
print(word_freq.most_common(10))
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 找出转化率最高的 Top10 内容，分析它们的共同特征

- 对比不同内容类型的效果差异

### 2. 进阶练习

- 使用 K-Means 对内容进行聚类，找出不同的内容主题

- 分析情感倾向对转化率的影响

### 3. AI 融合练习

- 选取 3 条低转化的内容，让 AI 分析问题所在

- 为低转化内容生成优化后的标题和文案建议`
  },
  {
    id: 5,
    name: "企业客户流失预警分类模型与AI个性化挽留策略生成",
    summary: "专项进阶项目，掌握客户生命周期管理与机器学习分类建模能力，是金融/电商/ToB行业核心刚需能力",
    overview: "本项目是**客户生命周期管理机器学习核心项目**，覆盖电信、电商、会员制、ToB 全行业刚需。你将拿到客户消费、互动、售后、投诉、浏览等全生命周期数据，先做特征工程提取流失关键特征，用 Python 搭建逻辑回归、决策树、LightGBM 流失预警模型，精准预测流失概率并划分高 / 中 / 低风险等级；再通过大模型 AI，基于模型特征重要性诊断流失根因（价格、服务、产品、竞品），自动生成一对一挽留话术、专属权益、触达节奏建议。项目实现「预警→诊断→AI 挽留→降流失」全流程，解决客户流失发现晚、挽留无针对性的问题。",
    dataFile: "project5_customer_churn.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 机器学习：sklearn 数据预处理、特征工程、分类模型训练与调参

- 模型评估：准确率、精确率、召回率、F1、ROC/AUC、混淆矩阵

- SQL：客户全生命周期数据提取

## 2. 商务分析知识点

- 流失管理：流失定义、风险等级划分、CLV 客户生命周期价值

- 特征工程：消费 / 互动 / 服务 / 价值四大类特征构建

## 3. AI 融合知识点

- 流失根因诊断：客户特征 + 行为数据的原因分析 Prompt

- 个性化挽留：一对一话术、权益方案、触达策略生成`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：数据预处理与特征工程

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# 类别变量编码
cat_cols = ['合同类型', '支付方式']
num_cols = ['网龄(月)', '月费', '总费用']

# 拆分训练测试集
X = df[cat_cols + num_cols]
y = df['是否流失']

# 独热编码
encoder = OneHotEncoder(sparse=False, drop='first')
X_cat = encoder.fit_transform(X[cat_cols])

# 数值变量标准化
scaler = StandardScaler()
X_num = scaler.fit_transform(X[num_cols])

# 合并特征
X_processed = np.hstack([X_cat, X_num])

X_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.2, random_state=42)
\`\`\`

### 例题 2：构建流失预警模型

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

# 训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

# 评估
print(classification_report(y_test, y_pred))
print(f"AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 尝试使用 LightGBM 模型，对比效果差异

- 绘制混淆矩阵和 ROC 曲线

### 2. 进阶练习

- 计算特征重要性，找出影响客户流失的 Top5 因素

- 对客户进行流失风险分级（高 / 中 / 低风险）

### 3. AI 融合练习

- 选取 5 个高风险流失客户，根据他们的特征，让 AI 生成个性化的挽留策略

- 为不同类型的流失客户生成不同的权益方案`
  },
  {
    id: 6,
    name: "上市公司财报智能分析与AI经营风险预警",
    summary: "专项进阶项目，掌握企业经营与财务分析核心能力，贴合商务专业的经营分析核心培养目标",
    overview: "本项目是**财务与经营分析专项项目**，对标企业经营分析、财务分析、投研真实工作。你将拿到上市公司财报 PDF 与报表数据，先用 Python 提取财报表格与文本，计算盈利、偿债、营运、成长四大类财务指标，完成杜邦分析、行业对标；再通过大模型 AI 深度解析财报附注与管理层讨论，自动识别应收账款过高、现金流异常、负债结构不合理等财务风险，生成经营诊断报告、风险预警与优化建议。项目解决传统财报分析算指标慢、文本读不懂、风险发现滞后的痛点，升级为 AI 智能诊断。",
    dataFile: "project6_financial_report.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 财务分析：pandas 财务指标计算、杜邦分析代码实现

- 文本解析：tabula-py 提取 PDF 财报、附注信息抽取

- Excel：财务指标手工校验

- 可视化：财务趋势图、行业对标图绘制

## 2. 商务分析知识点

- 财务报表：资产负债表 / 利润表 / 现金流量表勾稽关系

- 财务能力：盈利 / 偿债 / 营运 / 成长四大维度指标

- 行业对标：同行业指标对比、异常指标识别

## 3. AI 融合知识点

- 财报语义解析：文本关键信息提取 Prompt

- 风险识别：财务异常、经营风险自动判定

- 诊断报告：标准化经营分析与优化建议生成`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：财务指标计算

\`\`\`python
# 计算核心财务指标
df['资产负债率'] = df['总负债'] / df['总资产']
df['净资产收益率(ROE)'] = df['净利润'] / (df['总资产'] - df['总负债'])
df['销售净利率'] = df['净利润'] / df['营业收入']
df['应收账款周转率'] = df['营业收入'] / df['应收账款']
df['存货周转率'] = df['营业收入'] / df['存货']

print(df[['公司名称', '季度', '净资产收益率(ROE)', '销售净利率', '资产负债率']].head())
\`\`\`

### 例题 2：杜邦分析

\`\`\`python
# 杜邦分析：ROE = 销售净利率 * 资产周转率 * 权益乘数
df['资产周转率'] = df['营业收入'] / df['总资产']
df['权益乘数'] = 1 / (1 - df['资产负债率'])
df['杜邦_ROE'] = df['销售净利率'] * df['资产周转率'] * df['权益乘数']

# 对比计算结果
print(df[['净资产收益率(ROE)', '杜邦_ROE']].head())
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 计算各公司的同比增长率，分析增长趋势

- 进行行业对标，找出各指标的行业平均水平

### 2. 进阶练习

- 识别异常财务指标：哪些公司的资产负债率显著高于行业平均？

- 分析现金流与利润的匹配度

### 3. AI 融合练习

- 将所有财务指标输入大模型，让 AI 自动识别潜在的经营风险

- 生成完整的企业经营诊断报告`
  },
  {
    id: 7,
    name: "品牌社媒舆情与竞品声量智能监测分析",
    summary: "专项进阶项目，掌握市场分析、文本挖掘与舆情管理能力，适配全行业市场品牌类岗位需求",
    overview: "本项目是**市场与品牌分析全栈项目**，解决舆情监控、竞品分析真实需求。你将先用 Python 爬虫批量爬取小红书、微博、电商评论、论坛的品牌与竞品公开数据（评论、笔记、互动数据），完成清洗存储；再用 Python 做文本挖掘（分词、停用词、LDA 主题聚类、细粒度情感分析），分析声量趋势、口碑分布、用户痛点；最后通过大模型 AI 自动分级舆情风险（一般 / 中度 / 重度）、提取未满足需求、完成品牌与竞品多维度对标（卖点、口碑、价格、评价），生成差异化竞争策略。项目解决传统舆情只看词云、竞品分析浮于表面的痛点。",
    dataFile: "project7_social_media.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 爬虫：requests/BeautifulSoup 爬取公开数据、规范化存储

- 文本挖掘：jieba 分词、TF-IDF、LDA 聚类、细粒度情感分析

- PowerBI：舆情实时监控看板搭建

- SQL：舆情数据存储与查询

## 2. 商务分析知识点

- 舆情管理：声量计算、风险分级、处理时效

- 竞品分析：声量对比、口碑优劣势、卖点 / 痛点拆解

- 市场机会：用户未满足需求、行业空白点挖掘

## 3. AI 融合知识点

- 情感分析：多维度正负中性判定 Prompt

- 舆情分级：负面风险定级与处理建议

- 竞品对标：差异化竞争策略自动生成`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：声量趋势分析

\`\`\`python
# 按日期和品牌统计声量
daily_volume = df.groupby(['发布时间', '提及品牌']).size().unstack().fillna(0)
daily_volume = daily_volume.resample('D').sum()

# 绘制趋势图
daily_volume.plot(figsize=(12,6), title='品牌声量趋势')
\`\`\`

### 例题 2：情感分析

\`\`\`python
# 各品牌情感分布
sentiment_dist = df.groupby(['提及品牌', '情感倾向']).size().unstack()
sentiment_dist = sentiment_dist.div(sentiment_dist.sum(axis=1), axis=0)
print(sentiment_dist)
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 对评论内容进行分词，生成词云图

- 使用 LDA 主题模型，挖掘用户讨论的热点话题

### 2. 进阶练习

- 对比品牌 A 与竞品的口碑差异

- 识别负面评论中的高频痛点词

### 3. AI 融合练习

- 自动检测负面舆情，进行风险分级

- 生成竞品对标分析报告，找出差异化竞争机会`
  },
  {
    id: 8,
    name: "营销AB测试全流程分析与AI实验效果智能诊断",
    summary: "高阶综合项目，掌握商务分析核心的统计推断与实验分析能力，是大厂商业分析师的核心必备技能",
    overview: "本项目是**大厂商业分析师核心高阶项目**，聚焦互联网 / 电商 AB 测试实验分析。你将拿到营销活动 AB 测试数据（首页改版、优惠券、文案、按钮颜色实验组 / 对照数据），先完成数据校验、样本均衡检验，用 Python 做 T 检验、卡方检验、F 检验判断统计显著性；再做多维度下钻分析，定位效果影响人群与场景；最后通过大模型 AI 自动诊断实验设计问题（样本不足、分组不均、混淆变量、辛普森悖论），生成实验结论、风险提示与规模化落地建议。项目解决 AB 测试结论错误、只看显著性、无法业务落地的痛点。",
    dataFile: "project8_ab_test.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 统计分析：scipy/statsmodels 假设检验、P 值、置信区间、显著性判断

- 多维分析：pandas 分组下钻、辛普森悖论规避

- SQL：实验数据提取

## 2. 商务分析知识点

- AB 测试设计：单一变量、样本量计算、随机分组、指标设计

- 混淆变量：时间、用户特征等偏差识别

- 实验落地：显著 / 非显著结果的业务解读

## 3. AI 融合知识点

- 实验诊断：设计缺陷自动识别 Prompt

- 多维度洞察：细分维度效果分析结论

- 落地建议：规模化执行方案 + 风险提示`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：基础效果分析

\`\`\`python
from scipy import stats

# 计算两组转化率
conversion_a = df[df['实验分组']=='A组(对照组)']['是否转化'].mean()
conversion_b = df[df['实验分组']=='B组(实验组)']['是否转化'].mean()

print(f"A组转化率: {conversion_a:.2%}")
print(f"B组转化率: {conversion_b:.2%}")
print(f"提升幅度: {(conversion_b-conversion_a)/conversion_a:.2%}")
\`\`\`

### 例题 2：统计显著性检验

\`\`\`python
# 卡方检验
a_convert = df[df['实验分组']=='A组(对照组)']['是否转化'].sum()
a_total = len(df[df['实验分组']=='A组(对照组)'])
b_convert = df[df['实验分组']=='B组(实验组)']['是否转化'].sum()
b_total = len(df[df['实验分组']=='B组(实验组)'])

observed = [[a_convert, a_total-a_convert], [b_convert, b_total-b_convert]]
chi2, p_value, dof, expected = stats.chi2_contingency(observed)

print(f"P值: {p_value:.4f}")
print(f"统计显著: {'是' if p_value < 0.05 else '否'}")
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 按年龄段、性别、设备类型进行细分维度分析

- 检查不同细分群体的实验效果是否一致

### 2. 进阶练习

- 计算实验所需的最小样本量，验证本次实验样本是否足够

- 检查分组是否均衡，各维度的分布是否一致

### 3. AI 融合练习

- 将实验结果输入大模型，让 AI 诊断实验设计是否合理

- 生成实验结论和规模化落地建议`
  },
  {
    id: 9,
    name: "电商产品动态定价优化与AI收益最大化策略生成",
    summary: "高阶综合项目，掌握商务分析高阶的定价优化与收益管理能力，直接对接企业营收与利润核心需求",
    overview: "本项目是**对接营收利润的高阶收益管理项目**，解决电商定价不合理、收益低的问题。你将拿到产品销售、价格、竞品定价、需求、节假日、库存多维度数据，先用 Python 计算价格弹性、拟合需求曲线，分析价格 / 竞品 / 季节对销量的影响；再搭建线性回归、随机森林、XGBoost 动态定价模型，输出淡季 / 大促 / 新品 / 清仓最优定价；最后通过大模型 AI 解释定价调整逻辑、预测收益变化、生成执行方案与风险提示。项目替代传统固定 / 经验定价，实现收益最大化，解决定价混乱、利润被压缩、被动应对价格战的痛点。",
    dataFile: "project9_pricing_data.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 进阶分析：价格弹性计算、需求曲线拟合、多因素相关性分析

- 机器学习：特征工程进阶、回归模型、强化学习基础

- SQL：价格 / 销售 / 竞品数据提取

## 2. 商务分析知识点

- 定价策略：成本 / 竞争 / 需求导向定价

- 价格弹性：弹性 > 1/<1/=1 的应用场景

- 收益管理：收益公式、不同场景定价目标

## 3. AI 融合知识点

- 策略解读：定价调整逻辑解释 Prompt

- 市场适配：竞品 / 政策 / 用户反馈的定价建议

- 收益预测：定价调整后的收益与风险预判`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：价格弹性计算

\`\`\`python
# 计算价格变化率和需求变化率
df['price_change'] = df['当前定价'].pct_change()
df['demand_change'] = df['销量'].pct_change()

# 计算价格弹性
elasticity = df['demand_change'] / df['price_change']
elasticity = elasticity.dropna()
avg_elasticity = elasticity.mean()

print(f"平均价格弹性: {avg_elasticity:.2f}")
\`\`\`

### 例题 2：需求曲线拟合

\`\`\`python
from sklearn.linear_model import LinearRegression

# 对数变换
X = np.log(df['当前定价']).values.reshape(-1, 1)
y = np.log(df['销量']).values

# 线性回归拟合
model = LinearRegression()
model.fit(X, y)

# 弹性就是系数
elasticity = model.coef_[0]
print(f"拟合的价格弹性: {elasticity:.2f}")
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 绘制价格-销量散点图，观察需求曲线

- 分析节假日对需求的影响

### 2. 进阶练习

- 构建收益函数：收益 = 价格 × 需求

- 寻找最优定价，使得收益最大化

### 3. AI 融合练习

- 让 AI 解释价格弹性的业务含义

- 生成不同场景下的动态定价策略建议`
  },
  {
    id: 10,
    name: "基于大模型的商务数据分析智能问答助手全流程搭建",
    summary: "课程结业综合王牌项目，全技能整合，完全适配AI时代商务分析师的核心能力要求",
    overview: "本项目是**课程结业综合王牌项目**，是 AI 时代商务分析师终极能力项目。你将整合前 9 个项目全部技能（Python、SQL、数据清洗、可视化、机器学习、大模型），用 LangChain+Streamlit 框架从零搭建企业级零代码商务数据分析智能问答助手。工具实现全流程自动化：业务人员自然语言提问→助手理解问题→自动对接数据库 / Excel 生成执行 SQL/Python 代码→自动分析与可视化→自动输出业务洞察与建议。项目让你从「工具使用者」升级为「AI 工具搭建者」，解决业务人员不会代码 / SQL、分析效率低、需求响应慢的核心痛点，是数字化转型企业最紧缺能力。",
    dataFile: "project10_sample_db.csv",
    content: `# 核心知识点拆解

## 1. 技术知识点

- 全栈技能：pandas 全流程分析、SQL 数据库对接、自动 SQL 生成执行

- 大模型开发：LangChain 链设计、工具调用；sqlalchemy 数据库交互；Streamlit 界面搭建

- AI 工程化：函数调用、多轮对话、Prompt 进阶（少样本 / 思维链）

## 2. 商务分析知识点

- 全场景整合：零售 / 电商 / 财务 / 舆情 / 定价分析方法论

- 企业分析逻辑：业务问题拆解、指标体系、洞察业务化转化

## 3. AI 融合知识点

- 自然语言转代码：业务问题转 SQL/Python Prompt

- 自动可视化：分析结果生成图表代码

- 业务洞察：数据转结构化结论 + 行动建议

- 多轮对话：上下文记忆与追问响应逻辑`,
    exercises: `# 课堂例题与课后练习

## 📝 课堂例题（Step-by-Step）

### 例题 1：搭建 Streamlit 基础界面

\`\`\`python
import streamlit as st
import pandas as pd

st.title('商务数据分析智能助手')

# 加载数据
df = pd.read_csv('project10_sample_db.csv')

# 用户提问
user_question = st.text_input('请输入你的分析问题：')

if user_question:
    # 这里调用大模型，将自然语言转换为Python代码
    # 执行代码并返回结果
    st.write('分析结果：')
    # ...
\`\`\`

## 📚 课后练习题

### 1. 基础练习

- 完成 LangChain 的 SQLDatabaseChain 配置

- 实现自然语言转 SQL 的基础功能

### 2. 进阶练习

- 添加自动可视化功能，根据查询结果自动生成图表

- 实现多轮对话功能

### 3. AI 融合练习

- 让大模型自动对查询结果进行业务解读

- 部署完整的智能问答助手应用`
  }
];
