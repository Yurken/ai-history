import { events } from './events';
import type { Event } from '@/types/event';
import type { KnowledgeNode, KnowledgeSource } from '@/types/knowledge';

const sources: Record<string, KnowledgeSource> = {
  search: { title: 'SRI Artificial Intelligence Center: search and planning', url: 'https://www.sri.com/research/information-computing-sciences/artificial-intelligence-center/' },
  svm: { title: 'Cortes & Vapnik — Support-vector networks (1995)', url: 'https://doi.org/10.1007/BF00994018' },
  forest: { title: 'Breiman — Random Forests (2001)', url: 'https://www.stat.berkeley.edu/users/breiman/randomforest2001.pdf' },
  belief: { title: 'Hinton, Osindero & Teh — A fast learning algorithm for deep belief nets (2006)', url: 'https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf' },
  backprop: { title: 'Rumelhart, Hinton & Williams — Learning representations by back-propagating errors (1986)', url: 'https://doi.org/10.1038/323533a0' },
  lstm: { title: 'Hochreiter & Schmidhuber — Long Short-Term Memory (1997)', url: 'https://www.bioinf.jku.at/publications/older/2604.pdf' },
  embeddings: { title: 'Mikolov et al. — Efficient Estimation of Word Representations in Vector Space (2013)', url: 'https://arxiv.org/abs/1301.3781' },
  attention: { title: 'Bahdanau, Cho & Bengio — Neural Machine Translation by Jointly Learning to Align and Translate (2014)', url: 'https://arxiv.org/abs/1409.0473' },
  transformer: { title: 'Vaswani et al. — Attention Is All You Need (2017)', url: 'https://arxiv.org/abs/1706.03762' },
  gan: { title: 'Goodfellow et al. — Generative Adversarial Networks (2014)', url: 'https://arxiv.org/abs/1406.2661' },
  diffusion: { title: 'Rombach et al. — High-Resolution Image Synthesis with Latent Diffusion Models (2022)', url: 'https://arxiv.org/abs/2112.10752' },
  dalle2: { title: 'Ramesh et al. — Hierarchical Text-Conditional Image Generation with CLIP Latents (2022)', url: 'https://arxiv.org/abs/2204.06125' },
  clip: { title: 'Radford et al. — Learning Transferable Visual Models From Natural Language Supervision (2021)', url: 'https://arxiv.org/abs/2103.00020' },
  alphago: { title: 'Silver et al. — Mastering the game of Go with deep neural networks and tree search (2016)', url: 'https://doi.org/10.1038/nature16961' },
  zero: { title: 'Silver et al. — Mastering the game of Go without human knowledge (2017)', url: 'https://doi.org/10.1038/nature24270' },
  rlhf: { title: 'Ouyang et al. — Training language models to follow instructions with human feedback (2022)', url: 'https://arxiv.org/abs/2203.02155' },
  constitutional: { title: 'Bai et al. — Constitutional AI: Harmlessness from AI Feedback (2022)', url: 'https://arxiv.org/abs/2212.08073' },
  reasoning: { title: 'DeepSeek-AI — DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning (2025)', url: 'https://arxiv.org/abs/2501.12948' },
  o1: { title: 'OpenAI — Learning to reason with LLMs (2024)', url: 'https://openai.com/index/learning-to-reason-with-llms/' },
  sora: { title: 'OpenAI — Video generation models as world simulators (2024)', url: 'https://openai.com/index/video-generation-models-as-world-simulators/' },
  alphafold: { title: 'Jumper et al. — Highly accurate protein structure prediction with AlphaFold (2021)', url: 'https://doi.org/10.1038/s41586-021-03819-2' },
  bert: { title: 'Devlin et al. — BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding (2018)', url: 'https://arxiv.org/abs/1810.04805' },
  llama: { title: 'Touvron et al. — LLaMA: Open and Efficient Foundation Language Models (2023)', url: 'https://arxiv.org/abs/2302.13971' },
  mistral: { title: 'Jiang et al. — Mistral 7B (2023)', url: 'https://arxiv.org/abs/2310.06825' },
  deepseek: { title: 'DeepSeek-AI — DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model (2024)', url: 'https://arxiv.org/abs/2405.04434' },
  dalle: { title: 'Ramesh et al. — Zero-Shot Text-to-Image Generation (2021)', url: 'https://arxiv.org/abs/2102.12092' },
  qlearning: { title: 'Watkins & Dayan — Q-learning (1992)', url: 'https://doi.org/10.1007/BF00992698' },
  convolution: { title: 'LeCun et al. — Gradient-Based Learning Applied to Document Recognition (1998)', url: 'https://bottou.org/papers/lecun-98h' },
};

