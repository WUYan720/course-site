# Python数据分析项目练习题集

本练习题集针对 10 个基于 Python 的数据分析核心项目，每个项目包含 10 道单项选择题和 1 道简单实操题，覆盖 Pandas、Scikit\-learn、Statsmodels 等 Python 数据分析库的核心知识点与实战应用，适合 Python 数据分析学习者练习巩固。

---

## 一、数据清洗（Python 实现）

### 单项选择题

1. 以下哪个操作不属于 Pandas 中数据清洗的常用操作？
A\. `drop_duplicates()`删除重复数据
B\. `fillna()`处理缺失值
C\. `sort_values()`数据排序
D\. `astype()`转换数据类型

2. 在数据清洗中，针对数值型特征的缺失值，以下哪种方法最不适合用于偏态分布的数据？
A\. 均值填充
B\. 中位数填充
C\. 众数填充
D\. 插值填充

3. 客户年龄字段中出现了 500 岁的记录，这种数据属于？
A\. 逻辑错误数据
B\. 格式错误数据
C\. 重复数据
D\. 缺失数据

4. 在 Pandas 中，要删除 DataFrame 中所有缺失值占比超过 30% 的列，以下哪个代码是正确的？
A\. `df.dropna(thresh=0.7*len(df), axis=1)`
B\. `df.dropna(thresh=0.3*len(df), axis=1)`
C\. `df.dropna(how='any', axis=1)`
D\. `df.dropna(how='all', axis=1)`

5. 以下哪种情况会导致数据出现重复值？
A\. 数据采集时多次提交同一记录
B\. 数据类型转换错误
C\. 缺失值填充
D\. 异常值检测

6. 数据清洗中，处理缺失值时，以下哪种方法可能会导致数据丢失大量信息？
A\. 直接删除含有缺失值的记录
B\. 均值填充
C\. 中位数填充
D\. KNN 填充

7. 以下哪个是数据清洗中需要处理的格式错误？
A\. 日期字段存储为字符串格式
B\. 消费金额为负数
C\. 年龄为负数
D\. 同一用户的多条记录

8. 检查数据一致性的主要目的是？
A\. 确保数据之间的逻辑关系正确
B\. 删除重复数据
C\. 填充缺失值
D\. 转换数据类型

9. 对于类别型特征的缺失值，以下哪种填充方法最合理？
A\. 用众数填充
B\. 用均值填充
C\. 用中位数填充
D\. 删除该列

10. 以下关于 Pandas 中数据清洗的描述，错误的是？
A\. 数据清洗只需要处理缺失值和重复值
B\. 数据清洗可以提升后续分析的准确性
C\. 数据清洗需要处理逻辑错误的数据
D\. 数据清洗是数据分析的前置步骤

### 实操题（Python）

现有一份电商用户数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、年龄、性别、消费金额、注册时间，其中存在部分缺失值、重复记录以及年龄为负数的异常数据。请使用 Python 完成以下操作：

1. 使用`drop_duplicates()`删除重复的用户记录；

2. 处理年龄字段的异常值，将负数的年龄替换为该字段的中位数；

3. 对性别字段的缺失值，用众数进行填充；

4. 对消费金额的缺失值，用均值进行填充。

---

## 二、分组聚合分析（Python 实现）

### 单项选择题

1. 在 Pandas 的分组聚合中，对分组后的结果进行条件筛选，以下哪个方法可以实现？
A\. `filter()`
B\. `select()`
C\. `where()`
D\. `sort()`

2. 在 Pandas 中，使用 groupby 按部门分组后，要计算每个部门的平均工资，以下哪个代码是正确的？
A\. `df.groupby('部门')['工资'].mean()`
B\. `df.groupby('工资')['部门'].mean()`
C\. `df.groupby('部门').sum()`
D\. `df.groupby('工资').count()`

3. 以下关于 Pandas 中分组筛选的描述，正确的是？
A\. `filter()`在分组后筛选，`query()`在分组前筛选
B\. `query()`在分组后筛选，`filter()`在分组前筛选
C\. 两者没有区别
D\. `filter()`可以用于聚合函数的条件，`query()`不行

4. 要实现数据透视表的功能，在 Pandas 中可以使用以下哪个函数？
A\. `pivot_table()`
B\. `groupby()`
C\. `merge()`
D\. `concat()`

