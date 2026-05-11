# Python商务数据分析配套练习手册

本手册为课程 10 个实战项目提供配套的**课堂例题**与**课后练习题**，并附带完整的模拟数据集，帮助你从基础到进阶逐步掌握商务数据分析技能。

---

## 📦 配套数据文件说明

所有练习均基于以下模拟数据集，你可以直接下载并使用：

- `project1\_retail\_data\.csv` \- 零售门店经营数据

- `project2\_ecommerce\_orders\.csv` \- 电商用户订单数据

- `project3\_fmcg\_sales\.csv` \- 快消品销售时序数据

- `project4\_marketing\_content\.csv` \- AIGC 营销内容数据

- `project5\_customer\_churn\.csv` \- 客户流失预警数据

- `project6\_financial\_report\.csv` \- 上市公司财报数据

- `project7\_social\_media\.csv` \- 社媒舆情数据

- `project8\_ab\_test\.csv` \- 营销 AB 测试数据

- `project9\_pricing\_data\.csv` \- 动态定价数据

- `project10\_sample\_db\.csv` \- 智能问答助手示例数据

---

## 项目 1：零售门店经营数据 Python 全流程清洗与 AI 辅助基础洞察

### 📊 配套数据

`project1\_retail\_data\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：数据加载与缺失值处理**

```python
import pandas as pd
import numpy as np

# 1. 加载数据
df = pd.read_csv('project1_retail_data.csv')
print("原始数据形状:", df.shape)

# 2. 检查缺失值
print("\n缺失值统计:")
print(df.isnull().sum())

# 3. 处理缺失值：按门店和品类的均值填充
df['营收'] = df.groupby(['门店名称', '品类'])['营收'].transform(
    lambda x: x.fillna(x.mean())
)
df['客流量'] = df.groupby(['门店名称', '品类'])['客流量'].transform(
    lambda x: x.fillna(x.mean())
)

print("\n处理后缺失值统计:")
print(df.isnull().sum())
```

**例题 2：异常值检测与处理**

```python
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
```

**例题 3：核心经营指标计算**

```python
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
```

### 📚 课后练习题

1. **基础练习**：

    - 计算所有门店的月度营收排名，找出 Top3 和 Bottom3 的门店

    - 分析不同品类的销售占比，绘制饼图展示品类结构

2. **进阶练习**：

    - 计算各门店的坪效排名，分析坪效与营收的相关性

    - 识别经营异常的门店：哪些门店的毛利率显著低于平均水平？

3. **AI 融合练习**：

    - 将分析结果整理成 JSON 格式，调用大模型 API 生成门店经营洞察报告

    - 针对表现最差的门店，让 AI 生成具体的优化建议

---

## 项目 2：电商用户订单数据 RFM 用户分层与 AI 个性化运营标签生成

### 📊 配套数据

`project2\_ecommerce\_orders\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：RFM 指标计算**

```python
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
```

**例题 2：RFM 打分与分层**

```python
# 对RFM指标进行分箱打分 (1-5分)
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
    # ... 其他分层逻辑
    else:
        return '一般用户'

rfm['用户分层'] = rfm.apply(rfm_segment, axis=1)
print(rfm['用户分层'].value_counts())
```

### 📚 课后练习题

1. **基础练习**：

    - 完成完整的 8 类用户分层逻辑

    - 绘制用户分层的可视化图表，展示各分层用户的占比

2. **进阶练习**：

    - 分析不同分层用户的平均客单价和复购率差异

    - 计算各分层用户的生命周期价值 \(CLV\)

3. **AI 融合练习**：

    - 针对 \&\#34;重要挽留用户\&\#34;，调用大模型生成个性化的挽留话术

    - 为不同分层用户生成差异化的运营策略和触达方案

---

## 项目 3：快消品销售时序预测与 AI 智能库存预警

### 📊 配套数据

`project3\_fmcg\_sales\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：时序数据预处理**

```python
from prophet import Prophet

# 准备Prophet格式数据
sku_data = df[df['SKU'] == 'SKU1'][['日期', '销量']].copy()
sku_data.columns = ['ds', 'y']  # Prophet要求的列名

# 转换日期格式
sku_data['ds'] = pd.to_datetime(sku_data['ds'])
print(sku_data.head())
```

**例题 2：构建预测模型**

```python
# 初始化模型
model = Prophet(seasonality_mode='multiplicative', yearly_seasonality=True, weekly_seasonality=True)
model.fit(sku_data)

# 创建未来3个月的日期
future = model.make_future_dataframe(periods=90)
forecast = model.predict(future)

