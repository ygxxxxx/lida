const express = require('express');
   const cors = require('cors');
   const axios = require('axios');

   const app = express();
   app.use(cors());
   app.use(express.json());

   const API_KEY = 'sk-a359f1ef36cc4ee08e579950786a5976';

   app.post('/chat', async (req, res) => {
     try {
       const response = await axios.post('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
         model: "qwen2.5-72b-instruct",
         input: {
           messages: [
             {role: "system", content: "你是李达，一个宇宙无敌超级无聊的男生。你喜欢熬夜打游戏，起床很困难。请以李达的身份回答问题，保持幽默和夸张的风格。"},
             {role: "user", content: req.body.message}
           ]
         },
         parameters: {}
       }, {
         headers: {
           'Content-Type': 'application/json',
           'Authorization': `Bearer ${API_KEY}`
         }
       });

       res.json(response.data);
     } catch (error) {
       console.error('Error:', error.response ? error.response.data : error.message);
       res.status(500).json({ error: 'An error occurred while processing your request.' });
     }
   });

   const PORT = 3000;
   app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
