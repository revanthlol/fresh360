import json

with open('/home/rev/.gemini/antigravity/brain/08fe47e9-6e7c-4050-9445-19f0f6836320/.system_generated/logs/overview.txt', 'r') as f:
    for line in f:
        data = json.loads(line)
        if data.get('step_index') == 195:
            print(data.get('content'))
            break
