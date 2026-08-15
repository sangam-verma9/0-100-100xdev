import { createClient } from 'redis';

const client = createClient();
async function main() {
    await client.connect();

    while (true) {
        const submission = await client.brPop("submissions", 0);
        if (submission) {
            console.log(submission);
            await new Promise((resolve) => setTimeout(resolve, 5000))
            console.log("processed user submission")
        }

    }
}
main()