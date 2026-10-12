import type { EventNotes } from '@/types/event';

export const notesPart3: Record<string, EventNotes> = {
  'deep-belief-network-2006': {
    background_zh:
      '20 世纪 90 年代到 2000 年代初，深层神经网络虽在理论上被看好，但训练极其困难：反向传播在多层网络中容易遭遇梯度消失/爆炸，加上算力与数据有限，浅层模型与支持向量机长期主导学界，神经网络研究一度陷入低潮。2006 年，多伦多大学的 Geoffrey Hinton 与 Simon Osindero、Yee-Whye Teh 在《Neural Computation》发表《A Fast Learning Algorithm for Deep Belief Nets》，提出用「逐层贪心预训练」训练由多个受限玻尔兹曼机堆叠而成的深度信念网络，证明深层网络可以被有效训练，被视为现代深度学习复兴的起点，也重新点燃了对神经网络的信心。',
    background_en:
      'Through the 1990s and early 2000s, deep neural networks were theoretically attractive but notoriously hard to train: backpropagation suffered from vanishing or exploding gradients across many layers, while limited compute and data kept shallow models and SVMs in the lead. In 2006, Geoffrey Hinton, Simon Osindero, and Yee-Whye Teh published "A Fast Learning Algorithm for Deep Belief Nets" in Neural Computation. They showed that a stack of Restricted Boltzmann Machines could be trained one layer at a time by greedy pre-training, making genuinely deep networks trainable again. The paper is widely credited with launching the modern deep learning revival and restoring confidence in neural approaches.',
    keyPoints_zh: [
      'Hinton 等人 2006 年提出逐层贪心预训练，让深层网络首次可被有效训练。',
      '深度信念网络由多个受限玻尔兹曼机堆叠而成，是一种生成式概率模型。',
      '预训练借助对比散度（CD）逐层进行，是无监督的表示学习。',
      '顶层两层构成无向联想记忆，下层为自顶向下的有向信念网络。',
      '在 MNIST 上达到约 1.25% 错误率，优于当时最佳的判别模型。',
      '该工作让「深度本身具有价值」被广泛接受，标志深度学习时代开启。',
    ],
    keyPoints_en: [
      'Hinton et al. (2006) introduced greedy layer-wise pre-training, making deep networks trainable for the first time.',
      'A DBN is a generative probabilistic model built by stacking Restricted Boltzmann Machines (RBMs).',
      'Pre-training uses Contrastive Divergence (CD) layer by layer and is unsupervised representation learning.',
      'The top two layers form an undirected associative memory; lower layers form a directed belief net.',
      'On MNIST it reached about 1.25% error, beating the best contemporary discriminative classifiers.',
      'The work established that depth itself is valuable and marked the start of the deep learning era.',
    ],
    technical_zh:
      '深度信念网络的核心思路是「先逐层学表示，再整体精调」。受限玻尔兹曼机（RBM）是一种两层无向图模型，可视层接收数据、隐藏层提取特征，通过对比散度（CD）学习让隐藏激活能较好地重建输入。训练时，先拿原始数据训练第一层 RBM；把它输出的隐藏激活当作「新数据」，再去训练第二层 RBM；如此逐层堆叠，每一层都在上一层学到的抽象表示之上构建更高层的特征。堆叠完成后，整个网络可用反向传播或 wake-sleep 算法做有监督精调。打个比方：第一层学会「边缘」，第二层把边缘组合成「角与轮廓」，更高层再组合成「部件与整体」。其理论依据是「互补先验」——在合适的权值捆绑下，每加一层都不会降低数据对数似然的变分下界，因此逐层贪心预训练能给出良好的初始参数，绕开了直接训练深层网络时梯度难以传播的问题。',
    technical_en:
      'The core idea of a Deep Belief Network is "learn representations layer by layer, then fine-tune end to end." A Restricted Boltzmann Machine (RBM) is a two-layer undirected model: a visible layer receives the data and a hidden layer extracts features, trained with Contrastive Divergence (CD) so that the hidden activations can reconstruct the input well. To build a DBN, you first train an RBM on the raw data; then you treat that RBM\'s hidden activations as "new data" and train a second RBM on top; this stacking continues, each layer building higher-level features on the abstractions below. After stacking, the whole network is fine-tuned with backpropagation or the wake-sleep algorithm. Think of it as a hierarchy: the first layer learns edges, the next composes edges into corners and contours, and deeper layers assemble parts and wholes. The theoretical justification is "complementary priors" — under appropriate weight tying, adding a layer never lowers a variational bound on the data log-likelihood, so greedy pre-training yields a good initialization that sidesteps the gradient-propagation problem of training deep nets directly.',
    impact_zh:
      '深度信念网络与逐层预训练在 2006 年前后重新点燃了学界对深层网络的兴趣，让「深度学习」一词重回主流并普及开来，被视为现代深度学习复兴的里程碑。2012 年前后，随着 ReLU、Dropout、更好的初始化和 GPU 算力成熟，逐层预训练在监督视觉任务中逐渐被端到端训练取代，但它在生成模型、无监督表示学习上的思想影响深远。其局限在于训练较复杂、对超参数敏感，且后续实践证明「好初始化 + 现代优化」往往比预训练更简洁有效，因此 DBN 如今更多作为历史与概念基石被记取。',
    impact_en:
      'DBNs and greedy pre-training rekindled serious interest in deep networks around 2006, brought the term "deep learning" back into the mainstream, and are seen as the milestone that launched the modern revival. By about 2012, once ReLU, dropout, better initialization, and GPU compute matured, layer-wise pre-training was largely superseded by end-to-end training on supervised vision tasks, but its ideas deeply influenced generative modeling and unsupervised representation learning. Its limitations are real: training is intricate and sensitive to hyperparameters, and later practice showed that good initialization plus modern optimizers often works more simply. Today the DBN is remembered mainly as a historical and conceptual cornerstone.',
    takeaways_zh: [
      '深度网络的瓶颈往往不在架构本身，而在训练方法——好的初始化能解锁深度。',
      '逐层无监督预训练是一种绕过梯度消失、为深层网络找好起点的实用策略。',
      '互补先验与变分下界为「堆叠为何有效」提供了理论解释。',
      '一个领域的复兴常依赖一个可复现的关键实验（如 MNIST 上的突破）。',
    ],
    takeaways_en: [
      'The bottleneck in deep nets is often the training method, not the architecture — good initialization unlocks depth.',
      'Unsupervised layer-wise pre-training is a practical way to bypass vanishing gradients and find a good start.',
      'Complementary priors and a variational bound explain why stacking works.',
      'A field\'s revival often hinges on one reproducible key experiment, such as the MNIST result.',
    ],
    glossary: [
      {
        term_zh: '受限玻尔兹曼机',
        term_en: 'Restricted Boltzmann Machine (RBM)',
        definition_zh:
          '一种两层无向概率图模型，可视层与隐藏层内部无连接，常用对比散度学习，可作为深度信念网络的基本堆叠单元。',
        definition_en:
          'A two-layer undirected graphical model with no intra-layer connections, trained with Contrastive Divergence; the basic building block stacked to form a DBN.',
      },
      {
        term_zh: '对比散度',
        term_en: 'Contrastive Divergence (CD)',
        definition_zh:
          '由 Hinton 提出的 RBM 高效近似训练方法，用少量吉布斯采样步近似最大似然梯度，使预训练切实可行。',
        definition_en:
          'An efficient approximate training method for RBMs proposed by Hinton, using a few Gibbs steps to estimate the maximum-likelihood gradient and make pre-training practical.',
      },
      {
        term_zh: '逐层贪心预训练',
        term_en: 'Greedy Layer-Wise Pre-training',
        definition_zh:
          '先逐层独立训练每个模块、再用整体精调的初始化策略，用以缓解深层网络直接训练时的困难。',
        definition_en:
          'An initialization strategy that trains each layer independently before global fine-tuning, easing the difficulty of training deep networks directly.',
      },
    ],
  },

  'imagenet-2009': {
    background_zh:
      '2000 年代中后期，计算机视觉依赖规模很小的数据集（如 PASCAL VOC 仅约 2 万张图、20 类），模型性能受限于数据。斯坦福（原普林斯顿）的李飞飞自 2007 年起构想一个按 WordNet 词义层级组织的大规模图像数据库，并借助 Amazon Mechanical Turk 众包标注。2009 年，ImageNet 在 CVPR 以海报形式首次亮相，包含超过 1400 万张人工标注图像、约 2 万多类；2010 年起举办 ILSVRC 挑战赛，取其中 1000 类作为标准基准。它恰好在 GPU 算力崛起与深度学习等待「大燃料」的节点出现，成为引爆计算机视觉革命的关键数据基础设施。',
    background_en:
      'In the mid-to-late 2000s, computer vision relied on tiny datasets — PASCAL VOC had only about 20,000 images across 20 classes — and model performance was starved of data. Starting in 2007, Fei-Fei Li at Stanford (then Princeton) envisioned a large-scale image database organized by the WordNet taxonomy of word meanings, labeled via Amazon Mechanical Turk crowdsourcing. ImageNet was first presented as a poster at CVPR 2009, containing over 14 million human-annotated images across roughly 20,000+ categories. From 2010 it hosted the ILSVRC challenge using a 1,000-class subset as a standard benchmark. Appearing just as GPU compute took off and deep learning waited for "big fuel," it became the data infrastructure that ignited the computer vision revolution.',
    keyPoints_zh: [
      '李飞飞团队 2009 年发布 ImageNet，按 WordNet 层级组织超 1400 万张标注图像。',
      '借助 Amazon Mechanical Turk 众包，实现海量图像的高质量人工标注。',
      '2010 年起举办 ILSVRC，使用 1000 类、约 128 万张训练图作为标准基准。',
      '它解决了「数据瓶颈」，为深度卷积网络提供训练与评测所必需的规模。',
      'ILSVRC 2012 被 AlexNet 横扫，直接催生深度学习在视觉领域的爆发。',
      'ImageNet 预训练权重成为迁移学习的基石，影响远超图像分类。',
    ],
    keyPoints_en: [
      'Fei-Fei Li\'s team released ImageNet in 2009, organizing 14M+ annotated images by the WordNet hierarchy.',
      'Amazon Mechanical Turk crowdsourcing enabled high-quality human annotation at massive scale.',
      'From 2010, ILSVRC used a 1,000-class, ~1.28M-image subset as the standard benchmark.',
      'It solved the data bottleneck, supplying the scale deep CNNs needed to train and be evaluated.',
      'ILSVRC 2012 was swept by AlexNet, directly triggering the deep-learning explosion in vision.',
      'ImageNet pre-trained weights became a cornerstone of transfer learning, far beyond classification.',
    ],
    technical_zh:
      'ImageNet 的组织逻辑来自 WordNet：每个「同义词集」（synset）对应一个概念（如某一种狗），每类包含数百到数千张经人工核验的图像，并附包围盒等标注。完整版（ImageNet-21K）约有 1419 万张图、21841 类；为便于年度评测，ILSVRC 抽取结构清晰、互不重叠的 1000 类，构成 ImageNet-1K——约 128 万张训练图、5 万张验证图、10 万张测试图。评测采用 Top-5 错误率（正确标签不在模型前 5 个预测中即算错），这使不同算法能在统一、高质量、大规模的基准上被公平比较。其价值在于：规模足够大，使「大数据 + 大模型 + 大算力」的假设得以被决定性验证。',
    technical_en:
      'ImageNet is organized around WordNet: each "synset" (a concept such as a specific dog breed) holds hundreds to thousands of human-verified images, often with bounding boxes. The full release (ImageNet-21K) has about 14.2 million images across 21,841 categories. For annual evaluation, ILSVRC selected a clean, non-overlapping 1,000-class subset — ImageNet-1K — with roughly 1.28 million training, 50,000 validation, and 100,000 test images. Scoring uses top-5 error (a mistake unless the true label is among the model\'s top five predictions), letting different algorithms be compared fairly on one large, high-quality benchmark. The crucial point is scale: it was big enough to decisively test the hypothesis that "big data + big model + big compute" wins.',
    impact_zh:
      'ImageNet 与 ILSVRC 彻底改变了计算机视觉的研究范式：它把「手工设计特征 + 浅层模型」逼到极限，又为深度学习的端到端表示学习提供了舞台。ILSVRC 的 Top-5 错误率从 2010 年的约 28% 一路降到 2017 年的约 2.3%，几乎「解决」了该基准，也催生了 AlexNet、VGG、GoogLeNet、ResNet 等一整代架构。ImageNet 预训练权重成为目标检测、医学影像、遥感等下游任务的通用起点。局限是数据存在采集偏差、类别以英语世界概念为中心，且竞赛结束后社区转向更细粒度、更公平的评测。',
    impact_en:
      'ImageNet and ILSVRC fundamentally changed computer vision: they pushed hand-crafted features plus shallow models to their limit while giving end-to-end deep learning a stage. ILSVRC top-5 error fell from about 28% in 2010 to roughly 2.3% in 2017, effectively "solving" the benchmark and spawning a whole generation of architectures — AlexNet, VGG, GoogLeNet, ResNet. ImageNet pre-trained weights became a universal starting point for detection, medical imaging, and remote sensing. Its limitations include collection bias and an English-world-centered category structure; after the competition ended, the community shifted toward finer-grained and fairer evaluation.',
    takeaways_zh: [
      '数据是算法突破的关键燃料——规模与质量往往比精巧模型更决定性。',
      '一个好的公开基准能统一评测、加速整个领域的迭代与竞争。',
      'ImageNet 证明了「数据、算力、算法」三者齐备才能释放深度学习的潜力。',
      '预训练 + 微调的迁移学习范式，源于 ImageNet 时代的实践。',
    ],
    takeaways_en: [
      'Data is critical fuel: scale and quality are often more decisive than a clever model.',
      'A good public benchmark unifies evaluation and accelerates an entire field\'s iteration.',
      'ImageNet showed that data, compute, and algorithms must align to unlock deep learning.',
      'The pre-train + fine-tune transfer-learning paradigm grew out of the ImageNet era.',
    ],
    glossary: [
      {
        term_zh: 'ImageNet-1K',
        term_en: 'ImageNet-1K (ILSVRC subset)',
        definition_zh:
          '从完整 ImageNet 抽取的 1000 类标准基准，含约 128 万张训练图，是深度学习视觉架构的通用试金石。',
        definition_en:
          'The 1,000-class standard benchmark drawn from full ImageNet, with ~1.28M training images; the common touchstone for vision architectures.',
      },
      {
        term_zh: '同义词集',
        term_en: 'Synset',
        definition_zh:
          'WordNet 中表示同一概念的一组同义词，ImageNet 以它为单位组织类别与图像。',
        definition_en:
          'A set of synonymous words denoting one concept in WordNet; ImageNet uses synsets as the unit for organizing categories and images.',
      },
      {
        term_zh: 'Top-5 错误率',
        term_en: 'Top-5 Error Rate',
        definition_zh:
          '正确标签未出现在模型给出的最高概率前 5 个预测中的样本比例，是 ILSVRC 的主要评测指标。',
        definition_en:
          'The fraction of test samples whose true label is absent from the model\'s top five predictions; the main ILSVRC metric.',
      },
    ],
  },

  'alexnet-2012': {
    background_zh:
      '2012 年之前，图像分类由「手工特征（如 SIFT）+ 支持向量机」主导，深度学习虽在理论上成立却缺乏一场决定性的胜利。同年 9 月 30 日，多伦多大学的 Alex Krizhevsky、Ilya Sutskever 与导师 Geoffrey Hinton 以团队 SuperVision 提交 AlexNet 参加 ILSVRC 2012。它在一个恰好的时间点上汇聚了三股力量：ImageNet 的千万级标注数据、NVIDIA GPU（CUDA）的并行算力、以及 ReLU 与 Dropout 等算法改进。AlexNet 以 15.3% 的 Top-5 错误率夺冠，比第二名（26.2%）低逾 10 个百分点，震惊业界，被视为现代深度学习在计算机视觉爆发的起点。',
    background_en:
      'Before 2012, image classification was dominated by hand-crafted features (e.g., SIFT) plus SVMs; deep learning was theoretically sound but lacked a decisive win. On September 30, 2012, Alex Krizhevsky, Ilya Sutskever, and their advisor Geoffrey Hinton at the University of Toronto submitted AlexNet under the team name SuperVision to ILSVRC 2012. It arrived at exactly the right moment, fusing three forces: ImageNet\'s tens of millions of labeled images, the parallel compute of NVIDIA GPUs (CUDA), and algorithmic refinements like ReLU and dropout. AlexNet won with a 15.3% top-5 error, more than 10 points ahead of the runner-up at 26.2%, stunning the field and marking the start of the deep-learning explosion in computer vision.',
    keyPoints_zh: [
      'AlexNet 由 Krizhevsky、Sutskever、Hinton 提出，夺得 ILSVRC 2012 冠军。',
      '8 层网络（5 卷积 + 3 全连接），约 6000 万参数、65 万个神经元。',
      '用两块 NVIDIA GTX 580 GPU 训练约 5–6 天，奠定 GPU 训练范式。',
      '15.3% Top-5 错误率，比第二名低逾 10 个百分点，结果具有压倒性。',
      '核心创新：ReLU 激活、Dropout 正则、数据增强与局部响应归一化。',
      '它结束了「深度网络能否胜过手工特征」的争论，开启 CV 深度学习时代。',
    ],
    keyPoints_en: [
      'AlexNet, by Krizhevsky, Sutskever, and Hinton, won ILSVRC 2012.',
      'It has 8 layers (5 convolutional + 3 fully connected), ~60M parameters and 650K neurons.',
      'Trained on two NVIDIA GTX 580 GPUs for about 5–6 days, setting the GPU-training paradigm.',
      'A 15.3% top-5 error beat the runner-up by over 10 percentage points — a landslide.',
      'Key innovations: ReLU activation, dropout, data augmentation, and local response normalization.',
      'It ended the debate over whether deep nets could beat hand-crafted features, opening the CV deep-learning era.',
    ],
    technical_zh:
      'AlexNet 是一个深层卷积神经网络：输入 224×224 的彩色图，经 5 个卷积层（部分后接最大池化）提取层次化特征，再由 3 个全连接层输出 1000 类的 Softmax 概率。它之所以成功，不在于架构多新奇（本质上仍是 LeNet 的放大版），而在于三个要素的合流。其一，ReLU 激活函数取代 Sigmoid/Tanh，计算更快且不易饱和，让梯度在深层中顺畅流动；其二，在全连接层使用 Dropout（丢弃概率 0.5）随机屏蔽神经元，强制网络不依赖特定节点，显著缓解过拟合；其三，GPU 并行使 90 个 epoch 的训练在数天内完成——由于单卡显存（3GB）放不下，网络被拆分到两块 GPU 上分别训练再合并。配合裁剪、水平翻转等数据增强，AlexNet 用「端到端从原始像素学特征」击败了传统流水线。',
    technical_en:
      'AlexNet is a deep CNN: it takes a 224×224 color image, extracts hierarchical features through five convolutional layers (some followed by max-pooling), and feeds three fully connected layers to output a 1000-class Softmax. Its success was not architectural novelty — it is essentially a scaled-up LeNet — but the convergence of three elements. First, the ReLU activation replaced sigmoid/tanh: it computes faster, does not saturate, and lets gradients flow through deep layers. Second, dropout (rate 0.5) in the fully connected layers randomly masks neurons, forcing the network not to depend on specific nodes and strongly reducing overfitting. Third, GPU parallelism made 90 epochs of training finish in days; because a single 3GB card could not hold the model, the network was split across two GPUs and merged. Combined with crops and horizontal flips, AlexNet beat traditional pipelines by learning features end to end from raw pixels.',
    impact_zh:
      'AlexNet 的胜利是分水岭：此后深度卷积网络迅速成为计算机视觉的默认方法，并直接催生 ZFNet、VGG、GoogLeNet、ResNet 等架构，延伸到语音识别、医学影像、自动驾驶等。它让工业界与学术界全力投入深度学习，并验证了「数据 + 算力 + 算法」协同的威力。局限在于模型参数量大、对单卡显存不友好、依赖大量数据增强与精调；但它留下的 ReLU、Dropout、GPU 训练与数据增强，至今仍是深度学习的基本功。',
    impact_en:
      'AlexNet\'s win was a watershed: deep CNNs rapidly became the default method in computer vision and directly spawned ZFNet, VGG, GoogLeNet, and ResNet, extending into speech, medical imaging, and autonomous driving. It drove industry and academia to commit fully to deep learning and proved the power of data + compute + algorithms together. Its limitations — large parameter count, unfriendliness to single-card memory, reliance on heavy augmentation and tuning — are real, but ReLU, dropout, GPU training, and augmentation remain deep-learning fundamentals to this day.',
    takeaways_zh: [
      '一次压倒性的基准胜利，比无数理论争论更能改变一个领域的方向。',
      '深度学习的突破往往是数据、算力、算法三要素同时成熟的结果。',
      'ReLU 与 Dropout 等「小而关键」的技巧，常常决定训练能否成功。',
      'GPU 训练从 AlexNet 起成为深度学习的事实标准。',
    ],
    takeaways_en: [
      'A single landslide benchmark win can shift a field more than endless theoretical debate.',
      'Deep-learning breakthroughs usually require data, compute, and algorithms maturing together.',
      'Small but crucial tricks like ReLU and dropout often decide whether training succeeds.',
      'GPU training became the de facto standard for deep learning starting with AlexNet.',
    ],
    glossary: [
      {
        term_zh: 'ReLU 激活函数',
        term_en: 'ReLU Activation',
        definition_zh:
          '修正线性单元，输出为 max(0, x)，计算简单且缓解饱和，使深层网络训练更快更稳定。',
        definition_en:
          'Rectified Linear Unit, outputting max(0, x); simple and non-saturating, it makes deep networks train faster and more stably.',
      },
      {
        term_zh: 'Dropout',
        term_en: 'Dropout',
        definition_zh:
          '训练时以一定概率随机丢弃神经元，近似集成多个子网络，是防止过拟合的有效正则化手段。',
        definition_en:
          'Randomly dropping neurons during training to approximate an ensemble of subnetworks; an effective regularizer against overfitting.',
      },
    ],
  },

  'word2vec-2013': {
    background_zh:
      '在 word2vec 之前，自然语言处理多用稀疏高维的 one-hot 或 TF-IDF 表示，词与词之间相互独立、无法体现语义关联；早期神经网络语言模型虽能学到稠密向量，但训练代价高昂。2013 年，Google 的 Tomas Mikolov 等人发表两篇论文，提出 word2vec：用极简的浅层网络从海量无标注文本中高效学习词的稠密向量表示。它把「分布式语义假设」（词的意义由上下文决定）工程化为可规模化的工具，使词向量成为 NLP 的通用基础设施，并催生了「词即几何」的研究范式。',
    background_en:
      'Before word2vec, NLP mostly used sparse, high-dimensional one-hot or TF-IDF representations in which words were independent and carried no semantic relation; early neural language models could learn dense vectors but were expensive to train. In 2013, Tomas Mikolov and colleagues at Google published two papers proposing word2vec: extremely simple shallow networks that efficiently learn dense vector representations of words from massive unlabeled text. It turned the distributional hypothesis — a word\'s meaning is given by its context — into a scalable tool, making word embeddings a general NLP infrastructure and seeding the "words as geometry" paradigm.',
    keyPoints_zh: [
      'Mikolov 等人 2013 年提出 word2vec，用浅层网络从文本高效学习词向量。',
      '提供两种架构：CBOW（由上下文预测中心词）与 Skip-gram（由中心词预测上下文）。',
      '第二篇论文引入负采样与高频词子采样，使十亿级语料训练切实可行。',
      '著名性质：向量算术 king − man + woman ≈ queen 体现语义/语法关系。',
      '训练无需标注数据，是低成本、可迁移的表示学习。',
      '开源 C 实现与预训练模型使其迅速成为 NLP 标配组件。',
    ],
    keyPoints_en: [
      'Mikolov et al. (2013) proposed word2vec, learning word vectors efficiently with shallow networks.',
      'It offers two architectures: CBOW (predict a word from its context) and Skip-gram (predict context from a word).',
      'The second paper introduced negative sampling and frequent-word subsampling, making billion-word training practical.',
      'Its famous property: vector arithmetic king − man + woman ≈ queen captures semantic/syntactic relations.',
      'Training needs no labeled data, making it cheap, transferable representation learning.',
      'Open-source C code and pre-trained models quickly made it a standard NLP building block.',
    ],
    technical_zh:
      'word2vec 的核心是「用上下文预测词」的极简预测游戏，包含两种架构。Skip-gram 给定中心词，预测其上下文窗口内的词，并对邻近词赋予更高权重；CBOW 则反过来，把上下文词向量求和后预测中心词（顺序不重要，故称「词袋」）。二者都共享一个嵌入矩阵，把每个词映射为低维向量，训练目标是最大化正确上下文/词的出现概率。关键在于输出层：若对每个词都做全词表 Softmax，代价随词表线性膨胀。负采样把它改成一个二分类——区分「真实的上下文词对」与「随机抽出的噪声词对」，每次只更新少量权重，从而能在数十亿词上一天内训完。训练后，上下文相似的词在向量空间中彼此靠近，向量加减自然浮现出类比关系。',
    technical_en:
      'word2vec centers on a minimal "predict a word from its context" game with two architectures. Skip-gram, given a center word, predicts the words in its context window and weights nearby words more heavily; CBOW does the reverse, summing context vectors to predict the center word (order does not matter, hence "bag of words"). Both share an embedding matrix mapping each word to a low-dimensional vector, trained to maximize the probability of correct context/word. The key is the output layer: a full-vocabulary Softmax costs scale with vocabulary size. Negative sampling turns this into binary classification — telling real context pairs from randomly sampled noise pairs — updating only a few weights per step, so training finishes in a day on billions of words. After training, words with similar contexts sit close in vector space, and vector addition and subtraction naturally yield analogies.',
    impact_zh:
      'word2vec 让高质量词向量成为可廉价获取、可跨任务迁移的「commodity」，几乎成为 2010 年代所有 NLP 系统的默认依赖，并启发了 GloVe、fastText、item2vec 乃至 BERT、CLIP 等后续工作：先让符号变成几何，再让更深的模型在其上构建。它也在推荐、信息检索、生物序列等非语言领域被借用到。局限是得到的词向量是「上下文无关」的——一词多义被压成单一向量；这一缺陷后来由 ELMo、BERT 等上下文嵌入解决。但 word2vec 作为教学与工业基线，地位依然稳固。',
    impact_en:
      'word2vec turned high-quality word vectors into a cheap, transferable commodity and became the default dependency of nearly every 2010s NLP system, inspiring GloVe, fastText, item2vec, and later BERT and CLIP: first turn symbols into geometry, then let deeper models build on it. It was also borrowed for recommendation, information retrieval, and biological sequences. Its limitation is that embeddings are context-free — polysemy is collapsed into one vector — which contextual embeddings like ELMo and BERT later fixed. Yet word2vec remains a stable teaching and industrial baseline.',
    takeaways_zh: [
      '分布式语义假设可工程化为极简、可规模化的表示学习工具。',
      '负采样是把「大词表 Softmax」变为可行训练的关键技巧。',
      '好的向量空间能承载语义与语法关系，使「意义即几何」可被计算。',
      '一词多义等局限，提示了从静态向量走向上下文嵌入的必然。',
    ],
    takeaways_en: [
      'The distributional hypothesis can be engineered into a minimal, scalable representation tool.',
      'Negative sampling is the trick that makes large-vocabulary Softmax training feasible.',
      'A good vector space encodes semantic and syntactic relations, making "meaning as geometry" computable.',
      'Limitations like polysemy motivated the shift from static vectors to contextual embeddings.',
    ],
    glossary: [
      {
        term_zh: '词嵌入',
        term_en: 'Word Embedding',
        definition_zh:
          '将词映射为低维稠密向量的表示，使语义相近的词在向量空间中也相近。',
        definition_en:
          'A low-dimensional dense vector representation of a word, so that semantically similar words are close in space.',
      },
      {
        term_zh: '负采样',
        term_en: 'Negative Sampling',
        definition_zh:
          '用「真实词对 vs 随机噪声词对」的二分类近似 Softmax，大幅降低大词表训练开销。',
        definition_en:
          'Approximating Softmax with binary classification of real vs. randomly sampled noise pairs, greatly cutting large-vocabulary training cost.',
      },
      {
        term_zh: '分布式语义假设',
        term_en: 'Distributional Hypothesis',
        definition_zh:
          'Firth 提出的观点：一个词的意义由它经常共现的上下文决定（「观其伴而知其义」）。',
        definition_en:
          'Firth\'s idea that a word\'s meaning is given by the contexts it co-occurs with — "you shall know a word by the company it keeps."',
      },
    ],
  },

  'gan-2014': {
    background_zh:
      '2014 年之前，生成模型要么依赖显式概率密度（如 RBM、DBM），训练常需马尔可夫链采样，要么难以生成逼真的高维样本。蒙特利尔大学的 Ian Goodfellow（导师 Yoshua Bengio）在与同事聚餐时灵光一现：与其手工设计损失，不如让另一个神经网络来当「评委」。当年他们赶在 NeurIPS 截止前一周完成论文《Generative Adversarial Networks》，提出用两个网络相互博弈来生成数据，开创了对抗式生成这一全新范式。',
    background_en:
      'Before 2014, generative models relied on explicit densities (e.g., RBMs, DBMs) whose training often needed Markov-chain sampling, or struggled to produce realistic high-dimensional samples. Ian Goodfellow at the University of Montreal (with advisor Yoshua Bengio) had a bar-night insight: instead of hand-designing a loss, let another neural network be the "judge." Racing to meet the NeurIPS deadline within a week, they published "Generative Adversarial Networks," proposing two networks that play a game to generate data and inaugurating adversarial generation.',
    keyPoints_zh: [
      'Goodfellow 等人 2014 年提出 GAN，用生成器与判别器相互博弈来生成数据。',
      '生成器把随机噪声映射为假样本，判别器判断样本来自真实数据还是生成器。',
      '训练是一个极小极大（minimax）零和博弈，理论均衡下最小化 JS 散度。',
      '两个网络交替用反向传播更新，无需显式密度或马尔可夫链。',
      '它使逼真图像生成成为可能，催生 CGAN、WGAN、StyleGAN 等大量变体。',
      'GAN 在 NeurIPS 2014 起初反响平平，后成为生成式 AI 的基石之一。',
    ],
    keyPoints_en: [
      'Goodfellow et al. (2014) proposed GANs, where a generator and discriminator play a game to produce data.',
      'The generator maps random noise to fake samples; the discriminator tells real from fake.',
      'Training is a minimax zero-sum game that, at equilibrium, minimizes the Jensen-Shannon divergence.',
      'The two networks are updated alternately by backpropagation, with no explicit density or Markov chains.',
      'It enabled realistic image generation and spawned CGAN, WGAN, StyleGAN, and many variants.',
      'Initially overlooked at NeurIPS 2014, GAN later became a cornerstone of generative AI.',
    ],
    technical_zh:
      'GAN 同时训练两个网络。生成器 G 接收低维随机噪声 z，输出一张「伪造」样本（如图像）；判别器 D 接收一张图 x，输出一个标量——x 来自真实数据的概率。二者构成零和博弈：D 想尽量分清真假（最大化对真实样本的 log D(x) 与对生成样本的 log(1−D(G(z)))），G 想让伪造样本以假乱真（等价于最大化 log D(G(z))）。训练时交替更新：先固定 G 更新 D 若干步，再固定 D 更新 G，整个系统用反向传播端到端优化。打个比方，G 是制造伪钞的骗子，D 是验钞警察，二人在对抗中各自升级，直到警察难以分辨、骗子技艺精湛。理论上，当博弈达到纳什均衡时，生成分布与真实分布一致。',
    technical_en:
      'A GAN trains two networks at once. The generator G takes low-dimensional random noise z and outputs a "fake" sample (e.g., an image); the discriminator D takes an image x and outputs a scalar — the probability that x is real. They form a zero-sum game: D wants to tell real from fake (maximizing log D(x) on real samples and log(1−D(G(z))) on fakes), while G wants its fakes to pass (equivalently maximizing log D(G(z))). Training alternates: update D for some steps with G fixed, then update G with D fixed; the whole system is optimized end to end by backpropagation. Think of G as a counterfeiter and D as a policeman, each improving through rivalry until the policeman cannot tell and the counterfeiter is skilled. In theory, at the Nash equilibrium the generated distribution matches the true one.',
    impact_zh:
      'GAN 开创了「对抗式生成」范式，使高保真图像、音频、视频合成成为现实，并衍生出条件 GAN、WGAN、CycleGAN、StyleGAN、ProGAN 等庞大谱系，深刻影响了计算机视觉与生成式 AI（也为后来的扩散模型提供了思想背景）。它也启示了博弈式训练的更广泛思路。其局限同样突出：训练动态不稳定、易崩溃，且常见「模式坍塌」——生成器只产出少数几种样本、丧失多样性；为此学界提出了大量稳定化技巧与替代目标（如 WGAN 的 Wasserstein 距离）。',
    impact_en:
      'GANs inaugurated "adversarial generation," making high-fidelity synthesis of images, audio, and video real, and spawned a huge lineage — conditional GAN, WGAN, CycleGAN, StyleGAN, ProGAN — deeply shaping computer vision and generative AI (and providing conceptual background for later diffusion models). It also suggested broader game-theoretic training ideas. Limitations are stark: training is unstable and prone to collapse, and mode collapse — the generator produces only a few sample varieties, losing diversity — is common, prompting many stabilization tricks and alternative objectives such as WGAN\'s Wasserstein distance.',
    takeaways_zh: [
      '把「损失函数」本身变成一个可学习的网络，是对训练范式的根本创新。',
      '生成器与判别器的对抗，是「以博弈代替手工设计」的典范。',
      '理论优雅（minimax）与实际训练困难（不稳定、模式坍塌）并存。',
      '对抗思想后来广泛外溢到半监督学习、域适应等方向。',
    ],
    takeaways_en: [
      'Making the loss itself a learnable network was a radical training-paradigm innovation.',
      'The generator-discriminator rivalry is a model of "replacing hand-design with a game."',
      'Elegant theory (minimax) coexists with practical difficulty (instability, mode collapse).',
      'Adversarial thinking later spread widely to semi-supervised learning and domain adaptation.',
    ],
    glossary: [
      {
        term_zh: '生成器',
        term_en: 'Generator',
        definition_zh:
          'GAN 中负责把随机噪声转换为逼真假样本的网络，目标是骗过判别器。',
        definition_en:
          'The GAN network that maps random noise to realistic fake samples, aiming to fool the discriminator.',
      },
      {
        term_zh: '判别器',
        term_en: 'Discriminator',
        definition_zh:
          'GAN 中负责判断输入样本来自真实数据还是生成器的网络，扮演「评委」角色。',
        definition_en:
          'The GAN network that judges whether an input is real or generated, acting as the "judge."',
      },
      {
        term_zh: '模式坍塌',
        term_en: 'Mode Collapse',
        definition_zh:
          'GAN 训练故障：生成器只产出少数几种样本，丧失对真实数据多样性的覆盖。',
        definition_en:
          'A GAN failure where the generator produces only a few sample varieties, losing coverage of the true data\'s diversity.',
      },
    ],
  },

  'dropout-2014': {
    background_zh:
      '深度神经网络参数量巨大、表达力强，但一旦训练数据有限就容易过拟合——模型记住噪声而非学到规律。2014 年，多伦多大学的 Nitish Srivastava 与 Geoffrey Hinton、Alex Krizhevsky、Ilya Sutskever、Ruslan Salakhutdinov 在 JMLR 发表《Dropout: A Simple Way to Prevent Neural Networks from Overfitting》。其动机是把「训练很多不同网络再平均」这一昂贵但有效的集成思想，近似为在单次训练中自动完成，从而以极低成本显著提升泛化能力。',
    background_en:
      'Deep neural networks have huge capacity and expressive power, but with limited training data they easily overfit — memorizing noise instead of learning signal. In 2014, Nitish Srivastava with Geoffrey Hinton, Alex Krizhevsky, Ilya Sutskever, and Ruslan Salakhutdinov published "Dropout: A Simple Way to Prevent Neural Networks from Overfitting" in JMLR. The motivation was to approximate the expensive-but-effective idea of training many different networks and averaging them, automatically and cheaply within a single training run, thereby boosting generalization at minimal cost.',
    keyPoints_zh: [
      'Srivastava 与 Hinton 等人 2014 年提出 Dropout，一种极简的防过拟合正则化。',
      '训练时以概率 p 随机将部分神经元输出置零（屏蔽），迫使网络不依赖特定节点。',
      '可理解为对指数级多个子网络做近似集成，测试时对所有神经元求平均。',
      '它打破神经元间的复杂共适应，使每个神经元都学会独立有用的特征。',
      '常用丢弃率：隐藏层约 0.5，输入层约 0.1–0.2。',
      '在视觉、语音、文档分类等任务上普遍提升性能，成为标准组件。',
    ],
    keyPoints_en: [
      'Srivastava, Hinton et al. (2014) proposed dropout, a minimal regularizer against overfitting.',
      'During training, neurons are randomly zeroed (masked) with probability p, preventing reliance on specific nodes.',
      'It can be seen as approximating an ensemble of exponentially many subnetworks, averaged at test time.',
      'It breaks complex co-adaptation between neurons so each must learn independently useful features.',
      'Typical rates: about 0.5 for hidden layers, 0.1–0.2 for the input layer.',
      'It broadly improved performance on vision, speech, and document classification, becoming standard.',
    ],
    technical_zh:
      'Dropout 的做法很朴素：每次前向传播时，以保留概率 p 随机「丢」掉一部分神经元（把它们的输出置零），反向传播只在保留下来的子网络上更新权重，每个 mini-batch 都采样一个不同的子网络。这等价于在训练时近似了 2ⁿ 个共享权重的子网络集合；测试时让全部神经元参与，并对输出按 p 缩放（或在训练时用「反向 Dropout」预先放大保留神经元）以保持期望值一致，从而近似对这些子网络做集成平均。更深层的作用机制是「减少共适应」：因为邻居随时可能被屏蔽，任一神经元都不能依赖某个特定同伴，被迫学到在多种子网络下都稳健的特征。这一思想还可推广到 DropConnect（随机丢连接）与 Spatial Dropout（整通道丢）等变体。',
    technical_en:
      'Dropout is simple: in each forward pass, with keep probability p, randomly "drop" some neurons by zeroing their outputs; backpropagation updates weights only on the surviving subnetwork, and each mini-batch samples a different one. This approximates an ensemble of 2ⁿ subnetworks that share weights; at test time all neurons participate and outputs are scaled by p (or, via "inverted dropout," pre-scaled during training) to keep expectations consistent, approximating an ensemble average. A deeper mechanism is reducing co-adaptation: because a neighbor may vanish at any moment, no neuron can depend on a specific partner and is forced to learn features robust under many subnetworks. The idea generalizes to DropConnect (dropping connections) and Spatial Dropout (dropping whole channels).',
    impact_zh:
      'Dropout 几乎是深度学习中最常用的正则化手段之一，让训练超大网络而不易过拟合成为可能，并在 AlexNet 等里程碑中扮演关键角色。它降低了集成多个大模型的成本，使「大模型 + Dropout」成为常识。局限在于会拖慢单轮收敛（因每次只训练子网络）、对非常小的数据集收益有限，且近年 Batch Normalization、权重衰减等有时可部分替代它。但它作为「用噪声换取鲁棒性」的范式，影响深远。',
    impact_en:
      'Dropout became one of the most common deep-learning regularizers, making it possible to train huge networks without severe overfitting and playing a key role in milestones like AlexNet. It cut the cost of ensembling many large models, turning "big model + dropout" into common sense. Limitations: it slows per-epoch convergence (only a subnetwork trains each step), helps less on very small datasets, and is sometimes partly replaced by Batch Normalization or weight decay. Yet as a "noise-for-robustness" paradigm its influence runs deep.',
    takeaways_zh: [
      '过拟合可用「训练时随机丢弃、测试时集成平均」这一极简技巧来缓解。',
      'Dropout 的本质是近似指数级子网络集成，并以噪声促发鲁棒特征。',
      '它是「用算力换取泛化」的典型——训练更慢，但模型更稳。',
      '理解共适应，有助于设计更好的正则化与现代归一化方法。',
    ],
    takeaways_en: [
      'Overfitting can be tamed by a minimal trick: randomly drop during training, average at test time.',
      'Dropout essentially approximates an exponential ensemble and uses noise to force robust features.',
      'It is typical "trading compute for generalization" — slower training, steadier models.',
      'Understanding co-adaptation helps design better regularization and modern normalization.',
    ],
    glossary: [
      {
        term_zh: '共适应',
        term_en: 'Co-adaptation',
        definition_zh:
          '神经元之间过度依赖彼此、形成脆弱搭配的现象；Dropout 正是为了打破这种依赖。',
        definition_en:
          'Neurons over-relying on each other in fragile pairings; dropout exists precisely to break such dependence.',
      },
      {
        term_zh: '反向 Dropout',
        term_en: 'Inverted Dropout',
        definition_zh:
          '训练时就把保留神经元输出除以 p 放大，使测试阶段无需额外缩放，便于实现。',
        definition_en:
          'Scaling kept-neuron outputs by 1/p during training so test time needs no extra scaling — simpler to implement.',
      },
    ],
  },

  'resnet-2015': {
    background_zh:
      '随着 AlexNet、VGG、GoogLeNet 把网络推到 19–22 层，研究者发现一个反直觉现象：继续加深，训练误差不降反升——这不是过拟合，而是「退化问题」（优化困难）。2015 年，微软亚洲研究院的 Kaiming He（何恺明）、Xiangyu Zhang、Shaoqing Ren、Jian Sun 提出残差学习，用「跳跃连接」让网络直接学习残差，成功训练出 152 层乃至更深的网络，夺得 ILSVRC 2015 分类冠军（Top-5 错误率 3.57%），论文获 CVPR 2016 最佳论文。',
    background_en:
      'As AlexNet, VGG, and GoogLeNet pushed networks to 19–22 layers, researchers hit a counterintuitive wall: making them deeper raised training error instead of lowering it — not overfitting but the "degradation problem" (an optimization difficulty). In 2015, Kaiming He, Xiangyu Zhang, Shaoqing Ren, and Jian Sun at Microsoft Research Asia proposed residual learning: using skip connections so the network learns residuals directly, successfully training 152-layer and deeper nets. It won ILSVRC 2015 classification (3.57% top-5 error) and earned the CVPR 2016 Best Paper Award.',
    keyPoints_zh: [
      '何恺明等人 2015 年提出 ResNet，用残差连接解决深层网络的退化问题。',
      '核心公式 y = F(x) + x：模块只学习输入到输出的「残差」而非整映射。',
      '恒等跳跃连接让梯度可沿「捷径」直接回传，优化浅层也更简单。',
      '成功训练 152 层网络，ILSVRC 2015 以 3.57% Top-5 错误率夺冠。',
      '残差连接成为 CNN 与 Transformer 等现代架构的通用基本单元。',
      '该论文被认为是 21 世纪被引最高的研究论文之一。',
    ],
    keyPoints_en: [
      'He et al. (2015) proposed ResNet, using residual connections to solve deep-net degradation.',
      'Core formula y = F(x) + x: a block learns the residual from input to output, not the full map.',
      'Identity skip connections let gradients flow back through shortcuts, easing optimization.',
      'It trained 152-layer nets and won ILSVRC 2015 with 3.57% top-5 error.',
      'The residual connection became a universal building block in CNNs and Transformers alike.',
      'The paper is regarded as among the most-cited research articles of the 21st century.',
    ],
    technical_zh:
      'ResNet 的关键是把「学习完整映射 H(x)」改为「学习残差 F(x) = H(x) − x」，再通过一条恒等跳跃连接把输入 x 直接加到模块输出上：y = F(x) + x。为何有效？若最优映射本就接近恒等，则让 F(x) 逼近 0 比让普通层逼近恒等容易得多，因此深层网络至少不会比浅层更差。跳跃连接还提供了一条「高速公路」：梯度可以几乎无损地直接回传到浅层，避免深层反向传播中的梯度衰减。模块本身仍是普通卷积/全连接堆叠，只是多了这条加法捷径。残差思想还与「恒等映射作为良好初始化」的直觉相呼应——网络只需学会「在恒等基础上做多小的修正」。ResNet 衍生出 ResNet-18/34/50/101/152 等标准深度，并成为检测、分割等任务的骨干网络。',
    technical_en:
      'The key ResNet idea is to replace learning a full mapping H(x) with learning the residual F(x) = H(x) − x, then add the input x back via an identity skip connection: y = F(x) + x. Why does it work? If the ideal mapping is near identity, driving F(x) toward zero is far easier than forcing an ordinary layer to approximate identity, so a deeper net is at least no worse than a shallow one. The skip connection also provides a "highway": gradients can flow back to shallow layers almost intact, avoiding the gradient decay of deep backpropagation. The block itself is ordinary stacked convolutions/fully-connected layers plus this additive shortcut. The idea echoes the intuition that identity mapping is a good starting point — the network only needs to learn "how much to correct the identity." ResNet spawned standard depths (18/34/50/101/152) and became a backbone for detection and segmentation.',
    impact_zh:
      'ResNet 一举扫清了「深度」的优化障碍，证明网络可以做到上百甚至上千层，直接推动了更深的计算机视觉模型，并在 ILSVRC/COCO 2015 的多项任务中夺魁。残差/跳跃连接成为此后几乎所有现代架构（含 Transformer 的多头注意力与前馈子层）的标准组件，影响远超视觉。局限方面，极深网络（如 1000+ 层）边际收益递减、训练与推理成本升高；但「用恒等捷径保梯度」的原理已成为深度网络设计的常识。',
    impact_en:
      'ResNet cleared the optimization barrier to depth, proving nets can reach hundreds or even thousands of layers, directly enabling deeper vision models and sweeping ILSVRC/COCO 2015 tasks. Residual/skip connections became standard in almost all later architectures, including Transformers (around multi-head attention and feed-forward sub-layers), far beyond vision. Limitations: extremely deep nets (1000+ layers) show diminishing returns and higher cost; but the principle of "preserving gradients via identity shortcuts" is now deep-network design common sense.',
    takeaways_zh: [
      '网络变深后变差，往往是优化问题而非表达力或拟合问题。',
      '让模块学习「残差」比学习「完整映射」更容易优化。',
      '恒等跳跃连接是保梯度的关键，也是现代深度架构的通用技巧。',
      'ResNet 证明：深度本身是强大资源，只要优化障碍被移除。',
    ],
    takeaways_en: [
      'Deeper-is-worse is often an optimization problem, not a capacity or fitting problem.',
      'Learning a residual is easier to optimize than learning a full mapping.',
      'Identity skip connections preserve gradients and are a universal modern trick.',
      'ResNet proved depth itself is a powerful resource once optimization barriers are removed.',
    ],
    glossary: [
      {
        term_zh: '退化问题',
        term_en: 'Degradation Problem',
        definition_zh:
          '网络加深后训练误差反而上升的现象，源于优化困难而非过拟合或梯度消失。',
        definition_en:
          'The phenomenon where adding depth raises training error, caused by optimization difficulty rather than overfitting or vanishing gradients.',
      },
      {
        term_zh: '跳跃连接',
        term_en: 'Skip / Shortcut Connection',
        definition_zh:
          '把某层输入直接加到其后层输出的连接，使梯度可沿恒等路径回传，是残差学习的核心。',
        definition_en:
          'A connection adding a layer\'s input directly to a later layer\'s output, letting gradients flow via an identity path; the core of residual learning.',
      },
    ],
  },

  'alphago-2016': {
    background_zh:
      '围棋因其巨大的搜索空间（远超宇宙原子数）长期被视为人工智能的「终极棋类挑战」，传统搜索方法难以为继。DeepMind 由 David Silver、Aja Huang、Demis Hassabis 等人研发 AlphaGo，结合深度神经网络与树搜索。2015 年 10 月它以 5:0 击败欧洲冠军樊麾；2016 年 1 月相关论文登上《Nature》封面；2016 年 3 月 9–15 日，它在韩国首尔以 4:1 战胜世界顶级棋手李世石，全球逾 2 亿人观看，成为 AI 史上的标志性事件。',
    background_en:
      'Go, with its enormous search space (exceeding the number of atoms in the universe), was long considered the ultimate board-game challenge for AI, beyond the reach of classical search. DeepMind\'s David Silver, Aja Huang, and Demis Hassabis built AlphaGo by combining deep neural networks with tree search. It beat European champion Fan Hui 5:0 in October 2015; the paper hit the cover of Nature in January 2016; and on March 9–15, 2016, in Seoul, it defeated world top player Lee Sedol 4:1, watched by over 200 million people — a landmark event in AI history.',
    keyPoints_zh: [
      'DeepMind 的 AlphaGo 2016 年以 4:1 战胜李世石，标志 AI 攻克围棋。',
      '系统融合蒙特卡洛树搜索（MCTS）与策略网络、价值网络。',
      '先用人类棋谱监督学习，再通过自我对弈强化学习提升棋力。',
      '策略网络收窄搜索广度，价值网络评估局面胜率、降低搜索深度。',
      '这是从「感知」迈向「决策/规划」的关键跨越。',
      '事件引发全球对 AI 能力、创造力与伦理的广泛讨论。',
    ],
    keyPoints_en: [
      'DeepMind\'s AlphaGo defeated Lee Sedol 4:1 in 2016, marking AI\'s conquest of Go.',
      'The system fuses Monte Carlo Tree Search (MCTS) with policy and value networks.',
      'It first learns from human games by supervised learning, then improves via self-play RL.',
      'The policy network narrows search breadth; the value network estimates win probability, cutting depth.',
      'It was a key leap from "perception" to "decision-making / planning."',
      'The event sparked global debate on AI capability, creativity, and ethics.',
    ],
    technical_zh:
      'AlphaGo 把「两个网络 + 一棵搜索树」结合起来。策略网络（policy network）给定局面预测下一步的好棋，用来缩小搜索的广度；价值网络（value network）给定局面评估胜负概率，用来替代把棋走到终局才判定的昂贵模拟，降低搜索深度。训练分两步：先用大量职业棋谱做监督学习，让策略网络模仿人类走法；再用强化学习让当前策略与旧版本自我对弈，奖励取胜，从而超越人类定式。真正的落子由蒙特卡洛树搜索完成——它用策略网络选择要展开的分支、用价值网络评估叶子局面、用快速走子补全模拟，在「探索—利用」间平衡，挑出最优一手。简言之：人类棋谱给起点，自我对弈打磨棋力，树搜索在实战中做有依据的决策。',
    technical_en:
      'AlphaGo combines "two networks + one search tree." The policy network, given a board, predicts good next moves to narrow search breadth; the value network, given a board, estimates the win probability, replacing expensive play-to-the-end rollouts and cutting search depth. Training has two steps: supervised learning on many professional games makes the policy network imitate human play, then reinforcement learning pits the current policy against older versions, rewarding wins to surpass human patterns. Actual moves come from Monte Carlo Tree Search (MCTS), which uses the policy network to select branches to expand, the value network to evaluate leaf positions, and fast rollouts to complete simulations, balancing exploration and exploitation to pick the best move. In short: human games give a starting point, self-play sharpens strength, and tree search makes grounded decisions in play.',
    impact_zh:
      'AlphaGo 的胜利象征 AI 从「感知」（识别）走向「决策/规划」（在巨大可能性中选出行动），极大提振了公众对深度强化学习的信心，并引爆了 AI 投资与研究热潮。其「监督预训练 + 自我对弈」范式后来演化为 AlphaZero，推广到国际象棋、将棋乃至蛋白质折叠（AlphaFold）。局限是系统专用于围棋、训练与对弈依赖海量算力，且「智能」局限于单一任务；比赛中展现的「创造性」落子也引发了对可解释性与 AI 本质的持续讨论。',
    impact_en:
      'AlphaGo\'s win symbolized AI moving from "perception" (recognition) to "decision-making / planning" (choosing an action among vast possibilities), boosting public confidence in deep reinforcement learning and igniting an AI investment and research boom. Its "supervised pre-training + self-play" paradigm later became AlphaZero, extended to chess, shogi, and even protein folding (AlphaFold). Limitations: the system is specialized to Go, depends on massive compute for training and play, and its "intelligence" is narrow; the creative moves seen in the match also triggered ongoing debate on interpretability and the nature of AI.',
    takeaways_zh: [
      '复杂决策可分解为「评估局面 + 选择动作 + 有依据搜索」三部分。',
      '人类数据提供起点，自我对弈能让系统超越人类水平。',
      '把神经网络（评估/策略）与搜索（规划）结合，是攻克大状态空间的关键。',
      'AI 的里程碑意义常在「感知→决策」的跨越，而非单纯胜负。',
    ],
    takeaways_en: [
      'Hard decisions decompose into evaluating positions, choosing actions, and grounded search.',
      'Human data gives a starting point; self-play can surpass human level.',
      'Combining neural networks (evaluation/policy) with search (planning) cracks huge state spaces.',
      'AI milestones often matter for the perception-to-decision leap, not just the scoreboard.',
    ],
    glossary: [
      {
        term_zh: '蒙特卡洛树搜索',
        term_en: 'Monte Carlo Tree Search (MCTS)',
        definition_zh:
          '通过随机模拟与逐步扩展搜索树来权衡探索与利用、挑选最优行动的规划算法。',
        definition_en:
          'A planning algorithm that expands a search tree via randomized simulation, balancing exploration and exploitation to pick the best action.',
      },
      {
        term_zh: '策略网络 / 价值网络',
        term_en: 'Policy Network / Value Network',
        definition_zh:
          '前者预测下一步走法（缩小搜索广度），后者评估局面胜率（降低搜索深度），是 AlphaGo 的两大神经网络。',
        definition_en:
          'The policy network predicts next moves (narrowing search breadth); the value network estimates win probability (cutting search depth) — AlphaGo\'s two core networks.',
      },
      {
        term_zh: '自我对弈',
        term_en: 'Self-Play',
        definition_zh:
          '让模型与自身（或旧版本）对弈来生成训练信号、在无人标注下持续提升能力的强化学习方式。',
        definition_en:
          'A reinforcement-learning scheme where a model plays against itself (or older versions) to generate training signal and improve without human labels.',
      },
    ],
  },
};