# 查看预测结果
fig1 = model.plot(forecast)
fig2 = model.plot_components(forecast)
```

### 📚 课后练习题

1. **基础练习**：

    - 为所有 20 个 SKU 批量构建预测模型

    - 提取未来 3 个月的销量预测结果

2. **进阶练习**：

    - 基于预测销量计算安全库存：安全库存 = 预测日均销量 \* 补货周期 \* 1\.5

    - 识别库存不足的 SKU，生成补货建议

3. **AI 融合练习**：

    - 分析销量异常波动的日期，让 AI 诊断可能的原因（促销？节假日？）

    - 生成分 SKU 的库存预警报告

---

## 项目 4：AIGC 营销内容效果归因分析与 AI 卖点优化建议生成

### 📊 配套数据

`project4\_marketing\_content\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：营销效果指标计算**

```python
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
```

**例题 2：文本关键词提取**

```python
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
```

### 📚 课后练习题

1. **基础练习**：

    - 找出转化率最高的 Top10 内容，分析它们的共同特征

    - 对比不同内容类型的效果差异

2. **进阶练习**：

    - 使用 K\-Means 对内容进行聚类，找出不同的内容主题

    - 分析情感倾向对转化率的影响

3. **AI 融合练习**：

    - 选取 3 条低转化的内容，让 AI 分析问题所在

    - 为低转化内容生成优化后的标题和文案建议

---

## 项目 5：企业客户流失预警分类模型与 AI 个性化挽留策略生成

### 📊 配套数据

`project5\_customer\_churn\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：数据预处理与特征工程**

```python
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
```

**例题 2：构建流失预警模型**

```python
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
```

### 📚 课后练习题

1. **基础练习**：

    - 尝试使用 LightGBM 模型，对比效果差异

    - 绘制混淆矩阵和 ROC 曲线

2. **进阶练习**：

    - 计算特征重要性，找出影响客户流失的 Top5 因素

    - 对客户进行流失风险分级（高 / 中 / 低风险）

3. **AI 融合练习**：

    - 选取 5 个高风险流失客户，根据他们的特征，让 AI 生成个性化的挽留策略

    - 为不同类型的流失客户生成不同的权益方案

---

## 项目 6：上市公司财报智能分析与 AI 经营风险预警

### 📊 配套数据

`project6\_financial\_report\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：财务指标计算**

```python
# 计算核心财务指标
df['资产负债率'] = df['总负债'] / df['总资产']
df['净资产收益率(ROE)'] = df['净利润'] / (df['总资产'] - df['总负债'])
df['销售净利率'] = df['净利润'] / df['营业收入']
df['应收账款周转率'] = df['营业收入'] / df['应收账款']
df['存货周转率'] = df['营业收入'] / df['存货']

print(df[['公司名称', '季度', 'ROE', '销售净利率', '资产负债率']].head())
```

**例题 2：杜邦分析**

```python
# 杜邦分析：ROE = 销售净利率 * 资产周转率 * 权益乘数
df['资产周转率'] = df['营业收入'] / df['总资产']
df['权益乘数'] = 1 / (1 - df['资产负债率'])
df['杜邦_ROE'] = df['销售净利率'] * df['资产周转率'] * df['权益乘数']

# 对比计算结果
print(df[['净资产收益率(ROE)', '杜邦_ROE']].head())
```

### 📚 课后练习题

1. **基础练习**：

    - 计算各公司的同比增长率，分析增长趋势

    - 进行行业对标，找出各指标的行业平均水平

2. **进阶练习**：

    - 识别异常财务指标：哪些公司的资产负债率显著高于行业平均？

    - 分析现金流与利润的匹配度

3. **AI 融合练习**：

    - 将所有财务指标输入大模型，让 AI 自动识别潜在的经营风险

    - 生成完整的企业经营诊断报告

---

## 项目 7：品牌社媒舆情与竞品声量智能监测分析

### 📊 配套数据

`project7\_social\_media\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：声量趋势分析**

```python
# 按日期和品牌统计声量
daily_volume = df.groupby(['发布时间', '提及品牌']).size().unstack().fillna(0)
daily_volume = daily_volume.resample('D').sum()

