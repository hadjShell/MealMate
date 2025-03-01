from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()  # 加载 .env 文件中的环境变量


client = OpenAI(
  api_key = os.environ.get('OPENAI_API_KEY')
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);