5. 多列分组（比如按地区和商品类别分组）的主要作用是？
A\. 从多个维度进行聚合分析
B\. 删除重复数据
C\. 合并数据集
D\. 处理缺失值

6. 以下哪个不属于 Pandas 中常用的聚合函数？
A\. `count()`
B\. `sum()`
C\. `mean()`
D\. `insert()`

7. 在分组聚合后，要获取每个分组中销售额最高的那条记录，以下哪种方法最有效？
A\. 使用 groupby 后的`apply()`方法
B\. 使用`filter()`方法
C\. 使用`transform()`方法
D\. 使用`sort()`方法

8. 以下关于`transform()`方法的描述，正确的是？
A\. 可以对分组后的每个元素进行广播运算
B\. 只能用于计算聚合值
C\. 会改变数据的行数
D\. 无法用于分组标准化操作

9. 要统计每个地区的订单数量，以下哪个 Pandas 代码是正确的？
A\. `df.groupby('地区')['订单ID'].count()`
B\. `df.groupby('订单ID')['地区'].sum()`
C\. `df.groupby('地区').mean()`
D\. `df['订单ID'].count()`

10. 分组聚合分析中，`agg()`方法的主要作用是？
A\. 对分组后的数据同时应用多个聚合函数
B\. 过滤掉不符合条件的分组
C\. 过滤掉不符合条件的行
D\. 转换数据类型

### 实操题（Python）

现有一份销售数据，已读取为 Pandas 的 DataFrame，包含列：订单 ID、地区、商品类别、销售额、订单日期。请使用 Python 完成以下操作：

1. 按地区和商品类别进行分组，使用`agg()`计算每个分组的总销售额和平均销售额；

2. 筛选出总销售额大于 10000 的分组；

3. 按总销售额降序排序，展示前 5 个分组。

---

## 三、购物篮分析（Python 实现）

### 单项选择题

1. 购物篮分析的核心是挖掘以下哪种规则？
A\. 关联规则
B\. 分类规则
C\. 聚类规则
D\. 回归规则

2. 关联规则中，支持度 \(Support\) 的含义是？
A\. 包含 X 和 Y 的交易数占总交易数的比例
B\. 在购买 X 的情况下，购买 Y 的概率
C\. 规则 X→Y 的提升程度
D\. 项集的频繁程度

3. 置信度 \(Confidence\) 的计算公式是？
A\. `Confidence(X→Y) = P(Y|X)`
B\. `Confidence(X→Y) = P(X,Y)`
C\. `Confidence(X→Y) = P(X)/P(Y)`
D\. `Confidence(X→Y) = P(Y)/P(X)`

4. Apriori 算法的先验原理是？
A\. 如果一个项集是频繁的，那么它的所有子集也一定是频繁的
B\. 如果一个项集是频繁的，那么它的所有超集也一定是频繁的
C\. 频繁项集的支持度一定大于 0\.5
D\. 关联规则的置信度一定大于 0\.5

5. 提升度 \(Lift\) 的作用是？
A\. 衡量关联规则的相关性，判断规则是否有价值
B\. 衡量项集的频繁程度
C\. 衡量规则的置信度
D\. 衡量规则的支持度

6. 在 Python 的 mlxtend 库中，以下哪个函数用于挖掘频繁项集？
A\. `apriori()`
B\. `association_rules()`
C\. `fpgrowth()`
D\. `kmeans()`

7. 当提升度 Lift \(X→Y\)=1 时，说明什么？
A\. X 和 Y 是独立的，没有相关性
B\. X 和 Y 正相关
C\. X 和 Y 负相关
D\. 规则 X→Y 是强规则

8. Apriori 算法的缺点是？
A\. 需要多次扫描数据库，效率较低
B\. 无法处理高维数据
C\. 无法发现长的频繁项集
D\. 无法计算置信度

9. 以下哪个算法是为了优化 Apriori 的效率而提出的？
A\. FP\-Growth
B\. K\-Means
C\. ARIMA
D\. 决策树

10. 关联规则 \{啤酒\}→\{尿布\} 的提升度为 2\.5，说明什么？
A\. 购买啤酒的用户，购买尿布的概率是随机用户的 2\.5 倍
B\. 购买啤酒和尿布的用户占总用户的 2\.5%
C\. 这个规则的置信度是 2\.5
D\. 这个规则的支持度是 2\.5

### 实操题（Python）

