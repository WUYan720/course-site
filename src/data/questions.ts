export interface Example {
  id: string;
  title: string;
  code: string;
}

export interface Exercise {
  id: string;
  level: '基础' | '进阶' | 'AI融合';
  title: string;
  description: string;
}

export interface ProjectQuestion {
  id: number;
  name: string;
  dataFile: string;
  examples: Example[];
  exercises: Exercise[];
}

export const questions: ProjectQuestion[] = [
  {
    id: 1,
    name: '零售门店经营数据 Python 全流程清洗与 AI 辅助基础洞察',
    dataFile: 'project1_retail_data.csv',
    examples: [
      {
        id: '1-1',
        title: '例题 1：数据加载与缺失值处理',
        code: `import pandas as pd
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
print(df.isnull().sum())`
      },
      {
        id: '1-2',
        title: '例题 2：异常值检测与处理',
        code: `# 使用箱线图法检测营收异常值
Q1 = df['营收'].quantile(0.25)
Q3 = df['营收'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 标记异常值
df['is_outlier'] = (df['营收'] < lower_bound) | (df['营收'] > upper_bound)
print(f"异常值数量: {df['is_outlier'].sum()}")

# 对异常值进行截断处理
df.loc[df['营收'] > upper_bound, '营收'] = upper_bound`
      },
      {
        id: '1-3',
        title: '例题 3：核心经营指标计算',
        code: `# 按月度聚合计算门店指标
monthly_data = df.groupby(['门店名称', pd.Grouper(key='日期', freq='M')]).agg({
    '营收': 'sum',
    '客流量': 'sum',
    '坪效': 'mean',
    '毛利率': 'mean'
}).reset_index()

# 计算客单价
monthly_data['客单价'] = monthly_data['营收'] / monthly_data['客流量']

print(monthly_data.head())`
      }
    ],
    exercises: [
      {
        id: '1-e1',
        level: '基础',
        title: '计算门店月度营收排名',
        description: '计算所有门店的月度营收排名，找出 Top3 和 Bottom3 的门店'
      },
      {
        id: '1-e2',
        level: '基础',
        title: '分析品类销售占比',
        description: '分析不同品类的销售占比，绘制饼图展示品类结构'
      },
      {
        id: '1-e3',
        level: '进阶',
        title: '坪效与营收相关性分析',
        description: '计算各门店的坪效排名，分析坪效与营收的相关性'
      },
      {
        id: '1-e4',
        level: '进阶',
        title: '识别异常门店',
        description: '识别经营异常的门店：哪些门店的毛利率显著低于平均水平？'
      },
      {
        id: '1-e5',
        level: 'AI融合',
        title: 'AI 生成经营洞察报告',
        description: '将分析结果整理成 JSON 格式，调用大模型 API 生成门店经营洞察报告'
      },
      {
        id: '1-e6',
        level: 'AI融合',
        title: 'AI 生成优化建议',
        description: '针对表现最差的门店，让 AI 生成具体的优化建议'
      }
    ]
  },
  {
    id: 2,
    name: '电商用户订单数据 RFM 用户分层与 AI 个性化运营标签生成',
    dataFile: 'project2_ecommerce_orders.csv',
    examples: [
      {
        id: '2-1',
        title: '例题 1：RFM 指标计算',
        code: `from datetime import datetime

# 定义分析截止日期
snapshot_date = datetime(2024, 1, 1)

# 计算RFM指标
rfm = df.groupby('用户ID').agg({
    '订单日期': lambda x: (snapshot_date - x.max()).days,  # R: 最近购买时间
    '订单ID': 'count',  # F: 购买频率
    '订单金额': 'sum'   # M: 购买总金额
}).reset_index()

rfm.columns = ['用户ID', 'R', 'F', 'M']
print(rfm.describe())`
      },
      {
        id: '2-2',
        title: '例题 2：RFM 打分与分层',
        code: `# 对RFM指标进行分箱打分 (1-5分)
rfm['R_score'] = pd.qcut(rfm['R'], 5, labels=[5,4,3,2,1])
rfm['F_score'] = pd.qcut(rfm['F'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['M_score'] = pd.qcut(rfm['M'], 5, labels=[1,2,3,4,5])

# 合并RFM分段
rfm['RFM_Segment'] = rfm['R_score'].astype(str) + rfm['F_score'].astype(str) + rfm['M_score'].astype(str)
rfm['RFM_Score'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)

# 用户分层
def rfm_segment(row):
    if row['R_score'] >=4 and row['F_score'] >=4 and row['M_score'] >=4:
        return '重要价值用户'
    elif row['R_score'] <=2 and row['F_score'] >=4 and row['M_score'] >=4:
        return '重要挽留用户'
    elif row['R_score'] >=4 and row['F_score'] <=2 and row['M_score'] >=4:
        return '重要发展用户'
    elif row['R_score'] >=4 and row['F_score'] >=4 and row['M_score'] <=2:
        return '重要保持用户'
    else:
        return '一般用户'

rfm['用户分层'] = rfm.apply(rfm_segment, axis=1)
print(rfm['用户分层'].value_counts())`
      }
    ],
    exercises: [
      {
        id: '2-e1',
        level: '基础',
        title: '完成8类用户分层',
        description: '完成完整的 8 类用户分层逻辑'
      },
      {
        id: '2-e2',
        level: '基础',
        title: '用户分层可视化',
        description: '绘制用户分层的可视化图表，展示各分层用户的占比'
      },
      {
        id: '2-e3',
        level: '进阶',
        title: '客单价与复购率分析',
        description: '分析不同分层用户的平均客单价和复购率差异'
      },
      {
        id: '2-e4',
        level: '进阶',
        title: '生命周期价值计算',
        description: '计算各分层用户的生命周期价值 CLV'
      },
      {
        id: '2-e5',
        level: 'AI融合',
        title: 'AI 生成挽留话术',
        description: '针对"重要挽留用户"，调用大模型生成个性化的挽留话术'
      },
      {
        id: '2-e6',
        level: 'AI融合',
        title: 'AI 生成运营策略',
        description: '为不同分层用户生成差异化的运营策略和触达方案'
      }
    ]
  },
  {
    id: 3,
    name: '快消品销售时序预测与 AI 智能库存预警',
    dataFile: 'project3_fmcg_sales.csv',
    examples: [
      {
        id: '3-1',
        title: '例题 1：时序数据预处理',
        code: `from prophet import Prophet

# 准备Prophet格式数据
sku_data = df[df['SKU'] == 'SKU1'][['日期', '销量']].copy()
sku_data.columns = ['ds', 'y']  # Prophet要求的列名

# 转换日期格式
sku_data['ds'] = pd.to_datetime(sku_data['ds'])
print(sku_data.head())`
      },
      {
        id: '3-2',
        title: '例题 2：构建预测模型',
        code: `# 初始化模型
model = Prophet(seasonality_mode='multiplicative', yearly_seasonality=True, weekly_seasonality=True)
model.fit(sku_data)

# 创建未来3个月的日期
future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)

# 查看预测结果
fig1 = model.plot(forecast)
fig2 = model.plot_components(forecast)`
      }
    ],
    exercises: [
      {
        id: '3-e1',
        level: '基础',
        title: '批量构建预测模型',
        description: '为所有 20 个 SKU 批量构建预测模型'
      },
      {
        id: '3-e2',
        level: '基础',
        title: '提取预测结果',
        description: '提取未来 3 个月的销量预测结果'
      },
      {
        id: '3-e3',
        level: '进阶',
        title: '安全库存计算',
        description: '基于预测销量计算安全库存：安全库存 = 预测日均销量 * 补货周期 * 1.5'
      },
      {
        id: '3-e4',
        level: '进阶',
        title: '库存不足识别',
        description: '识别库存不足的 SKU，生成补货建议'
      },
      {
        id: '3-e5',
        level: 'AI融合',
        title: 'AI 诊断异常原因',
        description: '分析销量异常波动的日期，让 AI 诊断可能的原因（促销？节假日？）'
      },
      {
        id: '3-e6',
        level: 'AI融合',
        title: 'AI 生成库存预警报告',
        description: '生成分 SKU 的库存预警报告'
      }
    ]
  },
  {
    id: 4,
    name: 'AIGC 营销内容效果归因分析与 AI 卖点优化建议生成',
    dataFile: 'project4_marketing_content.csv',
    examples: [
      {
        id: '4-1',
        title: '例题 1：营销效果指标计算',
        code: `# 计算点击率、转化率
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
print(platform_perf)`
      },
      {
        id: '4-2',
        title: '例题 2：文本关键词提取',
        code: `import jieba
from collections import Counter

# 对高转化内容进行分词
high_convert = df[df['转化率'] > df['转化率'].quantile(0.8)]
all_words = []
for title in high_convert['内容标题']:
    words = jieba.lcut(title)
    all_words.extend(words)

# 统计高频词
word_freq = Counter(all_words)
print(word_freq.most_common(10))`
      }
    ],
    exercises: [
      {
        id: '4-e1',
        level: '基础',
        title: '找出Top10高转化内容',
        description: '找出转化率最高的 Top10 内容，分析它们的共同特征'
      },
      {
        id: '4-e2',
        level: '基础',
        title: '内容类型效果对比',
        description: '对比不同内容类型的效果差异'
      },
      {
        id: '4-e3',
        level: '进阶',
        title: '内容主题聚类',
        description: '使用 K-Means 对内容进行聚类，找出不同的内容主题'
      },
      {
        id: '4-e4',
        level: '进阶',
        title: '情感分析影响',
        description: '分析情感倾向对转化率的影响'
      },
      {
        id: '4-e5',
        level: 'AI融合',
        title: 'AI 分析低转化原因',
        description: '选取 3 条低转化的内容，让 AI 分析问题所在'
      },
      {
        id: '4-e6',
        level: 'AI融合',
        title: 'AI 生成优化建议',
        description: '为低转化内容生成优化后的标题和文案建议'
      }
    ]
  },
  {
    id: 5,
    name: '企业客户流失预警分类模型与 AI 个性化挽留策略生成',
    dataFile: 'project5_customer_churn.csv',
    examples: [
      {
        id: '5-1',
        title: '例题 1：数据预处理与特征工程',
        code: `from sklearn.model_selection import train_test_split
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

X_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.2, random_state=42)`
      },
      {
        id: '5-2',
        title: '例题 2：构建流失预警模型',
        code: `from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

# 训练模型
model = LogisticRegression()
model.fit(X_train, y_train)

# 预测
y_pred = model.predict(X_test)
y_pred_proba = model.predict_proba(X_test)[:, 1]

# 评估
print(classification_report(y_test, y_pred))
print(f"AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")`
      }
    ],
    exercises: [
      {
        id: '5-e1',
        level: '基础',
        title: '尝试 LightGBM 模型',
        description: '尝试使用 LightGBM 模型，对比效果差异'
      },
      {
        id: '5-e2',
        level: '基础',
        title: '绘制模型评估图表',
        description: '绘制混淆矩阵和 ROC 曲线'
      },
      {
        id: '5-e3',
        level: '进阶',
        title: '特征重要性分析',
        description: '计算特征重要性，找出影响客户流失的 Top5 因素'
      },
      {
        id: '5-e4',
        level: '进阶',
        title: '流失风险分级',
        description: '对客户进行流失风险分级（高 / 中 / 低风险）'
      },
      {
        id: '5-e5',
        level: 'AI融合',
        title: 'AI 生成挽留策略',
        description: '选取 5 个高风险流失客户，根据他们的特征，让 AI 生成个性化的挽留策略'
      },
      {
        id: '5-e6',
        level: 'AI融合',
        title: 'AI 生成权益方案',
        description: '为不同类型的流失客户生成不同的权益方案'
      }
    ]
  },
  {
    id: 6,
    name: '上市公司财报智能分析与 AI 经营风险预警',
    dataFile: 'project6_financial_report.csv',
    examples: [
      {
        id: '6-1',
        title: '例题 1：财务指标计算',
        code: `# 计算核心财务指标
df['资产负债率'] = df['总负债'] / df['总资产']
df['净资产收益率(ROE)'] = df['净利润'] / (df['总资产'] - df['总负债'])
df['销售净利率'] = df['净利润'] / df['营业收入']
df['应收账款周转率'] = df['营业收入'] / df['应收账款']
df['存货周转率'] = df['营业收入'] / df['存货']

print(df[['公司名称', '季度', '净资产收益率(ROE)', '销售净利率', '资产负债率']].head())`
      },
      {
        id: '6-2',
        title: '例题 2：杜邦分析',
        code: `# 杜邦分析：ROE = 销售净利率 * 资产周转率 * 权益乘数
df['资产周转率'] = df['营业收入'] / df['总资产']
df['权益乘数'] = 1 / (1 - df['资产负债率'])
df['杜邦_ROE'] = df['销售净利率'] * df['资产周转率'] * df['权益乘数']

# 对比计算结果
print(df[['净资产收益率(ROE)', '杜邦_ROE']].head())`
      }
    ],
    exercises: [
      {
        id: '6-e1',
        level: '基础',
        title: '同比增长率计算',
        description: '计算各公司的同比增长率，分析增长趋势'
      },
      {
        id: '6-e2',
        level: '基础',
        title: '行业对标分析',
        description: '进行行业对标，找出各指标的行业平均水平'
      },
      {
        id: '6-e3',
        level: '进阶',
        title: '异常指标识别',
        description: '识别异常财务指标：哪些公司的资产负债率显著高于行业平均？'
      },
      {
        id: '6-e4',
        level: '进阶',
        title: '现金流与利润匹配度',
        description: '分析现金流与利润的匹配度'
      },
      {
        id: '6-e5',
        level: 'AI融合',
        title: 'AI 识别经营风险',
        description: '将所有财务指标输入大模型，让 AI 自动识别潜在的经营风险'
      },
      {
        id: '6-e6',
        level: 'AI融合',
        title: 'AI 生成诊断报告',
        description: '生成完整的企业经营诊断报告'
      }
    ]
  },
  {
    id: 7,
    name: '品牌社媒舆情与竞品声量智能监测分析',
    dataFile: 'project7_social_media.csv',
    examples: [
      {
        id: '7-1',
        title: '例题 1：声量趋势分析',
        code: `# 按日期和品牌统计声量
daily_volume = df.groupby(['发布时间', '提及品牌']).size().unstack().fillna(0)
daily_volume = daily_volume.resample('D').sum()

# 绘制趋势图
daily_volume.plot(figsize=(12,6), title='品牌声量趋势')`
      },
      {
        id: '7-2',
        title: '例题 2：情感分析',
        code: `# 各品牌情感分布
sentiment_dist = df.groupby(['提及品牌', '情感倾向']).size().unstack()
sentiment_dist = sentiment_dist.div(sentiment_dist.sum(axis=1), axis=0)
print(sentiment_dist)`
      }
    ],
    exercises: [
      {
        id: '7-e1',
        level: '基础',
        title: '评论分词与词云',
        description: '对评论内容进行分词，生成词云图'
      },
      {
        id: '7-e2',
        level: '基础',
        title: 'LDA 主题挖掘',
        description: '使用 LDA 主题模型，挖掘用户讨论的热点话题'
      },
      {
        id: '7-e3',
        level: '进阶',
        title: '品牌与竞品口碑对比',
        description: '对比品牌 A 与竞品的口碑差异'
      },
      {
        id: '7-e4',
        level: '进阶',
        title: '负面痛点词识别',
        description: '识别负面评论中的高频痛点词'
      },
      {
        id: '7-e5',
        level: 'AI融合',
        title: 'AI 负面舆情分级',
        description: '自动检测负面舆情，进行风险分级'
      },
      {
        id: '7-e6',
        level: 'AI融合',
        title: 'AI 生成竞品对标报告',
        description: '生成竞品对标分析报告，找出差异化竞争机会'
      }
    ]
  },
  {
    id: 8,
    name: '营销 AB 测试全流程分析与 AI 实验效果智能诊断',
    dataFile: 'project8_ab_test.csv',
    examples: [
      {
        id: '8-1',
        title: '例题 1：基础效果分析',
        code: `from scipy import stats

# 计算两组转化率
conversion_a = df[df['实验分组']=='A组(对照组)']['是否转化'].mean()
conversion_b = df[df['实验分组']=='B组(实验组)']['是否转化'].mean()

print(f"A组转化率: {conversion_a:.2%}")
print(f"B组转化率: {conversion_b:.2%}")
print(f"提升幅度: {(conversion_b-conversion_a)/conversion_a:.2%}")`
      },
      {
        id: '8-2',
        title: '例题 2：统计显著性检验',
        code: `# 卡方检验
a_convert = df[df['实验分组']=='A组(对照组)']['是否转化'].sum()
a_total = len(df[df['实验分组']=='A组(对照组)'])
b_convert = df[df['实验分组']=='B组(实验组)']['是否转化'].sum()
b_total = len(df[df['实验分组']=='B组(实验组)'])

observed = [[a_convert, a_total-a_convert], [b_convert, b_total-b_convert]]
chi2, p_value, dof, expected = stats.chi2_contingency(observed)

print(f"P值: {p_value:.4f}")
print(f"统计显著: {'是' if p_value < 0.05 else '否'}")`
      }
    ],
    exercises: [
      {
        id: '8-e1',
        level: '基础',
        title: '细分维度分析',
        description: '按年龄段、性别、设备类型进行细分维度分析'
      },
      {
        id: '8-e2',
        level: '基础',
        title: '群体效果一致性检查',
        description: '检查不同细分群体的实验效果是否一致'
      },
      {
        id: '8-e3',
        level: '进阶',
        title: '最小样本量计算',
        description: '计算实验所需的最小样本量，验证本次实验样本是否足够'
      },
      {
        id: '8-e4',
        level: '进阶',
        title: '分组均衡性检查',
        description: '检查分组是否均衡，各维度的分布是否一致'
      },
      {
        id: '8-e5',
        level: 'AI融合',
        title: 'AI 诊断实验设计',
        description: '将实验结果输入大模型，让 AI 诊断实验设计是否合理'
      },
      {
        id: '8-e6',
        level: 'AI融合',
        title: 'AI 生成落地建议',
        description: '生成实验结论和规模化落地建议'
      }
    ]
  },
  {
    id: 9,
    name: '电商产品动态定价优化与 AI 收益最大化策略生成',
    dataFile: 'project9_pricing_data.csv',
    examples: [
      {
        id: '9-1',
        title: '例题 1：价格弹性计算',
        code: `# 计算价格变化率和需求变化率
df['price_change'] = df['当前定价'].pct_change()
df['demand_change'] = df['销量'].pct_change()

# 计算价格弹性
elasticity = df['demand_change'] / df['price_change']
elasticity = elasticity.dropna()
avg_elasticity = elasticity.mean()

print(f"平均价格弹性: {avg_elasticity:.2f}")`
      },
      {
        id: '9-2',
        title: '例题 2：需求曲线拟合',
        code: `from sklearn.linear_model import LinearRegression

# 对数变换
X = np.log(df['当前定价']).values.reshape(-1, 1)
y = np.log(df['销量']).values

# 线性回归拟合
model = LinearRegression()
model.fit(X, y)

# 弹性就是系数
elasticity = model.coef_[0]
print(f"拟合的价格弹性: {elasticity:.2f}")`
      }
    ],
    exercises: [
      {
        id: '9-e1',
        level: '基础',
        title: '价格-销量散点图',
        description: '绘制价格 - 销量散点图，观察需求曲线'
      },
      {
        id: '9-e2',
        level: '基础',
        title: '节假日影响分析',
        description: '分析节假日对需求的影响'
      },
      {
        id: '9-e3',
        level: '进阶',
        title: '构建收益函数',
        description: '构建收益函数：收益 = 价格 * 需求'
      },
      {
        id: '9-e4',
        level: '进阶',
        title: '寻找最优定价',
        description: '寻找最优定价，使得收益最大化'
      },
      {
        id: '9-e5',
        level: 'AI融合',
        title: 'AI 解释价格弹性',
        description: '让 AI 解释价格弹性的业务含义'
      },
      {
        id: '9-e6',
        level: 'AI融合',
        title: 'AI 生成定价策略',
        description: '生成不同场景下的动态定价策略建议'
      }
    ]
  },
  {
    id: 10,
    name: '基于大模型的商务数据分析智能问答助手全流程搭建',
    dataFile: 'project10_sample_db.csv',
    examples: [
      {
        id: '10-1',
        title: '例题 1：搭建 Streamlit 基础界面',
        code: `import streamlit as st
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
    # ...`
      }
    ],
    exercises: [
      {
        id: '10-e1',
        level: '基础',
        title: '配置 LangChain SQLDatabaseChain',
        description: '完成 LangChain 的 SQLDatabaseChain 配置'
      },
      {
        id: '10-e2',
        level: '基础',
        title: '自然语言转 SQL',
        description: '实现自然语言转 SQL 的基础功能'
      },
      {
        id: '10-e3',
        level: '进阶',
        title: '自动可视化功能',
        description: '添加自动可视化功能，根据查询结果自动生成图表'
      },
      {
        id: '10-e4',
        level: '进阶',
        title: '多轮对话功能',
        description: '实现多轮对话功能'
      },
      {
        id: '10-e5',
        level: 'AI融合',
        title: 'AI 业务解读',
        description: '让大模型自动对查询结果进行业务解读'
      },
      {
        id: '10-e6',
        level: 'AI融合',
        title: '部署智能问答助手',
        description: '部署完整的智能问答助手应用'
      }
    ]
  }
]
