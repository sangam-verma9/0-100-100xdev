## Rate limitting

#### Why rate limitting
- Preventing Overload
- Mitigating Abuse
- Managing Traffic
- DDoS Protection

#### Package to use rate limiting in express
```bash
npm i express-rate-limit
```
This uses IP address to block the request 

### Cloudflare DDOS attack Prevention
To use cloudflare ddos attack you have to transfer you domain to cloudeflare then enable proxy for ddos

#### Cloudflare captcha
We can use Cloudflare Turnstile to create captcha to prevent bot sending request. Turnstile provide a token that claudeflare varify when reqest is sended to service first we varify token comes from frontend then process the request.
```bash
npm i @marsidev/react-turnstile
```
