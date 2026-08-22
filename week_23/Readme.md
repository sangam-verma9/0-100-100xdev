## WebRTC
WebRTC is the core/only protocol that lets you do real time media communication from inside a browser.

#### P2P
WebRTC is a peer to peer protocol. This means the you directly send your media over to the other person without the need of a central server

#### Signalling server
Both the browsers need to exchange their address before they can start talking to each other. A signaling server is used for that. 

#### Stun (Session Traversal Utilities for NAT)
It gives you back your publically accessable IPs. It shows you how the world sees you

#### Ice candidates
ICE (Interactive Connectivity Establishment) candidates are potential networking endpoints that WebRTC uses to establish a connection between peers. Each candidate represents a possible method for two devices (peers) to communicate, usually in the context of real-time applications like video calls, voice calls, or peer-to-peer data sharing.

https://webrtc.github.io/samples/src/content/peerconnection/trickle-ice/

- If two friends are trying to connect to each other in a hostel wifi , then they can connect via their private router ice candidates. 

- If two people from different countries are trying to connect to each other, then they would connect via their public IPs.

#### Turn server
A lot of times, your network doesn’t allow media to come in from browser 2 . This depends on how restrictive your network is 
Since the ice candidate is discovered by the stun server, your network might block incoming data from browser 2 and only allow it from the stun server

#### Offer
The process of the first browser (the one initiating connection) sending their ice candidates to the other side.
#### Answer
The other side returning their ice candidates is called the answer.

#### SDP - Session description protocol
A single file that contains all your 
- ice candidates
- what media you want to send, what protocols you’ve used to encode the media
This is the file that is sent in the offer and received in the answer

```bash
v=0
o=- 423904492236154649 2 IN IP4 127.0.0.1
s=-
t=0 0
m=audio 49170 RTP/AVP 0
c=IN IP4 192.168.1.101
a=rtpmap:0 PCMU/8000
a=ice-options:trickle
a=candidate:1 1 UDP 2122260223 192.168.1.101 49170 typ host
a=candidate:2 1 UDP 2122194687 10.0.1.1 49171 typ host
a=candidate:3 1 UDP 1685987071 93.184.216.34 49172 typ srflx raddr 10.0.1.1 rport 49171
a=candidate:4 1 UDP 41819902 10.1.1.1 3478 typ relay raddr 93.184.216.34 rport 49172
```
#### RTCPeerConnection (pc, peer connection)
This is a class that the browser provides you with which gives you access to the sdp, lets you create answers / offers , lets you send media.
This class hides all the complexity of webrtc from the developer

### Connecting the two sides
The steps to create a webrtc connection between 2 sides includes - 
1. Browser 1 creates an RTCPeerConnection
2. Browser 1 creates an offer
3. Browser 1 sets the local description to the offer
4. Browser 1 sends the offer to the other side through the signaling server
5. Browser 2 receives the offer from the signaling server
6. Browser 2 sets the remote description to the offer
7. Browser 2 creates an answer
8. Browser 2 sets the local description to be the answer
9. Browser 2 sends the answer to the other side through the signaling server
10. Browser 1 receives the answer and sets the remote description

> Browser provide `RTCPeerConnection` construct client to create sdp to craete icecandidate makes developer life easy like `websocket` provided by browser.

`https://peerjs.com` libraries that hide a lot of this complexity specifically the complexity of the RTCPeerConnectionObject.