现有一份超市的交易数据，每一行代表一次交易，包含交易 ID 和购买的商品列表，已处理为 one\-hot 编码的 DataFrame。请使用 Python 的 mlxtend 库完成以下操作：

1. 使用`apriori()`挖掘频繁项集，设置最小支持度为 0\.05；

2. 基于频繁项集，使用`association_rules()`生成关联规则，设置最小置信度为 0\.6；

3. 筛选出提升度大于 1 的规则，展示这些规则的支持度、置信度和提升度。

---

## 四、客户聚类分析（Python 实现）

### 单项选择题

1. 客户聚类分析属于以下哪种机器学习类型？
A\. 无监督学习
B\. 监督学习
C\. 半监督学习
D\. 强化学习

2. 在 Scikit\-learn 中，K\-Means 算法的核心目标是？
A\. 最小化样本点到其所属聚类中心的距离平方和
B\. 最大化不同聚类之间的距离
C\. 最小化聚类的数量
D\. 最大化样本的相似度

3. RFM 模型中的 R 代表什么？
A\. 最近一次消费时间
B\. 消费频率
C\. 消费金额
D\. 客户年龄

4. RFM 模型中的 F 代表什么？
A\. 消费频率
B\. 最近一次消费时间
C\. 消费金额
D\. 客户性别

5. RFM 模型中的 M 代表什么？
A\. 消费金额
B\. 最近一次消费时间
C\. 消费频率
D\. 客户地域

6. 在 Python 中，肘部法则的作用是？
A\. 选择 K\-Means 的最优聚类数量 K
B\. 选择最优的聚类中心
C\. 检测异常值
D\. 标准化数据

7. 轮廓系数的作用是？
A\. 评估聚类的效果，衡量聚类的紧密性和分离度
B\. 选择最优的 K 值
C\. 计算聚类中心
D\. 标准化数据

8. 在使用 K\-Means 之前，通常需要对数据进行什么操作？
A\. 使用 StandardScaler 标准化，消除量纲的影响
B\. 缺失值填充
C\. 重复值删除
D\. 数据类型转换

9. 以下哪个不是 K\-Means 算法的缺点？
A\. 对异常值不敏感
B\. 需要预先指定 K 值
C\. 对初始聚类中心敏感
D\. 容易收敛到局部最优

10. 在 Scikit\-learn 中，K\-Means 的初始化参数`n_clusters`的作用是？
A\. 指定聚类的数量 K
B\. 指定初始聚类中心
C\. 指定最大迭代次数
D\. 指定随机种子

### 实操题（Python）

现有一份电商客户的消费数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、最近一次消费时间（Recency）、消费频率（Frequency）、消费金额（Monetary）。请使用 Python 的 Scikit\-learn 库完成以下操作：

1. 使用`StandardScaler`对 RFM 三个特征进行标准化处理；

2. 遍历不同的 K 值，计算每个 K 对应的 SSE，绘制肘部图选择最优的聚类数量；

3. 使用`KMeans`算法对客户进行聚类；

4. 分析每个聚类的 RFM 特征，给每个聚类命名（比如高价值客户、流失客户等）。

---

## 五、数据可视化（Python 实现）

### 单项选择题

1. 要展示不同类别之间的数量比较，最适合使用以下哪种 Matplotlib/Seaborn 图表？
A\. 柱状图
B\. 折线图
C\. 饼图
D\. 散点图

2. 要展示数据随时间的变化趋势，最适合使用以下哪种图表？
A\. 折线图
B\. 柱状图
C\. 饼图
D\. 箱线图

3. 要展示部分与整体的比例关系，最适合使用以下哪种图表？
A\. 饼图
B\. 折线图
C\. 散点图
D\. 箱线图

4. 要揭示数据中的异常值，最适合使用以下哪种图表？
A\. 箱线图
B\. 饼图
C\. 折线图
D\. 柱状图

5. 要展示两个数值变量之间的相关性，最适合使用以下哪种图表？
A\. 散点图
B\. 饼图
C\. 箱线图
D\. 雷达图

6. 以下哪个 Python 库不是常用的数据可视化库？
A\. NumPy
B\. Matplotlib
C\. Seaborn
D\. Plotly

7. 以下哪种图表最适合展示多个维度的指标对比？
A\. 雷达图
B\. 饼图
C\. 折线图
D\. 柱状图