// This is a curated reading map, not a claim that AI has mutually exclusive schools.
// Methods, learning objectives, applications, and historical context remain distinct.
export const knowledgeTree: KnowledgeNode[] = [
  {
    id: 'symbolic',
    title_zh: '符号主义与知识推理',
    title_en: 'Symbolic AI & knowledge reasoning',
    description_zh: '用显式符号、规则和搜索表达知识并求解问题；可与统计学习、神经模型组合。',
    description_en: 'Represent knowledge with explicit symbols and rules, then reason or search for solutions. These methods can combine with statistical and neural models.',
    eventIds: [],
    relatedNodeIds: ['statistical', 'reinforcement'],
    sources: [sources.search],
    children: [
      {
        id: 'logic-programming',
        title_zh: '逻辑推理与程序语言',
        title_en: 'Logic, theorem proving & languages',
        description_zh: '以形式表达式和推理规则求证结论。LISP 提供符号处理工具，Prolog 将逻辑关系用于程序求解。',
        description_en: 'Derive conclusions from formal expressions and inference rules. LISP supports symbolic processing; Prolog uses logical relations to solve programs.',
        eventIds: ['logic-theorist-1956', 'lisp-1958', 'prolog-1970', 'fifth-generation-1980'],
        relatedNodeIds: ['knowledge-systems', 'search-planning'],
      },
      {
        id: 'knowledge-systems',
        title_zh: '知识工程与专家系统',
        title_en: 'Knowledge engineering & expert systems',
        description_zh: '将领域知识整理为规则或结构，由推理过程生成建议。DENDRAL、MYCIN 与 XCON 展示知识驱动系统的不同用途。',
        description_en: 'Encode domain knowledge as rules or structures and apply inference to produce recommendations. DENDRAL, MYCIN, and XCON illustrate different uses.',
        eventIds: ['dendral-1965', 'mycin-1981', 'xcon-1980', 'ai-winter-1987'],
        relatedNodeIds: ['logic-programming', 'cognitive-architectures', 'language-applications'],
      },
      {
        id: 'search-planning',
        title_zh: '启发式搜索与规划',
        title_en: 'Heuristic search & planning',
        description_zh: '在状态空间中寻找行动序列，并用启发式缩小搜索。AlphaGo 将树搜索与学习模型结合，体现方法的交叉。',
        description_en: 'Find action sequences in a state space and use heuristics to guide exploration. AlphaGo connects tree search with learned models.',
        eventIds: ['shannon-chess-1950', 'logic-theorist-1956', 'gps-1959', 'shakey-1969', 'deep-blue-1997', 'alphago-2016', 'alphago-zero-2017'],
        relatedNodeIds: ['logic-programming', 'game-search-self-play', 'robotics-systems'],
        sources: [sources.search, sources.alphago],
      },
      {
        id: 'cognitive-architectures',
        title_zh: '认知架构',
        title_en: 'Cognitive architectures',
        description_zh: '组织记忆、问题求解与学习等机制，研究统一的智能系统。Soar 是本项目记录的代表。',
        description_en: 'Organize memory, problem solving, and learning into an integrated account of intelligent behavior. Soar is the example covered here.',
        eventIds: ['soar-1983', 'gps-1959'],
        relatedNodeIds: ['knowledge-systems', 'value-learning'],
      },
    ],
  },
  {
    id: 'statistical',
    title_zh: '统计学习与概率方法',
    title_en: 'Statistical learning & probabilistic methods',
    description_zh: '从数据估计预测规律，并关注不确定性与泛化。这里按方法传统组织；神经学习也具有统计基础。',
    description_en: 'Estimate predictive patterns from data while studying uncertainty and generalization. This branch groups methodological traditions; neural learning also has statistical foundations.',
    eventIds: [],
    relatedNodeIds: ['symbolic', 'neural'],
    sources: [sources.svm, sources.forest],
    children: [
      {
        id: 'margin-kernel-methods',
        title_zh: '最大间隔与核方法',
        title_en: 'Maximum-margin & kernel methods',
        description_zh: '用间隔目标选择决策边界，并通过核函数表示非线性关系。支持向量机是代表模型。',
        description_en: 'Choose decision boundaries using a margin objective and represent nonlinear relationships through kernels. Support vector machines are a representative model.',
        eventIds: ['svm-1995'],
        relatedNodeIds: ['tree-ensembles', 'convolutional-networks'],
        sources: [sources.svm],
      },
      {
        id: 'tree-ensembles',
        title_zh: '决策树与集成学习',
        title_en: 'Decision trees & ensemble learning',
        description_zh: '组合多个预测器改善泛化。随机森林利用随机化的树集合，适用于分类与回归。',
        description_en: 'Combine predictors to improve generalization. Random forests use an ensemble of randomized trees for classification and regression.',
        eventIds: ['random-forest-2001'],
        relatedNodeIds: ['margin-kernel-methods'],
        sources: [sources.forest],
      },
      {
        id: 'probabilistic-graph-models',
        title_zh: '概率建模与图方法',
        title_en: 'Probabilistic modeling & graph methods',
        description_zh: '用概率分布或图结构刻画关系。深度信念网络同时连接概率生成模型与神经网络；PageRank 展示图上的随机游走排序。',
        description_en: 'Describe relationships with probability distributions or graph structures. Deep belief nets bridge probabilistic generation and neural networks; PageRank illustrates random-walk ranking on a graph.',
        eventIds: ['deep-belief-network-2006', 'pagerank-1998'],
        relatedNodeIds: ['neural-foundations', 'generative-models', 'value-learning'],
        sources: [sources.belief],
      },
      {
        id: 'sequence-modeling',
        title_zh: '语言与序列建模',
        title_en: 'Language & sequence modeling',
        description_zh: '预测词语、语音等有序数据，连接概率建模、词表示、循环网络与注意力；这些任务跨越多个方法传统。',
        description_en: 'Predict ordered data such as words and speech, connecting probabilistic modeling, word representations, recurrence, and attention. These tasks span methodological traditions.',
        eventIds: ['word2vec-2013', 'lstm-1997', 'attention-mechanism-2014', 'speech-recognition-human-parity-2016'],
        relatedNodeIds: ['recurrent-networks', 'attention', 'word-representations', 'transformer-language-models'],
        sources: [sources.embeddings, sources.lstm, sources.attention],
      },
    ],
  },
  {
    id: 'neural',
    title_zh: '连接主义与神经网络',
    title_en: 'Connectionism & neural networks',
    description_zh: '通过可学习的连接和分层表示建模。架构、优化方法与生成目标可以独立组合，并与强化学习或符号搜索融合。',
    description_en: 'Model data using learned connections and layered representations. Architectures, optimization methods, and generative objectives can combine with reinforcement learning or symbolic search.',
    eventIds: ['alphago-2016', 'alphago-zero-2017', 'openai-five-2019'],
    relatedNodeIds: ['statistical', 'reinforcement'],
    sources: [sources.backprop, sources.transformer],
    children: [
      {
        id: 'neural-foundations',
        title_zh: '神经元、感知机与深层表示',
        title_en: 'Neurons, perceptrons & deep representations',
        description_zh: '从数学神经元和感知机到多层表示。深度信念网络将分层预训练与概率建模结合。',
        description_en: 'Trace mathematical neurons and perceptrons into multilayer representations. Deep belief nets combine layerwise pretraining with probabilistic modeling.',
        eventIds: ['mcculloch-pitts-1943', 'perceptron-hardware-1958', 'perceptrons-1969', 'deep-belief-network-2006'],
        relatedNodeIds: ['neural-training', 'probabilistic-graph-models'],
        sources: [sources.belief],
      },
      {
        id: 'neural-training',
        title_zh: '优化、反向传播与正则化',
        title_en: 'Optimization, backpropagation & regularization',
        description_zh: '通过梯度优化学习参数，并用正则化控制过拟合。反向传播和 Dropout 可服务于多种网络架构。',
        description_en: 'Learn parameters through gradient optimization and control overfitting through regularization. Backpropagation and dropout apply across network architectures.',
        eventIds: ['backpropagation-1986', 'dropout-2014', 'resnet-2015'],
        relatedNodeIds: ['neural-foundations', 'convolutional-networks', 'deep-reinforcement-learning'],
        sources: [sources.backprop],
      },
      {
        id: 'convolutional-networks',
        title_zh: '卷积网络与视觉识别',
        title_en: 'Convolutional networks & visual recognition',
        description_zh: '利用局部连接和参数共享处理空间结构。LeNet、AlexNet、VGG 与 ResNet 构成图像识别的重要技术脉络。',
        description_en: 'Use local connectivity and shared parameters to model spatial structure. LeNet, AlexNet, VGG, and ResNet mark an important lineage in image recognition.',
        eventIds: ['lecun-cnn-1989', 'lenet-1998', 'imagenet-2009', 'alexnet-2012', 'vgg-2014', 'resnet-2015'],
        relatedNodeIds: ['margin-kernel-methods', 'neural-training', 'multimodal-representations'],
        sources: [sources.convolution],
      },
      {
        id: 'recurrent-networks',
        title_zh: '循环网络与 LSTM',
        title_en: 'Recurrent networks & LSTM',
        description_zh: '使用递归状态处理序列。LSTM 的门控记忆缓解长距离依赖学习困难；早期注意力模型在循环编码器与解码器之间学习对齐。',
        description_en: 'Process sequences with recurrent state. Gated LSTM memory addresses difficult long-range dependencies; early attention models learn alignment between recurrent encoders and decoders.',
        eventIds: ['lstm-1997', 'attention-mechanism-2014', 'speech-recognition-human-parity-2016'],
        relatedNodeIds: ['sequence-modeling', 'attention'],
        sources: [sources.lstm, sources.attention],
      },
      {
        id: 'word-representations',
        title_zh: '词嵌入与分布式表示',
        title_en: 'Word embeddings & distributed representations',
        description_zh: '从上下文数据学习连续向量，让词语关系进入可计算的表示空间。Word2Vec 连接统计语言建模与神经表示学习。',
        description_en: 'Learn continuous vectors from context data so word relationships become computable representations. Word2Vec connects statistical language modeling with neural representation learning.',
        eventIds: ['word2vec-2013'],
        relatedNodeIds: ['sequence-modeling', 'transformer-language-models', 'multimodal-representations'],
        sources: [sources.embeddings],
      },
      {
        id: 'attention-transformers',
        title_zh: '注意力与 Transformer',
        title_en: 'Attention & Transformers',
        description_zh: '用数据相关的加权交互连接表示。注意力早于 Transformer；Transformer 以注意力构造并行的序列处理架构。',
        description_en: 'Connect representations through data-dependent weighted interactions. Attention predates the Transformer, which builds a parallel sequence architecture around attention.',
        eventIds: [],
        relatedNodeIds: ['sequence-modeling', 'recurrent-networks', 'generative-models'],
        sources: [sources.attention, sources.transformer],
        children: [
          {
            id: 'attention',
            title_zh: '注意力与序列对齐',
            title_en: 'Attention & sequence alignment',
            description_zh: '为不同输入位置学习权重，从而动态汇聚相关信息。它既可连接循环网络，也可构成自注意力架构。',
            description_en: 'Learn weights over input positions to aggregate relevant information dynamically. Attention can connect recurrent networks or form self-attention architectures.',
            eventIds: ['attention-mechanism-2014', 'transformer-2017'],
            relatedNodeIds: ['sequence-modeling', 'recurrent-networks', 'transformer-language-models'],
            sources: [sources.attention, sources.transformer],
          },
          {
            id: 'transformer-language-models',
            title_zh: 'Transformer 与预训练语言模型',
            title_en: 'Transformers & pretrained language models',
            description_zh: '通过自注意力构造文本表示，再用预训练与任务适配学习语言能力。这里关联公开技术论文所描述的模型。',
            description_en: 'Build text representations through self-attention, then learn language capabilities through pretraining and adaptation. Associations here follow publicly described model technologies.',
            eventIds: ['transformer-2017', 'bert-2018', 'gpt-1-2018', 'gpt-2-2019', 'gpt-3-2020', 'llama-2023', 'llama-2-2023', 'mistral-2023', 'deepseek-v2-2024', 'deepseek-r1-2025'],
            relatedNodeIds: ['attention', 'word-representations', 'autoregressive-generation', 'feedback-reasoning', 'language-applications'],
            sources: [sources.transformer, sources.bert, sources.llama, sources.mistral, sources.deepseek, sources.reasoning],
          },
          {
            id: 'multimodal-representations',
            title_zh: '跨模态与结构化表示',
            title_en: 'Cross-modal & structured representations',
            description_zh: '学习模态之间或结构化数据内部的交互表示。CLIP 进行图文对比学习；AlphaFold2 将序列与残基关系用于结构预测。',
            description_en: 'Learn interacting representations across modalities or within structured data. CLIP uses image-text contrastive learning; AlphaFold2 combines sequence and residue-pair representations for structure prediction.',
            eventIds: ['clip-2021', 'alphafold2-2020', 'dall-e-2021', 'dall-e-2-2022'],
            relatedNodeIds: ['convolutional-networks', 'word-representations', 'diffusion-generation', 'visual-scientific-applications'],
            sources: [sources.clip, sources.alphafold, sources.dalle2],
          },
        ],
      },
      {
        id: 'generative-models',
        title_zh: '神经生成模型',
        title_en: 'Neural generative models',
        description_zh: '学习数据分布并产生新样本。自回归、对抗学习和扩散是不同生成机制；它们可以共享 Transformer 等网络架构。',
        description_en: 'Learn data distributions and generate new samples. Autoregression, adversarial learning, and diffusion are distinct mechanisms that may share architectures such as Transformers.',
        eventIds: ['deep-belief-network-2006'],
        relatedNodeIds: ['probabilistic-graph-models', 'attention-transformers'],
        sources: [sources.gan, sources.diffusion],
        children: [
          {
            id: 'adversarial-generation',
            title_zh: 'GAN 与对抗生成',
            title_en: 'GANs & adversarial generation',
            description_zh: '通过生成器与判别器的对抗目标学习分布。StyleGAN 在这一框架中发展了可控制的图像生成。',
            description_en: 'Learn distributions through competing generator and discriminator objectives. StyleGAN develops controllable image generation within this framework.',
            eventIds: ['gan-2014', 'stylegan-2018'],
            relatedNodeIds: ['diffusion-generation', 'visual-scientific-applications'],
            sources: [sources.gan],
          },
          {
            id: 'diffusion-generation',
            title_zh: '扩散与潜空间生成',
            title_en: 'Diffusion & latent-space generation',
            description_zh: '学习逐步去噪或相应的反向生成过程。Stable Diffusion、DALL·E 2 和 Sora 展示潜空间、图像与视频生成的不同应用。',
            description_en: 'Learn iterative denoising or a corresponding reverse generation process. Stable Diffusion, DALL·E 2, and Sora illustrate latent-space, image, and video applications.',
            eventIds: ['stable-diffusion-2022', 'dall-e-2-2022', 'sora-2024'],
            relatedNodeIds: ['adversarial-generation', 'multimodal-representations', 'visual-scientific-applications'],
            sources: [sources.diffusion, sources.dalle2, sources.sora],
          },
          {
            id: 'autoregressive-generation',
            title_zh: '自回归生成',
            title_en: 'Autoregressive generation',
            description_zh: '将联合分布分解为依次预测的条件分布，可生成文本或其他离散表示。GPT 与初代 DALL·E 是关联案例。',
            description_en: 'Factor a joint distribution into successive conditional predictions to generate text or other discrete representations. GPT and the original DALL·E are associated examples.',
            eventIds: ['gpt-1-2018', 'gpt-2-2019', 'gpt-3-2020', 'dall-e-2021', 'llama-2023', 'llama-2-2023', 'mistral-2023', 'deepseek-v2-2024'],
            relatedNodeIds: ['transformer-language-models', 'feedback-reasoning'],
            sources: [sources.dalle, sources.llama, sources.mistral],
          },
        ],
      },
    ],
  },
  {
    id: 'reinforcement',
    title_zh: '强化学习与决策',
    title_en: 'Reinforcement learning & decision making',
    description_zh: '研究行动、反馈与长期收益。强化学习是学习范式，决策搜索是求解方法；它们与神经网络等技术交叉，并非封闭学派。',
    description_en: 'Study actions, feedback, and long-term returns. Reinforcement learning is a learning paradigm and decision search a solution method; both overlap with neural and other approaches.',
    eventIds: [],
    relatedNodeIds: ['symbolic', 'neural'],
    sources: [sources.alphago, sources.zero, sources.rlhf],
    children: [
      {
        id: 'value-learning',
        title_zh: '价值函数与 Q-learning',
        title_en: 'Value functions & Q-learning',
        description_zh: '用预期长期收益评价状态或行动，通过经验更新价值估计。Q-learning 是经典的无模型价值学习方法。',
        description_en: 'Evaluate states or actions through expected long-term return and update value estimates from experience. Q-learning is a classic model-free value-learning method.',
        eventIds: ['q-learning-1989'],
        relatedNodeIds: ['cognitive-architectures', 'probabilistic-graph-models', 'deep-reinforcement-learning'],
        sources: [sources.qlearning],
      },
      {
        id: 'deep-reinforcement-learning',
        title_zh: '深度强化学习',
        title_en: 'Deep reinforcement learning',
        description_zh: '用神经网络近似策略或价值函数，并从环境交互中优化行为。AlphaGo 系列和 OpenAI Five 展示这一组合。',
        description_en: 'Approximate policies or value functions with neural networks and improve behavior through interaction. AlphaGo systems and OpenAI Five illustrate the combination.',
        eventIds: ['alphago-2016', 'alphago-zero-2017', 'openai-five-2019'],
        relatedNodeIds: ['neural-training', 'value-learning', 'game-search-self-play', 'feedback-reasoning'],
        sources: [sources.alphago, sources.zero],
      },
      {
        id: 'game-search-self-play',
        title_zh: '博弈搜索与自博弈',
        title_en: 'Game search & self-play',
        description_zh: '在对抗任务中结合搜索、学习评估和自博弈。深蓝作为搜索路线的对照，并不因此被归为强化学习模型。',
        description_en: 'Connect search, learned evaluation, and self-play in adversarial tasks. Deep Blue provides a search-based comparison and is not classified as a reinforcement-learning model.',
        eventIds: ['shannon-chess-1950', 'samuel-checkers-1952', 'deep-blue-1997', 'alphago-2016', 'alphago-zero-2017', 'openai-five-2019'],
        relatedNodeIds: ['search-planning', 'deep-reinforcement-learning'],
        sources: [sources.alphago, sources.zero],
      },
      {
        id: 'feedback-reasoning',
        title_zh: '反馈学习、对齐与推理训练',
        title_en: 'Feedback learning, alignment & reasoning training',
        description_zh: '用人类偏好、AI 反馈或可验证奖励改进语言模型。RLHF、RLAIF 与推理强化学习的目标和奖励来源各不相同。',
        description_en: 'Improve language models with human preferences, AI feedback, or verifiable rewards. RLHF, RLAIF, and reinforcement learning for reasoning use different objectives and reward sources.',
        eventIds: ['instructgpt-2022', 'chatgpt-2022', 'claude-2023', 'openai-o1-2024', 'deepseek-r1-2025'],
        relatedNodeIds: ['transformer-language-models', 'autoregressive-generation', 'deep-reinforcement-learning', 'language-applications'],
        sources: [sources.rlhf, sources.constitutional, sources.o1, sources.reasoning],
      },
    ],
  },
  {
    id: 'foundations-ecosystem',
    title_zh: '基础、应用与研究生态',
    title_en: 'Foundations, applications & research ecosystem',
    description_zh: '记录问题定义、研究环境、数据工具与应用。它们为多个方法传统提供背景；产品事件不等于其内部架构已公开。',
    description_en: 'Place problem definitions, research conditions, data, tools, and applications in context across methods. A product milestone does not imply that its internal architecture is public.',
    eventIds: [],
    children: [
      {
        id: 'foundations-history',
        title_zh: '学科起源与历史转折',
        title_en: 'Origins & historical turning points',
        description_zh: '从智能的操作性问题到研究计划、资金周期与组织变迁，为技术发展提供历史背景。',
        description_en: 'Connect operational questions about intelligence with research agendas, funding cycles, and organizational changes that shape technical work.',
        eventIds: ['turing-1950', 'dartmouth-1956', 'machine-learning-term-1959', 'perceptrons-1969', 'lighthill-report-1972', 'fifth-generation-1980', 'ai-winter-1987', 'openai-founded-2015'],
      },
      {
        id: 'datasets-tools',
        title_zh: '数据集、评测与开发工具',
        title_en: 'Datasets, benchmarks & development tools',
        description_zh: '数据集支持共同任务与比较，软件框架支持模型开发。MNIST、ImageNet、TensorFlow 和 PyTorch 贯穿多个研究方向。',
        description_en: 'Datasets enable shared tasks and comparisons; software frameworks support model development. MNIST, ImageNet, TensorFlow, and PyTorch serve multiple research directions.',
        eventIds: ['lenet-1998', 'imagenet-2009', 'tensorflow-2015', 'pytorch-2017'],
        relatedNodeIds: ['convolutional-networks', 'neural-training'],
      },
      {
        id: 'robotics-systems',
        title_zh: '机器人与自主系统',
        title_en: 'Robotics & autonomous systems',
        description_zh: '把感知、规划、控制和行动放入真实环境。不同系统采用不同技术组合，不能仅由产品类别推断学习架构。',
        description_en: 'Bring perception, planning, control, and action into physical environments. Systems combine technologies differently; a product category alone does not determine the learning architecture.',
        eventIds: ['shakey-1969', 'stanford-cart-1979', 'roomba-2002', 'waymo-2023'],
        relatedNodeIds: ['search-planning'],
        sources: [sources.search],
      },
      {
        id: 'language-applications',
        title_zh: '语言、编程与交互系统',
        title_en: 'Language, coding & interactive systems',
        description_zh: '从规则对话和问答到语言助手、代码生成与端侧应用。这是应用脉络；架构或训练方法的归属需有额外技术证据。',
        description_en: 'Follow rule-based dialogue and question answering into language assistants, code generation, and on-device applications. Architectural or training assignments require separate technical evidence.',
        eventIds: ['eliza-1966', 'watson-jeopardy-2011', 'github-copilot-2021', 'chatgpt-2022', 'gpt-4-2023', 'claude-2023', 'gemini-2023', 'claude-3-2024', 'gpt-4o-2024', 'apple-intelligence-2024', 'openai-o1-2024', 'deepseek-r1-2025', 'claude-35-2025', 'gpt-45-2025'],
        relatedNodeIds: ['knowledge-systems', 'transformer-language-models', 'feedback-reasoning'],
      },
      {
        id: 'visual-scientific-applications',
        title_zh: '视觉生成与科学应用',
        title_en: 'Visual generation & scientific applications',
        description_zh: '观察图文表示、图像视频生成与蛋白质结构预测的应用发展。公开方法和应用里程碑通过交叉关联连接。',
        description_en: 'Explore applications in image-text representations, image and video generation, and protein structure prediction. Cross-links connect documented methods with application milestones.',
        eventIds: ['alphafold2-2020', 'clip-2021', 'dall-e-2021', 'stable-diffusion-2022', 'midjourney-2022', 'dall-e-2-2022', 'sora-2024'],
        relatedNodeIds: ['multimodal-representations', 'adversarial-generation', 'diffusion-generation'],
        sources: [sources.clip, sources.diffusion, sources.sora],
      },
    ],
  },
];

