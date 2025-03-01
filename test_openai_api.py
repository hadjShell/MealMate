from openai import OpenAI

client = OpenAI(
  api_key="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"
)

completion = client.chat.completions.create(
  model="gpt-4o-mini",
  store=True,
  messages=[
    {"role": "user", "content": "write a haiku about ai"}
  ]
)

print(completion.choices[0].message);
