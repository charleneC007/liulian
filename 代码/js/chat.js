// 聊天界面控制
const chatToggle = document.querySelector('.chat-toggle');
const chatContainer = document.querySelector('.chat-container');
const chatMessages = document.querySelector('.chat-messages');
const chatInput = document.querySelector('.chat-input textarea');
const sendButton = document.querySelector('.send-btn');
const voiceButton = document.querySelector('.voice-input-btn');
const emojiButton = document.querySelector('.emoji-btn');

// 切换聊天界面
chatToggle.addEventListener('click', () => {
    chatContainer.classList.toggle('active');
    if (chatContainer.classList.contains('active')) {
        chatInput.focus();
    }
});

// 双击空白处关闭聊天
chatContainer.addEventListener('dblclick', (e) => {
    if (e.target === chatContainer) {
        chatContainer.classList.remove('active');
    }
});

// 发送消息
function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // 添加用户消息
    addMessage(message, 'user');
    chatInput.value = '';

    // 模拟AI回复
    setTimeout(() => {
        const aiResponse = generateAIResponse(message);
        addMessage(aiResponse, 'ai');
    }, 1000);
}

// 添加消息到聊天界面
function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 生成AI回复（示例）
function generateAIResponse(message) {
    const responses = [
        "音乐是我表达情感的方式，每一首歌都承载着不同的故事。",
        "创作灵感来自生活的点点滴滴，有时候一个瞬间就能激发一首歌的灵感。",
        "现场演出是最能感受到音乐能量的时刻，能和歌迷们一起分享音乐真的很幸福。",
        "每首歌都像是一个小世界，希望我的音乐能带给你们温暖和力量。",
        "创作是一个不断探索的过程，我很享受这个过程。"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

// 发送按钮点击事件
sendButton.addEventListener('click', sendMessage);

// 回车发送消息
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 语音输入功能（示例）
voiceButton.addEventListener('click', () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'zh-CN';
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            chatInput.value = text;
        };
        
        recognition.start();
    } else {
        alert('您的浏览器不支持语音输入功能');
    }
});

// 表情选择功能（示例）
emojiButton.addEventListener('click', () => {
    const emojis = ['😊', '🎵', '🎸', '🎤', '❤️', '✨', '🎼', '🎹'];
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container';
    
    emojis.forEach(emoji => {
        const button = document.createElement('button');
        button.textContent = emoji;
        button.addEventListener('click', () => {
            chatInput.value += emoji;
            emojiContainer.remove();
        });
        emojiContainer.appendChild(button);
    });
    
    chatInput.parentNode.appendChild(emojiContainer);
});

// 添加一些示例消息
addMessage("你好！我是AI刘恋，很高兴和你聊天。", 'ai');
addMessage("有什么想了解的吗？", 'ai'); 