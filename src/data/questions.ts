export interface Example { id: string; title: string; code: string; }
export interface Exercise { id: string; level: '基础' | '进阶' | 'AI融合'; title: string; description: string; }
export interface ProjectQuestion { id: number; name: string; dataFile: string; examples: Example[]; exercises: Exercise[]; }
export interface ChoiceQuestion { id: string; type: 'choice'; question: string; options: string[]; correctAnswer: number; explanation: string; }
export interface PracticalQuestion { id: string; type: 'practical'; title: string; description: string; code: string; }
export type CourseQuestion = ChoiceQuestion | PracticalQuestion;
export interface CourseExercise { id: number; title: string; questions: CourseQuestion[]; }

export const questions: ProjectQuestion[] = [
  {
    id: 1,
    name: '零售门店经营分析',
    dataFile: 'project1_retail_data.csv',
    examples: [
      {
        id: '1-1',
        title: '数据加载与缺失值处理',
        code: `import pandas as pd\nimport numpy as np\n\n# 1. 加载数据\ndf = pd.read_csv('project1_retail_data.csv')\nprint("原始数据形状:", df.shape)\n\n# 2. 检查缺失值\nprint("\\n缺失值统计:")\nprint(df.isnull().sum())\n\n# 3. 处理缺失值：按门店和品类的均值填充\ndf['营收'] = df.groupby(['门店名称', '品类'])['营收'].transform(\n    lambda x: x.fillna(x.mean())\n)\ndf['客流量'] = df.groupby(['门店名称', '品类'])['客流量'].transform(\n    lambda x: x.fillna(x.mean())\n)\n\nprint("\\n处理后缺失值统计:")\nprint(df.isnull().sum())`
      },
      {
        id: '1-2',
        title: '异常值检测与处理',
        code: `# 使用箱线图法检测营收异常值\nQ1 = df['营收'].quantile(0.25)\nQ3 = df['营收'].quantile(0.75)\nIQR = Q3 - Q1\nlower_bound = Q1 - 1.5 * IQR\nupper_bound = Q3 + 1.5 * IQR\n\n# 标记异常值\ndf['is_outlier'] = (df['营收'] < lower_bound) | (df['营收'] > upper_bound)\nprint(f"异常值数量: {df['is_outlier'].sum()}")\n\n# 对异常值进行截断处理\ndf.loc[df['营收'] > upper_bound, '营收'] = upper_bound`
      },
      {
        id: '1-3',
        title: '核心经营指标计算',
        code: `# 按月度聚合计算门店指标\nmonthly_data = df.groupby(['门店名称', pd.Grouper(key='日期', freq='M')]).agg({\n    '营收': 'sum',\n    '客流量': 'sum',\n    '坪效': 'mean',\n    '毛利率': 'mean'\n}).reset_index()\n\n# 计算客单价\nmonthly_data['客单价'] = monthly_data['营收'] / monthly_data['客流量']\n\nprint(monthly_data.head())`
      }
    ],
    exercises: [
      { id: '1-1', level: '基础', title: '计算各门店的年度营收排名', description: '计算各门店的年度营收排名' },
      { id: '1-2', level: '基础', title: '分析不同品类的毛利率差异', description: '分析不同品类的毛利率差异' },
      { id: '1-3', level: '进阶', title: '绘制各门店的月度营收趋势图', description: '绘制各门店的月度营收趋势图' },
      { id: '1-4', level: '进阶', title: '计算门店的坪效排名', description: '计算门店的坪效排名' }
    ]
  },
  {
    id: 2,
    name: '电商用户 RFM 分层',
    dataFile: 'project2_ecommerce_orders.csv',
    examples: [
      {
        id: '2-1',
        title: 'RFM 指标计算',
        code: `from datetime import datetime\n\n# 定义分析截止日期\nsnapshot_date = datetime(2024, 1, 1)\n\n# 计算RFM指标\nrfm = df.groupby('用户ID').agg({\n    '订单日期': lambda x: (snapshot_date - x.max()).days,  # R: 最近购买时间\n    '订单ID': 'count',  # F: 购买频率\n    '订单金额': 'sum'   # M: 购买总金额\n}).reset_index()\n\nrfm.columns = ['用户ID', 'R', 'F', 'M']\nprint(rfm.describe())`
      },
      {
        id: '2-2',
        title: 'RFM 打分与分层',
        code: `# 对RFM指标进行分箱打分 (1-5分)\nrfm['R_score'] = pd.qcut(rfm['R'], 5, labels=[5,4,3,2,1])\nrfm['F_score'] = pd.qcut(rfm['F'].rank(method='first'), 5, labels=[1,2,3,4,5])\nrfm['M_score'] = pd.qcut(rfm['M'], 5, labels=[1,2,3,4,5])\n\n# 合并RFM分段\nrfm['RFM_Segment'] = rfm['R_score'].astype(str) + rfm['F_score'].astype(str) + rfm['M_score'].astype(str)\nrfm['RFM_Score'] = rfm['R_score'].astype(int) + rfm['F_score'].astype(int) + rfm['M_score'].astype(int)\n\n# 用户分层\ndef rfm_segment(row):\n    if row['R_score'] >=4 and row['F_score'] >=4 and row['M_score'] >=4:\n        return '重要价值用户'\n    elif row['R_score'] <=2 and row['F_score'] >=4 and row['M_score'] >=4:\n        return '重要挽留用户'\n    elif row['R_score'] >=4 and row['F_score'] <=2 and row['M_score'] >=4:\n        return '重要发展用户'\n    elif row['R_score'] >=4 and row['F_score'] >=4 and row['M_score'] <=2:\n        return '重要保持用户'\n    # ... 其他分层逻辑\n    else:\n        return '一般用户'\n\nrfm['用户分层'] = rfm.apply(rfm_segment, axis=1)\nprint(rfm['用户分层'].value_counts())`
      }
    ],
    exercises: [
      { id: '2-1', level: '基础', title: '完善完整的 8 类用户分层逻辑', description: '完善完整的 8 类用户分层逻辑' },
      { id: '2-2', level: '基础', title: '分析不同分层用户的平均客单价差异', description: '分析不同分层用户的平均客单价差异' },
      { id: '2-3', level: '进阶', title: '绘制 RFM 得分的热力图', description: '绘制 RFM 得分的热力图' },
      { id: '2-4', level: '进阶', title: '针对不同分层用户设计营销策略', description: '针对不同分层用户设计营销策略' }
    ]
  },
  {
    id: 3,
    name: '销量时序预测',
    dataFile: 'project3_fmcg_sales.csv',
    examples: [
      {
        id: '3-1',
        title: '时序数据预处理',
        code: `from prophet import Prophet\n\n# 准备Prophet格式数据\nsku_data = df[df['SKU'] == 'SKU1'][['日期', '销量']].copy()\nsku_data.columns = ['ds', 'y']  # Prophet要求的列名\n\n# 转换日期格式\nsku_data['ds'] = pd.to_datetime(sku_data['ds'])\nprint(sku_data.head())`
      },
      {
        id: '3-2',
        title: '构建预测模型',
        code: `# 初始化模型\nmodel = Prophet(seasonality_mode='multiplicative', yearly_seasonality=True, weekly_seasonality=True)\nmodel.fit(sku_data)\n\n# 创建未来3个月的日期\nfuture = model.make_future_dataframe(periods=90)\nforecast = model.predict(future)\n\n# 查看预测结果\nfig1 = model.plot(forecast)\nfig2 = model.plot_components(forecast)`
      }
    ],
    exercises: [
      { id: '3-1', level: '基础', title: '对 SKU2 进行同样的销量预测', description: '对 SKU2 进行同样的销量预测' },
      { id: '3-2', level: '基础', title: '加入节假日效应', description: '加入节假日效应' },
      { id: '3-3', level: '进阶', title: '评估模型的预测误差（MAE, RMSE）', description: '评估模型的预测误差（MAE, RMSE）' },
      { id: '3-4', level: '进阶', title: '基于预测结果计算补货建议', description: '基于预测结果计算补货建议' }
    ]
  },
  {
    id: 4,
    name: 'AIGC 营销内容效果分析',
    dataFile: 'project4_marketing_content.csv',
    examples: [
      {
        id: '4-1',
        title: '营销效果指标计算',
        code: `# 计算点击率、转化率\ndf['点击率'] = df['点击量'] / df['曝光量']\ndf['转化率'] = df['转化量'] / df['点击量']\n\n# 按平台分析效果\nplatform_perf = df.groupby('平台').agg({\n    '曝光量': 'sum',\n    '点击量': 'sum',\n    '转化量': 'sum'\n}).reset_index()\n\nplatform_perf['整体点击率'] = platform_perf['点击量'] / platform_perf['曝光量']\nplatform_perf['整体转化率'] = platform_perf['转化量'] / platform_perf['点击量']\nprint(platform_perf)`
      },
      {
        id: '4-2',
        title: '文本关键词提取',
        code: `import jieba\nfrom collections import Counter\n\n# 对高转化内容进行分词\nhigh_convert = df[df['转化率'] > df['转化率'].quantile(0.8)]\nall_words = []\nfor title in high_convert['内容标题']:\n    words = jieba.lcut(title)\n    all_words.extend(words)\n\n# 统计高频词\nword_freq = Counter(all_words)\nprint(word_freq.most_common(10))`
      }
    ],
    exercises: [
      { id: '4-1', level: '基础', title: '分析不同内容类型的效果差异', description: '分析不同内容类型的效果差异' },
      { id: '4-2', level: '基础', title: '找出转化率最高的关键词', description: '找出转化率最高的关键词' },
      { id: '4-3', level: '进阶', title: '分析内容发布时间对效果的影响', description: '分析内容发布时间对效果的影响' },
      { id: '4-4', level: '进阶', title: '基于分析结果给出内容优化建议', description: '基于分析结果给出内容优化建议' }
    ]
  },
  {
    id: 5,
    name: '客户流失预警',
    dataFile: 'project5_customer_churn.csv',
    examples: [
      {
        id: '5-1',
        title: '数据预处理与特征工程',
        code: `from sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler, OneHotEncoder\n\n# 类别变量编码\ncat_cols = ['合同类型', '支付方式']\nnum_cols = ['网龄(月)', '月费', '总费用']\n\n# 拆分训练测试集\nX = df[cat_cols + num_cols]\ny = df['是否流失']\n\n# 独热编码\nencoder = OneHotEncoder(sparse=False, drop='first')\nX_cat = encoder.fit_transform(X[cat_cols])\n\n# 数值变量标准化\nscaler = StandardScaler()\nX_num = scaler.fit_transform(X[num_cols])\n\n# 合并特征\nX_processed = np.hstack([X_cat, X_num])\n\nX_train, X_test, y_train, y_test = train_test_split(X_processed, y, test_size=0.2, random_state=42)`
      },
      {
        id: '5-2',
        title: '构建流失预警模型',
        code: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report, roc_auc_score\n\n# 训练模型\nmodel = LogisticRegression()\nmodel.fit(X_train, y_train)\n\n# 预测\ny_pred = model.predict(X_test)\ny_pred_proba = model.predict_proba(X_test)[:, 1]\n\n# 评估\nprint(classification_report(y_test, y_pred))\nprint(f"AUC: {roc_auc_score(y_test, y_pred_proba):.4f}")`
      }
    ],
    exercises: [
      { id: '5-1', level: '基础', title: '使用随机森林模型对比', description: '使用随机森林模型对比' },
      { id: '5-2', level: '基础', title: '分析特征重要性', description: '分析特征重要性' },
      { id: '5-3', level: '进阶', title: '找出流失概率最高的客户', description: '找出流失概率最高的客户' },
      { id: '5-4', level: '进阶', title: '设计挽留策略', description: '设计挽留策略' }
    ]
  },
  {
    id: 6,
    name: '上市公司财报分析',
    dataFile: 'project6_financial_report.csv',
    examples: [
      {
        id: '6-1',
        title: '财务指标计算',
        code: `# 计算核心财务指标\ndf['资产负债率'] = df['总负债'] / df['总资产']\ndf['净资产收益率(ROE)'] = df['净利润'] / (df['总资产'] - df['总负债'])\ndf['销售净利率'] = df['净利润'] / df['营业收入']\ndf['应收账款周转率'] = df['营业收入'] / df['应收账款']\ndf['存货周转率'] = df['营业收入'] / df['存货']\n\nprint(df[['公司名称', '季度', 'ROE', '销售净利率', '资产负债率']].head())`
      },
      {
        id: '6-2',
        title: '杜邦分析',
        code: `# 杜邦分析：ROE = 销售净利率 * 资产周转率 * 权益乘数\ndf['资产周转率'] = df['营业收入'] / df['总资产']\ndf['权益乘数'] = 1 / (1 - df['资产负债率'])\ndf['杜邦_ROE'] = df['销售净利率'] * df['资产周转率'] * df['权益乘数']\n\n# 对比计算结果\nprint(df[['净资产收益率(ROE)', '杜邦_ROE']].head())`
      }
    ],
    exercises: [
      { id: '6-1', level: '基础', title: '计算各公司的现金流指标', description: '计算各公司的现金流指标' },
      { id: '6-2', level: '基础', title: '对比不同行业的财务指标差异', description: '对比不同行业的财务指标差异' },
      { id: '6-3', level: '进阶', title: '找出 ROE 增长最快的公司', description: '找出 ROE 增长最快的公司' },
      { id: '6-4', level: '进阶', title: '基于杜邦分析，分析各公司 ROE 的驱动因素', description: '基于杜邦分析，分析各公司 ROE 的驱动因素' }
    ]
  },
  {
    id: 7,
    name: '社媒舆情分析',
    dataFile: 'project7_social_media.csv',
    examples: [
      {
        id: '7-1',
        title: '声量趋势分析',
        code: `# 按日期和品牌统计声量\ndaily_volume = df.groupby(['发布时间', '提及品牌']).size().unstack().fillna(0)\ndaily_volume = daily_volume.resample('D').sum()\n\n# 绘制趋势图\ndaily_volume.plot(figsize=(12,6), title='品牌声量趋势')`
      },
      {
        id: '7-2',
        title: '情感分析',
        code: `# 各品牌情感分布\nsentiment_dist = df.groupby(['提及品牌', '情感倾向']).size().unstack()\nsentiment_dist = sentiment_dist.div(sentiment_dist.sum(axis=1), axis=0)\nprint(sentiment_dist)`
      }
    ],
    exercises: [
      { id: '7-1', level: '基础', title: '找出负面评论中的高频关键词', description: '找出负面评论中的高频关键词' },
      { id: '7-2', level: '基础', title: '分析周末和工作日的声量差异', description: '分析周末和工作日的声量差异' },
      { id: '7-3', level: '进阶', title: '绘制各品牌的情感分布饼图', description: '绘制各品牌的情感分布饼图' },
      { id: '7-4', level: '进阶', title: '识别舆情热点事件的时间点', description: '识别舆情热点事件的时间点' }
    ]
  },
  {
    id: 8,
    name: '营销 AB 测试',
    dataFile: 'project8_ab_test.csv',
    examples: [
      {
        id: '8-1',
        title: '基础效果分析',
        code: `from scipy import stats\n\n# 计算两组转化率\nconversion_a = df[df['实验分组']=='A组(对照组)']['是否转化'].mean()\nconversion_b = df[df['实验分组']=='B组(实验组)']['是否转化'].mean()\n\nprint(f"A组转化率: {conversion_a:.2%}")\nprint(f"B组转化率: {conversion_b:.2%}")\nprint(f"提升幅度: {(conversion_b-conversion_a)/conversion_a:.2%}")`
      },
      {
        id: '8-2',
        title: '统计显著性检验',
        code: `# 卡方检验\na_convert = df[df['实验分组']=='A组(对照组)']['是否转化'].sum()\na_total = len(df[df['实验分组']=='A组(对照组)'])\nb_convert = df[df['实验分组']=='B组(实验组)']['是否转化'].sum()\nb_total = len(df[df['实验分组']=='B组(实验组)'])\n\nobserved = [[a_convert, a_total-a_convert], [b_convert, b_total-b_convert]]\nchi2, p_value, dof, expected = stats.chi2_contingency(observed)\n\nprint(f"P值: {p_value:.4f}")\nprint(f"统计显著: {'是' if p_value < 0.05 else '否'}")`
      }
    ],
    exercises: [
      { id: '8-1', level: '基础', title: '分析不同用户群体的实验效果差异', description: '分析不同用户群体的实验效果差异' },
      { id: '8-2', level: '基础', title: '计算统计功效 Power', description: '计算统计功效 Power' },
      { id: '8-3', level: '进阶', title: '计算实验最小样本量', description: '计算实验最小样本量' },
      { id: '8-4', level: '进阶', title: '基于实验结果给出产品迭代建议', description: '基于实验结果给出产品迭代建议' }
    ]
  },
  {
    id: 9,
    name: '动态定价优化',
    dataFile: 'project9_pricing_data.csv',
    examples: [
      {
        id: '9-1',
        title: '价格弹性计算',
        code: `from sklearn.linear_model import LinearRegression\n\n# 计算价格弹性\nX = np.log(df['价格']).values.reshape(-1, 1)\ny = np.log(df['销量']).values\n\nmodel = LinearRegression()\nmodel.fit(X, y)\nelasticity = model.coef_[0]\n\nprint(f"价格弹性: {elasticity:.2f}")\nprint(f"价格上涨1%，销量下降: {-elasticity:.2f}%")`
      },
      {
        id: '9-2',
        title: '需求曲线拟合',
        code: `# 拟合需求曲线\nx = df['价格'].values\ny = df['销量'].values\n\n# 二次多项式拟合\nz = np.polyfit(x, y, 2)\np = np.poly1d(z)\n\n# 绘制需求曲线\nx_new = np.linspace(x.min(), x.max(), 100)\nplt.scatter(x, y)\nplt.plot(x_new, p(x_new), 'r-')\nplt.title('需求曲线拟合')\nplt.xlabel('价格')\nplt.ylabel('销量')`
      }
    ],
    exercises: [
      { id: '9-1', level: '基础', title: '基于需求曲线计算最优定价', description: '基于需求曲线计算最优定价' },
      { id: '9-2', level: '基础', title: '分析不同时间段的价格弹性差异', description: '分析不同时间段的价格弹性差异' },
      { id: '9-3', level: '进阶', title: '计算不同价格下的预期收入', description: '计算不同价格下的预期收入' },
      { id: '9-4', level: '进阶', title: '设计动态定价策略', description: '设计动态定价策略' }
    ]
  },
  {
    id: 10,
    name: '智能问答系统',
    dataFile: 'project10_sample_db.csv',
    examples: [
      {
        id: '10-1',
        title: '搭建 Streamlit 基础界面',
        code: `import streamlit as st\nimport pandas as pd\n\n# 加载数据\ndf = pd.read_csv('project10_sample_db.csv')\n\n# 页面标题\nst.title("智能业务问答系统")\n\n# 用户输入\nquestion = st.text_input("请输入您的问题:")\n\nif question:\n    # 简单的问答逻辑示例\n    if "营收" in question:\n        total_revenue = df['营收'].sum()\n        st.write(f"总营收为: {total_revenue:.2f}")\n    elif "用户" in question:\n        total_users = df['用户数'].sum()\n        st.write(f"总用户数为: {total_users}")`
      }
    ],
    exercises: [
      { id: '10-1', level: '基础', title: '完善更多的问答规则', description: '完善更多的问答规则' },
      { id: '10-2', level: '基础', title: '集成 OpenAI API 实现真正的自然语言问答', description: '集成 OpenAI API 实现真正的自然语言问答' },
      { id: '10-3', level: '进阶', title: '添加数据可视化功能', description: '添加数据可视化功能' },
      { id: '10-4', level: '进阶', title: '实现对话历史记录功能', description: '实现对话历史记录功能' }
    ]
  }
];

