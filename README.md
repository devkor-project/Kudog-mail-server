Kudog 서비스의 mail 전송 담당

## Flow

### Scheduler ↔ RedisFactory ↔ Arrangement Agent ↔ Bulk sending

## Redis - category set마다 mail contents 동적 생성 X, 재활용
key = category

value = contents 