8. 在数据可视化中，以下哪种做法是错误的？
A\. 截断坐标轴，放大数据差异，误导用户
B\. 使用清晰的标签和标题
C\. 选择合适的配色，照顾色弱用户
D\. 避免使用 3D 效果，防止误导

9. 要展示数据的分布情况，比如年龄的分布，最适合使用以下哪种图表？
A\. 直方图
B\. 折线图
C\. 饼图
D\. 散点图

10. 热力图最适合用来展示以下哪种信息？
A\. 两个分类变量之间的相关性或数值大小
B\. 数据的时间趋势
C\. 部分与整体的比例
D\. 异常值的分布

### 实操题（Python）

现有一份电商销售数据，已读取为 Pandas 的 DataFrame，包含列：日期、地区、销售额、用户年龄。请使用 Python 的 Matplotlib/Seaborn 库完成以下操作：

1. 绘制折线图，展示销售额随日期的变化趋势；

2. 绘制柱状图，展示不同地区的总销售额对比；

3. 绘制直方图，展示用户年龄的分布情况；

4. 为每个图表添加清晰的标题和坐标轴标签。

---

## 六、A/B 测试分析（Python 实现）

### 单项选择题

1. A/B 测试的零假设通常是什么？
A\. 实验组和对照组的指标没有差异
B\. 实验组的指标优于对照组
C\. 对照组的指标优于实验组
D\. 实验组和对照组的样本量相同

2. p 值的含义是？
A\. 在零假设成立的情况下，观测到当前结果或更极端结果的概率
B\. 零假设成立的概率
C\. 实验组优于对照组的概率
D\. 结果显著的概率

3. 通常情况下，当 p 值小于多少时，我们认为结果具有统计显著性？
A\. 0\.05
B\. 0\.5
C\. 0\.1
D\. 0\.01

4. 第一类错误（Type I Error）指的是？
A\. 原假设为真时，错误地拒绝了原假设（假阳性）
B\. 原假设为假时，错误地接受了原假设（假阴性）
C\. 样本量不足导致的错误
D\. 分流不均匀导致的错误

5. 第二类错误（Type II Error）指的是？
A\. 原假设为假时，错误地接受了原假设（假阴性）
B\. 原假设为真时，错误地拒绝了原假设（假阳性）
C\. 样本量过大导致的错误
D\. 指标选择错误导致的错误

6. 在 Python 中，以下哪个库可以用于 A/B 测试的样本量计算？
A\. statsmodels
B\. pandas
C\. numpy
D\. matplotlib

7. 以下哪个不是 A/B 测试的常见误区？
A\. 提前停止实验，看结果显著就结束
B\. 同时测试多个指标，不做校正
C\. 保证分流的均匀性
D\. 样本量不足就分析结果

8. Bonferroni 校正的作用是？
A\. 解决多重检验问题，降低假阳性的概率
B\. 提高样本量
C\. 校正分流的不均匀性
D\. 校正 p 值的计算错误

9. A/B 测试中，分流的原则是？
A\. 随机分流，保证实验组和对照组的用户特征一致
B\. 按用户 ID 的奇偶分流，不需要随机
C\. 让新用户进入实验组，老用户进入对照组
D\. 按地域分流

10. 在 Python 中，要对两个比例进行假设检验，通常使用以下哪个函数？
A\. `proportions_ztest()`
B\. `ttest_ind()`
C\. `ttest_rel()`
D\. `chi2_contingency()`

### 实操题（Python）

现有一份 A/B 测试的结果数据，已读取为 Pandas 的 DataFrame，包含列：用户 ID、分组（对照组 / 实验组）、是否点击、是否转化。对照组有 10000 个用户，点击率为 5%，转化率为 2%；实验组有 10000 个用户，点击率为 5\.8%，转化率为 2\.3%。请使用 Python 的 statsmodels 库完成以下操作：

1. 对点击率进行比例检验，计算 p 值，判断是否具有统计显著性；

2. 对转化率进行比例检验，计算 p 值，判断是否具有统计显著性；

3. 分析实验结果，判断新版本是否可以上线。

---

## 七、时间序列分析（Python 实现）

### 单项选择题

1. 弱平稳时间序列的必要条件不包括以下哪项？
A\. 均值随时间变化
B\. 方差恒定
C\. 自协方差仅依赖于时间间隔
D\. 均值恒定

