## Horizontal Scaling, Capacity Estimation, ASG, Vertical Scalling
Javascript is single thread language, If we run Nodejs process then it can't use the multiple cors of a cpu at single time other languages (c++, java, Rust) can use multithread for exciution of a task but you have to write the code accordingly.

### Vertical scaling
**So in vertical scalaing of nodejs process means you have to start multiple nodejs process using other library like `cluster`**

### Horizontal scalling
Horizontal scaling represents increasing the number of instances you have based on a metric to be able to support more load.

### Implementing Horizontal scaling using ASG (Auto scaling group)
1. Create a EC2 instance.
    - Install Node.js on it 
    - Clone you code
2. Create an AMI (Amazon Machine Image) with your EC2 machine
3. Create security group 
    - Add inbound rules for port opening
4. Launch template
    - Add below starter code in Advance section
    ```bash
    #!/bin/bash 
    export PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.0.0/bin/
    echo "hi there before"
    echo "hi there after"
    npm install -g pm2
    cd /home/ubuntu/week-22
    pm2 start index.js
    pm2 save
    pm2 startup
    ```
5. Create ASG under EC2
6. Create Load balancer 
    - Add an HTTPS Listener from your domain, request a certificate from ACM (Amazon certificate management)
    - Target group - Attach the target group to the ASG

### Indexing
Start a db postgres in docker
```bash
docker run  -p 5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres
```
Indexing in a database is a technique used to speed up data retrieval. Think of it like the index at the back of a book.
#### How indexing works
When you create an index on a field, a new data structure (usually B-tree) is created that stores the mapping from the index column to the location of the record in the original table. 
Search on the index is usually `log(n)`

### Normalization
Normalization is the process of removing redundancy in your database.
The process typically progresses through several normal forms, each building on the last.
When you look at a schema, you can identify if it lies in one of the following categories of normalization
- 1NF
- 2NF
- 3NF
- BCNF
- 4NF
- 5NF
 