export const courseExercises: CourseExercise[] = [
  {
    id: 1,
    title: '数据清洗',
    questions: [
      { id: '1-1', type: 'choice', question: '以下哪个操作不属于 Pandas 中数据清洗的常用操作？', options: ['`drop_duplicates()`删除重复数据', '`fillna()`处理缺失值', '`sort_values()`数据排序', '`astype()`转换数据类型'], correctAnswer: 2, explanation: 'sort_values()是数据排序操作，不属于数据清洗的范畴。' },
      { id: '1-2', type: 'choice', question: '在数据清洗中，针对数值型特征的缺失值，以下哪种方法最不适合用于偏态分布的数据？', options: ['均值填充', '中位数填充', '众数填充', '插值填充'], correctAnswer: 0, explanation: '均值填充对偏态分布的数据影响较大，因为均值会受到极端值的影响。' },
      { id: '1-3', type: 'choice', question: '客户年龄字段中出现了 500 岁的记录，这种数据属于？', options: ['逻辑错误数据', '格式错误数据', '重复数据', '缺失数据'], correctAnswer: 0, explanation: '500岁明显违反常理，属于逻辑错误数据。' },
      { id: '1-4', type: 'choice', question: '在 Pandas 中，要删除 DataFrame 中所有缺失值占比超过 30% 的列，以下哪个代码是正确的？', options: ['`df.dropna(thresh=0.7*len(df), axis=1)`', '`df.dropna(thresh=0.3*len(df), axis=1)`', '`df.dropna(how=\'any\', axis=1)`', '`df.dropna(how=\'all\', axis=1)`'], correctAnswer: 0, explanation: 'thresh=0.7*len(df)表示保留非空值数量大于70%的列，即删除缺失值超过30%的列。' },
      { id: '1-5', type: 'choice', question: '以下哪种情况会导致数据出现重复值？', options: ['数据采集时多次提交同一记录', '数据类型转换错误', '缺失值填充', '异常值检测'], correctAnswer: 0, explanation: '数据采集时多次提交同一记录会导致重复值。' },
      { id: '1-6', type: 'choice', question: '数据清洗中，处理缺失值时，以下哪种方法可能会导致数据丢失大量信息？', options: ['直接删除含有缺失值的记录', '均值填充', '中位数填充', 'KNN 填充'], correctAnswer: 0, explanation: '直接删除含有缺失值的记录会丢失大量其他非缺失的数据。' },
      { id: '1-7', type: 'choice', question: '以下哪个是数据清洗中需要处理的格式错误？', options: ['日期字段存储为字符串格式', '消费金额为负数', '年龄为负数', '同一用户的多条记录'], correctAnswer: 0, explanation: '日期字段存储为字符串格式是格式错误，需要进行格式转换。' },
      { id: '1-8', type: 'choice', question: '检查数据一致性的主要目的是？', options: ['确保数据之间的逻辑关系正确', '删除重复数据', '填充缺失值', '转换数据类型'], correctAnswer: 0, explanation: '检查数据一致性是为了确保数据之间的逻辑关系正确。' },
      { id: '1-9', type: 'choice', question: '对于类别型特征的缺失值，以下哪种填充方法最合理？', options: ['用众数填充', '用均值填充', '用中位数填充', '删除该列'], correctAnswer: 0, explanation: '类别型特征用众数填充最合理，因为类别型数据无法计算均值和中位数。' },
      { id: '1-10', type: 'choice', question: '以下关于 Pandas 中数据清洗的描述，错误的是？', options: ['数据清洗只需要处理缺失值和重复值', '数据清洗可以提升后续分析的准确性', '数据清洗需要处理逻辑错误的数据', '数据清洗是数据分析的前置步骤'], correctAnswer: 0, explanation: '数据清洗不仅需要处理缺失值和重复值，还需要处理格式错误、逻辑错误等。' },
      { id: '1-p1', type: 'practical', title: '数据清洗实操题', description: '现有一份电商用户数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、年龄、性别、消费金额、注册时间，其中存在部分缺失值、重复记录以及年龄为负数的异常数据。请使用 Python 完成以下操作：\n\n1. 使用`drop_duplicates()`删除重复的用户记录；\n\n2. 处理年龄字段的异常值，将负数的年龄替换为该字段的中位数；\n\n3. 对性别字段的缺失值，用众数进行填充；\n\n4. 对消费金额的缺失值，用均值进行填充。', code: `# 去重\ndf = df.drop_duplicates(subset='用户ID')\n# 处理年龄异常值\nage_median = df['年龄'].median()\ndf.loc[df['年龄'] < 0, '年龄'] = age_median\n# 填充性别缺失值\ngender_mode = df['性别'].mode()[0]\ndf['性别'] = df['性别'].fillna(gender_mode)\n# 填充消费金额缺失值\namount_mean = df['消费金额'].mean()\ndf['消费金额'] = df['消费金额'].fillna(amount_mean)` }
    ]
  },
  {
    id: 2,
    title: '分组聚合分析',
    questions: [
      { id: '2-1', type: 'choice', question: '在 Pandas 的分组聚合中，对分组后的结果进行条件筛选，以下哪个方法可以实现？', options: ['`filter()`', '`select()`', '`where()`', '`sort()`'], correctAnswer: 0, explanation: '' },
      { id: '2-2', type: 'choice', question: '在 Pandas 中，使用 groupby 按部门分组后，要计算每个部门的平均工资，以下哪个代码是正确的？', options: ['`df.groupby(\'部门\')[\'工资\'].mean()`', '`df.groupby(\'工资\')[\'部门\'].mean()`', '`df.groupby(\'部门\').sum()`', '`df.groupby(\'工资\').count()`'], correctAnswer: 0, explanation: '' },
      { id: '2-3', type: 'choice', question: '以下关于 Pandas 中分组筛选的描述，正确的是？', options: ['`filter()`在分组后筛选，`query()`在分组前筛选', '`query()`在分组后筛选，`filter()`在分组前筛选', '两者没有区别', '`filter()`可以用于聚合函数的条件，`query()`不行'], correctAnswer: 0, explanation: '' },
      { id: '2-4', type: 'choice', question: '要实现数据透视表的功能，在 Pandas 中可以使用以下哪个函数？', options: ['`pivot_table()`', '`groupby()`', '`merge()`', '`concat()`'], correctAnswer: 0, explanation: '' },
      { id: '2-5', type: 'choice', question: '多列分组（比如按地区和商品类别分组）的主要作用是？', options: ['从多个维度进行聚合分析', '删除重复数据', '合并数据集', '处理缺失值'], correctAnswer: 0, explanation: '' },
      { id: '2-6', type: 'choice', question: '以下哪个不属于 Pandas 中常用的聚合函数？', options: ['`count()`', '`sum()`', '`mean()`', '`insert()`'], correctAnswer: 3, explanation: 'insert()不是聚合函数，它是用于插入列的函数。' },
      { id: '2-7', type: 'choice', question: '在分组聚合后，要获取每个分组中销售额最高的那条记录，以下哪种方法最有效？', options: ['使用 groupby 后的`apply()`方法', '使用`filter()`方法', '使用`transform()`方法', '使用`sort()`方法'], correctAnswer: 0, explanation: '' },
      { id: '2-8', type: 'choice', question: '以下关于`transform()`方法的描述，正确的是？', options: ['可以对分组后的每个元素进行广播运算', '只能用于计算聚合值', '会改变数据的行数', '无法用于分组标准化操作'], correctAnswer: 0, explanation: '' },
      { id: '2-9', type: 'choice', question: '要统计每个地区的订单数量，以下哪个 Pandas 代码是正确的？', options: ['`df.groupby(\'地区\')[\'订单ID\'].count()`', '`df.groupby(\'订单ID\')[\'地区\'].sum()`', '`df.groupby(\'地区\').mean()`', '`df[\'订单ID\'].count()`'], correctAnswer: 0, explanation: '' },
      { id: '2-10', type: 'choice', question: '分组聚合分析中，`agg()`方法的主要作用是？', options: ['对分组后的数据同时应用多个聚合函数', '过滤掉不符合条件的分组', '过滤掉不符合条件的行', '转换数据类型'], correctAnswer: 0, explanation: '' },
      { id: '2-p1', type: 'practical', title: '分组聚合分析实操题', description: '现有一份销售数据，已读取为 Pandas 的 DataFrame，包含列：订单 ID、地区、商品类别、销售额、订单日期。请使用 Python 完成以下操作：\n\n1. 按地区和商品类别进行分组，使用`agg()`计算每个分组的总销售额和平均销售额；\n\n2. 筛选出总销售额大于 10000 的分组；\n\n3. 按总销售额降序排序，展示前 5 个分组。', code: `# 分组聚合\ngrouped = df.groupby(['地区', '商品类别'])['销售额'].agg(['sum', 'mean']).reset_index()\ngrouped.columns = ['地区', '商品类别', '总销售额', '平均销售额']\n# 筛选\nfiltered = grouped[grouped['总销售额'] > 10000]\n# 排序\nresult = filtered.sort_values('总销售额', ascending=False).head(5)` }
    ]
  },
  {
    id: 3,
    title: '购物篮分析',
    questions: [
      { id: '3-1', type: 'choice', question: '购物篮分析的核心是挖掘以下哪种规则？', options: ['关联规则', '分类规则', '聚类规则', '回归规则'], correctAnswer: 0, explanation: '' },
      { id: '3-2', type: 'choice', question: '关联规则中，支持度 (Support) 的含义是？', options: ['包含 X 和 Y 的交易数占总交易数的比例', '在购买 X 的情况下，购买 Y 的概率', '规则 X→Y 的提升程度', '项集的频繁程度'], correctAnswer: 0, explanation: '' },
      { id: '3-3', type: 'choice', question: '置信度 (Confidence) 的计算公式是？', options: ['`Confidence(X→Y) = P(Y|X)`', '`Confidence(X→Y) = P(X,Y)`', '`Confidence(X→Y) = P(X)/P(Y)`', '`Confidence(X→Y) = P(Y)/P(X)`'], correctAnswer: 0, explanation: '' },
      { id: '3-4', type: 'choice', question: 'Apriori 算法的先验原理是？', options: ['如果一个项集是频繁的，那么它的所有子集也一定是频繁的', '如果一个项集是频繁的，那么它的所有超集也一定是频繁的', '频繁项集的支持度一定大于 0.5', '关联规则的置信度一定大于 0.5'], correctAnswer: 0, explanation: '' },
      { id: '3-5', type: 'choice', question: '提升度 (Lift) 的作用是？', options: ['衡量关联规则的相关性，判断规则是否有价值', '衡量项集的频繁程度', '衡量规则的置信度', '衡量规则的支持度'], correctAnswer: 0, explanation: '' },
      { id: '3-6', type: 'choice', question: '在 Python 的 mlxtend 库中，以下哪个函数用于挖掘频繁项集？', options: ['`apriori()`', '`association_rules()`', '`fpgrowth()`', '`kmeans()`'], correctAnswer: 0, explanation: '' },
      { id: '3-7', type: 'choice', question: '当提升度 Lift (X→Y)=1 时，说明什么？', options: ['X 和 Y 是独立的，没有相关性', 'X 和 Y 正相关', 'X 和 Y 负相关', '规则 X→Y 是强规则'], correctAnswer: 0, explanation: '' },
      { id: '3-8', type: 'choice', question: 'Apriori 算法的缺点是？', options: ['需要多次扫描数据库，效率较低', '无法处理高维数据', '无法发现长的频繁项集', '无法计算置信度'], correctAnswer: 0, explanation: '' },
      { id: '3-9', type: 'choice', question: '以下哪个算法是为了优化 Apriori 的效率而提出的？', options: ['FP-Growth', 'K-Means', 'ARIMA', '决策树'], correctAnswer: 0, explanation: '' },
      { id: '3-10', type: 'choice', question: '关联规则 {啤酒}→{尿布} 的提升度为 2.5，说明什么？', options: ['购买啤酒的用户，购买尿布的概率是随机用户的 2.5 倍', '购买啤酒和尿布的用户占总用户的 2.5%', '这个规则的置信度是 2.5', '这个规则的支持度是 2.5'], correctAnswer: 0, explanation: '' },
      { id: '3-p1', type: 'practical', title: '购物篮分析实操题', description: '现有一份超市的交易数据，每一行代表一次交易，包含交易 ID 和购买的商品列表，已处理为 one-hot 编码的 DataFrame。请使用 Python 的 mlxtend 库完成以下操作：\n\n1. 使用`apriori()`挖掘频繁项集，设置最小支持度为 0.05；\n\n2. 基于频繁项集，使用`association_rules()`生成关联规则，设置最小置信度为 0.6；\n\n3. 筛选出提升度大于 1 的规则，展示这些规则的支持度、置信度和提升度。', code: `from mlxtend.frequent_patterns import apriori, association_rules\n# 挖掘频繁项集\nfrequent_itemsets = apriori(df, min_support=0.05, use_colnames=True)\n# 生成规则\nrules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.6)\n# 筛选提升度>1的规则\nrules = rules[rules['lift'] > 1]` }
    ]
  },
  {
    id: 4,
    title: '客户聚类分析',
    questions: [
      { id: '4-1', type: 'choice', question: '客户聚类分析属于以下哪种机器学习类型？', options: ['无监督学习', '监督学习', '半监督学习', '强化学习'], correctAnswer: 0, explanation: '' },
      { id: '4-2', type: 'choice', question: '在 Scikit-learn 中，K-Means 算法的核心目标是？', options: ['最小化样本点到其所属聚类中心的距离平方和', '最大化不同聚类之间的距离', '最小化聚类的数量', '最大化样本的相似度'], correctAnswer: 0, explanation: '' },
      { id: '4-3', type: 'choice', question: 'RFM 模型中的 R 代表什么？', options: ['最近一次消费时间', '消费频率', '消费金额', '客户年龄'], correctAnswer: 0, explanation: '' },
      { id: '4-4', type: 'choice', question: 'RFM 模型中的 F 代表什么？', options: ['消费频率', '最近一次消费时间', '消费金额', '客户性别'], correctAnswer: 0, explanation: '' },
      { id: '4-5', type: 'choice', question: 'RFM 模型中的 M 代表什么？', options: ['消费金额', '最近一次消费时间', '消费频率', '客户地域'], correctAnswer: 0, explanation: '' },
      { id: '4-6', type: 'choice', question: '在 Python 中，肘部法则的作用是？', options: ['选择 K-Means 的最优聚类数量 K', '选择最优的聚类中心', '检测异常值', '标准化数据'], correctAnswer: 0, explanation: '' },
      { id: '4-7', type: 'choice', question: '轮廓系数的作用是？', options: ['评估聚类的效果，衡量聚类的紧密性和分离度', '选择最优的 K 值', '计算聚类中心', '标准化数据'], correctAnswer: 0, explanation: '' },
      { id: '4-8', type: 'choice', question: '在使用 K-Means 之前，通常需要对数据进行什么操作？', options: ['使用 StandardScaler 标准化，消除量纲的影响', '缺失值填充', '重复值删除', '数据类型转换'], correctAnswer: 0, explanation: '' },
      { id: '4-9', type: 'choice', question: '以下哪个不是 K-Means 算法的缺点？', options: ['对异常值不敏感', '需要预先指定 K 值', '对初始聚类中心敏感', '容易收敛到局部最优'], correctAnswer: 0, explanation: '' },
      { id: '4-10', type: 'choice', question: '在 Scikit-learn 中，K-Means 的初始化参数`n_clusters`的作用是？', options: ['指定聚类的数量 K', '指定初始聚类中心', '指定最大迭代次数', '指定随机种子'], correctAnswer: 0, explanation: '' },
      { id: '4-p1', type: 'practical', title: '客户聚类分析实操题', description: '现有一份电商客户的消费数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、最近一次消费时间（Recency）、消费频率（Frequency）、消费金额（Monetary）。请使用 Python 的 Scikit-learn 库完成以下操作：\n\n1. 使用`StandardScaler`对 RFM 三个特征进行标准化处理；\n\n2. 遍历不同的 K 值，计算每个 K 对应的 SSE，绘制肘部图选择最优的聚类数量；\n\n3. 使用`KMeans`算法对客户进行聚类；\n\n4. 分析每个聚类的 RFM 特征，给每个聚类命名（比如高价值客户、流失客户等）。', code: `from sklearn.preprocessing import StandardScaler\nfrom sklearn.cluster import KMeans\n# 标准化\nscaler = StandardScaler()\nrfm_scaled = scaler.fit_transform(df[['Recency', 'Frequency', 'Monetary']])\n# 肘部法则选K\nsse = []\nfor k in range(1, 10):\n    kmeans = KMeans(n_clusters=k, random_state=42)\n    kmeans.fit(rfm_scaled)\n    sse.append(kmeans.inertia_)\n# 聚类\nkmeans = KMeans(n_clusters=4, random_state=42)\ndf['聚类'] = kmeans.fit_predict(rfm_scaled)\n# 分析聚类特征\ncluster_profile = df.groupby('聚类')[['Recency', 'Frequency', 'Monetary']].mean()\n# 命名：比如根据均值，高R低F的是流失客户，低R高F高M的是高价值客户` }
    ]
  },
  {
    id: 5,
    title: '数据可视化',
    questions: [
      { id: '5-1', type: 'choice', question: '要展示不同类别之间的数量比较，最适合使用以下哪种 Matplotlib/Seaborn 图表？', options: ['柱状图', '折线图', '饼图', '散点图'], correctAnswer: 0, explanation: '' },
      { id: '5-2', type: 'choice', question: '要展示数据随时间的变化趋势，最适合使用以下哪种图表？', options: ['折线图', '柱状图', '饼图', '箱线图'], correctAnswer: 0, explanation: '' },
      { id: '5-3', type: 'choice', question: '要展示部分与整体的比例关系，最适合使用以下哪种图表？', options: ['饼图', '折线图', '散点图', '箱线图'], correctAnswer: 0, explanation: '' },
      { id: '5-4', type: 'choice', question: '要揭示数据中的异常值，最适合使用以下哪种图表？', options: ['箱线图', '饼图', '折线图', '柱状图'], correctAnswer: 0, explanation: '' },
      { id: '5-5', type: 'choice', question: '要展示两个数值变量之间的相关性，最适合使用以下哪种图表？', options: ['散点图', '饼图', '箱线图', '雷达图'], correctAnswer: 0, explanation: '' },
      { id: '5-6', type: 'choice', question: '以下哪个 Python 库不是常用的数据可视化库？', options: ['NumPy', 'Matplotlib', 'Seaborn', 'Plotly'], correctAnswer: 0, explanation: '' },
      { id: '5-7', type: 'choice', question: '以下哪种图表最适合展示多个维度的指标对比？', options: ['雷达图', '饼图', '折线图', '柱状图'], correctAnswer: 0, explanation: '' },
      { id: '5-8', type: 'choice', question: '在数据可视化中，以下哪种做法是错误的？', options: ['截断坐标轴，放大数据差异，误导用户', '使用清晰的标签和标题', '选择合适的配色，照顾色弱用户', '避免使用 3D 效果，防止误导'], correctAnswer: 0, explanation: '' },
      { id: '5-9', type: 'choice', question: '要展示数据的分布情况，比如年龄的分布，最适合使用以下哪种图表？', options: ['直方图', '折线图', '饼图', '散点图'], correctAnswer: 0, explanation: '' },
      { id: '5-10', type: 'choice', question: '热力图最适合用来展示以下哪种信息？', options: ['两个分类变量之间的相关性或数值大小', '数据的时间趋势', '部分与整体的比例', '异常值的分布'], correctAnswer: 0, explanation: '' },
      { id: '5-p1', type: 'practical', title: '数据可视化实操题', description: '现有一份电商销售数据，已读取为 Pandas 的 DataFrame，包含列：日期、地区、销售额、用户年龄。请使用 Python 的 Matplotlib/Seaborn 库完成以下操作：\n\n1. 绘制折线图，展示销售额随日期的变化趋势；\n\n2. 绘制柱状图，展示不同地区的总销售额对比；\n\n3. 绘制直方图，展示用户年龄的分布情况；\n\n4. 为每个图表添加清晰的标题和坐标轴标签。', code: `import matplotlib.pyplot as plt\nimport seaborn as sns\n# 折线图\nplt.figure(figsize=(12,6))\ndf.groupby('日期')['销售额'].sum().plot()\nplt.title('销售额随日期变化趋势')\nplt.xlabel('日期')\nplt.ylabel('销售额')\nplt.show()\n# 柱状图\nplt.figure(figsize=(12,6))\ndf.groupby('地区')['销售额'].sum().plot(kind='bar')\nplt.title('各地区总销售额对比')\nplt.xlabel('地区')\nplt.ylabel('总销售额')\nplt.show()\n# 直方图\nplt.figure(figsize=(12,6))\nsns.histplot(df['用户年龄'], bins=20)\nplt.title('用户年龄分布')\nplt.xlabel('年龄')\nplt.ylabel('频数')\nplt.show()` }
    ]
  },
  {
    id: 6,
    title: 'A/B测试分析',
    questions: [
      { id: '6-1', type: 'choice', question: 'A/B 测试的零假设通常是什么？', options: ['实验组和对照组的指标没有差异', '实验组的指标优于对照组', '对照组的指标优于实验组', '实验组和对照组的样本量相同'], correctAnswer: 2, explanation: '当p值小于0.05时，我们拒绝零假设，认为实验组和对照组有显著差异。' },
      { id: '6-2', type: 'choice', question: 'p 值的含义是？', options: ['在零假设成立的情况下，观测到当前结果或更极端结果的概率', '零假设成立的概率', '实验组优于对照组的概率', '结果显著的概率'], correctAnswer: 0, explanation: '' },
      { id: '6-3', type: 'choice', question: '通常情况下，当 p 值小于多少时，我们认为结果具有统计显著性？', options: ['0.05', '0.5', '0.1', '0.01'], correctAnswer: 0, explanation: '' },
      { id: '6-4', type: 'choice', question: '第一类错误（Type I Error）指的是？', options: ['原假设为真时，错误地拒绝了原假设（假阳性）', '原假设为假时，错误地接受了原假设（假阴性）', '样本量不足导致的错误', '分流不均匀导致的错误'], correctAnswer: 0, explanation: '' },
      { id: '6-5', type: 'choice', question: '第二类错误（Type II Error）指的是？', options: ['原假设为假时，错误地接受了原假设（假阴性）', '原假设为真时，错误地拒绝了原假设（假阳性）', '样本量过大导致的错误', '指标选择错误导致的错误'], correctAnswer: 0, explanation: '' },
      { id: '6-6', type: 'choice', question: '在 Python 中，以下哪个库可以用于 A/B 测试的样本量计算？', options: ['statsmodels', 'pandas', 'numpy', 'matplotlib'], correctAnswer: 0, explanation: '' },
      { id: '6-7', type: 'choice', question: '以下哪个不是 A/B 测试的常见误区？', options: ['提前停止实验，看结果显著就结束', '同时测试多个指标，不做校正', '保证分流的均匀性', '样本量不足就分析结果'], correctAnswer: 2, explanation: '' },
      { id: '6-8', type: 'choice', question: 'Bonferroni 校正的作用是？', options: ['解决多重检验问题，降低假阳性的概率', '提高样本量', '校正分流的不均匀性', '校正 p 值的计算错误'], correctAnswer: 0, explanation: '' },
      { id: '6-9', type: 'choice', question: 'A/B 测试中，分流的原则是？', options: ['随机分流，保证实验组和对照组的用户特征一致', '按用户 ID 的奇偶分流，不需要随机', '让新用户进入实验组，老用户进入对照组', '按地域分流'], correctAnswer: 0, explanation: '' },
      { id: '6-10', type: 'choice', question: '在 Python 中，要对两个比例进行假设检验，通常使用以下哪个函数？', options: ['`proportions_ztest()`', '`ttest_ind()`', '`ttest_rel()`', '`chi2_contingency()`'], correctAnswer: 0, explanation: '' },
      { id: '6-p1', type: 'practical', title: 'A/B测试分析实操题', description: '现有一份 A/B 测试的结果数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、分组（对照组 / 实验组）、是否点击、是否转化。对照组有 10000 个用户，点击率为 5%，转化率为 2%；实验组有 10000 个用户，点击率为 5.8%，转化率为 2.3%。请使用 Python 的 statsmodels 库完成以下操作：\n\n1. 对点击率进行比例检验，计算 p 值，判断是否具有统计显著性；\n\n2. 对转化率进行比例检验，计算 p 值，判断是否具有统计显著性；\n\n3. 分析实验结果，判断新版本是否可以上线。', code: `from statsmodels.stats.proportion import proportions_ztest\n# 点击率检验\nclick_ctrl, click_exp = 500, 580\nn_ctrl, n_exp = 10000, 10000\ncount = [click_ctrl, click_exp]\nnobs = [n_ctrl, n_exp]\nz_stat, p_val_click = proportions_ztest(count, nobs)\n# 转化率检验\nconv_ctrl, conv_exp = 200, 230\ncount = [conv_ctrl, conv_exp]\nz_stat, p_val_conv = proportions_ztest(count, nobs)\n# 判断是否显著\nprint(f'点击率p值: {p_val_click}, 转化率p值: {p_val_conv}')\n# 如果p值都小于0.05，且实验组指标更高，可以上线` }
    ]
  },
  {
    id: 7,
    title: '时间序列分析',
    questions: [
      { id: '7-1', type: 'choice', question: '弱平稳时间序列的必要条件不包括以下哪项？', options: ['均值随时间变化', '方差恒定', '自协方差仅依赖于时间间隔', '均值恒定'], correctAnswer: 0, explanation: '' },
      { id: '7-2', type: 'choice', question: '在 Python 中，以下哪个检验是用来判断时间序列是否平稳的？', options: ['`adfuller()`（ADF 检验）', '`ttest_ind()`', '`chi2_contingency()`', '`f_oneway()`'], correctAnswer: 0, explanation: '' },
      { id: '7-3', type: 'choice', question: 'ARIMA 模型中的参数 p 代表什么？', options: ['自回归项数', '差分阶数', '移动平均项数', '季节性周期'], correctAnswer: 0, explanation: '' },
      { id: '7-4', type: 'choice', question: 'ARIMA 模型中的参数 d 代表什么？', options: ['差分阶数', '自回归项数', '移动平均项数', '季节性周期'], correctAnswer: 0, explanation: '' },
      { id: '7-5', type: 'choice', question: 'ARIMA 模型中的参数 q 代表什么？', options: ['移动平均项数', '自回归项数', '差分阶数', '季节性周期'], correctAnswer: 0, explanation: '' },
      { id: '7-6', type: 'choice', question: '时间序列中的季节性指的是？', options: ['数据呈现周期性的波动', '数据呈现长期的趋势', '数据的均值随时间变化', '数据的方差随时间变化'], correctAnswer: 0, explanation: '' },
      { id: '7-7', type: 'choice', question: '要处理时间序列的季节性，应该使用以下哪种模型？', options: ['SARIMA', 'ARIMA', 'K-Means', '决策树'], correctAnswer: 0, explanation: '' },
      { id: '7-8', type: 'choice', question: '滚动窗口（Rolling Window）的主要作用是？', options: ['计算时间序列的移动统计量，比如移动平均', '检测异常值', '标准化数据', '填充缺失值'], correctAnswer: 0, explanation: '' },
      { id: '7-9', type: 'choice', question: '在 Python 中，`seasonal_decompose()`函数的作用是？', options: ['将时间序列分解为趋势项、季节项和随机项', '检验时间序列的平稳性', '训练 ARIMA 模型', '进行时间序列预测'], correctAnswer: 0, explanation: '' },
      { id: '7-10', type: 'choice', question: '非平稳时间序列的特点是？', options: ['均值和方差随时间变化', '均值恒定，方差恒定', '自协方差仅依赖于时间间隔', '没有趋势和季节性'], correctAnswer: 0, explanation: '' },
      { id: '7-p1', type: 'practical', title: '时间序列分析实操题', description: '现有一份电商的日销售额时间序列数据，已读取为 Pandas 的 Series，索引为日期，值为销售额，时间跨度为 2 年。请使用 Python 的 statsmodels 库完成以下操作：\n\n1. 使用`seasonal_decompose()`对数据进行时间序列分解，提取趋势项、季节项和随机项；\n\n2. 使用`adfuller()`进行 ADF 检验，判断数据的平稳性；\n\n3. 如果数据非平稳，进行差分处理使其平稳；\n\n4. 训练 ARIMA 模型，对未来 7 天的销售额进行预测。', code: `from statsmodels.tsa.seasonal import seasonal_decompose\nfrom statsmodels.tsa.stattools import adfuller\nfrom statsmodels.tsa.arima.model import ARIMA\n# 分解\ndecomposition = seasonal_decompose(ts, model='additive', period=365)\n# ADF检验\nadf_result = adfuller(ts)\np_val = adf_result[1]\nif p_val > 0.05:\n    # 差分\n    ts_diff = ts.diff().dropna()\nelse:\n    ts_diff = ts\n# 训练ARIMA\nmodel = ARIMA(ts_diff, order=(1,1,1))\nmodel_fit = model.fit()\n# 预测\nforecast = model_fit.get_forecast(steps=7)` }
    ]
  },
  {
    id: 8,
    title: '特征工程',
    questions: [
      { id: '8-1', type: 'choice', question: '特征归一化（Min-Max Scaling）的作用是？', options: ['将特征缩放到 [0,1] 的区间，消除量纲的影响', '将特征转换为均值为 0，方差为 1 的分布', '将类别特征转换为数值特征', '降低数据的维度'], correctAnswer: 0, explanation: '' },
      { id: '8-2', type: 'choice', question: '在 Scikit-learn 中，以下哪个类用于实现 Z-Score 标准化？', options: ['`StandardScaler`', '`MinMaxScaler`', '`RobustScaler`', '`Normalizer`'], correctAnswer: 0, explanation: '' },
      { id: '8-3', type: 'choice', question: '独热编码（One-Hot Encoding）适用于以下哪种情况？', options: ['无序的类别特征，比如颜色、商品类别', '有序的类别特征，比如低、中、高', '数值特征', '文本特征'], correctAnswer: 0, explanation: '' },
      { id: '8-4', type: 'choice', question: '标签编码（Label Encoding）适用于以下哪种情况？', options: ['有序的类别特征，比如成绩等级：低、中、高', '无序的类别特征，比如颜色', '数值特征', '文本特征'], correctAnswer: 0, explanation: '' },
      { id: '8-5', type: 'choice', question: '以下哪个不是 Scikit-learn 中的特征选择方法？', options: ['独热编码', '`VarianceThreshold`', '`SelectKBest`', '`RFE`'], correctAnswer: 0, explanation: '' },
      { id: '8-6', type: 'choice', question: 'PCA（主成分分析）的主要作用是？', options: ['降维，将高维特征转换为低维特征，同时保留大部分信息', '特征归一化', '特征标准化', '特征编码'], correctAnswer: 0, explanation: '' },
      { id: '8-7', type: 'choice', question: '独热编码的缺点是？', options: ['当类别数量很多时，会导致维度爆炸', '会引入伪顺序关系', '无法处理无序类别', '会改变数据的分布'], correctAnswer: 0, explanation: '' },
      { id: '8-8', type: 'choice', question: '以下哪种特征缩放方法对异常值更敏感？', options: ['Min-Max 归一化', 'Z-Score 标准化', 'RobustScaler', '两者一样'], correctAnswer: 0, explanation: '' },
      { id: '8-9', type: 'choice', question: '在 Scikit-learn 中，`PolynomialFeatures`的作用是？', options: ['生成多项式特征，实现特征交叉', '特征归一化', '特征标准化', '降维'], correctAnswer: 0, explanation: '' },
      { id: '8-10', type: 'choice', question: '分箱（Binning）的主要作用是？', options: ['将连续的数值特征离散化，减少噪声的影响', '将类别特征转换为数值特征', '降维', '标准化'], correctAnswer: 0, explanation: '' },
      { id: '8-p1', type: 'practical', title: '特征工程实操题', description: '现有一份机器学习的训练数据，已读取为 Pandas 的 DataFrame，包含数值特征：年龄、收入、消费金额，类别特征：性别、职业、教育程度。请使用 Python 的 Scikit-learn 库完成以下操作：\n\n1. 使用`StandardScaler`对数值特征进行标准化处理；\n\n2. 使用`OneHotEncoder`对无序的类别特征（性别、职业）进行独热编码；\n\n3. 使用`OrdinalEncoder`对有序的类别特征（教育程度：小学、中学、大学、研究生）进行标签编码；\n\n4. 检查处理后的特征维度，确保没有维度爆炸的问题。', code: `from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder\nfrom sklearn.compose import ColumnTransformer\n# 定义处理器\nnumeric_features = ['年龄', '收入', '消费金额']\ncategorical_features = ['性别', '职业']\nordinal_features = ['教育程度']\nordinal_categories = [['小学', '中学', '大学', '研究生']]\n\npreprocessor = ColumnTransformer(\n    transformers=[\n        ('num', StandardScaler(), numeric_features),\n        ('cat', OneHotEncoder(), categorical_features),\n        ('ord', OrdinalEncoder(categories=ordinal_categories), ordinal_features)\n    ])\n# 处理\nX_processed = preprocessor.fit_transform(df)\n# 检查维度\nprint(f'处理后的特征维度: {X_processed.shape}')` }
    ]
  },
  {
    id: 9,
    title: '异常值检测',
    questions: [
      { id: '9-1', type: 'choice', question: '3σ 原则适用于以下哪种数据分布？', options: ['正态分布', '均匀分布', '泊松分布', '指数分布'], correctAnswer: 0, explanation: '' },
      { id: '9-2', type: 'choice', question: 'IQR（四分位距）的计算公式是？', options: ['Q3 - Q1', 'Q3 + Q1', 'Q1 - Q3', '均值 - 中位数'], correctAnswer: 0, explanation: '' },
      { id: '9-3', type: 'choice', question: '使用 IQR 方法检测异常值时，异常值的判断条件是？', options: ['数据小于 Q1-1.5*IQR 或 大于 Q3+1.5*IQR', '数据小于均值-3σ 或 大于均值+3σ', '数据小于 0 或 大于 100', '数据距离聚类中心太远'], correctAnswer: 0, explanation: '' },
      { id: '9-4', type: 'choice', question: '在 Scikit-learn 中，以下哪种异常值检测方法最适合高维大数据？', options: ['孤立森林（Isolation Forest）', '3σ 原则', 'IQR 方法', '箱线图法'], correctAnswer: 0, explanation: '' },
      { id: '9-5', type: 'choice', question: '孤立森林的核心思想是？', options: ['异常点更容易被随机划分孤立出来', '异常点的距离更远', '异常点的密度更低', '异常点的方差更大'], correctAnswer: 0, explanation: '' },
      { id: '9-6', type: 'choice', question: '以下关于异常值的描述，错误的是？', options: ['异常值都是错误的数据，必须删除', '异常值可能是真实的特殊情况，比如高消费用户', '异常值会影响均值等统计量', '异常值检测可以用于欺诈检测'], correctAnswer: 0, explanation: '' },
      { id: '9-7', type: 'choice', question: 'OneClassSVM 适用于以下哪种场景？', options: ['只有正常样本，需要检测异常的场景', '有标注的异常样本', '正态分布的单变量数据', '低维数据'], correctAnswer: 0, explanation: '' },
      { id: '9-8', type: 'choice', question: '3σ 原则中，Z 分数的计算公式是？', options: ['Z=(X-μ)/σ', 'Z=(X-σ)/μ', 'Z=(μ-X)/σ', 'Z=(σ-X)/μ'], correctAnswer: 0, explanation: '' },
      { id: '9-9', type: 'choice', question: '以下哪种异常值检测方法是无监督的？', options: ['孤立森林', '逻辑回归', '决策树', '线性回归'], correctAnswer: 0, explanation: '' },
      { id: '9-10', type: 'choice', question: '异常值检测可以应用于以下哪个场景？', options: ['信用卡欺诈检测', '客户聚类', '购物篮分析', '时间序列预测'], correctAnswer: 0, explanation: '' },
      { id: '9-p1', type: 'practical', title: '异常值检测实操题', description: '现有一份信用卡交易数据，已读取为 Pandas 的 DataFrame，包含列：交易 ID、交易金额、交易时间、用户 ID。请使用 Python 的 Scikit-learn 库完成以下操作：\n\n1. 使用 IQR 方法检测交易金额字段的单变量异常值；\n\n2. 使用`IsolationForest`算法检测多维度的异常交易；\n\n3. 对比两种方法检测出的异常值，分析差异；\n\n4. 统计异常交易的占比。', code: `from sklearn.ensemble import IsolationForest\n# IQR检测\nQ1 = df['交易金额'].quantile(0.25)\nQ3 = df['交易金额'].quantile(0.75)\nIQR = Q3 - Q1\noutliers_iqr = df[(df['交易金额'] < Q1 - 1.5*IQR) | (df['交易金额'] > Q3 + 1.5*IQR)]\n# 孤立森林检测\niforest = IsolationForest(random_state=42)\ndf['is_outlier'] = iforest.fit_predict(df[['交易金额', '交易时间']])\noutliers_iforest = df[df['is_outlier'] == -1]\n# 统计占比\nprint(f'IQR异常占比: {len(outliers_iqr)/len(df):.2%}')\nprint(f'孤立森林异常占比: {len(outliers_iforest)/len(df):.2%}')` }
    ]
  },
  {
    id: 10,
    title: '多数据集合并',
    questions: [
      { id: '10-1', type: 'choice', question: '内连接（Inner Join）的作用是？', options: ['只保留两个表中匹配键相同的记录', '保留左表的所有记录，匹配右表的记录', '保留右表的所有记录，匹配左表的记录', '保留两个表的所有记录'], correctAnswer: 0, explanation: '' },
      { id: '10-2', type: 'choice', question: '在 Pandas 中，左连接（Left Join）的作用是？', options: ['保留左表的所有记录，匹配右表的记录，右表没有的填充为 NaN', '只保留两个表中匹配的记录', '保留右表的所有记录', '保留两个表的所有记录'], correctAnswer: 0, explanation: '' },
      { id: '10-3', type: 'choice', question: '右连接（Right Join）的作用是？', options: ['保留右表的所有记录，匹配左表的记录，左表没有的填充为 NaN', '保留左表的所有记录', '只保留匹配的记录', '保留两个表的所有记录'], correctAnswer: 0, explanation: '' },
      { id: '10-4', type: 'choice', question: '全外连接（Full Outer Join）的作用是？', options: ['保留两个表的所有记录，匹配的保留，不匹配的填充为 NaN', '只保留匹配的记录', '保留左表的所有记录', '保留右表的所有记录'], correctAnswer: 0, explanation: '' },
      { id: '10-5', type: 'choice', question: '在 Pandas 中，`concat()`方法的主要作用是？', options: ['沿着轴进行简单的拼接，不需要关联键', '基于键进行表的连接', '基于索引进行连接', '处理缺失值'], correctAnswer: 0, explanation: '' },
      { id: '10-6', type: 'choice', question: '`merge()`方法的主要作用是？', options: ['基于指定的键，实现 SQL 风格的表连接', '沿着轴进行简单的拼接', '基于索引进行连接', '分组聚合'], correctAnswer: 0, explanation: '' },
      { id: '10-7', type: 'choice', question: '`join()`方法的主要作用是？', options: ['基于索引进行表的连接', '基于列的值进行连接', '简单的拼接', '处理缺失值'], correctAnswer: 0, explanation: '' },
      { id: '10-8', type: 'choice', question: '要将多个结构相同的季度销售数据，按行合并成全年的数据，应该使用以下哪个方法？', options: ['`concat(axis=0)`', '`merge()`', '`join()`', '`groupby()`'], correctAnswer: 0, explanation: '' },
      { id: '10-9', type: 'choice', question: '要将用户的基本信息表和用户的消费信息表，通过用户 ID 关联起来，应该使用以下哪个方法？', options: ['`merge()`', '`concat(axis=0)`', '`concat(axis=1)`', '`groupby()`'], correctAnswer: 0, explanation: '' },
      { id: '10-10', type: 'choice', question: '以下关于`concat()`和`merge()`的区别，描述正确的是？', options: ['concat 是简单的拼接，merge 是基于键的关联', 'merge 是简单的拼接，concat 是基于键的关联', '两者没有区别', 'concat 只能处理两张表，merge 可以处理多张'], correctAnswer: 0, explanation: '' },
      { id: '10-p1', type: 'practical', title: '多数据集合并实操题', description: '现有三个数据集，均为 Pandas 的 DataFrame：\n\n1. 用户基本信息表，包含列：用户 ID、姓名、年龄、性别；\n\n2. 用户消费表，包含列：用户 ID、消费金额、消费日期；\n\n3. 用户地址表，包含列：用户 ID、省份、城市。\n\n请使用 Python 的 Pandas 库完成以下操作：\n\n1. 使用`merge()`方法，先将用户基本信息表和用户消费表通过用户 ID 合并；\n\n2. 再将合并后的表和用户地址表通过用户 ID 合并，使用`suffixes`参数处理可能的重复列；\n\n3. 检查合并后的数据，处理缺失值；\n\n4. 按省份分组，统计每个省份的用户平均消费金额。', code: `# 合并前两个表\ndf1 = pd.merge(user_info, user_consume, on='用户ID', how='left')\n# 合并第三个表\ndf_all = pd.merge(df1, user_address, on='用户ID', how='left', suffixes=('_info', '_addr'))\n# 统计\nresult = df_all.groupby('省份')['消费金额'].mean()` }
    ]
  }
];