2. 在 Python 中，以下哪个检验是用来判断时间序列是否平稳的？
A\. `adfuller()`（ADF 检验）
B\. `ttest_ind()`
C\. `chi2_contingency()`
D\. `f_oneway()`

3. ARIMA 模型中的参数 p 代表什么？
A\. 自回归项数
B\. 差分阶数
C\. 移动平均项数
D\. 季节性周期

4. ARIMA 模型中的参数 d 代表什么？
A\. 差分阶数
B\. 自回归项数
C\. 移动平均项数
D\. 季节性周期

5. ARIMA 模型中的参数 q 代表什么？
A\. 移动平均项数
B\. 自回归项数
C\. 差分阶数
D\. 季节性周期

6. 时间序列中的季节性指的是？
A\. 数据呈现周期性的波动
B\. 数据呈现长期的趋势
C\. 数据的均值随时间变化
D\. 数据的方差随时间变化

7. 要处理时间序列的季节性，应该使用以下哪种模型？
A\. SARIMA
B\. ARIMA
C\. K\-Means
D\. 决策树

8. 滚动窗口（Rolling Window）的主要作用是？
A\. 计算时间序列的移动统计量，比如移动平均
B\. 检测异常值
C\. 标准化数据
D\. 填充缺失值

9. 在 Python 中，`seasonal_decompose()`函数的作用是？
A\. 将时间序列分解为趋势项、季节项和随机项
B\. 检验时间序列的平稳性
C\. 训练 ARIMA 模型
D\. 进行时间序列预测

10. 非平稳时间序列的特点是？
A\. 均值和方差随时间变化
B\. 均值恒定，方差恒定
C\. 自协方差仅依赖于时间间隔
D\. 没有趋势和季节性

### 实操题（Python）

现有一份电商的日销售额时间序列数据，已读取为 Pandas 的 Series，索引为日期，值为销售额，时间跨度为 2 年。请使用 Python 的 statsmodels 库完成以下操作：

1. 使用`seasonal_decompose()`对数据进行时间序列分解，提取趋势项、季节项和随机项；

2. 使用`adfuller()`进行 ADF 检验，判断数据的平稳性；

3. 如果数据非平稳，进行差分处理使其平稳；

4. 训练 ARIMA 模型，对未来 7 天的销售额进行预测。

---

## 八、特征工程（Python 实现）

### 单项选择题

1. 特征归一化（Min\-Max Scaling）的作用是？
A\. 将特征缩放到 \[0,1\] 的区间，消除量纲的影响
B\. 将特征转换为均值为 0，方差为 1 的分布
C\. 将类别特征转换为数值特征
D\. 降低数据的维度

2. 在 Scikit\-learn 中，以下哪个类用于实现 Z\-Score 标准化？
A\. `StandardScaler`
B\. `MinMaxScaler`
C\. `RobustScaler`
D\. `Normalizer`

3. 独热编码（One\-Hot Encoding）适用于以下哪种情况？
A\. 无序的类别特征，比如颜色、商品类别
B\. 有序的类别特征，比如低、中、高
C\. 数值特征
D\. 文本特征

4. 标签编码（Label Encoding）适用于以下哪种情况？
A\. 有序的类别特征，比如成绩等级：低、中、高
B\. 无序的类别特征，比如颜色
C\. 数值特征
D\. 文本特征

5. 以下哪个不是 Scikit\-learn 中的特征选择方法？
A\. 独热编码
B\. `VarianceThreshold`
C\. `SelectKBest`
D\. `RFE`

6. PCA（主成分分析）的主要作用是？
A\. 降维，将高维特征转换为低维特征，同时保留大部分信息
B\. 特征归一化
C\. 特征标准化
D\. 特征编码

7. 独热编码的缺点是？
A\. 当类别数量很多时，会导致维度爆炸
B\. 会引入伪顺序关系
C\. 无法处理无序类别
D\. 会改变数据的分布

8. 以下哪种特征缩放方法对异常值更敏感？
A\. Min\-Max 归一化
B\. Z\-Score 标准化
C\. RobustScaler
D\. 两者一样

9. 在 Scikit\-learn 中，`PolynomialFeatures`的作用是？
A\. 生成多项式特征，实现特征交叉
B\. 特征归一化
C\. 特征标准化
D\. 降维