# 绘制趋势图
daily_volume.plot(figsize=(12,6), title='品牌声量趋势')
```

**例题 2：情感分析**

```python
# 各品牌情感分布
sentiment_dist = df.groupby(['提及品牌', '情感倾向']).size().unstack()
sentiment_dist = sentiment_dist.div(sentiment_dist.sum(axis=1), axis=0)
print(sentiment_dist)
```

### 📚 课后练习题

1. **基础练习**：

    - 对评论内容进行分词，生成词云图

    - 使用 LDA 主题模型，挖掘用户讨论的热点话题

2. **进阶练习**：

    - 对比品牌 A 与竞品的口碑差异

    - 识别负面评论中的高频痛点词

3. **AI 融合练习**：

    - 自动检测负面舆情，进行风险分级

    - 生成竞品对标分析报告，找出差异化竞争机会

---

## 项目 8：营销 AB 测试全流程分析与 AI 实验效果智能诊断

### 📊 配套数据

`project8\_ab\_test\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：基础效果分析**

```python
from scipy import stats

# 计算两组转化率
conversion_a = df[df['实验分组']=='A组(对照组)']['是否转化'].mean()
conversion_b = df[df['实验分组']=='B组(实验组)']['是否转化'].mean()

print(f"A组转化率: {conversion_a:.2%}")
print(f"B组转化率: {conversion_b:.2%}")
print(f"提升幅度: {(conversion_b-conversion_a)/conversion_a:.2%}")
```

**例题 2：统计显著性检验**

```python
# 卡方检验
a_convert = df[df['实验分组']=='A组(对照组)']['是否转化'].sum()
a_total = len(df[df['实验分组']=='A组(对照组)'])
b_convert = df[df['实验分组']=='B组(实验组)']['是否转化'].sum()
b_total = len(df[df['实验分组']=='B组(实验组)'])

observed = [[a_convert, a_total-a_convert], [b_convert, b_total-b_convert]]
chi2, p_value, dof, expected = stats.chi2_contingency(observed)

print(f"P值: {p_value:.4f}")
print(f"统计显著: {'是' if p_value < 0.05 else '否'}")
```

### 📚 课后练习题

1. **基础练习**：

    - 按年龄段、性别、设备类型进行细分维度分析

    - 检查不同细分群体的实验效果是否一致

2. **进阶练习**：

    - 计算实验所需的最小样本量，验证本次实验样本是否足够

    - 检查分组是否均衡，各维度的分布是否一致

3. **AI 融合练习**：

    - 将实验结果输入大模型，让 AI 诊断实验设计是否合理

    - 生成实验结论和规模化落地建议

---

## 项目 9：电商产品动态定价优化与 AI 收益最大化策略生成

### 📊 配套数据

`project9\_pricing\_data\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：价格弹性计算**

```python
# 计算价格变化率和需求变化率
df['price_change'] = df['当前定价'].pct_change()
df['demand_change'] = df['销量'].pct_change()

# 计算价格弹性
elasticity = df['demand_change'] / df['price_change']
elasticity = elasticity.dropna()
avg_elasticity = elasticity.mean()

print(f"平均价格弹性: {avg_elasticity:.2f}")
```

**例题 2：需求曲线拟合**

```python
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
```

### 📚 课后练习题

1. **基础练习**：

    - 绘制价格 \- 销量散点图，观察需求曲线

    - 分析节假日对需求的影响

2. **进阶练习**：

    - 构建收益函数：收益 = 价格 \* 需求

    - 寻找最优定价，使得收益最大化

3. **AI 融合练习**：

    - 让 AI 解释价格弹性的业务含义

    - 生成不同场景下的动态定价策略建议

---

## 项目 10：基于大模型的商务数据分析智能问答助手全流程搭建

### 📊 配套数据

`project10\_sample\_db\.csv`

### 📝 课堂例题（Step\-by\-Step）

**例题 1：搭建 Streamlit 基础界面**

```python
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
```

### 📚 课后练习题

1. **基础练习**：

    - 完成 LangChain 的 SQLDatabaseChain 配置

    - 实现自然语言转 SQL 的基础功能

2. **进阶练习**：

    - 添加自动可视化功能，根据查询结果自动生成图表

    - 实现多轮对话功能

3. **AI 融合练习**：

    - 让大模型自动对查询结果进行业务解读

    - 部署完整的智能问答助手应用

---

## 🎯 学习建议

1. **按顺序练习**：建议按照项目 1 到项目 10 的顺序进行练习，逐步提升技能

2. **先做例题，再做练习**：先跟着课堂例题走通流程，再独立完成课后练习

3. **重点关注 AI 融合**：每个项目的 AI 融合练习是核心，这是 AI 时代分析师的核心竞争力

4. **沉淀成果**：每个项目完成后，整理你的分析报告和代码，可直接用于简历和作品集

> （注：文档部分内容可能由 AI 生成）