export function flattenKnowledgeNodes(nodes: KnowledgeNode[] = knowledgeTree): KnowledgeNode[] {
  return nodes.flatMap(node => [node, ...flattenKnowledgeNodes(node.children ?? [])]);
}

export const knowledgeNodes = flattenKnowledgeNodes();
export const knowledgeNodeMap = new Map(knowledgeNodes.map(node => [node.id, node]));

export function getKnowledgeNode(id: string): KnowledgeNode | undefined {
  return knowledgeNodeMap.get(id);
}

/** Collect direct and descendant event IDs once; related-node links do not imply inheritance. */
export function getNodeEventIds(nodeOrId: KnowledgeNode | string): string[] {
  const node = typeof nodeOrId === 'string' ? getKnowledgeNode(nodeOrId) : nodeOrId;
  if (!node) return [];
  return [...new Set([...(node.eventIds ?? []), ...(node.children ?? []).flatMap(getNodeEventIds)])];
}

export function getNodeEvents(nodeOrId: KnowledgeNode | string): Event[] {
  const ids = new Set(getNodeEventIds(nodeOrId));
  return events.filter(event => ids.has(event.id)).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
}

/** Return the hierarchy path for breadcrumbs and ancestor highlighting. */
export function getNodePath(id: string, nodes: KnowledgeNode[] = knowledgeTree): KnowledgeNode[] {
  for (const node of nodes) {
    if (node.id === id) return [node];
    const childPath = getNodePath(id, node.children ?? []);
    if (childPath.length) return [node, ...childPath];
  }
  return [];
}