10. 分箱（Binning）的主要作用是？
A\. 将连续的数值特征离散化，减少噪声的影响
B\. 将类别特征转换为数值特征
C\. 降维
D\. 标准化

### 实操题（Python）

现有一份机器学习的训练数据，已读取为 Pandas 的 DataFrame，包含数值特征：年龄、收入、消费金额，类别特征：性别、职业、教育程度。请使用 Python 的 Scikit\-learn 库完成以下操作：

1. 使用`StandardScaler`对数值特征进行标准化处理；

2. 使用`OneHotEncoder`对无序的类别特征（性别、职业）进行独热编码；

3. 使用`OrdinalEncoder`对有序的类别特征（教育程度：小学、中学、大学、研究生）进行标签编码；

4. 检查处理后的特征维度，确保没有维度爆炸的问题。

---

## 九、异常值检测（Python 实现）

### 单项选择题

1. 3σ 原则适用于以下哪种数据分布？
A\. 正态分布
B\. 均匀分布
C\. 泊松分布
D\. 指数分布

2. IQR（四分位距）的计算公式是？
A\. Q3 \- Q1
B\. Q3 \+ Q1
C\. Q1 \- Q3
D\. 均值 \- 中位数

3. 使用 IQR 方法检测异常值时，异常值的判断条件是？
A\. 数据小于 Q1\-1\.5*IQR 或 大于 Q3\+1\.5*IQR
B\. 数据小于均值 \- 3σ 或 大于均值 \+ 3σ
C\. 数据小于 0 或 大于 100
D\. 数据距离聚类中心太远

4. 在 Scikit\-learn 中，以下哪种异常值检测方法最适合高维大数据？
A\. 孤立森林（Isolation Forest）
B\. 3σ 原则
C\. IQR 方法
D\. 箱线图法

5. 孤立森林的核心思想是？
A\. 异常点更容易被随机划分孤立出来
B\. 异常点的距离更远
C\. 异常点的密度更低
D\. 异常点的方差更大

6. 以下关于异常值的描述，错误的是？
A\. 异常值都是错误的数据，必须删除
B\. 异常值可能是真实的特殊情况，比如高消费用户
C\. 异常值会影响均值等统计量
D\. 异常值检测可以用于欺诈检测

7. OneClassSVM 适用于以下哪种场景？
A\. 只有正常样本，需要检测异常的场景
B\. 有标注的异常样本
C\. 正态分布的单变量数据
D\. 低维数据

8. 3σ 原则中，Z 分数的计算公式是？
A\. Z=\(X\-μ\)/σ
B\. Z=\(X\-σ\)/μ
C\. Z=\(μ\-X\)/σ
D\. Z=\(σ\-X\)/μ

9. 以下哪种异常值检测方法是无监督的？
A\. 孤立森林
B\. 逻辑回归
C\. 决策树
D\. 线性回归

10. 异常值检测可以应用于以下哪个场景？
A\. 信用卡欺诈检测
B\. 客户聚类
C\. 购物篮分析
D\. 时间序列预测

### 实操题（Python）

现有一份信用卡交易数据，已读取为 Pandas 的 DataFrame，包含列：交易 ID、交易金额、交易时间、用户 ID。请使用 Python 的 Scikit\-learn 库完成以下操作：

1. 使用 IQR 方法检测交易金额字段的单变量异常值；

2. 使用`IsolationForest`算法检测多维度的异常交易；

3. 对比两种方法检测出的异常值，分析差异；

4. 统计异常交易的占比。

---

## 十、多数据集合并（Python 实现）

### 单项选择题

1. 内连接（Inner Join）的作用是？
A\. 只保留两个表中匹配键相同的记录
B\. 保留左表的所有记录，匹配右表的记录
C\. 保留右表的所有记录，匹配左表的记录
D\. 保留两个表的所有记录

2. 在 Pandas 中，左连接（Left Join）的作用是？
A\. 保留左表的所有记录，匹配右表的记录，右表没有的填充为 NaN
B\. 只保留两个表中匹配的记录
C\. 保留右表的所有记录
D\. 保留两个表的所有记录

3. 右连接（Right Join）的作用是？
A\. 保留右表的所有记录，匹配左表的记录，左表没有的填充为 NaN
B\. 保留左表的所有记录
C\. 只保留匹配的记录
D\. 保留两个表的所有记录

