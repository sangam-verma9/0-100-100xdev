## RPC & GRPC
#### What is RPC?
RPC stands for remote procedure call . As the name suggests, it lets you call a function in on a different process/server/backend and get back a response from it.

#### Why we need RPC
- No types. You don’t know what is the shape of the data you will get back. You might be able to share types between 2 Node.js backends somehow, but if the other backend is in Rust, then you cant get back the types from it
- We use JSON to serialize and deserialize data
- We have to know what axios is , or what fetch is . We need to understand HTTP and how to call it
- Not language agnostic at all. We have to use a different library in Java, go, rust to send an http request to the server

#### Proto buffs
Protocol buffers are Google’s language-neutral, platform-neutral, extensible mechanism for serializing structured data – think XML, JSON.
The protocol buffers are where we define our service definitions and messages. This will be like a contract or common interface between the client and server on what to expect from each other; the methods, types, and returns of what each operation would bear.

1. `Schema Definition Language`: Protocol Buffers use a schema definition language (.proto files) to define the structure of data. This language allows you to specify message types, fields, enums, and services.

2. `Binary Serialization`: Protocol Buffers serialize data into a binary format, which is more compact and efficient compared to text-based formats like XML and JSON. 

3. `Language Support and Code Generation`: Protocol Buffers support code generation for a wide range of programming languages, including C++, Java, Go, Python, JavaScript, Ruby, and more. Protocol Buffers come with tools (e.g., protoc) that generate code in various programming languages based on your .proto files.

> https://www.protobufpal.com/

#### Sample proto file
```
syntax = "proto3";

// Define a message type representing a person.
message Person {
  string name = 1;
  int32 age = 2;
}

service PersonService {
  // Add a person to the address book.
  rpc AddPerson(Person) returns (Person);
  
  // Get a person from their name
  rpc GetPersonByName(GetPersonByNameRequest) returns (Person);
}

message GetPersonByNameRequest {
  string name = 1;
}
```