4. 全外连接（Full Outer Join）的作用是？
A\. 保留两个表的所有记录，匹配的保留，不匹配的填充为 NaN
B\. 只保留匹配的记录
C\. 保留左表的所有记录
D\. 保留右表的所有记录

5. 在 Pandas 中，`concat()`方法的主要作用是？
A\. 沿着轴进行简单的拼接，不需要关联键
B\. 基于键进行表的连接
C\. 基于索引进行连接
D\. 处理缺失值

6. `merge()`方法的主要作用是？
A\. 基于指定的键，实现 SQL 风格的表连接
B\. 沿着轴进行简单的拼接
C\. 基于索引进行连接
D\. 分组聚合

7. `join()`方法的主要作用是？
A\. 基于索引进行表的连接
B\. 基于列的值进行连接
C\. 简单的拼接
D\. 处理缺失值

8. 要将多个结构相同的季度销售数据，按行合并成全年的数据，应该使用以下哪个方法？
A\. `concat(axis=0)`
B\. `merge()`
C\. `join()`
D\. `groupby()`

9. 要将用户的基本信息表和用户的消费信息表，通过用户 ID 关联起来，应该使用以下哪个方法？
A\. `merge()`
B\. `concat(axis=0)`
C\. `concat(axis=1)`
D\. `groupby()`

10. 以下关于`concat()`和`merge()`的区别，描述正确的是？
A\. concat 是简单的拼接，merge 是基于键的关联
B\. merge 是简单的拼接，concat 是基于键的关联
C\. 两者没有区别
D\. concat 只能处理两张表，merge 可以处理多张

### 实操题（Python）

现有三个数据集，均为 Pandas 的 DataFrame：

1. 用户基本信息表，包含列：用户 ID、姓名、年龄、性别；

2. 用户消费表，包含列：用户 ID、消费金额、消费日期；

3. 用户地址表，包含列：用户 ID、省份、城市。

请使用 Python 的 Pandas 库完成以下操作：

1. 使用`merge()`方法，先将用户基本信息表和用户消费表通过用户 ID 合并；

2. 再将合并后的表和用户地址表通过用户 ID 合并，使用`suffixes`参数处理可能的重复列；

3. 检查合并后的数据，处理缺失值；

4. 按省份分组，统计每个省份的用户平均消费金额。

---

## 参考答案

### 一、数据清洗（Python）

选择题答案：1\.C 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
# 去重
df = df.drop_duplicates(subset='用户ID')
# 处理年龄异常值
age_median = df['年龄'].median()
df.loc[df['年龄'] < 0, '年龄'] = age_median
# 填充性别缺失值
gender_mode = df['性别'].mode()[0]
df['性别'] = df['性别'].fillna(gender_mode)
# 填充消费金额缺失值
amount_mean = df['消费金额'].mean()
df['消费金额'] = df['消费金额'].fillna(amount_mean)
```

### 二、分组聚合分析（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.D 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
# 分组聚合
grouped = df.groupby(['地区', '商品类别'])['销售额'].agg(['sum', 'mean']).reset_index()
grouped.columns = ['地区', '商品类别', '总销售额', '平均销售额']
# 筛选
filtered = grouped[grouped['总销售额'] > 10000]
# 排序
result = filtered.sort_values('总销售额', ascending=False).head(5)
```

### 三、购物篮分析（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
from mlxtend.frequent_patterns import apriori, association_rules
# 挖掘频繁项集
frequent_itemsets = apriori(df, min_support=0.05, use_colnames=True)
# 生成规则
rules = association_rules(frequent_itemsets, metric="confidence", min_threshold=0.6)
# 筛选提升度>1的规则
rules = rules[rules['lift'] > 1]
```

### 四、客户聚类分析（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
# 标准化
scaler = StandardScaler()
rfm_scaled = scaler.fit_transform(df[['Recency', 'Frequency', 'Monetary']])
# 肘部法则选K
sse = []
for k in range(1, 10):
    kmeans = KMeans(n_clusters=k, random_state=42)
    kmeans.fit(rfm_scaled)
    sse.append(kmeans.inertia_)
# 聚类
kmeans = KMeans(n_clusters=4, random_state=42)
df['聚类'] = kmeans.fit_predict(rfm_scaled)
# 分析聚类特征
cluster_profile = df.groupby('聚类')[['Recency', 'Frequency', 'Monetary']].mean()
# 命名：比如根据均值，高R低F的是流失客户，低R高F高M的是高价值客户
```

### 五、数据可视化（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
import matplotlib.pyplot as plt
import seaborn as sns
# 折线图
plt.figure(figsize=(12,6))
df.groupby('日期')['销售额'].sum().plot()
plt.title('销售额随日期变化趋势')
plt.xlabel('日期')
plt.ylabel('销售额')
plt.show()
# 柱状图
plt.figure(figsize=(12,6))
df.groupby('地区')['销售额'].sum().plot(kind='bar')
plt.title('各地区总销售额对比')
plt.xlabel('地区')
plt.ylabel('总销售额')
plt.show()
# 直方图
plt.figure(figsize=(12,6))
sns.histplot(df['用户年龄'], bins=20)
plt.title('用户年龄分布')
plt.xlabel('年龄')
plt.ylabel('频数')
plt.show()
```

### 六、A/B 测试分析（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.C 8\.A 9\.A 10\.A
实操题参考：

```python
from statsmodels.stats.proportion import proportions_ztest
# 点击率检验
click_ctrl, click_exp = 500, 580
n_ctrl, n_exp = 10000, 10000
count = [click_ctrl, click_exp]
nobs = [n_ctrl, n_exp]
z_stat, p_val_click = proportions_ztest(count, nobs)
# 转化率检验
conv_ctrl, conv_exp = 200, 230
count = [conv_ctrl, conv_exp]
z_stat, p_val_conv = proportions_ztest(count, nobs)
# 判断是否显著
print(f'点击率p值: {p_val_click}, 转化率p值: {p_val_conv}')
# 如果p值都小于0.05，且实验组指标更高，可以上线
```

### 七、时间序列分析（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.arima.model import ARIMA
# 分解
decomposition = seasonal_decompose(ts, model='additive', period=365)
# ADF检验
adf_result = adfuller(ts)
p_val = adf_result[1]
if p_val > 0.05:
    # 差分
    ts_diff = ts.diff().dropna()
else:
    ts_diff = ts
# 训练ARIMA
model = ARIMA(ts_diff, order=(1,1,1))
model_fit = model.fit()
# 预测
forecast = model_fit.get_forecast(steps=7)
```

### 八、特征工程（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
from sklearn.preprocessing import StandardScaler, OneHotEncoder, OrdinalEncoder
from sklearn.compose import ColumnTransformer
# 定义处理器
numeric_features = ['年龄', '收入', '消费金额']
categorical_features = ['性别', '职业']
ordinal_features = ['教育程度']
ordinal_categories = [['小学', '中学', '大学', '研究生']]

preprocessor = ColumnTransformer(
    transformers=[
        ('num', StandardScaler(), numeric_features),
        ('cat', OneHotEncoder(), categorical_features),
        ('ord', OrdinalEncoder(categories=ordinal_categories), ordinal_features)
    ])
# 处理
X_processed = preprocessor.fit_transform(df)
# 检查维度
print(f'处理后的特征维度: {X_processed.shape}')
```

### 九、异常值检测（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
from sklearn.ensemble import IsolationForest
# IQR检测
Q1 = df['交易金额'].quantile(0.25)
Q3 = df['交易金额'].quantile(0.75)
IQR = Q3 - Q1
outliers_iqr = df[(df['交易金额'] < Q1 - 1.5*IQR) | (df['交易金额'] > Q3 + 1.5*IQR)]
# 孤立森林检测
iforest = IsolationForest(random_state=42)
df['is_outlier'] = iforest.fit_predict(df[['交易金额', '交易时间']])
outliers_iforest = df[df['is_outlier'] == -1]
# 统计占比
print(f'IQR异常占比: {len(outliers_iqr)/len(df):.2%}')
print(f'孤立森林异常占比: {len(outliers_iforest)/len(df):.2%}')
```

### 十、多数据集合并（Python）

选择题答案：1\.A 2\.A 3\.A 4\.A 5\.A 6\.A 7\.A 8\.A 9\.A 10\.A
实操题参考：

```python
# 合并前两个表
df1 = pd.merge(user_info, user_consume, on='用户ID', how='left')
# 合并第三个表
df_all = pd.merge(df1, user_address, on='用户ID', how='left', suffixes=('_info', '_addr'))
# 统计
result = df_all.groupby('省份')['消费金额'].mean()
```

> （注：文档部分内容可能由 AI 生成）
